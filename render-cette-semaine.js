/* Les Gracieux — génère les deux blocs "Informations de la semaine" et
   "Devoirs" de la page d'accueil à partir de cette-semaine.js. Le titre
   "Semaine du ... au ..." est calculé automatiquement à partir de la
   date du jour (lundi-vendredi de la semaine en cours) : rien à
   modifier manuellement pour ça. */

(function () {
  "use strict";

  var MOIS_FR = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre"
  ];

  var JOURS = [
    { key: "mardi", label: "Mardi" },
    { key: "mercredi", label: "Mercredi" },
    { key: "jeudi", label: "Jeudi" },
    { key: "vendredi", label: "Vendredi" }
  ];

  // Calcule "Semaine du 10 au 14 août 2026" (ou "du 31 août au
  // 4 septembre 2026" si la semaine chevauche deux mois) à partir de
  // la date du jour, en prenant le lundi et le vendredi de la semaine
  // en cours (le week-end reste rattaché à la semaine qui vient de
  // se terminer).
  function computeWeekLabel() {
    var today = new Date();
    var day = today.getDay(); // 0 = dimanche ... 6 = samedi
    var diffToMonday = day === 0 ? -6 : 1 - day;
    var monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);
    var friday = new Date(monday);
    friday.setDate(monday.getDate() + 4);

    var dM = monday.getDate(), mM = monday.getMonth(), yM = monday.getFullYear();
    var dF = friday.getDate(), mF = friday.getMonth(), yF = friday.getFullYear();

    if (yM !== yF) {
      return "Semaine du " + dM + " " + MOIS_FR[mM] + " " + yM + " au " + dF + " " + MOIS_FR[mF] + " " + yF;
    }
    if (mM !== mF) {
      return "Semaine du " + dM + " " + MOIS_FR[mM] + " au " + dF + " " + MOIS_FR[mF] + " " + yF;
    }
    return "Semaine du " + dM + " au " + dF + " " + MOIS_FR[mM] + " " + yF;
  }

  var TYPES = {
    sortie:   { label: "Sorties / Événements", icon: "bus", color: "icon-green" },
    materiel: { label: "À prévoir", icon: "bag", color: "icon-gold" },
    info:     { label: "Infos", icon: "info", color: "icon-neutral" }
  };

  var ICONS = {
    bus: '<rect x="3" y="6" width="18" height="11" rx="2"/><path d="M3 12h18"/><circle cx="7.5" cy="19" r="1.5"/><circle cx="16.5" cy="19" r="1.5"/>',
    bag: '<path d="M6 8V6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v2"/><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M3 13h18"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 8h.01"/><path d="M11 12h1v5h1"/>'
  };

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function infoItemHtml(item) {
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

  function renderInfoCard(host, infos) {
    var bodyHtml = infos.length
      ? '<div class="week-grid">' + infos.map(infoItemHtml).join("") + '</div>'
      : '<p class="comment-empty">Rien de particulier cette semaine.</p>';

    host.innerHTML =
      '<div class="week-card-header">' +
        '<h2 class="section-title"><span class="spark">✦</span> Informations de la semaine</h2>' +
        '<span class="week-updated">' + escapeHtml(computeWeekLabel()) + '</span>' +
      '</div>' +
      bodyHtml;
  }

  function devoirDayHtml(jour, items) {
    var bodyHtml = items && items.length
      ? '<ul class="devoirs-day-list">' + items.map(function (text) {
          return '<li>' + escapeHtml(text) + '</li>';
        }).join("") + '</ul>'
      : '<p class="devoirs-day-empty">Rien de prévu.</p>';

    return (
      '<div class="devoirs-day">' +
        '<h3 class="devoirs-day-title">' + jour.label + '</h3>' +
        bodyHtml +
      '</div>'
    );
  }

  function renderDevoirsCard(host, devoirs) {
    var gridHtml = '<div class="devoirs-grid">' +
      JOURS.map(function (jour) {
        return devoirDayHtml(jour, (devoirs && devoirs[jour.key]) || []);
      }).join("") +
    '</div>';

    host.innerHTML =
      '<div class="week-card-header">' +
        '<h2 class="section-title"><span class="spark">✦</span> Devoirs</h2>' +
      '</div>' +
      gridHtml;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var data = window.CETTE_SEMAINE_DATA;
    if (!data) return;

    var infoHost = document.getElementById("week-info-card");
    if (infoHost) renderInfoCard(infoHost, data.infos || []);

    var devoirsHost = document.getElementById("week-devoirs-card");
    if (devoirsHost) renderDevoirsCard(devoirsHost, data.devoirs || {});
  });
})();
