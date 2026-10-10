/**
 * Favorites — localStorage-based favorites management
 * Non-sensitive prototype state only.
 * TODO: API - sync favorites with authenticated user account
 */

(function () {
  "use strict";

  const STORAGE_KEY = "nard_favorites";

  function getFavorites() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveFavorites(ids) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch (e) {
      console.warn("Could not save favorites:", e);
    }
  }

  function isFavorite(id) {
    return getFavorites().includes(id);
  }

  function toggleFavorite(id) {
    const favs = getFavorites();
    const idx = favs.indexOf(id);
    if (idx === -1) {
      favs.push(id);
    } else {
      favs.splice(idx, 1);
    }
    saveFavorites(favs);
    return idx === -1; // true if now favorited
  }

  function updateFavButtons() {
    document.querySelectorAll("[data-fav-id]").forEach(function (btn) {
      const id = btn.getAttribute("data-fav-id");
      if (isFavorite(id)) {
        btn.classList.add("active");
        btn.setAttribute("aria-label", "Remove from favorites");
      } else {
        btn.classList.remove("active");
        btn.setAttribute("aria-label", "Add to favorites");
      }
    });
  }

  function bindFavButtons() {
    document.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-fav-id]");
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute("data-fav-id");
      const nowFav = toggleFavorite(id);
      btn.classList.toggle("active", nowFav);
      btn.setAttribute("aria-label", nowFav ? "Remove from favorites" : "Add to favorites");

      // Toast
      if (window.showToast) {
        window.showToast(nowFav ? "Added to favorites" : "Removed from favorites");
      }

      // Dispatch event for pages that need to react
      window.dispatchEvent(new CustomEvent("favoritesUpdated", { detail: { id, favorited: nowFav } }));
    });
  }

  function getFavoriteProfiles() {
    const ids = getFavorites();
    if (!window.MockData) return [];
    return ids
      .map(function (id) { return window.MockData.getProfileById(id); })
      .filter(Boolean);
  }

  // Expose
  window.Favorites = {
    getFavorites,
    isFavorite,
    toggleFavorite,
    updateFavButtons,
    getFavoriteProfiles
  };

  document.addEventListener("DOMContentLoaded", function () {
    bindFavButtons();
    updateFavButtons();
  });
})();
