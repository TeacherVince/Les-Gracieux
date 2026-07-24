/* Les Gracieux — génère la page Infos pratiques (grandes cartes + FAQ)
   à partir de infos-pratiques.js */

(function () {
  "use strict";

  var ICON_CALENDAR = '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 9.5h16"/><path d="M8 3v3"/><path d="M16 3v3"/>';
  var ICON_CLOCK = '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>';
  var ICON_PHONE = '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.79.65 2.65a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.43-1.22a2 2 0 0 1 2.11-.45c.86.31 1.75.53 2.65.65A2 2 0 0 1 22 16.92z"/>';
  var ICON_DOC = '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>';
  var ICON_EYE = '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/>';
  var ICON_DOWNLOAD = '<path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 19h16"/>';
  var ICON_CLOSE = '<path d="M18 6L6 18"/><path d="M6 6l12 12"/>';

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function iconSpan(path) {
    return '<span class="info-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + path + '</svg></span>';
  }

  function openLightbox(src, alt) {
    var overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";
    overlay.innerHTML =
      '<button type="button" class="lightbox-close" aria-label="Fermer">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + ICON_CLOSE + '</svg>' +
      '</button>' +
      '<img class="lightbox-image" src="' + src + '" alt="' + alt + '">';
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    function close() {
      overlay.remove();
      document.body.style.overflow = "";
    }
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay || e.target.closest(".lightbox-close")) close();
    });
    document.addEventListener("keydown", function onKey(e) {
      if (e.key === "Escape") {
        close();
        document.removeEventListener("keydown", onKey);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var data = window.INFOS_DATA;
    if (!data) return;

    var horaireHost = document.getElementById("infos-horaire");
    if (horaireHost) {
      if (data.horaire && data.horaire.image) {
        var alt = "Horaire de la classe";
        horaireHost.innerHTML =
          "<h2>" + iconSpan(ICON_CLOCK) + "Horaire</h2>" +
          '<button type="button" class="horaire-thumb-btn" aria-label="Agrandir l\'horaire">' +
            '<img class="horaire-thumb" src="' + escapeHtml(data.horaire.image) + '" alt="' + alt + '">' +
          '</button>';
        horaireHost.querySelector(".horaire-thumb-btn").addEventListener("click", function () {
          openLightbox(data.horaire.image, alt);
        });
      } else {
        horaireHost.style.display = "none";
      }
    }

    var agendaHost = document.getElementById("infos-agenda");
    if (agendaHost) {
      if (data.agenda && data.agenda.length) {
        agendaHost.innerHTML =
          "<h2>" + iconSpan(ICON_CALENDAR) + "Agenda de l'élève</h2>" +
          '<p class="info-card-note">Chaque rubrique renvoie à la page correspondante de l\'agenda officiel de l\'élève.</p>' +
          '<div class="agenda-grid">' +
          data.agenda.map(function (a) {
            return '<div class="agenda-item"><span class="agenda-label">' + escapeHtml(a.label) + '</span><span class="agenda-page">Page ' + escapeHtml(a.page) + '</span></div>';
          }).join('') +
          '</div>';
      } else {
        agendaHost.style.display = "none";
      }
    }

    var contactsHost = document.getElementById("infos-contacts");
    if (contactsHost) {
      if (data.contacts && data.contacts.length) {
        contactsHost.innerHTML =
          "<h2>" + iconSpan(ICON_PHONE) + "Contacts</h2>" +
          '<div class="contact-list">' +
          data.contacts.map(function (c) {
            return '<div class="contact-row"><span class="contact-label">' + escapeHtml(c.label) + '</span><span class="contact-value">' + escapeHtml(c.value) + '</span></div>';
          }).join('') +
          '</div>';
      } else {
        contactsHost.style.display = "none";
      }
    }

    var docsHost = document.getElementById("infos-documents");
    if (docsHost) {
      if (data.documents && data.documents.length) {
        docsHost.innerHTML =
          "<h2>" + iconSpan(ICON_DOC) + "Documents utiles</h2>" +
          '<div class="doc-list">' +
          data.documents.map(function (d) {
            return (
              '<div class="doc-row">' +
                '<h3 class="doc-title">' + escapeHtml(d.title) + '</h3>' +
                '<p class="doc-desc">' + escapeHtml(d.description || "") + '</p>' +
                '<div class="doc-actions">' +
                  '<a class="doc-action" href="' + encodeURIComponent(d.file) + '" target="_blank" rel="noopener" aria-label="Afficher le document">' +
                    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + ICON_EYE + '</svg>' +
                    '<span>Afficher</span>' +
                  '</a>' +
                  '<a class="doc-action" href="' + encodeURIComponent(d.file) + '" download aria-label="Télécharger le document">' +
                    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + ICON_DOWNLOAD + '</svg>' +
                    '<span>Télécharger</span>' +
                  '</a>' +
                '</div>' +
              '</div>'
            );
          }).join('') +
          '</div>';
      } else {
        docsHost.style.display = "none";
      }
    }

    var faqHost = document.getElementById("infos-faq");
    if (faqHost) {
      if (data.faq && data.faq.length) {
        faqHost.innerHTML =
          '<h3 class="faq-title">Questions fréquentes</h3>' +
          data.faq.map(function (f) {
            return '<div class="faq-item"><p class="faq-q">' + escapeHtml(f.q) + '</p><p class="faq-a">' + escapeHtml(f.a) + '</p></div>';
          }).join('');
      } else {
        faqHost.style.display = "none";
      }
    }
  });
})();
