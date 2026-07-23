/* Les Gracieux — génère, sur chaque page de branche, la section
   "Aller plus loin" (liens vers les vidéos et les exercices de la
   matière, s'il en existe) et la section "Liens utiles" (à partir de
   LINKS_DATA, propre à chaque branche). Rien à modifier dans ce
   fichier pour ajouter du contenu : voir art-links.js (et équivalents)
   pour les liens utiles, videos.js pour les vidéos, et
   qcm-questions.js / texte-trous-questions.js / vrai-faux-questions.js
   pour les exercices. */

(function () {
  "use strict";

  var ARROW = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>';

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function slugify(str) {
    return String(str)
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/&/g, "et")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  // Une branche "Sciences & Histoire" doit aussi matcher les exercices
  // tagués simplement "Sciences" ou "Histoire".
  function subjectMatches(branche, subject) {
    if (!subject) return false;
    var s = subject.trim().toLowerCase();
    var parts = branche.toLowerCase().split("&").map(function (p) { return p.trim(); });
    return parts.indexOf(s) !== -1;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var branche = document.body.dataset.branch;
    if (!branche) return;
    var slug = slugify(branche);

    // ---- Aller plus loin : vidéos + exercices ----
    var extraSection = document.getElementById("branch-extra-section");
    var cardsHost = document.getElementById("branch-extra-links");
    if (extraSection && cardsHost) {
      var cards = "";

      // La branche Français a sa propre médiathèque dédiée (davantage de
      // vidéos, organisées par catégorie) : la carte "Vidéos" y renvoie
      // toujours, plutôt que vers la bibliothèque générale.
      if (branche === "Français") {
        cards +=
          '<a href="francais-mediatheque.html" class="card">' +
            '<div class="card-icon icon-violet">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M10 8.5l6 3.5-6 3.5v-7z" fill="currentColor" stroke="none"/></svg>' +
            '</div>' +
            '<h3>Vidéos</h3>' +
            '<p>Une médiathèque pour réviser grammaire, conjugaison, orthographe et vocabulaire.</p>' +
            '<span class="card-arrow">' + ARROW + '</span>' +
          '</a>';
      } else {
        var hasVideos = (window.VIDEOS_DATA || []).some(function (v) { return v.category === branche; });
        if (hasVideos) {
          cards +=
            '<a href="videos.html#video-' + slug + '" class="card">' +
              '<div class="card-icon icon-violet">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M10 8.5l6 3.5-6 3.5v-7z" fill="currentColor" stroke="none"/></svg>' +
              '</div>' +
              '<h3>Vidéos</h3>' +
              '<p>Regarder les vidéos de cette matière.</p>' +
              '<span class="card-arrow">' + ARROW + '</span>' +
            '</a>';
        }
      }

      var hasExercices = ["QCM_DATA", "BLANKS_DATA", "TF_DATA"].some(function (key) {
        return (window[key] || []).some(function (set) { return subjectMatches(branche, set.subject); });
      });
      if (hasExercices) {
        cards +=
          '<a href="exercices.html?matiere=' + encodeURIComponent(branche) + '" class="card">' +
            '<div class="card-icon icon-gold">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3 8-8"/><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9"/></svg>' +
            '</div>' +
            '<h3>Exercices</h3>' +
            '<p>S\'entraîner avec des exercices autocorrectifs.</p>' +
            '<span class="card-arrow">' + ARROW + '</span>' +
          '</a>';
      }

      cardsHost.innerHTML = cards;
      extraSection.style.display = cards ? "" : "none";
    }

    // ---- Liens utiles ----
    var linksSection = document.getElementById("branch-links-section");
    var linksHost = document.getElementById("branch-useful-links");
    if (linksSection && linksHost) {
      var links = window.LINKS_DATA || [];
      if (links.length) {
        linksHost.innerHTML =
          '<h2 class="section-title"><span class="spark">✦</span> Liens utiles</h2>' +
          '<div class="doc-list">' +
          links.map(function (l) {
            return (
              '<div class="doc-row">' +
                '<div class="doc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3h7v7"/><path d="M10 14L21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5"/></svg></div>' +
                '<div class="doc-info"><h3>' + escapeHtml(l.label) + '</h3></div>' +
                '<a class="btn btn-outline" href="' + escapeHtml(l.url) + '" target="_blank" rel="noopener">Ouvrir ↗</a>' +
              '</div>'
            );
          }).join('') +
          '</div>';
        linksSection.style.display = "";
      } else {
        linksSection.style.display = "none";
      }
    }
  });
})();
    }
  });
})();
