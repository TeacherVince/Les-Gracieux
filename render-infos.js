/* Les Gracieux — génère la page Infos pratiques (grandes cartes + FAQ)
   à partir de infos-pratiques.js */

(function () {
  "use strict";

  var ICON_CALENDAR = '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 9.5h16"/><path d="M8 3v3"/><path d="M16 3v3"/>';
  var ICON_PHONE = '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.79.65 2.65a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.43-1.22a2 2 0 0 1 2.11-.45c.86.31 1.75.53 2.65.65A2 2 0 0 1 22 16.92z"/>';
  var ICON_DOC = '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>';
  var ICON_DOWNLOAD = '<path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 19h16"/>';

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

  document.addEventListener("DOMContentLoaded", function () {
    var data = window.INFOS_DATA;
    if (!data) return;

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
                '<div class="doc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + ICON_DOC + '</svg></div>' +
                '<div class="doc-info"><h3>' + escapeHtml(d.title) + '</h3><p>' + escapeHtml(d.description || "") + '</p></div>' +
                '<a class="btn btn-outline" href="' + encodeURIComponent(d.file) + '" download>' +
                  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + ICON_DOWNLOAD + '</svg>' +
                  'Télécharger' +
                '</a>' +
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
