/* Les Gracieux — génère la page vidéos à partir de videos.js, regroupées
   par matière. Chaque vidéo affiche sa vraie miniature YouTube (aucun
   lecteur ne se charge tant que l'utilisateur n'a pas cliqué) et propose
   soit de la regarder directement sur la page, soit sur YouTube dans un
   nouvel onglet. Affiche aussi les commentaires approuvés (comments.js)
   et gère l'envoi de nouveaux commentaires vers Netlify Forms pour
   modération. */

(function () {
  "use strict";

  // Ordre d'affichage des matières. Une matière sans vidéo n'affiche
  // simplement pas de section : rien à faire pour la masquer.
  var CATEGORY_ORDER = ["Art", "Français", "Mathématiques", "Sciences & Histoire"];

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function encodeForm(data) {
    return Object.keys(data)
      .map(function (key) { return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]); })
      .join("&");
  }

  // Sert à donner un id stable à chaque section (ex. "video-art"), pour
  // que les pages de branches puissent créer un lien direct du type
  // videos.html#video-sciences-et-histoire.
  function slugify(str) {
    return String(str)
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/&/g, "et")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var container = document.getElementById("video-sections");
    if (!container || !window.VIDEOS_DATA) return;

    var allComments = window.COMMENTS_DATA || [];

    function commentsFor(videoId) {
      return allComments.filter(function (c) { return c.videoId === videoId; });
    }

    function videoCardHtml(v) {
      var approved = commentsFor(v.id);
      var commentsHtml = approved.length
        ? approved.map(function (c) {
            return '<div class="comment-item">' +
              '<div class="comment-meta">' + escapeHtml(c.name) + '</div>' +
              '<p class="comment-text">' + escapeHtml(c.text) + '</p>' +
              '</div>';
          }).join("")
        : '<p class="comment-empty">Aucun commentaire pour l\'instant.</p>';

      var descriptionHtml = v.description
        ? '<p>' + escapeHtml(v.description) + '</p>'
        : "";

      return (
        '<div class="video-card">' +
          '<div class="video-frame-wrap" data-youtube-id="' + escapeHtml(v.youtubeId) + '" data-video-title="' + escapeHtml(v.title) + '">' +
            '<button type="button" class="video-thumb-btn" aria-label="Regarder : ' + escapeHtml(v.title) + '">' +
              '<img src="https://i.ytimg.com/vi/' + encodeURIComponent(v.youtubeId) + '/hqdefault.jpg" alt="Miniature de la vidéo : ' + escapeHtml(v.title) + '" loading="lazy">' +
              '<span class="video-play-icon">' +
                '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>' +
              '</span>' +
            '</button>' +
          '</div>' +
          '<div class="video-meta">' +
            '<span class="video-tag">' + escapeHtml(v.category) + '</span>' +
            '<h3>' + escapeHtml(v.title) + '</h3>' +
            descriptionHtml +
            '<div class="video-actions">' +
              '<a class="btn btn-outline btn-sm" href="https://www.youtube.com/watch?v=' + encodeURIComponent(v.youtubeId) + '" target="_blank" rel="noopener">Regarder sur YouTube ↗</a>' +
            '</div>' +
          '</div>' +
          '<div class="video-comments">' +
            '<h4>Commentaires</h4>' +
            '<div class="comment-list">' + commentsHtml + '</div>' +
            '<form class="comment-form" data-video-id="' + escapeHtml(v.id) + '">' +
              '<input type="text" name="name" placeholder="Ton prénom" required maxlength="60">' +
              '<textarea name="message" placeholder="Ton commentaire" required maxlength="500"></textarea>' +
              '<input type="text" name="bot-field" class="honeypot-field" tabindex="-1" autocomplete="off">' +
              '<button type="submit" class="btn btn-outline">Envoyer le commentaire</button>' +
              '<p class="comment-form-status"></p>' +
            '</form>' +
          '</div>' +
        '</div>'
      );
    }

    function francaisShortcutSection() {
      var section = document.createElement("section");
      section.className = "video-section";
      section.id = "video-francais";
      section.innerHTML =
        '<h2 class="section-title"><span class="spark">✦</span> Français</h2>' +
        '<a class="mediatheque-shortcut" href="francais-mediatheque.html">' +
          '<div class="mediatheque-shortcut-text">' +
            '<h3>Médiathèque Français</h3>' +
            '<p>Grammaire, conjugaison, orthographe et vocabulaire : une bibliothèque de vidéos dédiée, avec recherche et favoris.</p>' +
          '</div>' +
          '<span class="card-arrow">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>' +
          '</span>' +
        '</a>';
      return section;
    }

    function render() {
      container.innerHTML = "";

      CATEGORY_ORDER.forEach(function (cat) {
        if (cat === "Français") {
          container.appendChild(francaisShortcutSection());
          return;
        }

        var videos = window.VIDEOS_DATA.filter(function (v) { return v.category === cat; });
        if (!videos.length) return; // pas de vidéo dans cette matière : pas de section

        var section = document.createElement("section");
        section.className = "video-section";
        section.id = "video-" + slugify(cat);
        section.innerHTML =
          '<h2 class="section-title"><span class="spark">✦</span> ' + escapeHtml(cat) + '</h2>' +
          '<div class="video-grid">' + videos.map(videoCardHtml).join("") + '</div>';
        container.appendChild(section);
      });

      bindThumbs();
      bindForms();
    }

    function bindThumbs() {
      container.querySelectorAll(".video-thumb-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var wrap = btn.closest(".video-frame-wrap");
          var youtubeId = wrap.getAttribute("data-youtube-id");
          var title = wrap.getAttribute("data-video-title");
          wrap.innerHTML =
            '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(youtubeId) + '?autoplay=1" ' +
            'title="' + title + '" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe>';
        });
      });
    }

    function bindForms() {
      container.querySelectorAll(".comment-form").forEach(function (form) {
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          var status = form.querySelector(".comment-form-status");
          var nameInput = form.querySelector('[name="name"]');
          var messageInput = form.querySelector('[name="message"]');
          var honeypot = form.querySelector('[name="bot-field"]').value;

          if (honeypot) {
            status.textContent = "Merci, ton commentaire a été envoyé pour validation.";
            status.className = "comment-form-status show ok";
            form.reset();
            return;
          }

          var payload = {
            "form-name": "video-comments",
            name: nameInput.value,
            video: form.dataset.videoId,
            message: messageInput.value,
            "bot-field": ""
          };

          fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encodeForm(payload)
          })
            .then(function () {
              status.textContent = "Merci ! Ton commentaire a été envoyé et sera visible après validation par l'enseignant.";
              status.className = "comment-form-status show ok";
              form.reset();
            })
            .catch(function () {
              status.textContent = "L'envoi a échoué. Réessaie un peu plus tard.";
              status.className = "comment-form-status show ko";
            });
        });
      });
    }

    render();
  });
})();
