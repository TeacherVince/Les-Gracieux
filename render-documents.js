/* Les Gracieux — génère la liste de documents d'une page de branche à
   partir de son fichier de données (ex. art-documents.js).

   Structure évolutive : en plus de la liste générale filtrée par
   catégorie (comportement historique, inchangé), un document peut
   optionnellement être rattaché à une des zones ci-dessous en lui
   ajoutant un champ dans son fichier de données :

   - dateAdded: "2026-08-09"  → apparaît dans "Documents récents"
     pendant 21 jours, puis retombe automatiquement dans sa zone
     normale (reference/revision/liste générale).
   - type: "reference"        → apparaît dans "Fiches de référence"
     (documents importants à garder sous la main toute l'année).
   - type: "revision"         → apparaît dans "Pour réviser"
     (exercices, fiches à retravailler).

   Tant qu'aucun document n'utilise ces champs, rien ne change : les
   trois zones restent masquées et la page se comporte exactement
   comme avant. Chaque zone ne s'affiche que si elle contient au moins
   un document, pour ne jamais laisser un bloc visiblement vide. */

(function () {
  "use strict";

  var ICON_EYE = '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/>';
  var ICON_DOWNLOAD = '<path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 19h16"/>';
  var RECENT_DAYS = 21;

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Même règle que sur Infos pratiques : file peut être soit le nom
  // d'un fichier déposé à la racine du dépôt, soit une adresse
  // complète vers un document externe (auquel cas il ne faut pas
  // l'encoder comme un simple nom de fichier).
  function docHref(file) {
    return /^https?:\/\//i.test(file) ? file : encodeURIComponent(file);
  }

  function isRecent(d) {
    if (!d.dateAdded) return false;
    var added = new Date(d.dateAdded + "T00:00:00");
    if (isNaN(added.getTime())) return false;
    var diffDays = (Date.now() - added.getTime()) / 86400000;
    return diffDays >= 0 && diffDays <= RECENT_DAYS;
  }

  function docRow(d) {
    var row = document.createElement("div");
    row.className = "doc-compact-row";
    row.innerHTML =
      '<a class="doc-icon-btn" href="' + docHref(d.file) + '" target="_blank" rel="noopener" aria-label="Afficher ' + escapeHtml(d.title) + '" title="Afficher">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + ICON_EYE + '</svg>' +
      '</a>' +
      '<a class="doc-icon-btn" href="' + docHref(d.file) + '" download aria-label="Télécharger ' + escapeHtml(d.title) + '" title="Télécharger">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + ICON_DOWNLOAD + '</svg>' +
      '</a>' +
      '<div class="doc-compact-info">' +
        '<h3 class="doc-compact-title">' + escapeHtml(d.title) + '</h3>' +
        '<p class="doc-compact-desc" title="' + escapeHtml(d.description || "") + '">' + escapeHtml(d.description || "") + '</p>' +
      '</div>';
    return row;
  }

  function fillZone(sectionId, hostId, docs) {
    var section = document.getElementById(sectionId);
    var host = document.getElementById(hostId);
    if (!section || !host) return;
    if (!docs.length) {
      section.style.display = "none";
      return;
    }
    host.innerHTML = "";
    docs.forEach(function (d) { host.appendChild(docRow(d)); });
    section.style.display = "";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var all = window.DOCUMENTS_DATA || [];
    var list = document.getElementById("doc-list");
    var filterBar = document.getElementById("doc-filters");
    var genericSection = document.getElementById("doc-generic-section");

    // ---- Répartition dans les zones évolutives ----
    var recent = [], reference = [], revision = [], rest = [];
    all.forEach(function (d) {
      if (isRecent(d)) recent.push(d);
      else if (d.type === "reference") reference.push(d);
      else if (d.type === "revision") revision.push(d);
      else rest.push(d);
    });

    fillZone("branch-recent-section", "branch-recent-list", recent);
    fillZone("branch-reference-section", "branch-reference-list", reference);
    fillZone("branch-revision-section", "branch-revision-list", revision);

    // ---- Liste générale existante (filtrée par catégorie) ----
    if (!list || !filterBar) return;

    if (!rest.length) {
      if (genericSection) genericSection.style.display = "none";
      return;
    }
    if (genericSection) genericSection.style.display = "";

    var categories = [];
    rest.forEach(function (d) {
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
      rest
        .filter(function (d) { return d.category === filter; })
        .forEach(function (d) { list.appendChild(docRow(d)); });
    }

    render(categories[0]);
  });
})();
