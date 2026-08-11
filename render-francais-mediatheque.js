/* Les Gracieux — génère la médiathèque de vidéos Français à partir de
   francais-mediatheque-data.js.

   Fonctionnement :
   - 4 catégories fixes (Grammaire, Conjugaison, Orthographe, Vocabulaire),
     chacune avec un compteur et un bouton pour la replier/déplier.
   - Une pseudo-catégorie "Mes favoris" apparaît en premier dès qu'au
     moins une vidéo a été mise en favori (étoile sur la carte), et
     disparaît sinon : rien à configurer.
   - Une recherche filtre les cartes en direct par titre au fur et à
     mesure de la saisie (pas de bouton "Rechercher").
   - Les favoris sont mémorisés dans le navigateur (localStorage), sans
     compte utilisateur : ils sont donc propres à cet ordinateur.
   - Chaque carte ouvre la leçon d'origine sur maitrelucas.fr dans un
     nouvel onglet ; aucune vidéo n'est hébergée ou intégrée sur ce site.
   - Un bandeau "Commentaires" sous chaque carte se déplie pour afficher
     les commentaires approuvés (comments.js) et un formulaire d'envoi
     vers Netlify Forms, identique à celui des vidéos YouTube. */

(function () {
  "use strict";

  var FAVORITES_KEY = "lg-francais-favoris";

  var CATEGORIES = [
    { key: "Grammaire", label: "Grammaire", icon: "📝" },
    { key: "Conjugaison", label: "Conjugaison", icon: "✍️" },
    { key: "Orthographe", label: "Orthographe", icon: "🖊️" },
    { key: "Vocabulaire", label: "Vocabulaire", icon: "📚" }
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

  var DOWNLOAD_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>';

  var CHEVRON_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';

  var SEARCH_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>';

  var COMMENT_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';

  document.addEventListener("DOMContentLoaded", function () {
    var host = document.getElementById("mediatheque-root");
    var data = window.FRANCAIS_MEDIATHEQUE_DATA;
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
        '<article class="media-card' + (video.ficheUrl ? " has-fiche" : "") + '" data-search="' + escapeHtml(normalize(video.title.replace(/\n/g, " "))) + '">' +
          (video.ficheUrl
            ? '<a class="media-fiche-btn" href="' + escapeHtml(video.ficheUrl) + '" target="_blank" rel="noopener" ' +
                'data-tooltip="Télécharger les exercices" ' +
                'aria-label="Télécharger la fiche d\'exercices « ' + escapeHtml(video.title) + ' »">' +
                DOWNLOAD_ICON +
              '</a>'
            : '') +
          '<button type="button" class="media-fav-btn' + (active ? " is-active" : "") + '" ' +
            'data-id="' + escapeHtml(video.id) + '" ' +
            'data-tooltip="' + (active ? "Retirer des favoris" : "Ajouter aux favoris") + '" ' +
            'aria-pressed="' + (active ? "true" : "false") + '" ' +
            'aria-label="' + (active ? "Retirer" : "Ajouter") + ' « ' + escapeHtml(video.title) + ' » des favoris">' +
            STAR_ICON +
          '</button>' +
          '<a class="media-card-link" href="' + escapeHtml(video.url) + '" target="_blank" rel="noopener">' +
            '<h3 class="media-card-title">' + escapeHtml(video.title) + '</h3>' +
            '<div class="media-thumb"><img src="' + escapeHtml(video.image) + '" alt="" loading="lazy"></div>' +
          '</a>' +
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
      applyTitleLayout();
    }

    // Les 2 icônes (favori + téléchargement) se placent côte à côte quand
    // le titre tient sur 1 ligne, ou l'une sous l'autre quand il déborde
    // sur 2 lignes (sinon elles chevauchent le texte ou débordent de la
    // carte). On mesure la hauteur réelle du titre après rendu pour le
    // savoir, plutôt que de deviner selon le nombre de mots.
    function applyTitleLayout() {
      host.querySelectorAll(".media-card-title").forEach(function (titleEl) {
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
