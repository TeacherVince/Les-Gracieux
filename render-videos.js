/* Les Gracieux — génère la page vidéos à partir de videos.js,
   affiche les commentaires approuvés (comments.js) et gère l'envoi
   de nouveaux commentaires vers Netlify Forms pour modération. */

(function () {
  "use strict";

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

  document.addEventListener("DOMContentLoaded", function () {
    var grid = document.getElementById("video-grid");
    var filterBar = document.getElementById("video-filters");
    if (!grid || !window.VIDEOS_DATA) return;

    var allComments = window.COMMENTS_DATA || [];

    var categories = [];
    window.VIDEOS_DATA.forEach(function (v) {
      if (categories.indexOf(v.category) === -1) categories.push(v.category);
    });
    categories.sort(function (a, b) { return a.localeCompare(b, "fr"); });
    categories.unshift("Tout");

    categories.forEach(function (cat, i) {
      var btn = document.createElement("button");
      btn.className = "filter-btn" + (i === 0 ? " active" : "");
      btn.textContent = cat;
      btn.addEventListener("click", function () {
        document.querySelectorAll("#video-filters .filter-btn").forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        render(cat);
      });
      filterBar.appendChild(btn);
    });

    function commentsFor(videoId) {
      return allComments.filter(function (c) { return c.videoId === videoId; });
    }

    function render(filter) {
      grid.innerHTML = "";
      window.VIDEOS_DATA
        .filter(function (v) { return filter === "Tout" || v.category === filter; })
        .slice()
        .sort(function (a, b) { return a.category.localeCompare(b.category, "fr"); })
        .forEach(function (v) {
          var card = document.createElement("div");
          card.className = "video-card";

          var approved = commentsFor(v.id);
          var commentsHtml = approved.length
            ? approved.map(function (c) {
                return '<div class="comment-item">' +
                  '<div class="comment-meta">' + escapeHtml(c.name) + '</div>' +
                  '<p class="comment-text">' + escapeHtml(c.text) + '</p>' +
                '</div>';
              }).join("")
            : '<p class="comment-empty">Aucun commentaire pour l\'instant.</p>';

          card.innerHTML =
            '<div class="video-frame-wrap">' +
              '<iframe src="https://www.youtube-nocookie.com/embed/' + v.youtubeId + '" ' +
              'title="' + escapeHtml(v.title) + '" allowfullscreen loading="lazy"></iframe>' +
            '</div>' +
            '<div class="video-meta">' +
              '<span class="video-tag">' + escapeHtml(v.category) + '</span>' +
              '<h3>' + escapeHtml(v.title) + '</h3>' +
              '<p>' + escapeHtml(v.description) + '</p>' +
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
            '</div>';

          grid.appendChild(card);
        });

      bindForms();
    }

    function bindForms() {
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

    render("Tout");
  });
})();
