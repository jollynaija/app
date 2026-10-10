/**
 * Profile page — gallery, contact actions, similar profiles
 * TODO: API - load profile by ID from backend
 */

(function () {
  "use strict";

  function getQueryId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  }

  function renderProfile(profile) {
    if (!profile) {
      document.getElementById("profile-content").innerHTML =
        '<div class="empty-state"><h3>Profile not found</h3><p>This listing may have been removed or is no longer available.</p>' +
        '<a href="browse.html" class="btn btn-primary">Browse Profiles</a></div>';
      return;
    }

    // Update page title
    document.title = profile.displayName + ", " + profile.age + " — " + profile.city + " | ConnectNaija";

    const stateName = window.MockData.getStateName(profile.state);
    const mainPhoto = profile.photos[0] || "";
    const thumbs = profile.photos.map(function (src, i) {
      return '<button class="gallery-thumb' + (i === 0 ? " active" : "") + '" data-src="' + src + '">' +
        '<img src="' + src + '" alt="" loading="lazy"></button>';
    }).join("");

    const interests = profile.interests.map(function (id) {
      return '<span class="interest-tag">' + window.MockData.getInterestLabel(id) + "</span>";
    }).join(" ");

    const languages = (profile.languages || []).join(", ");

    const verifiedHtml = profile.verified
      ? '<span class="verified-badge"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg> Verified Profile</span>'
      : '<span class="badge badge-muted">Not yet verified</span>';

    // Contact actions
    let contactHtml = "";
    if (profile.contactEnabled) {
      if (profile.whatsappEnabled) {
        contactHtml += '<a href="#" class="btn btn-primary" id="whatsapp-btn" data-action="whatsapp">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5 prec -.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.117 1.528 5.85L.057 23.5l5.8-1.52A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.91 0-3.69-.51-5.23-1.4l-.375-.222-3.87 1.014 1.033-3.77-.244-.387A9.78 9.78 0 012.182 12c0-5.42 4.4-9.818 9.818-9.818 5.42 0 9.818 4.4 9.818 9.818 0 5.42-4.4 9.818-9.818 9.818z"/></svg> Contact via WhatsApp</a>';
      }
      if (profile.phoneVisible) {
        contactHtml += '<button class="btn btn-secondary" id="phone-btn" data-action="phone">Show Phone Number</button>';
      }
      if (!profile.whatsappEnabled && !profile.phoneVisible) {
        contactHtml += '<p class="text-muted" style="font-size:var(--text-sm)">Contact is enabled. Register or log in to request contact details.</p>';
      }
    } else {
      contactHtml = '<p class="text-muted" style="font-size:var(--text-sm)">This member has not enabled public contact at this time.</p>';
    }

    const html =
      '<div class="profile-layout">' +
        '<div class="profile-gallery-col">' +
          '<div class="profile-gallery">' +
            '<img id="main-photo" src="' + mainPhoto + '" alt="' + profile.displayName + '">' +
          "</div>" +
          (profile.photos.length > 1 ? '<div class="gallery-thumbs">' + thumbs + "</div>" : "") +
        "</div>" +
        '<div class="profile-info">' +
          "<h1>" + profile.displayName + "</h1>" +
          '<div class="profile-meta">' +
            "<span>" + profile.age + " years</span>" +
            "<span>·</span>" +
            "<span>" + profile.city + ", " + stateName + "</span>" +
            "<span>·</span>" +
            verifiedHtml +
          "</div>" +
          '<p class="profile-bio">' + profile.bio + "</p>" +
          '<div class="profile-details">' +
            '<div class="detail-row"><span class="detail-label">Interests</span><span class="detail-value" style="display:flex;flex-wrap:wrap;gap:6px">' + interests + "</span></div>" +
            '<div class="detail-row"><span class="detail-label">Languages</span><span class="detail-value">' + languages + "</span></div>" +
            '<div class="detail-row"><span class="detail-label">Location</span><span class="detail-value">' + profile.city + ", " + stateName + "</span></div>" +
            '<div class="detail-row"><span class="detail-label">Member since</span><span class="detail-value">' + (profile.joined || "Recently") + "</span></div>" +
          "</div>" +
          '<div class="profile-actions">' +
            contactHtml +
            '<button class="btn btn-ghost" data-fav-id="' + profile.id + '" id="profile-fav-btn">' +
              '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> Favorite' +
            "</button>" +
            '<a href="report-profile.html?id=' + profile.id + '" class="btn btn-ghost btn-sm">Report</a>' +
          "</div>" +
          '<p class="contact-note">Always meet in public places for first meetings. Never share financial information. See our <a href="safety.html">Safety Guidelines</a>.</p>' +
        "</div>" +
      "</div>";

    document.getElementById("profile-content").innerHTML = html;

    // Gallery interaction
    document.querySelectorAll(".gallery-thumb").forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        const src = thumb.getAttribute("data-src");
        document.getElementById("main-photo").src = src;
        document.querySelectorAll(".gallery-thumb").forEach(function (t) { t.classList.remove("active"); });
        thumb.classList.add("active");
      });
    });

    // Contact mock
    const waBtn = document.getElementById("whatsapp-btn");
    if (waBtn) {
      waBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (window.showToast) {
          window.showToast("In production, this opens WhatsApp. Contact details are protected until mutual interest is confirmed.");
        } else {
          alert("Prototype: WhatsApp contact would open here. Real numbers are never exposed in this demo.");
        }
      });
    }

    const phoneBtn = document.getElementById("phone-btn");
    if (phoneBtn) {
      phoneBtn.addEventListener("click", function () {
        phoneBtn.textContent = "+234 ••• ••• •••• (masked in demo)";
        phoneBtn.disabled = true;
      });
    }

    if (window.Favorites) window.Favorites.updateFavButtons();

    // Similar profiles
    renderSimilar(profile);
  }

  function renderSimilar(profile) {
    const container = document.getElementById("similar-profiles");
    if (!container || !window.MockData) return;

    const similar = window.MockData.getAllActiveProfiles()
      .filter(function (p) {
        return p.id !== profile.id && (
          p.state === profile.state ||
          p.interests.some(function (i) { return profile.interests.includes(i); })
        );
      })
      .slice(0, 3);

    if (similar.length === 0) {
      container.style.display = "none";
      return;
    }

    // Reuse card renderer if available, else simple
    if (window.BrowseFilters && window.BrowseFilters.renderResults) {
      // Manual cards
    }

    container.innerHTML = '<h2 class="heading-3">Similar Profiles</h2>' +
      '<div class="profile-grid" style="grid-template-columns:repeat(3,1fr)">' +
      similar.map(function (p) {
        const photo = p.photos[0] || "";
        const stateName = window.MockData.getStateName(p.state);
        return (
          '<article class="profile-card">' +
            '<div class="profile-card-image">' +
              '<a href="profile.html?id=' + p.id + '"><img src="' + photo + '" alt="' + p.displayName + '" loading="lazy"></a>' +
              (p.verified ? '<span class="badge badge-verified profile-card-badge">Verified</span>' : "") +
              '<button class="profile-card-fav" data-fav-id="' + p.id + '" aria-label="Add to favorites">' +
                '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' +
              "</button>" +
            "</div>" +
            '<div class="profile-card-body">' +
              '<a href="profile.html?id=' + p.id + '" class="profile-card-name">' + p.displayName + "</a>" +
              '<div class="profile-card-meta">' + p.age + " · " + p.city + ", " + stateName + "</div>" +
              '<div class="profile-card-action"><a href="profile.html?id=' + p.id + '" class="btn btn-secondary btn-sm" style="width:100%">View Profile</a></div>' +
            "</div>" +
          "</article>"
        );
      }).join("") +
      "</div>";

    if (window.Favorites) window.Favorites.updateFavButtons();
  }

  document.addEventListener("DOMContentLoaded", function () {
    const content = document.getElementById("profile-content");
    if (!content) return;

    const id = getQueryId();
    if (!id) {
      content.innerHTML = '<div class="empty-state"><h3>No profile selected</h3><p><a href="browse.html" class="btn btn-primary">Browse Profiles</a></p></div>';
      return;
    }

    const profile = window.MockData ? window.MockData.getProfileById(id) : null;
    renderProfile(profile);
  });
})();
