/**
 * Filters, search, sorting, and pagination for browse page
 * Works with MockData. All client-side for prototype.
 * TODO: API - replace with server-side filtering endpoints
 */

(function () {
  "use strict";

  const PAGE_SIZE = 9;
  let currentPage = 1;
  let currentFilters = {
    query: "",
    state: "",
    city: "",
    interests: [],
    ageMin: 18,
    ageMax: 50,
    verifiedOnly: false,
    sort: "newest"
  };

  function getFilteredProfiles() {
    if (!window.MockData) return [];
    let profiles = window.MockData.getAllActiveProfiles();

    // Text search
    if (currentFilters.query) {
      const q = currentFilters.query.toLowerCase();
      profiles = profiles.filter(function (p) {
        return (
          p.displayName.toLowerCase().includes(q) ||
          p.bio.toLowerCase().includes(q) ||
          p.shortIntro.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          (window.MockData.getStateName(p.state) || "").toLowerCase().includes(q)
        );
      });
    }

    // State
    if (currentFilters.state) {
      profiles = profiles.filter(function (p) { return p.state === currentFilters.state; });
    }

    // City
    if (currentFilters.city) {
      profiles = profiles.filter(function (p) {
        return p.city.toLowerCase() === currentFilters.city.toLowerCase();
      });
    }

    // Interests
    if (currentFilters.interests.length > 0) {
      profiles = profiles.filter(function (p) {
        return currentFilters.interests.some(function (i) {
          return p.interests.includes(i);
        });
      });
    }

    // Age range
    profiles = profiles.filter(function (p) {
      return p.age >= currentFilters.ageMin && p.age <= currentFilters.ageMax;
    });

    // Verified only
    if (currentFilters.verifiedOnly) {
      profiles = profiles.filter(function (p) { return p.verified; });
    }

    // Sort
    switch (currentFilters.sort) {
      case "newest":
        profiles.sort(function (a, b) { return (b.joined || "").localeCompare(a.joined || ""); });
        break;
      case "age-asc":
        profiles.sort(function (a, b) { return a.age - b.age; });
        break;
      case "age-desc":
        profiles.sort(function (a, b) { return b.age - a.age; });
        break;
      case "name":
        profiles.sort(function (a, b) { return a.displayName.localeCompare(b.displayName); });
        break;
    }

    return profiles;
  }

  function renderProfileCard(profile) {
    const stateName = window.MockData.getStateName(profile.state);
    const interestLabels = profile.interests.slice(0, 2).map(function (id) {
      return '<span class="tag">' + window.MockData.getInterestLabel(id) + "</span>";
    }).join("");

    const verifiedBadge = profile.verified
      ? '<span class="badge badge-verified profile-card-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Verified</span>'
      : "";

    const photo = profile.photos && profile.photos[0]
      ? profile.photos[0]
      : "https://via.placeholder.com/400x500/E8E0D5/6B6B6B?text=Photo";

    return (
      '<article class="profile-card">' +
        '<div class="profile-card-image">' +
          '<a href="profile.html?id=' + profile.id + '">' +
            '<img src="' + photo + '" alt="' + profile.displayName + ', ' + profile.age + ' — ' + profile.city + '" loading="lazy" width="400" height="500">' +
          "</a>" +
          verifiedBadge +
          '<button class="profile-card-fav" data-fav-id="' + profile.id + '" aria-label="Add to favorites">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' +
          "</button>" +
        "</div>" +
        '<div class="profile-card-body">' +
          '<a href="profile.html?id=' + profile.id + '" class="profile-card-name">' + profile.displayName + "</a>" +
          '<div class="profile-card-meta">' + profile.age + " · " + profile.city + ", " + stateName + "</div>" +
          '<p class="profile-card-intro">' + profile.shortIntro + "</p>" +
          '<div class="profile-card-tags">' + interestLabels + "</div>" +
          '<div class="profile-card-action">' +
            '<a href="profile.html?id=' + profile.id + '" class="btn btn-secondary btn-sm" style="width:100%">View Profile</a>' +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  function renderResults() {
    const grid = document.getElementById("profile-grid");
    const countEl = document.getElementById("results-count");
    const paginationEl = document.getElementById("pagination");
    const emptyEl = document.getElementById("empty-state");
    const loadingEl = document.getElementById("loading-state");

    if (!grid) return;

    if (loadingEl) loadingEl.style.display = "none";

    const all = getFilteredProfiles();
    const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * PAGE_SIZE;
    const pageItems = all.slice(start, start + PAGE_SIZE);

    if (countEl) {
      countEl.textContent = all.length + " profile" + (all.length !== 1 ? "s" : "") + " found";
    }

    if (all.length === 0) {
      grid.innerHTML = "";
      if (emptyEl) emptyEl.style.display = "block";
      if (paginationEl) paginationEl.innerHTML = "";
      return;
    }

    if (emptyEl) emptyEl.style.display = "none";
    grid.innerHTML = pageItems.map(renderProfileCard).join("");

    // Pagination
    if (paginationEl) {
      let html = "";
      html += '<button class="pagination-btn" data-page="prev" ' + (currentPage <= 1 ? "disabled" : "") + ' aria-label="Previous page">&larr;</button>';
      for (let i = 1; i <= totalPages; i++) {
        if (totalPages > 7 && Math.abs(i - currentPage) > 2 && i !== 1 && i !== totalPages) {
          if (i === 2 || i === totalPages - 1) html += '<span style="padding:0 4px;color:var(--color-text-muted)">…</span>';
          continue;
        }
        html += '<button class="pagination-btn' + (i === currentPage ? " active" : "") + '" data-page="' + i + '">' + i + "</button>";
      }
      html += '<button class="pagination-btn" data-page="next" ' + (currentPage >= totalPages ? "disabled" : "") + ' aria-label="Next page">&rarr;</button>';
      paginationEl.innerHTML = html;
    }

    // Update fav buttons
    if (window.Favorites) window.Favorites.updateFavButtons();
  }

  function updateActiveFilterTags() {
    const container = document.getElementById("active-filters");
    if (!container) return;

    const tags = [];
    if (currentFilters.state) {
      tags.push({ key: "state", label: window.MockData.getStateName(currentFilters.state) });
    }
    if (currentFilters.city) {
      tags.push({ key: "city", label: currentFilters.city });
    }
    currentFilters.interests.forEach(function (id) {
      tags.push({ key: "interest:" + id, label: window.MockData.getInterestLabel(id) });
    });
    if (currentFilters.verifiedOnly) {
      tags.push({ key: "verified", label: "Verified only" });
    }
    if (currentFilters.ageMin > 18 || currentFilters.ageMax < 50) {
      tags.push({ key: "age", label: "Age " + currentFilters.ageMin + "–" + currentFilters.ageMax });
    }

    if (tags.length === 0) {
      container.innerHTML = "";
      return;
    }

    container.innerHTML = tags.map(function (t) {
      return '<span class="active-filter-tag">' + t.label +
        ' <button type="button" data-remove-filter="' + t.key + '" aria-label="Remove filter">&times;</button></span>';
    }).join("") +
      '<button type="button" class="btn btn-ghost btn-sm" id="clear-all-filters">Clear all</button>';
  }

  function applyFilters() {
    currentPage = 1;
    updateActiveFilterTags();
    renderResults();
  }

  function initBrowsePage() {
    const grid = document.getElementById("profile-grid");
    if (!grid) return; // Not on browse page

    // Populate state select
    const stateSelect = document.getElementById("filter-state");
    if (stateSelect && window.MockData) {
      let opts = '<option value="">All States</option>';
      Object.keys(window.MockData.NIGERIAN_STATES).forEach(function (slug) {
        opts += '<option value="' + slug + '">' + window.MockData.NIGERIAN_STATES[slug].name + "</option>";
      });
      stateSelect.innerHTML = opts;
    }

    // Populate interest chips
    const interestContainer = document.getElementById("filter-interests");
    if (interestContainer && window.MockData) {
      interestContainer.innerHTML = window.MockData.RELATIONSHIP_INTERESTS.map(function (i) {
        return '<button type="button" class="filter-chip" data-interest="' + i.id + '">' + i.label + "</button>";
      }).join("");
    }

    // Event: state change → populate cities
    if (stateSelect) {
      stateSelect.addEventListener("change", function () {
        currentFilters.state = stateSelect.value;
        currentFilters.city = "";
        const citySelect = document.getElementById("filter-city");
        if (citySelect) {
          if (!currentFilters.state) {
            citySelect.innerHTML = '<option value="">All Cities</option>';
            citySelect.disabled = true;
          } else {
            const cities = window.MockData.NIGERIAN_STATES[currentFilters.state].cities;
            citySelect.innerHTML = '<option value="">All Cities</option>' +
              cities.map(function (c) { return '<option value="' + c + '">' + c + "</option>"; }).join("");
            citySelect.disabled = false;
          }
        }
        applyFilters();
      });
    }

    // City
    const citySelect = document.getElementById("filter-city");
    if (citySelect) {
      citySelect.addEventListener("change", function () {
        currentFilters.city = citySelect.value;
        applyFilters();
      });
    }

    // Interests
    if (interestContainer) {
      interestContainer.addEventListener("click", function (e) {
        const chip = e.target.closest("[data-interest]");
        if (!chip) return;
        const id = chip.getAttribute("data-interest");
        chip.classList.toggle("active");
        const idx = currentFilters.interests.indexOf(id);
        if (idx === -1) currentFilters.interests.push(id);
        else currentFilters.interests.splice(idx, 1);
        applyFilters();
      });
    }

    // Verified
    const verifiedCheck = document.getElementById("filter-verified");
    if (verifiedCheck) {
      verifiedCheck.addEventListener("change", function () {
        currentFilters.verifiedOnly = verifiedCheck.checked;
        applyFilters();
      });
    }

    // Age
    const ageMin = document.getElementById("filter-age-min");
    const ageMax = document.getElementById("filter-age-max");
    if (ageMin) {
      ageMin.addEventListener("change", function () {
        currentFilters.ageMin = parseInt(ageMin.value, 10) || 18;
        applyFilters();
      });
    }
    if (ageMax) {
      ageMax.addEventListener("change", function () {
        currentFilters.ageMax = parseInt(ageMax.value, 10) || 50;
        applyFilters();
      });
    }

    // Search
    const searchInput = document.getElementById("browse-search");
    if (searchInput) {
      let debounce;
      searchInput.addEventListener("input", function () {
        clearTimeout(debounce);
        debounce = setTimeout(function () {
          currentFilters.query = searchInput.value.trim();
          applyFilters();
        }, 300);
      });
    }

    // Sort
    const sortSelect = document.getElementById("browse-sort");
    if (sortSelect) {
      sortSelect.addEventListener("change", function () {
        currentFilters.sort = sortSelect.value;
        applyFilters();
      });
    }

    // Pagination clicks
    const paginationEl = document.getElementById("pagination");
    if (paginationEl) {
      paginationEl.addEventListener("click", function (e) {
        const btn = e.target.closest("[data-page]");
        if (!btn || btn.disabled) return;
        const val = btn.getAttribute("data-page");
        if (val === "prev") currentPage--;
        else if (val === "next") currentPage++;
        else currentPage = parseInt(val, 10);
        renderResults();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // Clear filters
    document.addEventListener("click", function (e) {
      if (e.target.id === "clear-all-filters" || e.target.closest("#clear-all-filters")) {
        currentFilters = {
          query: "",
          state: "",
          city: "",
          interests: [],
          ageMin: 18,
          ageMax: 50,
          verifiedOnly: false,
          sort: currentFilters.sort
        };
        if (searchInput) searchInput.value = "";
        if (stateSelect) stateSelect.value = "";
        if (citySelect) {
          citySelect.innerHTML = '<option value="">All Cities</option>';
          citySelect.disabled = true;
        }
        if (verifiedCheck) verifiedCheck.checked = false;
        if (ageMin) ageMin.value = 18;
        if (ageMax) ageMax.value = 50;
        document.querySelectorAll(".filter-chip.active").forEach(function (c) {
          c.classList.remove("active");
        });
        applyFilters();
      }

      const removeBtn = e.target.closest("[data-remove-filter]");
      if (removeBtn) {
        const key = removeBtn.getAttribute("data-remove-filter");
        if (key === "state") {
          currentFilters.state = "";
          currentFilters.city = "";
          if (stateSelect) stateSelect.value = "";
          if (citySelect) {
            citySelect.innerHTML = '<option value="">All Cities</option>';
            citySelect.disabled = true;
          }
        } else if (key === "city") {
          currentFilters.city = "";
          if (citySelect) citySelect.value = "";
        } else if (key === "verified") {
          currentFilters.verifiedOnly = false;
          if (verifiedCheck) verifiedCheck.checked = false;
        } else if (key === "age") {
          currentFilters.ageMin = 18;
          currentFilters.ageMax = 50;
          if (ageMin) ageMin.value = 18;
          if (ageMax) ageMax.value = 50;
        } else if (key.startsWith("interest:")) {
          const id = key.replace("interest:", "");
          currentFilters.interests = currentFilters.interests.filter(function (i) { return i !== id; });
          const chip = document.querySelector('[data-interest="' + id + '"]');
          if (chip) chip.classList.remove("active");
        }
        applyFilters();
      }
    });

    // Mobile filter drawer
    const filterToggle = document.getElementById("mobile-filter-toggle");
    const filterOverlay = document.getElementById("filter-drawer-overlay");
    const filterClose = document.getElementById("filter-drawer-close");

    if (filterToggle && filterOverlay) {
      filterToggle.addEventListener("click", function () {
        filterOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
      });
      function closeDrawer() {
        filterOverlay.classList.remove("active");
        document.body.style.overflow = "";
      }
      if (filterClose) filterClose.addEventListener("click", closeDrawer);
      filterOverlay.addEventListener("click", function (e) {
        if (e.target === filterOverlay) closeDrawer();
      });
    }

    // URL params (e.g. from homepage search or location links)
    const params = new URLSearchParams(window.location.search);
    if (params.get("state")) {
      currentFilters.state = params.get("state");
      if (stateSelect) {
        stateSelect.value = currentFilters.state;
        stateSelect.dispatchEvent(new Event("change"));
      }
    }
    if (params.get("city")) {
      currentFilters.city = params.get("city");
      setTimeout(function () {
        if (citySelect) {
          citySelect.value = currentFilters.city;
          applyFilters();
        }
      }, 50);
    }
    if (params.get("interest")) {
      const id = params.get("interest");
      currentFilters.interests = [id];
      const chip = document.querySelector('[data-interest="' + id + '"]');
      if (chip) chip.classList.add("active");
    }
    if (params.get("q")) {
      currentFilters.query = params.get("q");
      if (searchInput) searchInput.value = currentFilters.query;
    }

    // Initial render
    applyFilters();
  }

  // Homepage search
  function initHomepageSearch() {
    const form = document.getElementById("hero-search-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const state = document.getElementById("hero-state");
      const interest = document.getElementById("hero-interest");
      const params = new URLSearchParams();
      if (state && state.value) params.set("state", state.value);
      if (interest && interest.value) params.set("interest", interest.value);
      window.location.href = "browse.html" + (params.toString() ? "?" + params.toString() : "");
    });
  }

  window.BrowseFilters = {
    getFilteredProfiles,
    renderResults,
    applyFilters
  };

  document.addEventListener("DOMContentLoaded", function () {
    initBrowsePage();
    initHomepageSearch();
  });
})();
