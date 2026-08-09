/* Les Gracieux — comportements communs à toutes les pages
   (fond étoilé + menu mobile + pied de page). Ce fichier n'a plus
   besoin d'être modifié pour le pied de page : la date "Dernière
   mise à jour" reflète la vraie date du dernier déploiement Netlify
   (voir build-info.js, régénéré automatiquement à chaque mise en
   ligne par la commande définie dans netlify.toml), pas la date du
   jour où quelqu'un consulte le site. Rien à faire manuellement. */

(function () {
  "use strict";

  var MOIS_FR = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre"
  ];

  // ---- Dernière mise à jour affichée en bas de chaque page ----
  // window.BUILD_DATE ("AAAA-MM-JJ") vient de build-info.js, régénéré à
  // chaque déploiement Netlify avec la vraie date du build : c'est donc
  // la date du dernier déploiement réel, pas la date du jour. Repli sur
  // la date du jour uniquement si build-info.js est absent ou invalide
  // (ex. tout premier aperçu local avant le premier déploiement).
  function computeLastUpdatedLabel() {
    var raw = window.BUILD_DATE;
    var date = raw ? new Date(raw + "T00:00:00") : null;
    if (!date || isNaN(date.getTime())) date = new Date();
    return MOIS_FR[date.getMonth()] + " " + date.getFullYear();
  }

  // ---- Badge "Nouveau" (capacité partagée, pas encore appliquée) ----
  // Un contenu (vidéo, document...) peut porter un champ optionnel
  // dateAdded: "2026-08-09". S'il a été ajouté il y a moins de
  // NEW_BADGE_DAYS jours, isContentNew() renvoie true et le petit badge
  // doré généré par newBadgeHtml() peut être inséré à côté de son titre.
  // Le badge disparaît tout seul après le délai, sans rien à faire
  // manuellement. Rien n'est tagué pour l'instant nulle part sur le
  // site : la capacité est prête, à utiliser au cas par cas.
  var NEW_BADGE_DAYS = 14;

  window.isContentNew = function (dateAdded) {
    if (!dateAdded) return false;
    var added = new Date(dateAdded + "T00:00:00");
    if (isNaN(added.getTime())) return false;
    var diffDays = (Date.now() - added.getTime()) / 86400000;
    return diffDays >= 0 && diffDays <= NEW_BADGE_DAYS;
  };

  window.newBadgeHtml = function () {
    return '<span class="badge-new">Nouveau</span>';
  };

  // ---- Préparation multilingue ----
  // Le site n'est qu'en français pour l'instant (aucun sélecteur de
  // langue n'est affiché). SITE_LANG existe déjà comme point d'accroche
  // pour une future traduction. Tout le contenu variable (vidéos,
  // documents, infos pratiques, Cette semaine, galerie, FAQ...) est déjà
  // centralisé dans des fichiers de données séparés (ex. videos.js,
  // infos-pratiques.js), ce qui rendra l'ajout d'une traduction bien
  // plus simple le moment venu : il suffira de dupliquer ces fichiers
  // par langue plutôt que de tout réécrire.
  window.SITE_LANG = "fr";

  // ---- Fond étoilé (canvas léger, discret) ----
  function initStarField() {
    var host = document.getElementById("star-field");
    if (!host) return;

    var canvas = document.createElement("canvas");
    host.appendChild(canvas);
    var ctx = canvas.getContext("2d");

    var stars = [];
    var STAR_COUNT = 140;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(window.innerHeight, document.body.scrollHeight);
    }

    function buildStars() {
      stars = [];
      for (var i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.3 + 0.3,
          baseAlpha: Math.random() * 0.3 + 0.12,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.007 + 0.0025
        });
      }
    }

    function draw(t) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var twinkle = Math.sin(t * s.speed + s.phase) * 0.2 + 0.8;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(240, 244, 255," + (s.baseAlpha * twinkle).toFixed(2) + ")";
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }

    resize();
    buildStars();
    window.addEventListener("resize", function () {
      resize();
      buildStars();
    });
    requestAnimationFrame(draw);
  }

  // ---- Menu mobile ----
  function initNavToggle() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector("nav.main-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  // ---- Pied de page : date de dernière mise à jour ----
  function initFooterUpdated() {
    var targets = document.querySelectorAll("[data-last-updated]");
    targets.forEach(function (el) {
      el.textContent = "Dernière mise à jour : " + computeLastUpdatedLabel();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initStarField();
    initNavToggle();
    initFooterUpdated();
  });
})();
