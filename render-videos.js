/* Les Gracieux — génère la page vidéos à partir de videos.js, regroupées
   par matière. Deux médiathèques (Français et Mathématiques) sont mises
   en avant tout en haut de la page, avant les vidéos YouTube classées
   par matière. Toutes les cartes (médiathèques et vidéos YouTube)
   partagent le même format compact : titre + miniature 16:9. Chaque
   vidéo YouTube affiche sa vraie miniature (aucun lecteur ne se charge
   tant que l'utilisateur n'a pas cliqué) ; une icône dans le coin permet
   de l'ouvrir directement sur YouTube dans un nouvel onglet. Affiche
   aussi les commentaires approuvés (comments.js) et gère l'envoi de
   nouveaux commentaires vers Netlify Forms pour modération. */

(function () {
  "use strict";

  // Ordre d'affichage préféré pour les matières connues ; toute autre
  // matière ajoutée dans videos.js s'affiche quand même, à la suite,
  // dans l'ordre où elle apparaît dans les données. Une matière sans
  // vidéo n'affiche simplement pas de section : rien à faire pour la
  // masquer. Arts, Français, Mathématiques et Sciences & Histoire ont
  // chacune leur propre médiathèque dédiée (voir
  // featuredMediathequesSection) ; ce fichier ne sert donc plus qu'aux
  // vidéos ponctuelles qu'on ne veut pas ranger dans une médiathèque.
  var CATEGORY_ORDER = ["Arts", "Français", "Mathématiques", "Sciences & Histoire"];

  function orderedCategories(videos) {
    var seen = {};
    var ordered = CATEGORY_ORDER.slice();
    ordered.forEach(function (c) { seen[c] = true; });
    videos.forEach(function (v) {
      if (!seen[v.category]) {
        seen[v.category] = true;
        ordered.push(v.category);
      }
    });
    return ordered;
  }

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
            var isTeacher = !!c.teacher;
            return '<div class="comment-item' + (isTeacher ? ' comment-item-teacher' : '') + '">' +
              '<div class="comment-meta">' +
                (isTeacher
                  ? '<span class="comment-meta-teacher-name">' + escapeHtml(c.name) + '</span>'
                  : escapeHtml(c.name)) +
              '</div>' +
              '<p class="comment-text">' + escapeHtml(c.text) + '</p>' +
              '</div>';
          }).join("")
        : '<p class="comment-empty">Aucun commentaire pour l\'instant.</p>';

      return (
        '<div class="video-card">' +
          '<a class="video-card-yt-link" href="https://www.youtube.com/watch?v=' + encodeURIComponent(v.youtubeId) + '" target="_blank" rel="noopener" aria-label="Regarder « ' + escapeHtml(v.title) + ' » sur YouTube" title="Regarder sur YouTube">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>' +
          '</a>' +
          '<h3 class="video-card-title">' + escapeHtml(v.title) +
            (window.isContentNew && window.isContentNew(v.dateAdded) ? window.newBadgeHtml() : "") +
          '</h3>' +
          '<div class="video-frame-wrap" data-youtube-id="' + escapeHtml(v.youtubeId) + '" data-video-title="' + escapeHtml(v.title) + '">' +
            '<button type="button" class="video-thumb-btn" aria-label="Regarder : ' + escapeHtml(v.title) + '">' +
              '<img src="https://i.ytimg.com/vi/' + encodeURIComponent(v.youtubeId) + '/hqdefault.jpg" alt="Miniature de la vidéo : ' + escapeHtml(v.title) + '" loading="lazy">' +
              '<span class="video-play-icon">' +
                '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>' +
              '</span>' +
            '</button>' +
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

    // Les 4 médiathèques sont mises en avant tout en haut de la page,
    // avant les vidéos YouTube classées par matière : de grands portails
    // visuels où l'image occupe l'essentiel de la carte (le titre et la
    // description sont posés directement sur l'image, sur un léger
    // dégradé assurant la lisibilité), pour donner l'impression de
    // choisir dans quelle bibliothèque entrer plutôt que de lire une
    // simple liste.
    function mediathequeCardHtml(opts) {
      return (
        '<a class="video-card mediatheque-card" href="' + escapeHtml(opts.href) + '">' +
          '<div class="mediatheque-card-visual">' +
            '<div class="mediatheque-card-bg ' + escapeHtml(opts.visualClass) + '"></div>' +
            '<span class="mediatheque-card-badge">Médiathèque</span>' +
          '</div>' +
          '<div class="mediatheque-card-text">' +
            '<h3>' + escapeHtml(opts.title) + '</h3>' +
            '<p>' + escapeHtml(opts.description) + '</p>' +
          '</div>' +
        '</a>'
      );
    }

    function featuredMediathequesSection() {
      var section = document.createElement("section");
      section.className = "video-section";
      section.id = "video-mediatheques";
      section.innerHTML =
        '<h2 class="section-title"><span class="spark">✦</span> Médiathèques</h2>' +
        '<div class="mediatheque-grid">' +
          mediathequeCardHtml({
            href: "francais-mediatheque.html",
            visualClass: "mediatheque-card-bg-francais",
            title: "Français",
            description: "Grammaire, conjugaison, orthographe et vocabulaire : une bibliothèque de vidéos dédiée, avec recherche et favoris."
          }) +
          mediathequeCardHtml({
            href: "mathematiques-mediatheque.html",
            visualClass: "mediatheque-card-bg-maths",
            title: "Mathématiques",
            description: "Numération, calcul, mesures et géométrie : une bibliothèque de vidéos dédiée, avec recherche et favoris."
          }) +
          mediathequeCardHtml({
            href: "arts-mediatheque.html",
            visualClass: "mediatheque-card-bg-arts",
            title: "Arts",
            description: "Musique, image, création et expression : une bibliothèque de vidéos dédiée, avec recherche et favoris."
          }) +
          mediathequeCardHtml({
            href: "sciences-histoire-mediatheque.html",
            visualClass: "mediatheque-card-bg-sciences",
            title: "Sciences & Histoire",
            description: "Découvertes, exploration, temps et inventions : une bibliothèque de vidéos dédiée, avec recherche et favoris."
          }) +
        '</div>';
      return section;
    }

    function render() {
      container.innerHTML = "";
      container.appendChild(featuredMediathequesSection());

      orderedCategories(window.VIDEOS_DATA).forEach(function (cat) {
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
