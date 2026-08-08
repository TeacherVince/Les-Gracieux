/* Les Gracieux — génère la médiathèque de vidéos Sciences & Histoire à
   partir de sciences-histoire-mediatheque-data.js.

   Fonctionnement :
   - 4 catégories fixes (Découvertes, Exploration, Temps, Inventions),
     chacune avec un compteur et un bouton pour la replier/déplier.
   - Une pseudo-catégorie "Mes favoris" apparaît en premier dès qu'au
     moins une vidéo a été mise en favori (étoile sur la carte), et
     disparaît sinon : rien à configurer.
   - Une recherche filtre les cartes en direct par titre au fur et à
     mesure de la saisie (pas de bouton "Rechercher").
   - Les favoris sont mémorisés dans le navigateur (localStorage), sans
     compte utilisateur : ils sont donc propres à cet ordinateur.
   - Contrairement aux médiathèques Français et Mathématiques, ces
     vidéos sont hébergées sur YouTube : chaque carte affiche sa vraie
     miniature et se lit directement au clic (aucun lecteur ne se
     charge tant que l'utilisateur n'a pas cliqué) ; une icône permet
     aussi de l'ouvrir directement sur YouTube dans un nouvel onglet.
   - Un bandeau "Commentaires" sous chaque carte se déplie pour afficher
     les commentaires approuvés (comments.js) et un formulaire d'envoi
     vers Netlify Forms, identique à celui des autres vidéos du site. */

(function () {
  "use strict";

  var FAVORITES_KEY = "lg-sciences-histoire-favoris";

  var CATEGORIES = [
    { key: "Découvertes", label: "Découvertes", icon: "🔬" },
    { key: "Exploration", label: "Exploration", icon: "🧭" },
    { key: "Temps", label: "Temps", icon: "⏳" },
    { key: "Inventions", label: "Inventions", icon: "💡" }
  ];

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function normalize(str) {
    return String(str)
      .toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  function getFavorites() {
    try {
      var raw = window.localStorage.getItem(FAVORITES_KEY);
      var list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

  function setFavorites(list) {
    try {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
    } catch (e) {
      /* localStorage indisponible (navigation privée, etc.) : on ignore. */
    }
  }

  function isFavorite(id, favorites) {
    return favorites.indexOf(id) !== -1;
  }

  function encodeForm(data) {
    return Object.keys(data)
      .map(function (key) { return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]); })
      .join("&");
  }

  var STAR_ICON =
    '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2.5l2.9 6.3 6.8.7-5.1 4.7 1.4 6.8L12 17.6l-6 3.4 1.4-6.8-5.1-4.7 6.8-.7z"/></svg>';

  var CHEVRON_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';

  var SEARCH_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>';

  var COMMENT_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';

  var YT_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>';

  var PLAY_ICON =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';

  document.addEventListener("DOMContentLoaded", function () {
    var host = document.getElementById("mediatheque-root");
    var data = window.SCIENCES_HISTOIRE_MEDIATHEQUE_DATA;
    if (!host || !data || !data.length) return;

    var searchInput = document.getElementById("mediatheque-search");
    var collapsed = {}; // état de repli par catégorie (mémoire en session uniquement)
    var openComments = {}; // état déplié/replié des commentaires par vidéo (mémoire en session uniquement)
    var allComments = window.COMMENTS_DATA || [];

    function commentsFor(id) {
      return allComments.filter(function (c) { return c.videoId === id; });
    }

    function cardHtml(video, favorites) {
      var active = isFavorite(video.id, favorites);
      var approved = commentsFor(video.id);
      var isCommentsOpen = !!openComments[video.id];
      var commentsListHtml = approved.length
        ? approved.map(function (c) {
            return '<div class="comment-item">' +
              '<div class="comment-meta">' + escapeHtml(c.name) + '</div>' +
              '<p class="comment-text">' + escapeHtml(c.text) + '</p>' +
              '</div>';
          }).join("")
        : '<p class="comment-empty">Aucun commentaire pour l\'instant.</p>';

      return (
        '<article class="media-card" data-search="' + escapeHtml(normalize(video.title)) + '">' +
          '<a class="video-card-yt-link" href="https://www.youtube.com/watch?v=' + encodeURIComponent(video.youtubeId) + '" target="_blank" rel="noopener" aria-label="Regarder « ' + escapeHtml(video.title) + ' » sur YouTube" title="Regarder sur YouTube">' +
            YT_ICON +
          '</a>' +
          '<button type="button" class="media-fav-btn' + (active ? " is-active" : "") + '" ' +
            'data-id="' + escapeHtml(video.id) + '" ' +
            'aria-pressed="' + (active ? "true" : "false") + '" ' +
            'aria-label="' + (active ? "Retirer" : "Ajouter") + ' « ' + escapeHtml(video.title) + ' » des favoris">' +
            STAR_ICON +
          '</button>' +
          '<h3 class="media-card-title">' + escapeHtml(video.title) + '</h3>' +
          '<div class="video-frame-wrap" data-youtube-id="' + escapeHtml(video.youtubeId) + '" data-video-title="' + escapeHtml(video.title) + '">' +
            '<button type="button" class="video-thumb-btn" aria-label="Regarder : ' + escapeHtml(video.title) + '">' +
              '<img src="https://i.ytimg.com/vi/' + encodeURIComponent(video.youtubeId) + '/hqdefault.jpg" alt="" loading="lazy">' +
              '<span class="video-play-icon">' + PLAY_ICON + '</span>' +
            '</button>' +
          '</div>' +
          '<button type="button" class="media-comments-toggle" data-id="' + escapeHtml(video.id) + '" aria-expanded="' + (isCommentsOpen ? "true" : "false") + '">' +
            COMMENT_ICON +
            '<span>Commentaires' + (approved.length ? ' (' + approved.length + ')' : '') + '</span>' +
            '<span class="media-comments-chevron">' + CHEVRON_ICON + '</span>' +
          '</button>' +
          '<div class="media-comments-panel"' + (isCommentsOpen ? "" : ' hidden') + '>' +
            '<div class="comment-list">' + commentsListHtml + '</div>' +
            '<form class="comment-form" data-video-id="' + escapeHtml(video.id) + '">' +
              '<input type="text" name="name" placeholder="Ton prénom" required maxlength="60">' +
              '<textarea name="message" placeholder="Ton commentaire" required maxlength="500"></textarea>' +
              '<input type="text" name="bot-field" class="honeypot-field" tabindex="-1" autocomplete="off">' +
              '<button type="submit" class="btn btn-outline">Envoyer le commentaire</button>' +
              '<p class="comment-form-status"></p>' +
            '</form>' +
          '</div>' +
        '</article>'
      );
    }

    function categorySectionHtml(key, label, icon, videos, favorites) {
      var isOpen = !collapsed[key];
      return (
        '<div class="media-category" data-category-key="' + escapeHtml(key) + '">' +
          '<button type="button" class="media-category-toggle" aria-expanded="' + (isOpen ? "true" : "false") + '">' +
            '<span class="media-category-name">' + icon + ' ' + escapeHtml(label) +
              ' <span class="media-category-count">(' + videos.length + ')</span></span>' +
            '<span class="media-category-chevron">' + CHEVRON_ICON + '</span>' +
          '</button>' +
          '<div class="media-category-grid"' + (isOpen ? "" : ' hidden') + '>' +
            videos.map(function (v) { return cardHtml(v, favorites); }).join("") +
          '</div>' +
        '</div>'
      );
    }

    function render() {
      var favorites = getFavorites();
      var query = normalize(searchInput ? searchInput.value.trim() : "");
      var html = "";

      // ---- Pseudo-catégorie "Mes favoris" ----
      if (favorites.length) {
        var favVideos = data.filter(function (v) { return isFavorite(v.id, favorites); });
        if (query) favVideos = favVideos.filter(function (v) { return normalize(v.title).indexOf(query) !== -1; });
        if (favVideos.length || !query) {
          html += categorySectionHtml("favoris", "Mes favoris", "⭐", favVideos, favorites);
        }
      }

      // ---- Catégories fixes ----
      CATEGORIES.forEach(function (cat) {
        var videos = data.filter(function (v) { return v.category === cat.key; });
        if (query) {
          videos = videos.filter(function (v) { return normalize(v.title).indexOf(query) !== -1; });
          if (!videos.length) return; // recherche active : catégorie sans résultat masquée
        }
        html += categorySectionHtml(cat.key, cat.label, cat.icon, videos, favorites);
      });

      host.innerHTML = html || '<p class="media-empty">Aucune vidéo ne correspond à cette recherche.</p>';
      bindInteractions();
    }

    function bindInteractions() {
      host.querySelectorAll(".media-category-toggle").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var section = btn.closest(".media-category");
          var key = section.getAttribute("data-category-key");
          var grid = section.querySelector(".media-category-grid");
          var nowOpen = grid.hasAttribute("hidden"); // sera ouvert après le clic
          collapsed[key] = !nowOpen;
          btn.setAttribute("aria-expanded", nowOpen ? "true" : "false");
          if (nowOpen) grid.removeAttribute("hidden");
          else grid.setAttribute("hidden", "");
        });
      });

      host.querySelectorAll(".media-fav-btn").forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          var id = btn.getAttribute("data-id");
          var favorites = getFavorites();
          var idx = favorites.indexOf(id);
          if (idx === -1) favorites.push(id);
          else favorites.splice(idx, 1);
          setFavorites(favorites);
          render();
        });
      });

      host.querySelectorAll(".media-comments-toggle").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var id = btn.getAttribute("data-id");
          openComments[id] = !openComments[id];
          render();
        });
      });

      host.querySelectorAll(".video-thumb-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var wrap = btn.closest(".video-frame-wrap");
          var youtubeId = wrap.getAttribute("data-youtube-id");
          var title = wrap.getAttribute("data-video-title");
          wrap.innerHTML =
            '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(youtubeId) + '?autoplay=1" ' +
            'title="' + title + '" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe>';
        });
      });

      host.querySelectorAll(".comment-form").forEach(function (form) {
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

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        collapsed = {}; // une recherche déplie tout : on repart d'un état ouvert
        render();
      });
    }

    render();
  });
})();
