/**
 * App — shared utilities, toast, homepage featured profiles
 */

(function () {
  "use strict";

  // Toast notifications
  function showToast(message, duration) {
    duration = duration || 3000;
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(function () {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(function () { toast.remove(); }, 300);
    }, duration);
  }
  window.showToast = showToast;

  // Homepage featured profiles
  function renderFeatured() {
    const grid = document.getElementById("featured-grid");
    if (!grid || !window.MockData) return;

    const profiles = window.MockData.getFeaturedProfiles(6);
    grid.innerHTML = profiles.map(function (profile) {
      const stateName = window.MockData.getStateName(profile.state);
      const photo = profile.photos[0] || "";
      const tags = profile.interests.slice(0, 2).map(function (id) {
        return '<span class="tag">' + window.MockData.getInterestLabel(id) + "</span>";
      }).join("");

      return (
        '<article class="profile-card">' +
          '<div class="profile-card-image">' +
            '<a href="profile.html?id=' + profile.id + '">' +
              '<img src="' + photo + '" alt="' + profile.displayName + ', ' + profile.age + ' in ' + profile.city + '" loading="lazy" width="400" height="500">' +
            "</a>" +
            (profile.verified ? '<span class="badge badge-verified profile-card-badge">Verified</span>' : "") +
            '<button class="profile-card-fav" data-fav-id="' + profile.id + '" aria-label="Add to favorites">' +
              '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' +
            "</button>" +
          "</div>" +
          '<div class="profile-card-body">' +
            '<a href="profile.html?id=' + profile.id + '" class="profile-card-name">' + profile.displayName + "</a>" +
            '<div class="profile-card-meta">' + profile.age + " · " + profile.city + ", " + stateName + "</div>" +
            '<p class="profile-card-intro">' + profile.shortIntro + "</p>" +
            '<div class="profile-card-tags">' + tags + "</div>" +
            '<div class="profile-card-action">' +
              '<a href="profile.html?id=' + profile.id + '" class="btn btn-secondary btn-sm" style="width:100%">View Profile</a>' +
            "</div>" +
          "</div>" +
        "</article>"
      );
    }).join("");

    if (window.Favorites) window.Favorites.updateFavButtons();
  }

  // Homepage location links
  function renderLocations() {
    const grid = document.getElementById("location-grid");
    if (!grid) return;

    const popular = [
      { state: "lagos", city: null, label: "Lagos" },
      { state: "fct", city: null, label: "Abuja (FCT)" },
      { state: "rivers", city: null, label: "Port Harcourt" },
      { state: "oyo", city: null, label: "Ibadan" },
      { state: "enugu", city: null, label: "Enugu" },
      { state: "edo", city: null, label: "Benin City" },
      { state: "delta", city: null, label: "Warri / Asaba" },
      { state: "anambra", city: null, label: "Onitsha / Awka" },
      { state: "kano", city: null, label: "Kano" },
      { state: "ogun", city: null, label: "Abeokuta" },
      { state: "akwaibom", city: null, label: "Uyo" },
      { state: "crossriver", city: null, label: "Calabar" }
    ];

    grid.innerHTML = popular.map(function (loc) {
      const href = "browse.html?state=" + loc.state;
      return '<a href="' + href + '" class="location-card"><span>' + loc.label + "</span></a>";
    }).join("");
  }

  // Categories
  function renderCategories() {
    const grid = document.getElementById("category-grid");
    if (!grid || !window.MockData) return;

    grid.innerHTML = window.MockData.RELATIONSHIP_INTERESTS.map(function (i) {
      return (
        '<a href="browse.html?interest=' + i.id + '" class="category-card">' +
          "<h3>" + i.label + "</h3>" +
          "<p>" + i.description + "</p>" +
        "</a>"
      );
    }).join("");
  }

  // Favorites page
  function renderFavoritesPage() {
    const grid = document.getElementById("favorites-grid");
    const empty = document.getElementById("favorites-empty");
    if (!grid) return;

    const profiles = window.Favorites ? window.Favorites.getFavoriteProfiles() : [];

    if (profiles.length === 0) {
      grid.innerHTML = "";
      if (empty) empty.style.display = "block";
      return;
    }

    if (empty) empty.style.display = "none";

    grid.innerHTML = profiles.map(function (profile) {
      const stateName = window.MockData.getStateName(profile.state);
      const photo = profile.photos[0] || "";
      return (
        '<article class="profile-card">' +
          '<div class="profile-card-image">' +
            '<a href="profile.html?id=' + profile.id + '"><img src="' + photo + '" alt="' + profile.displayName + '" loading="lazy"></a>' +
            (profile.verified ? '<span class="badge badge-verified profile-card-badge">Verified</span>' : "") +
            '<button class="profile-card-fav active" data-fav-id="' + profile.id + '" aria-label="Remove from favorites">' +
              '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' +
            "</button>" +
          "</div>" +
          '<div class="profile-card-body">' +
            '<a href="profile.html?id=' + profile.id + '" class="profile-card-name">' + profile.displayName + "</a>" +
            '<div class="profile-card-meta">' + profile.age + " · " + profile.city + ", " + stateName + "</div>" +
            '<div class="profile-card-action"><a href="profile.html?id=' + profile.id + '" class="btn btn-secondary btn-sm" style="width:100%">View Profile</a></div>' +
          "</div>" +
        "</article>"
      );
    }).join("");

    // Re-render on favorites change
    window.addEventListener("favoritesUpdated", function () {
      renderFavoritesPage();
    });
  }

  // Populate hero selects
  function initHeroSelects() {
    const stateSelect = document.getElementById("hero-state");
    if (stateSelect && window.MockData) {
      stateSelect.innerHTML = '<option value="">Any Location</option>' +
        Object.keys(window.MockData.NIGERIAN_STATES).map(function (slug) {
          return '<option value="' + slug + '">' + window.MockData.NIGERIAN_STATES[slug].name + "</option>";
        }).join("");
    }
    const interestSelect = document.getElementById("hero-interest");
    if (interestSelect && window.MockData) {
      interestSelect.innerHTML = '<option value="">Any Interest</option>' +
        window.MockData.RELATIONSHIP_INTERESTS.map(function (i) {
          return '<option value="' + i.id + '">' + i.label + "</option>";
        }).join("");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderFeatured();
    renderLocations();
    renderCategories();
    renderFavoritesPage();
    initHeroSelects();
  });
})();
