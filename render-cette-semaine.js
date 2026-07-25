/* Les Gracieux — génère la carte "Cette semaine" de la page d'accueil
   à partir de cette-semaine.js. */

(function () {
  "use strict";

  var TYPES = {
devoir:          { label: "Devoirs",          icon: "book", color: "icon-blue" },
           devoir_mardi:    { label: "Devoirs mardi",    icon: "book", color: "icon-blue" },
           devoir_jeudi:    { label: "Devoirs jeudi",    icon: "book", color: "icon-blue" },
           devoir_vendredi: { label: "Devoirs vendredi", icon: "book", color: "icon-blue" },
           sortie:          { label: "Sorties / Événements", icon: "bus", color: "icon-green" },
           evenement:       { label: "Sorties / Événements", icon: "bus", color: "icon-green" },
           info:            { label: "Infos", icon: "info", color: "icon-neutral" }
  };

  var ICONS = {
    book: '<path d="M4 5.5c3-1 6-1 8 0 2-1 5-1 8 0v13c-3-1-6-1-8 0-2-1-5-1-8 0v-13z"/><path d="M12 5.5v13"/>',
    bus: '<rect x="3" y="6" width="18" height="11" rx="2"/><path d="M3 12h18"/><circle cx="7.5" cy="19" r="1.5"/><circle cx="16.5" cy="19" r="1.5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 8h.01"/><path d="M11 12h1v5h1"/>'
  };

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var host = document.getElementById("week-card");
    var data = window.CETTE_SEMAINE_DATA;
    if (!host || !data) return;

    var items = data.items || [];
function itemHtml(item) {
         var meta = TYPES[item.type] || TYPES.info;
         return (
                    '<div class="week-item">' +
                      '<span class="week-item-icon ' + meta.color + '">' +
                        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + ICONS[meta.icon] + '</svg>' +
                      '</span>' +
                      '<span class="week-item-body">' +
                        '<span class="week-item-label">' + meta.label + '</span>' +
                        '<p class="week-item-text">' + escapeHtml(item.text) + '</p>' +
                      '</span>' +
                    '</div>'
                  );
}

         var devoirItems = items.filter(function (item) { return item.type && item.type.indexOf("devoir") === 0; });
         var otherItems = items.filter(function (item) { return !item.type || item.type.indexOf("devoir") !== 0; });

         var rowsHtml = "";
         if (devoirItems.length) {
                  rowsHtml += '<div class="week-grid">' + devoirItems.map(itemHtml).join("") + '</div>';
         }
         if (otherItems.length) {
                  rowsHtml += '<div class="week-grid">' + otherItems.map(itemHtml).join("") + '</div>';
         }
         if (!rowsHtml) {
                  rowsHtml = '<p class="comment-empty">Rien de particulier cette semaine.</p>';
         }

         host.innerHTML =
                  '<div class="week-card-header">' +
                    '<h2 class="section-title"><span class="spark">✦</span> Cette semaine</h2>' +
                    (data.updated ? '<span class="week-updated">' + escapeHtml(data.updated) + '</span>' : '') +
                  '</div>' +
                  rowsHtml;
  });
})();
