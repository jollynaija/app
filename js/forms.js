/**
 * Forms — multi-step profile creation, validation, auth forms, verification UI
 * All interactions are simulated. No data is sent to a server.
 * TODO: API - wire form submissions to backend endpoints
 */

(function () {
  "use strict";

  // ---- Multi-step List Profile ----
  function initListProfileForm() {
    const form = document.getElementById("list-profile-form");
    if (!form) return;

    const steps = form.querySelectorAll(".form-step");
    const progressSteps = document.querySelectorAll(".form-progress-step");
    let currentStep = 0;
    const totalSteps = steps.length;

    function showStep(index) {
      steps.forEach(function (s, i) {
        s.classList.toggle("active", i === index);
      });
      progressSteps.forEach(function (s, i) {
        s.classList.toggle("active", i === index);
        s.classList.toggle("completed", i < index);
      });
      currentStep = index;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function validateStep(index) {
      const step = steps[index];
      const required = step.querySelectorAll("[required]");
      let valid = true;
      required.forEach(function (field) {
        if (!field.value || (field.type === "checkbox" && !field.checked)) {
          field.classList.add("error");
          valid = false;
        } else {
          field.classList.remove("error");
        }
      });

      // Age check on step 1 (adult eligibility)
      if (index === 1) {
        const ageConfirm = document.getElementById("confirm-18");
        if (ageConfirm && !ageConfirm.checked) {
          valid = false;
          if (window.showToast) window.showToast("You must confirm you are 18 or older.");
        }
      }

      return valid;
    }

    // Next / Prev buttons
    form.addEventListener("click", function (e) {
      if (e.target.matches("[data-next]")) {
        e.preventDefault();
        if (validateStep(currentStep)) {
          if (currentStep < totalSteps - 1) showStep(currentStep + 1);
        } else {
          if (window.showToast) window.showToast("Please fill in all required fields.");
        }
      }
      if (e.target.matches("[data-prev]")) {
        e.preventDefault();
        if (currentStep > 0) showStep(currentStep - 1);
      }
    });

    // Populate states
    const stateSelect = document.getElementById("profile-state");
    if (stateSelect && window.MockData) {
      stateSelect.innerHTML = '<option value="">Select State</option>' +
        Object.keys(window.MockData.NIGERIAN_STATES).map(function (slug) {
          return '<option value="' + slug + '">' + window.MockData.NIGERIAN_STATES[slug].name + "</option>";
        }).join("");

      stateSelect.addEventListener("change", function () {
        const citySelect = document.getElementById("profile-city");
        if (!citySelect) return;
        if (!stateSelect.value) {
          citySelect.innerHTML = '<option value="">Select City</option>';
          return;
        }
        const cities = window.MockData.NIGERIAN_STATES[stateSelect.value].cities;
        citySelect.innerHTML = '<option value="">Select City</option>' +
          cities.map(function (c) { return '<option value="' + c + '">' + c + "</option>"; }).join("");
      });
    }

    // Interests checkboxes
    const interestContainer = document.getElementById("profile-interests");
    if (interestContainer && window.MockData) {
      interestContainer.innerHTML = window.MockData.RELATIONSHIP_INTERESTS.map(function (i) {
        return '<div class="form-check">' +
          '<input type="checkbox" id="int-' + i.id + '" name="interests" value="' + i.id + '">' +
          '<label for="int-' + i.id + '">' + i.label + " — " + i.description + "</label>" +
          "</div>";
      }).join("");
    }

    // Photo preview
    const photoInput = document.getElementById("profile-photos");
    const photoGrid = document.getElementById("photo-preview-grid");
    if (photoInput && photoGrid) {
      photoInput.addEventListener("change", function () {
        photoGrid.innerHTML = "";
        const files = Array.from(photoInput.files).slice(0, 5);
        files.forEach(function (file, i) {
          const reader = new FileReader();
          reader.onload = function (e) {
            const slot = document.createElement("div");
            slot.className = "photo-upload-slot has-image";
            slot.innerHTML = '<img src="' + e.target.result + '" alt="Preview ' + (i + 1) + '">' +
              '<button type="button" class="remove-photo" aria-label="Remove">&times;</button>';
            photoGrid.appendChild(slot);
          };
          reader.readAsDataURL(file);
        });
        // Empty slots
        for (let i = files.length; i < 3; i++) {
          const slot = document.createElement("div");
          slot.className = "photo-upload-slot";
          slot.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 5v14M5 12h14"/></svg><span style="font-size:var(--text-xs);color:var(--color-text-muted)">Add photo</span>';
          slot.addEventListener("click", function () { photoInput.click(); });
          photoGrid.appendChild(slot);
        }
      });
    }

    // Submit (simulated)
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validateStep(currentStep)) return;

      // Show confirmation
      const confirmScreen = document.getElementById("submission-confirm");
      if (confirmScreen) {
        form.style.display = "none";
        confirmScreen.style.display = "block";
      } else {
        if (window.showToast) {
          window.showToast("Profile submitted for review (simulated). No data was sent to a server.");
        }
      }
    });

    showStep(0);
  }

  // ---- Auth forms ----
  function initAuthForms() {
    // Password visibility
    document.querySelectorAll(".password-toggle-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const input = btn.parentElement.querySelector("input");
        if (!input) return;
        if (input.type === "password") {
          input.type = "text";
          btn.setAttribute("aria-label", "Hide password");
        } else {
          input.type = "password";
          btn.setAttribute("aria-label", "Show password");
        }
      });
    });

    // Phone formatting (+234)
    const phoneInputs = document.querySelectorAll('input[data-phone]');
    phoneInputs.forEach(function (input) {
      input.addEventListener("input", function () {
        let val = input.value.replace(/\D/g, "");
        if (val.startsWith("234")) val = val.slice(3);
        if (val.startsWith("0")) val = val.slice(1);
        if (val.length > 10) val = val.slice(0, 10);
        input.value = val ? "+234 " + val : "";
      });
    });

    // Login form
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        if (window.showToast) {
          window.showToast("Login simulated. In production this authenticates with the backend.");
        }
        setTimeout(function () {
          window.location.href = "dashboard.html";
        }, 1000);
      });
    }

    // Register form
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
      registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const pass = document.getElementById("reg-password");
        const confirm = document.getElementById("reg-password-confirm");
        if (pass && confirm && pass.value !== confirm.value) {
          if (window.showToast) window.showToast("Passwords do not match.");
          return;
        }
        if (window.showToast) {
          window.showToast("Registration simulated. Check your email (mock).");
        }
        setTimeout(function () {
          window.location.href = "dashboard.html";
        }, 1000);
      });
    }

    // Password reset
    const resetForm = document.getElementById("reset-form");
    if (resetForm) {
      resetForm.addEventListener("submit", function (e) {
        e.preventDefault();
        if (window.showToast) {
          window.showToast("If an account exists, a reset link would be sent (simulated).");
        }
      });
    }
  }

  // ---- Verification UI ----
  function initVerification() {
    const uploadBtn = document.getElementById("sim-id-upload");
    const selfieBtn = document.getElementById("sim-selfie-upload");
    const submitBtn = document.getElementById("sim-verify-submit");
    const statusEl = document.getElementById("verification-status");

    if (uploadBtn) {
      uploadBtn.addEventListener("click", function () {
        uploadBtn.textContent = "Document selected (simulated)";
        uploadBtn.classList.add("btn-secondary");
        uploadBtn.disabled = true;
      });
    }
    if (selfieBtn) {
      selfieBtn.addEventListener("click", function () {
        selfieBtn.textContent = "Selfie captured (simulated)";
        selfieBtn.classList.add("btn-secondary");
        selfieBtn.disabled = true;
      });
    }
    if (submitBtn) {
      submitBtn.addEventListener("click", function () {
        if (statusEl) {
          statusEl.innerHTML =
            '<div class="state-card pending">' +
            '<div><strong>Pending Review</strong><p style="font-size:var(--text-sm);color:var(--color-text-muted);margin-top:4px">' +
            "Your verification is being reviewed. This is a simulation — no documents were uploaded or stored.</p></div></div>";
        }
        if (window.showToast) {
          window.showToast("Verification submitted for review (simulated).");
        }
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitted";
      });
    }
  }

  // ---- Dashboard controls ----
  function initDashboard() {
    const pauseBtn = document.getElementById("pause-listing");
    const removeBtn = document.getElementById("remove-listing");
    const statusBadge = document.getElementById("listing-status");

    if (pauseBtn) {
      pauseBtn.addEventListener("click", function () {
        if (statusBadge) {
          statusBadge.innerHTML = '<span class="status-dot paused"></span> Paused';
        }
        pauseBtn.textContent = "Resume Listing";
        if (window.showToast) window.showToast("Listing paused (simulated).");
      });
    }
    if (removeBtn) {
      removeBtn.addEventListener("click", function () {
        if (confirm("Are you sure you want to remove your listing? This cannot be undone in the prototype.")) {
          if (statusBadge) {
            statusBadge.innerHTML = '<span class="status-dot rejected"></span> Removed';
          }
          if (window.showToast) window.showToast("Listing removed (simulated).");
        }
      });
    }
  }

  // ---- Report form ----
  function initReportForm() {
    const form = document.getElementById("report-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.style.display = "none";
      const confirm = document.getElementById("report-confirm");
      if (confirm) confirm.style.display = "block";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initListProfileForm();
    initAuthForms();
    initVerification();
    initDashboard();
    initReportForm();
  });
})();
