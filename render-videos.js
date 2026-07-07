/* Les Gracieux — génère la page vidéos à partir de data/videos.js */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var grid = document.getElementById("video-grid");
    var filterBar = document.getElementById("video-filters");
    if (!grid || !window.VIDEOS_DATA) return;

    var categories = ["Tout"];
    window.VIDEOS_DATA.forEach(function (v) {
      if (categories.indexOf(v.category) === -1) categories.push(v.category);
    });

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

    function render(filter) {
      grid.innerHTML = "";
      window.VIDEOS_DATA
        .filter(function (v) { return filter === "Tout" || v.category === filter; })
        .forEach(function (v) {
          var card = document.createElement("div");
          card.className = "video-card";
          card.innerHTML =
            '<div class="video-frame-wrap">' +
              '<iframe src="https://www.youtube-nocookie.com/embed/' + v.youtubeId + '" ' +
              'title="' + v.title.replace(/"/g, "&quot;") + '" allowfullscreen loading="lazy"></iframe>' +
            '</div>' +
            '<div class="video-meta">' +
              '<span class="video-tag">' + v.category + '</span>' +
              '<h3>' + v.title + '</h3>' +
              '<p>' + v.description + '</p>' +
            '</div>';
          grid.appendChild(card);
        });
    }

    render("Tout");
  });
})();
