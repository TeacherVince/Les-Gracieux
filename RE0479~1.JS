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
     nouvel onglet ; aucune vidéo n'est hébergée ou intégrée sur ce site. */

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

  var STAR_ICON =
    '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2.5l2.9 6.3 6.8.7-5.1 4.7 1.4 6.8L12 17.6l-6 3.4 1.4-6.8-5.1-4.7 6.8-.7z"/></svg>';

  var CHEVRON_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';

  var SEARCH_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>';

  document.addEventListener("DOMContentLoaded", function () {
    var host = document.getElementById("mediatheque-root");
    var data = window.FRANCAIS_MEDIATHEQUE_DATA;
    if (!host || !data || !data.length) return;

    var searchInput = document.getElementById("mediatheque-search");
    var collapsed = {}; // état de repli par catégorie (mémoire en session uniquement)

    function cardHtml(video, favorites) {
      var active = isFavorite(video.id, favorites);
      return (
        '<article class="media-card" data-search="' + escapeHtml(normalize(video.title)) + '">' +
          '<button type="button" class="media-fav-btn' + (active ? " is-active" : "") + '" ' +
            'data-id="' + escapeHtml(video.id) + '" ' +
            'aria-pressed="' + (active ? "true" : "false") + '" ' +
            'aria-label="' + (active ? "Retirer" : "Ajouter") + ' « ' + escapeHtml(video.title) + ' » des favoris">' +
            STAR_ICON +
          '</button>' +
          '<a class="media-card-link" href="' + escapeHtml(video.url) + '" target="_blank" rel="noopener">' +
            '<h3 class="media-card-title">' + escapeHtml(video.title) + '</h3>' +
            '<div class="media-thumb"><img src="' + escapeHtml(video.image) + '" alt="" loading="lazy"></div>' +
          '</a>' +
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
