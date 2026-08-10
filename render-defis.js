/* =======================================================================
   DÉFIS — moteur d'affichage de la page defis.html
   -----------------------------------------------------------------------
   Lit window.DEFIS_DATA (voir defis-data.js) et construit les deux
   sections (Français / Mathématiques), chacune sous forme d'une grille
   de tuiles "sujet", dans le même langage visuel que le reste du site
   (.card / .card-icon).
   ======================================================================= */

(function () {
  "use strict";

  var ICONS = {
    pencil: '<path d="M4 20l1-4L16 5l3 3L8 19l-4 1z"/><path d="M14 7l3 3"/>',
    puzzle: '<path d="M7 4h4v2.2a1.6 1.6 0 0 0 2.6 1.2A1.6 1.6 0 0 1 16.2 9H19v4h-2.2a1.6 1.6 0 0 0 0 3.2H19v4h-4v-2.2a1.6 1.6 0 0 0-3.2 0V20H7v-4H4.8a1.6 1.6 0 0 1 0-3.2H7v-4H4.8A1.6 1.6 0 1 1 7 6.2V4z"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9.5"/>',
    book: '<path d="M4 5.5C6 4.5 9 4.3 12 5.6c3-1.3 6-1.1 8-.1v13c-2-1-5-1.2-8 .1-3-1.3-6-1.1-8-.1v-13z"/><path d="M12 5.6v13"/>',
    headphones: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3.2" y="14" width="4" height="6" rx="1.4"/><rect x="16.8" y="14" width="4" height="6" rx="1.4"/>',
    feather: '<path d="M19 5c-6 0-13 3-14 12 2-1 3-2 4-3M19 5c0 6-3 13-12 14M19 5l-9 9"/>',
    brain: '<path d="M9 4.5a3 3 0 0 0-3 3v.3A3 3 0 0 0 4.5 10.5a3 3 0 0 0 1.1 4.6A3 3 0 0 0 8.5 19a3 3 0 0 0 3-2.9V6.6A2.1 2.1 0 0 0 9 4.5z"/><path d="M15 4.5a3 3 0 0 1 3 3v.3a3 3 0 0 1 1.5 2.7 3 3 0 0 1-1.1 4.6A3 3 0 0 1 15.5 19a3 3 0 0 1-3-2.9V6.6a2.1 2.1 0 0 1 2.5-2.1z"/>',
    hash: '<path d="M9 3.5L7 20.5M17 3.5l-2 17M4 9h16M3.5 15h16"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="1.2"/><rect x="13" y="4" width="7" height="7" rx="1.2"/><rect x="4" y="13" width="7" height="7" rx="1.2"/><rect x="13" y="13" width="7" height="7" rx="1.2"/>',
    ruler: '<rect x="3.5" y="7" width="17" height="10" rx="1.4" transform="rotate(0 12 12)"/><path d="M7 7v3M10.5 7v2M14 7v3M17.5 7v2"/>',
    shape: '<path d="M12 4l3 5H9l3-5z"/><circle cx="7" cy="16" r="3.2"/><rect x="13.5" y="12.5" width="7" height="7" rx="1.2"/>',
    bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>'
  };

  function svgIcon(key) {
    var inner = ICONS[key] || ICONS.check;
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
  }

  function el(tag, className) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    return e;
  }

  function renderBranch(branchKey, branch, host) {
    var section = el("section", "section defis-branch");
    var wrap = el("div", "wrap");

    var title = el("h2", "section-title");
    title.innerHTML = '<span class="spark">✦</span> ' + branch.label;
    wrap.appendChild(title);

    var grid = el("div", "card-grid defis-grid");

    branch.subjects.forEach(function (subject) {
      var isReady = subject.status === "disponible";
      var tile = el(isReady ? "a" : "div", "card defis-tile" + (isReady ? "" : " defis-tile-soon"));
      if (isReady) tile.href = "defis-" + subject.id + ".html";

      var icon = el("div", "card-icon icon-" + subject.color);
      icon.innerHTML = svgIcon(subject.icon);
      tile.appendChild(icon);

      var h3 = el("h3");
      h3.textContent = subject.name;
      if (!isReady) {
        var badge = el("span", "badge-soon");
        badge.textContent = "Bientôt";
        h3.appendChild(badge);
      }
      tile.appendChild(h3);

      var p = el("p");
      p.textContent = subject.tagline;
      tile.appendChild(p);

      if (!isReady && subject.note) {
        var note = el("p", "defis-tile-note");
        note.textContent = subject.note;
        tile.appendChild(note);
      }

      grid.appendChild(tile);
    });

    wrap.appendChild(grid);
    section.appendChild(wrap);
    host.appendChild(section);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var host = document.getElementById("defis-content");
    if (!host || !window.DEFIS_DATA) return;
    renderBranch("francais", window.DEFIS_DATA.francais, host);
    renderBranch("mathematiques", window.DEFIS_DATA.mathematiques, host);
  });
})();
