/* Les Gracieux — génère la page téléchargements à partir de data/documents.js */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var list = document.getElementById("doc-list");
    var filterBar = document.getElementById("doc-filters");
    if (!list || !window.DOCUMENTS_DATA) return;

    var categories = ["Tout"];
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
        .filter(function (d) { return filter === "Tout" || d.category === filter; })
        .forEach(function (d) {
          var row = document.createElement("div");
          row.className = "doc-row";
          row.innerHTML =
            '<div class="doc-icon">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
                '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>' +
              '</svg>' +
            '</div>' +
            '<div class="doc-info">' +
              '<h3>' + d.title + '</h3>' +
              '<p>' + d.description + '</p>' +
            '</div>' +
            '<a class="btn btn-outline" href="' + d.file + '" download>' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 19h16"/></svg>' +
              'Télécharger' +
            '</a>';
          list.appendChild(row);
        });
    }

    render("Tout");
  });
})();
