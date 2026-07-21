/* Les Gracieux — génère la page Galerie à partir de galerie.js.
   Si une entrée n'a pas encore de photo (image: ""), une vignette
   "Photo à ajouter" s'affiche à la place pour éviter une image cassée. */

(function () {
  "use strict";

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var host = document.getElementById("gallery-grid");
    if (!host || !window.GALERIE_DATA) return;

    var items = window.GALERIE_DATA;
    if (!items.length) return;

    host.innerHTML = items.map(function (item) {
      var media = item.image
        ? '<img src="' + encodeURIComponent(item.image) + '" alt="' + escapeHtml(item.caption) + '" loading="lazy">'
        : '<div class="gallery-placeholder">' +
            '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M21 16l-5.5-5.5a2 2 0 0 0-2.8 0L3 20"/></svg>' +
            '<span>Photo à ajouter</span>' +
          '</div>';

      var tagHtml = item.category
        ? '<span class="video-tag">' + escapeHtml(item.category) + '</span>'
        : '';

      return (
        '<div class="gallery-tile">' +
          media +
          '<div class="gallery-caption">' + tagHtml + '<p>' + escapeHtml(item.caption) + '</p></div>' +
        '</div>'
      );
    }).join("");
  });
})();
