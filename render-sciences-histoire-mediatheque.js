/* Les Gracieux — génère la médiathèque de vidéos Sciences & Histoire à
   partir de sciences-histoire-mediatheque-data.js.

   Fonctionnement :
   - Les vidéos sont réparties par grand thème (univers, nature, eau,
     vivant, histoire). Au lieu de sections repliables, on utilise des
     pastilles de filtre (voir la barre au-dessus de la grille dans
     sciences-histoire-mediatheque.html) combinées à la recherche : un
     clic sur une pastille filtre la grille, la recherche filtre en plus
     par titre.
   - Les 2 pastilles sur chaque carte (favori + "voir en grand sur
     YouTube") suivent exactement les mêmes règles que dans les
     médiathèques Français et Mathématiques : même taille, mêmes
     positions, même infobulle au survol, et le même repli l'une sous
     l'autre quand le titre déborde sur 2 lignes.
   - Les favoris sont mémorisés dans le navigateur (localStorage), sans
     compte utilisateur : ils sont donc propres à cet ordinateur.
   - Chaque carte affiche sa vraie miniature YouTube et se lit
     directement au clic (aucun lecteur ne se charge tant que
     l'utilisateur n'a pas cliqué). Certaines vidéos (musées,
     institutions...) désactivent la lecture intégrée sur YouTube :
     pour celles-là (noEmbed: true dans les données), un clic sur la
     vignette ouvre directement YouTube dans un nouvel onglet au lieu
     d'essayer de lire la vidéo sur place.
   - Un bandeau "Commentaires" sous chaque carte se déplie pour afficher
     les commentaires approuvés (comments.js) et un formulaire d'envoi
     vers Netlify Forms, identique à celui des autres vidéos du site. */

(function () {
  "use strict";

  var FAVORITES_KEY = "lg-sciences-histoire-favoris";

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

  var COMMENT_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';

  // TEMPORAIRE — juste pour l'aperçu visuel du bouton "j'aime" (maquette
  // demandée par Vincent). Le vrai compteur partagé viendra d'une
  // Netlify Function une fois le rendu validé.
  var HEART_ICON =
    '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 20.5s-7.5-4.6-10-9.4C.6 7.7 2.3 4.5 5.6 4c2-.3 3.9.6 5 2.2C11.7 4.6 13.6 3.7 15.6 4c3.3.5 5 3.7 3.6 7.1-2.5 4.8-10 9.4-10 9.4z"/></svg>';

  var YT_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>';

  var PLAY_ICON =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';

  document.addEventListener("DOMContentLoaded", function () {
    var grid = document.getElementById("mediatheque-grid");
    var empty = document.getElementById("mediatheque-empty");
    var data = window.SCIENCES_HISTOIRE_MEDIATHEQUE_DATA;
    if (!grid || !data || !data.length) return;

    var searchInput = document.getElementById("mediatheque-search");
    var filterBtns = document.querySelectorAll(".filter-btn");
    var activeTheme = "all";
    var openComments = {}; // état déplié/replié des commentaires par vidéo (mémoire en session uniquement)
    var allComments = window.COMMENTS_DATA || [];
    var commentSeeds = {}; // décalage "j'aime" de départ fixé dans comments.js (motivation, purement cosmétique)
    allComments.forEach(function (c) { if (c.seed) commentSeeds[c.id] = c.seed; });
    var LIKE_ENDPOINT = "/.netlify/functions/like-comment";
    var likeCounts = {}; // compteurs réels (partagés entre tous les visiteurs), reçus de la Netlify Function

    function fetchLikeCounts() {
      fetch(LIKE_ENDPOINT)
        .then(function (r) { return r.json(); })
        .then(function (data) {
          likeCounts = data || {};
          render();
        })
        .catch(function () { /* compteurs indisponibles : on garde les valeurs par défaut (0) */ });
    }

    function commentsFor(id) {
      return allComments.filter(function (c) { return c.videoId === id; });
    }

    function cardHtml(video, favorites) {
      var active = isFavorite(video.id, favorites);
      var approved = commentsFor(video.id);
      var isCommentsOpen = !!openComments[video.id];
      var commentsListHtml = approved.length
        ? approved.map(function (c) {
            var isTeacher = !!c.teacher;
            var likeCount = (likeCounts[c.id] != null ? likeCounts[c.id] : 0) + (commentSeeds[c.id] || 0);
            return '<div class="comment-item' + (isTeacher ? ' comment-item-teacher' : '') + '">' +
              '<div class="comment-body">' +
                '<div class="comment-meta">' +
                  (isTeacher
                    ? '<span class="comment-meta-teacher-name">' + escapeHtml(c.name) + '</span>'
                    : escapeHtml(c.name)) +
                '</div>' +
                '<p class="comment-text">' + escapeHtml(c.text) + '</p>' +
              '</div>' +
              '<button type="button" class="comment-like-btn" data-comment-id="' + escapeHtml(c.id) + '" aria-label="Aimer ce commentaire">' +
                '<span class="comment-like-count">' + likeCount + '</span>' +
                HEART_ICON +
              '</button>' +
              '</div>';
          }).join("")
        : '<p class="comment-empty">Aucun commentaire pour l\'instant.</p>';

      return (
        '<article class="media-card has-fiche" data-theme="' + escapeHtml(video.theme) + '" data-search="' + escapeHtml(normalize(video.title)) + '">' +
          '<a class="media-fiche-btn" href="https://www.youtube.com/watch?v=' + encodeURIComponent(video.youtubeId) + '" target="_blank" rel="noopener" ' +
            'data-tooltip="Voir en grand sur YouTube" ' +
            'aria-label="Voir « ' + escapeHtml(video.title) + ' » en grand sur YouTube">' +
            YT_ICON +
          '</a>' +
          '<button type="button" class="media-fav-btn' + (active ? " is-active" : "") + '" ' +
            'data-id="' + escapeHtml(video.id) + '" ' +
            'data-tooltip="' + (active ? "Retirer des favoris" : "Ajouter aux favoris") + '" ' +
            'aria-pressed="' + (active ? "true" : "false") + '" ' +
            'aria-label="' + (active ? "Retirer" : "Ajouter") + ' « ' + escapeHtml(video.title) + ' » des favoris">' +
            STAR_ICON +
          '</button>' +
          '<h3 class="media-card-title">' + escapeHtml(video.title) + '</h3>' +
          '<div class="video-frame-wrap" data-youtube-id="' + escapeHtml(video.youtubeId) + '" data-video-title="' + escapeHtml(video.title) + '"' + (video.noEmbed ? ' data-no-embed="1"' : '') + '>' +
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
            '<form class="comment-form" data-video-id="' + escapeHtml(video.id) + '" data-video-title="' + escapeHtml(video.title) + '">' +
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

    function render() {
      var favorites = getFavorites();
      var query = normalize(searchInput ? searchInput.value.trim() : "");
      var visible = data.filter(function (v) {
        var matchesTheme = activeTheme === "all" || v.theme === activeTheme;
        var matchesQuery = !query || normalize(v.title).indexOf(query) !== -1;
        return matchesTheme && matchesQuery;
      });
      grid.innerHTML = visible.map(function (v) { return cardHtml(v, favorites); }).join("");
      if (empty) empty.hidden = visible.length !== 0;
      bindInteractions();
      applyTitleLayout();
    }

    // Les 2 icônes (favori + téléchargement) se placent côte à côte quand
    // le titre tient sur 1 ligne, ou l'une sous l'autre quand il déborde
    // sur 2 lignes (sinon elles chevauchent le texte ou débordent de la
    // carte). On mesure la hauteur réelle du titre après rendu pour le
    // savoir, plutôt que de deviner selon le nombre de mots.
    function applyTitleLayout() {
      grid.querySelectorAll(".media-card-title").forEach(function (titleEl) {
        var card = titleEl.closest(".media-card");
        if (!card) return;
        var cs = getComputedStyle(titleEl);
        var lineHeight = parseFloat(cs.lineHeight) || 20;
        var paddingV = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
        var oneLineHeight = lineHeight + paddingV;
        var isTwoLines = titleEl.getBoundingClientRect().height > oneLineHeight + 2;
        card.classList.toggle("title-two-lines", isTwoLines);
      });
    }

    function bindInteractions() {
      grid.querySelectorAll(".video-thumb-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var wrap = btn.closest(".video-frame-wrap");
          var youtubeId = wrap.getAttribute("data-youtube-id");
          var title = wrap.getAttribute("data-video-title");
          if (wrap.hasAttribute("data-no-embed")) {
            window.open("https://www.youtube.com/watch?v=" + encodeURIComponent(youtubeId), "_blank", "noopener");
            return;
          }
          wrap.innerHTML =
            '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(youtubeId) + '?autoplay=1" ' +
            'title="' + title + '" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe>';
        });
      });

      grid.querySelectorAll(".media-fav-btn").forEach(function (btn) {
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

      grid.querySelectorAll(".comment-like-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (btn.classList.contains("is-liked")) return; // déjà liké pendant cette visite
          var id = btn.getAttribute("data-comment-id");
          var countEl = btn.querySelector(".comment-like-count");
          var optimistic = (parseInt(countEl.textContent, 10) || 0) + 1;
          countEl.textContent = optimistic; // affiché tout de suite, sans attendre le serveur
          btn.classList.add("is-liked");
          likeCounts[id] = optimistic;

          fetch(LIKE_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ commentId: id })
          })
            .then(function (r) { return r.json(); })
            .then(function (data) {
              if (data && typeof data.likes === "number") {
                countEl.textContent = data.likes + (commentSeeds[id] || 0);
                likeCounts[id] = data.likes;
              }
            })
            .catch(function () { /* le like reste affiché même si l'envoi échoue */ });
        });
      });

      grid.querySelectorAll(".media-comments-toggle").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var id = btn.getAttribute("data-id");
          openComments[id] = !openComments[id];
          render();
        });
      });

      grid.querySelectorAll(".comment-form").forEach(function (form) {
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
            video: form.dataset.videoTitle + " (" + form.dataset.videoId + ")",
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

    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        activeTheme = btn.getAttribute("data-theme");
        render();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", render);
    }

    render();
    fetchLikeCounts();

    // Sur un premier chargement (police pas encore en cache), le rendu
    // initial peut mesurer les titres avec une police de repli le temps
    // du téléchargement de Playfair/Inter, ce qui fausse la détection
    // "1 ligne / 2 lignes" pour applyTitleLayout(). On remesure donc une
    // fois les polices effectivement prêtes.
    if (window.document.fonts && window.document.fonts.ready) {
      window.document.fonts.ready.then(function () { applyTitleLayout(); });
    }
  });
})();
