/* Small progressive-enhancement helpers: mobile nav toggle + footer year.
   No dependencies. Loaded with `defer`. */
(function () {
  "use strict";

  // Mobile navigation toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close the menu after following a link (single-page feel on mobile)
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Current year in the footer
  var y = String(new Date().getFullYear());
  var slots = document.querySelectorAll("[data-year]");
  for (var i = 0; i < slots.length; i++) slots[i].textContent = y;
})();
