/**
 * Navigation — Mobile menu, active states, shared header/footer behavior
 */

(function () {
  "use strict";

  function initMobileMenu() {
    const btn = document.querySelector(".mobile-menu-btn");
    const nav = document.querySelector(".mobile-nav");
    const closeBtn = document.querySelector(".mobile-nav-close");

    if (!btn || !nav) return;

    function openMenu() {
      nav.classList.add("active");
      document.body.style.overflow = "hidden";
      btn.setAttribute("aria-expanded", "true");
    }

    function closeMenu() {
      nav.classList.remove("active");
      document.body.style.overflow = "";
      btn.setAttribute("aria-expanded", "false");
    }

    btn.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);

    nav.addEventListener("click", function (e) {
      if (e.target === nav) closeMenu();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("active")) {
        closeMenu();
      }
    });
  }

  function setActiveNav() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link, .mobile-nav-links a").forEach(function (link) {
      const href = link.getAttribute("href");
      if (!href) return;
      const linkPath = href.split("/").pop();
      if (linkPath === path || (path === "" && linkPath === "index.html")) {
        link.classList.add("active");
      }
    });
  }

  function initFaq() {
    document.querySelectorAll(".faq-question").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const item = btn.closest(".faq-item");
        const wasOpen = item.classList.contains("open");
        document.querySelectorAll(".faq-item.open").forEach(function (el) {
          el.classList.remove("open");
        });
        if (!wasOpen) item.classList.add("open");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initMobileMenu();
    setActiveNav();
    initFaq();
  });
})();
