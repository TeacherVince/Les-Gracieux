/* Les Gracieux — comportements communs à toutes les pages
   (fond étoilé + menu mobile + pied de page). Ce fichier n'a
   presque jamais besoin d'être modifié pour ajouter du contenu :
   la seule exception est la ligne LAST_UPDATED ci-dessous. */

(function () {
  "use strict";

  // ---- Dernière mise à jour affichée en bas de chaque page ----
  // Pour changer la date visible dans le pied de page de TOUT le site,
  // modifie uniquement le texte entre guillemets ci-dessous.
  var LAST_UPDATED = "juillet 2026";

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
          baseAlpha: Math.random() * 0.5 + 0.25,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.015 + 0.005
        });
      }
    }

    function draw(t) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var twinkle = Math.sin(t * s.speed + s.phase) * 0.35 + 0.65;
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
      el.textContent = "Dernière mise à jour : " + LAST_UPDATED;
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initStarField();
    initNavToggle();
    initFooterUpdated();
  });
})();
