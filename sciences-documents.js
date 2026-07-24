/* Les Gracieux — génère la page téléchargements à partir de data/documents.js */

(function () {
  "use strict";

  var ICON_EYE = '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/>';
  var ICON_DOWNLOAD = '<path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 19h16"/>';

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var list = document.getElementById("doc-list");
    var filterBar = document.getElementById("doc-filters");
    if (!list || !window.DOCUMENTS_DATA) return;

    var categories = [];
    window.DOCUMENTS_DATA.forEach(function (d) {
      if (categories.indexOf(d.category) === -1) categories.push(d.category);
    });

    categories.forEach(function (cat, i) {
      var btn = document.createElement("button");
      btn.className = "filter-btn" + (i === 0 ? " active" : "");
      btn.textContent = cat;
      btn.addEventListener("click", function () {
        document.querySelectorAll("#doc-filters .filter-btn").forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        render(cat);
      });
      filterBar.appendChild(btn);
    });

    function render(filter) {
      list.innerHTML = "";
      window.DOCUMENTS_DATA
        .filter(function (d) { return d.category === filter; })
        .forEach(function (d) {
          var row = document.createElement("div");
          row.className = "doc-row";
          row.innerHTML =
            '<h3 class="doc-title">' + escapeHtml(d.title) + '</h3>' +
            '<p class="doc-desc">' + escapeHtml(d.description) + '</p>' +
            '<div class="doc-actions">' +
              '<a class="doc-action" href="' + d.file + '" target="_blank" rel="noopener" aria-label="Afficher le document">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + ICON_EYE + '</svg>' +
                '<span>Afficher</span>' +
              '</a>' +
              '<a class="doc-action" href="' + d.file + '" download aria-label="Télécharger le document">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + ICON_DOWNLOAD + '</svg>' +
                '<span>Télécharger</span>' +
              '</a>' +
            '</div>';
          list.appendChild(row);
        });
    }

    render(categories[0]);
  });
})();
