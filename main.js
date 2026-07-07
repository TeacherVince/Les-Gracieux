/* Les Gracieux — comportements communs à toutes les pages
   (fond étoilé + menu mobile). Ce fichier n'a jamais besoin
   d'être modifié pour ajouter du contenu. */

(function () {
  "use strict";

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

  document.addEventListener("DOMContentLoaded", function () {
    initStarField();
    initNavToggle();
  });
})();
