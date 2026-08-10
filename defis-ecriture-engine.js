/* =======================================================================
   DÉFIS — ÉCRITURE — moteur
   -----------------------------------------------------------------------
   Pas un quiz : tire un sujet au hasard dans la banque, l'élève écrit
   son texte dans une zone libre. Pas de correction automatique, pas de
   score.

   Deux briques ajoutées par-dessus l'écriture libre :

   1. "Envoyer mon texte au maître !" — envoie le texte (+ prénom +
      petit mot optionnel) via un formulaire Netlify Forms. L'adresse
      de destination n'apparaît nulle part dans ce fichier ni dans le
      HTML : elle se configure uniquement dans le tableau de bord
      Netlify (Site settings → Forms → Form notifications). Tant que le
      site n'est pas déployé, l'envoi échoue silencieusement (pas de
      serveur en local) — le texte reste quand même gardé sur
      l'appareil, rien n'est perdu.

   2. "Mes textes" — historique 100% local (localStorage) de ce que cet
      élève a écrit sur CET appareil. Aucune synchronisation : si le
      maître répond, ça se passe par email classique, pas dans cette
      liste (le site n'a pas de serveur pour faire remonter une réponse
      jusqu'ici).
   ======================================================================= */

(function () {
  "use strict";

  var LOG_KEY = "ecriture-mes-textes";
  var PRENOM_KEY = "ecriture-prenom";
  var MAX_ENTRIES = 30;

  function el(tag, className) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    return e;
  }

  function pick(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  /* ---------------- Stockage local (par appareil) ---------------- */

  function readLog() {
    try {
      var raw = window.localStorage.getItem(LOG_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveEntry(entry) {
    try {
      var list = readLog();
      list.unshift(entry);
      list = list.slice(0, MAX_ENTRIES);
      window.localStorage.setItem(LOG_KEY, JSON.stringify(list));
    } catch (e) {
      /* localStorage indisponible : le texte reste affiché à l'écran,
         mais ne sera pas retrouvable après un rechargement. */
    }
  }

  function getPrenom() {
    try { return window.localStorage.getItem(PRENOM_KEY) || ""; } catch (e) { return ""; }
  }

  function setPrenom(v) {
    try { window.localStorage.setItem(PRENOM_KEY, v); } catch (e) { /* ignore */ }
  }

  function formatDate(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("fr-CH", { day: "2-digit", month: "2-digit", year: "numeric" })
      + " à " + d.toLocaleTimeString("fr-CH", { hour: "2-digit", minute: "2-digit" });
  }

  /* ---------------- Envoi Netlify Forms (AJAX) ---------------- */

  function sendToNetlify(fields) {
    var body = Object.keys(fields).map(function (k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(fields[k]);
    }).join("&");
    return fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body
    });
  }

  /* ---------------- "Mes textes" (historique local) ---------------- */

  function buildLogSection() {
    var list = readLog();

    var wrap = el("div", "ecriture-log-wrap");
    var toggle = el("button", "btn btn-outline");
    toggle.type = "button";
    toggle.textContent = "Mes textes (" + list.length + ")";
    wrap.appendChild(toggle);

    var logEl = el("div", "ecriture-log");
    logEl.style.display = "none";

    if (!list.length) {
      var emptyP = el("p", "q-text");
      emptyP.style.color = "var(--text-muted)";
      emptyP.style.fontSize = "0.88rem";
      emptyP.textContent = "Tu n'as encore écrit aucun texte sur cet appareil.";
      logEl.appendChild(emptyP);
    } else {
      list.forEach(function (entry) {
        var details = document.createElement("details");
        details.className = "ecriture-log-item";

        var summary = document.createElement("summary");
        summary.className = "ecriture-log-summary";

        var badge = el("span", "ecriture-log-badge" + (entry.sent ? " sent" : " unsent"));
        badge.textContent = entry.sent ? "Envoyé" : "Non envoyé";
        summary.appendChild(badge);

        var summaryText = el("span");
        summaryText.textContent = entry.type + " — " + formatDate(entry.date);
        summary.appendChild(summaryText);

        details.appendChild(summary);

        var body = el("div", "ecriture-log-body");

        var consigneP = el("p", "q-text");
        consigneP.style.color = "var(--text-secondary)";
        consigneP.style.fontStyle = "italic";
        consigneP.textContent = entry.consigne;
        body.appendChild(consigneP);

        var texteP = el("p", "q-text");
        texteP.style.whiteSpace = "pre-wrap";
        texteP.textContent = entry.texte;
        body.appendChild(texteP);

        if (entry.commentaire) {
          var commentP = el("p", "q-text");
          commentP.style.marginTop = "10px";
          commentP.style.color = "var(--accent-gold)";
          commentP.textContent = "Petit mot envoyé : " + entry.commentaire;
          body.appendChild(commentP);
        }

        details.appendChild(body);
        logEl.appendChild(details);
      });
    }

    toggle.addEventListener("click", function () {
      var showing = logEl.style.display !== "none";
      logEl.style.display = showing ? "none" : "block";
      toggle.textContent = (showing ? "Mes textes (" : "Fermer mes textes (") + list.length + ")";
    });

    wrap.appendChild(logEl);
    return wrap;
  }

  /* ---------------- Écran principal ---------------- */

  function render(host) {
    host.innerHTML = "";
    var bank = window.ECRITURE_DATA || [];
    if (!bank.length) return;

    var sujet = pick(bank);

    var setEl = el("div", "quiz-set");

    var subjectLine = el("span", "quiz-subject");
    subjectLine.textContent = sujet.type;
    setEl.appendChild(subjectLine);

    var h2 = el("h2");
    h2.textContent = "Ton sujet du jour";
    setEl.appendChild(h2);

    var consigneEl = el("p", "q-text");
    consigneEl.style.fontSize = "1.1rem";
    consigneEl.style.marginBottom = "20px";
    consigneEl.textContent = sujet.consigne;
    setEl.appendChild(consigneEl);

    var textarea = document.createElement("textarea");
    textarea.rows = 12;
    textarea.placeholder = "Écris ton texte ici...";
    textarea.style.width = "100%";
    textarea.style.background = "rgba(255,255,255,0.02)";
    textarea.style.border = "1px solid var(--border-soft)";
    textarea.style.borderRadius = "var(--radius-sm)";
    textarea.style.color = "var(--text-primary)";
    textarea.style.padding = "14px";
    textarea.style.fontFamily = "inherit";
    textarea.style.fontSize = "0.96rem";
    textarea.style.resize = "vertical";
    textarea.style.boxSizing = "border-box";
    setEl.appendChild(textarea);

    var noteEl = el("p", "q-text");
    noteEl.style.marginTop = "10px";
    noteEl.style.color = "var(--text-muted)";
    noteEl.style.fontSize = "0.85rem";
    noteEl.textContent = "Rien n'est enregistré en ligne : ton texte reste uniquement sur cet appareil (cet ordinateur ou cette tablette), sauf si tu choisis de l'envoyer au maître ci-dessous.";
    setEl.appendChild(noteEl);

    /* ---- Bloc envoi au maître ---- */

    var sendBox = el("div", "ecriture-send-box");

    var sendTitle = el("p", "q-text");
    sendTitle.style.fontWeight = "600";
    sendTitle.style.marginBottom = "10px";
    sendTitle.textContent = "Envoyer mon texte au maître";
    sendBox.appendChild(sendTitle);

    var prenomInput = document.createElement("input");
    prenomInput.type = "text";
    prenomInput.className = "blank-input";
    prenomInput.style.width = "220px";
    prenomInput.style.marginBottom = "10px";
    prenomInput.placeholder = "Ton prénom";
    prenomInput.value = getPrenom();
    sendBox.appendChild(prenomInput);

    var commentInput = document.createElement("textarea");
    commentInput.rows = 2;
    commentInput.placeholder = "Un petit mot pour le maître (facultatif)";
    commentInput.style.width = "100%";
    commentInput.style.background = "rgba(255,255,255,0.02)";
    commentInput.style.border = "1px solid var(--border-soft)";
    commentInput.style.borderRadius = "var(--radius-sm)";
    commentInput.style.color = "var(--text-primary)";
    commentInput.style.padding = "10px";
    commentInput.style.fontFamily = "inherit";
    commentInput.style.fontSize = "0.9rem";
    commentInput.style.resize = "vertical";
    commentInput.style.boxSizing = "border-box";
    commentInput.style.marginBottom = "10px";
    commentInput.style.display = "block";
    sendBox.appendChild(commentInput);

    var sendBtn = el("button", "btn btn-primary");
    sendBtn.type = "button";
    sendBtn.textContent = "Envoyer mon texte au maître !";
    sendBox.appendChild(sendBtn);

    var sendFeedback = el("p", "q-feedback");
    sendFeedback.style.marginTop = "10px";
    sendBox.appendChild(sendFeedback);

    sendBtn.addEventListener("click", function () {
      var prenom = prenomInput.value.trim();
      var texte = textarea.value.trim();
      var commentaire = commentInput.value.trim();

      sendFeedback.classList.remove("show", "ok", "ko", "retry");

      if (!prenom || !texte) {
        sendFeedback.textContent = !prenom
          ? "Écris ton prénom avant d'envoyer."
          : "Écris ton texte avant de l'envoyer.";
        sendFeedback.classList.add("show", "retry");
        (prenom ? textarea : prenomInput).focus();
        return;
      }

      setPrenom(prenom);
      sendBtn.disabled = true;
      sendFeedback.textContent = "Envoi en cours...";
      sendFeedback.classList.add("show");

      var entry = {
        date: new Date().toISOString(),
        type: sujet.type,
        consigne: sujet.consigne,
        texte: texte,
        commentaire: commentaire,
        prenom: prenom,
        sent: false
      };

      sendToNetlify({
        "form-name": "texte-ecriture",
        prenom: prenom,
        "sujet-type": sujet.type,
        "sujet-consigne": sujet.consigne,
        texte: texte,
        commentaire: commentaire,
        "site-web": ""
      }).then(function (response) {
        if (!response.ok) throw new Error("Réponse non-OK");
        entry.sent = true;
        sendFeedback.textContent = "Envoyé ! Ton texte a été transmis au maître.";
        sendFeedback.classList.remove("retry");
        sendFeedback.classList.add("ok");
      }).catch(function () {
        entry.sent = false;
        sendFeedback.textContent = "Impossible d'envoyer pour l'instant (le site n'est peut-être pas encore en ligne, ou pas de connexion). Ton texte est gardé sur cet appareil dans « Mes textes », tu pourras réessayer plus tard.";
        sendFeedback.classList.remove("ok");
        sendFeedback.classList.add("retry");
      }).finally(function () {
        saveEntry(entry);
        sendBtn.disabled = false;
        var oldLog = setEl.querySelector(".ecriture-log-wrap");
        var freshLog = buildLogSection();
        if (oldLog) oldLog.replaceWith(freshLog);
      });
    });

    setEl.appendChild(sendBox);

    /* ---- Mes textes (historique local) ---- */
    setEl.appendChild(buildLogSection());

    /* ---- Actions ---- */

    var actionsRow = el("div", "conj-actions-row");
    actionsRow.style.display = "flex";
    actionsRow.style.gap = "10px";
    actionsRow.style.marginTop = "18px";

    var newBtn = el("button", "btn btn-outline");
    newBtn.textContent = "Nouveau sujet";
    newBtn.addEventListener("click", function () { render(host); });
    actionsRow.appendChild(newBtn);

    var defisBtn = el("a", "btn btn-outline");
    defisBtn.textContent = "Retour aux défis";
    defisBtn.href = "defis.html";
    actionsRow.appendChild(defisBtn);

    setEl.appendChild(actionsRow);

    host.appendChild(setEl);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var host = document.getElementById("ecriture-content");
    if (!host) return;
    render(host);
  });
})();
