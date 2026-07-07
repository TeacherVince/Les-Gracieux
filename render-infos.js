/* Les Gracieux — génère la page Infos pratiques à partir de infos-pratiques.js */

(function () {
  "use strict";

  var ICONS = {
    calendar: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 9.5h16"/><path d="M8 3v3"/><path d="M16 3v3"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
    star: '<path d="M12 3l2.5 5.5 6 .7-4.5 4 1.3 6-5.3-3-5.3 3 1.3-6-4.5-4 6-.7z"/>',
    bus: '<rect x="3" y="6" width="18" height="11" rx="2"/><path d="M3 12h18"/><circle cx="7.5" cy="19" r="1.5"/><circle cx="16.5" cy="19" r="1.5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 8h.01"/><path d="M11 12h1v5h1"/>'
  };

  document.addEventListener("DOMContentLoaded", function () {
    var host = document.getElementById("infos-list");
    if (!host || !window.INFOS_DATA) return;

    window.INFOS_DATA.forEach(function (section) {
      var el = document.createElement("div");
      el.className = "info-section";

      var iconPath = ICONS[section.icon] || ICONS.info;
      var html = '<h2><span class="info-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + iconPath + '</svg></span>' + section.title + '</h2>';
      html += '<ul>' + section.items.map(function (item) { return '<li>' + item + '</li>'; }).join('') + '</ul>';

      if (section.attachment) {
        html += '<div class="info-attachment"><a class="btn btn-outline" href="' + section.attachment.file + '" download>' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 19h16"/></svg>' +
          section.attachment.label + '</a></div>';
      }

      el.innerHTML = html;
      host.appendChild(el);
    });
  });
})();
