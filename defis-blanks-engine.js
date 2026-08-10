/* =======================================================================
   DÉFIS — moteur générique "texte à trous" / réponse à écrire
   -----------------------------------------------------------------------
   Réutilisable par tout sujet où l'élève tape une réponse (orthographe,
   numération, opérations, résolution de problèmes...). Tire N questions
   au hasard dans une banque, correction groupée au clic sur "Vérifier",
   avertit si des réponses sont oubliées (ne compte jamais un oubli
   comme une erreur), enregistre le score via DefisScore.

   Banque attendue : [{ prompt, answer, acceptable:[...] (optionnel) }, ...]
   "prompt" peut contenir "___" pour un texte à trous inséré dans la
   phrase, sinon la question est affichée telle quelle avec un champ à
   côté.
   ======================================================================= */

window.DefisBlanks = (function () {
  "use strict";

  function el(tag, className) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    return e;
  }

  function normalize(str) {
    return String(str).trim().toLowerCase().replace(/\s+/g, " ");
  }

  var DIFFICULTY_LABELS = { facile: "Facile", moyen: "Moyen" };

  // Petit badge optionnel ("Facile" / "Moyen" / "Difficile") affiché
  // juste après le numéro de question, quand la banque fournit un champ
  // item.difficulty. Sert à prévenir l'élève avant un calcul plus corsé
  // (ex. Problèmes) plutôt que de lisser tous les exercices au même niveau.
  function appendDifficultyBadge(container, item) {
    if (!item.difficulty || !DIFFICULTY_LABELS[item.difficulty]) return;
    var badge = el("span", "q-difficulty q-difficulty-" + item.difficulty);
    badge.textContent = DIFFICULTY_LABELS[item.difficulty];
    container.appendChild(badge);
  }

  function mount(containerId, opts) {
    var host = document.getElementById(containerId);
    if (!host) return;

    var bank = opts.bank;
    var count = Math.min(opts.count || 10, bank.length);
    var gameId = opts.gameId;
    var title = opts.title || "À toi de jouer";
    var subjectLabel = opts.subjectLabel || "";

    function render() {
      host.innerHTML = "";
      var picked = window.DefisRandom.sample(bank, count);

      var setEl = el("div", "quiz-set");
      setEl.dataset.total = picked.length;

      var subjectLine = el("span", "quiz-subject");
      subjectLine.textContent = subjectLabel;
      setEl.appendChild(subjectLine);

      var h2 = el("h2");
      h2.textContent = title;
      setEl.appendChild(h2);

      var inputs = [];

      // Bloc "à côté de la phrase à trou" : propositions cliquables (4
      // choix) au lieu d'un champ libre. Utilisé quand item.choices est
      // fourni (ex. Orthographe, pour éviter les fautes de frappe et les
      // homophones à double lecture possible). Sinon, on garde le champ
      // texte libre habituel (numération, opérations, problèmes...).
      function buildChoiceBlank(item, qEl, numEl) {
        var p = el("p", "q-text");
        p.appendChild(numEl);
        appendDifficultyBadge(p, item);
        var parts = item.prompt.split("___");
        p.appendChild(document.createTextNode(parts[0] || ""));
        var blankMark = el("span", "blank-placeholder");
        blankMark.textContent = "……";
        p.appendChild(blankMark);
        p.appendChild(document.createTextNode(parts[1] || ""));
        qEl.appendChild(p);

        var choicesEl = el("div", "blank-choices");
        var choices = window.DefisRandom.shuffle(item.choices.slice());
        var selectedValue = null;
        var selectedBtn = null;
        var locked = false;

        choices.forEach(function (choiceText) {
          var choiceEl = el("button", "blank-choice");
          choiceEl.type = "button";
          choiceEl.textContent = choiceText;
          choiceEl.addEventListener("click", function () {
            if (locked) return;
            if (selectedBtn) selectedBtn.classList.remove("selected");
            Array.prototype.forEach.call(choicesEl.children, function (btn) { btn.classList.remove("retry"); });
            choiceEl.classList.add("selected");
            selectedBtn = choiceEl;
            selectedValue = choiceText;
            choicesEl.classList.remove("missing");
            blankMark.textContent = choiceText;
            blankMark.classList.remove("retry");
          });
          choicesEl.appendChild(choiceEl);
        });

        qEl.appendChild(choicesEl);
        var feedbackEl = el("p", "q-feedback");
        qEl.appendChild(feedbackEl);
        setEl.appendChild(qEl);

        inputs.push({
          item: item,
          feedbackEl: feedbackEl,
          attempts: 0,
          finalized: false,
          isMissing: function () { return !selectedValue; },
          getValue: function () { return selectedValue; },
          markMissing: function () { choicesEl.classList.add("missing"); },
          clearMissing: function () { choicesEl.classList.remove("missing"); },
          markRetry: function () {
            if (selectedBtn) selectedBtn.classList.add("retry");
            blankMark.classList.add("retry");
          },
          finalize: function (ok, correctText) {
            locked = true;
            choicesEl.classList.add("answered");
            Array.prototype.forEach.call(choicesEl.children, function (btn) {
              btn.classList.add("disabled");
              btn.classList.remove("retry");
              if (btn.textContent === correctText) btn.classList.add("correct");
              else if (btn === selectedBtn) btn.classList.add("incorrect");
            });
            blankMark.classList.remove("retry");
            blankMark.textContent = selectedValue;
            blankMark.classList.add(ok ? "correct" : "incorrect");
          }
        });
      }

      function buildTextBlank(item, qEl, numEl) {
        if (item.prompt.indexOf("___") !== -1) {
          var parts = item.prompt.split("___");
          var p = el("p", "q-text");
          p.appendChild(numEl);
          appendDifficultyBadge(p, item);
          p.appendChild(document.createTextNode(parts[0] || ""));
          var input = document.createElement("input");
          input.type = "text";
          input.className = "blank-input";
          input.setAttribute("aria-label", "Réponse");
          p.appendChild(input);
          p.appendChild(document.createTextNode(parts[1] || ""));
          qEl.appendChild(p);
          var feedbackEl1 = el("p", "q-feedback");
          qEl.appendChild(feedbackEl1);
          setEl.appendChild(qEl);
          inputs.push({
            item: item,
            feedbackEl: feedbackEl1,
            attempts: 0,
            finalized: false,
            isMissing: function () { return input.value.trim() === ""; },
            getValue: function () { return input.value; },
            markMissing: function () { input.classList.add("missing"); },
            clearMissing: function () { input.classList.remove("missing"); },
            markRetry: function () {
              input.classList.remove("correct", "incorrect");
              input.classList.add("retry");
              input.focus();
              input.select();
            },
            finalize: function (ok) {
              input.classList.remove("retry");
              input.classList.add(ok ? "correct" : "incorrect");
              input.disabled = true;
            },
            focus: function () { input.focus(); }
          });
        } else {
          var p2 = el("p", "q-text");
          p2.appendChild(numEl);
          appendDifficultyBadge(p2, item);
          p2.appendChild(document.createTextNode(item.prompt));
          qEl.appendChild(p2);
          var input2 = document.createElement("input");
          input2.type = "text";
          input2.className = "blank-input";
          input2.setAttribute("aria-label", "Réponse");
          qEl.appendChild(input2);
          var feedbackEl2 = el("p", "q-feedback");
          qEl.appendChild(feedbackEl2);
          setEl.appendChild(qEl);
          inputs.push({
            item: item,
            feedbackEl: feedbackEl2,
            attempts: 0,
            finalized: false,
            isMissing: function () { return input2.value.trim() === ""; },
            getValue: function () { return input2.value; },
            markMissing: function () { input2.classList.add("missing"); },
            clearMissing: function () { input2.classList.remove("missing"); },
            markRetry: function () {
              input2.classList.remove("correct", "incorrect");
              input2.classList.add("retry");
              input2.focus();
              input2.select();
            },
            finalize: function (ok) {
              input2.classList.remove("retry");
              input2.classList.add(ok ? "correct" : "incorrect");
              input2.disabled = true;
            },
            focus: function () { input2.focus(); }
          });
        }
      }

      picked.forEach(function (item, index) {
        var qEl = el("div", "quiz-question");
        var numEl = el("span", "q-number");
        numEl.textContent = (index + 1) + ".";

        if (item.choices && item.choices.length) {
          buildChoiceBlank(item, qEl, numEl);
        } else {
          buildTextBlank(item, qEl, numEl);
        }
      });

      var checkBtn = el("button", "btn btn-primary");
      checkBtn.textContent = "Vérifier mes réponses";
      setEl.appendChild(checkBtn);

      var missingWarning = el("p", "q-feedback conj-missing-warning");
      missingWarning.style.display = "none";
      setEl.appendChild(missingWarning);

      var scoreBar = el("div", "quiz-score");
      var scoreLabel = el("span", "score-label");
      scoreLabel.textContent = "0 réponse sur " + picked.length + " essayée";
      var scoreValue = el("span", "score-value");
      scoreValue.textContent = "0 / " + picked.length;
      scoreBar.appendChild(scoreLabel);
      scoreBar.appendChild(scoreValue);
      setEl.appendChild(scoreBar);

      var actionsRow = el("div", "conj-actions-row");
      actionsRow.style.display = "none";
      actionsRow.style.gap = "10px";
      actionsRow.style.marginTop = "14px";

      var replayBtn = el("button", "btn btn-outline");
      replayBtn.textContent = "Nouvelle partie";
      actionsRow.appendChild(replayBtn);

      var defisBtn = el("a", "btn btn-outline");
      defisBtn.textContent = "Retour aux défis";
      defisBtn.href = "defis.html";
      actionsRow.appendChild(defisBtn);

      setEl.appendChild(actionsRow);

      // Chaque bonne/mauvaise réponse a droit à un deuxième essai avant
      // d'être comptée comme fausse : au 1er essai raté, on entoure
      // l'erreur en orange et on invite à réessayer (sans compter de
      // point négatif) ; ce n'est qu'au 2e essai raté que la réponse est
      // définitivement marquée fausse et verrouillée.
      var correctCount = 0;

      checkBtn.addEventListener("click", function () {
        var active = inputs.filter(function (i) { return !i.finalized; });

        active.forEach(function (i) { i.clearMissing(); });
        var emptyItems = active.filter(function (i) { return i.isMissing(); });
        if (emptyItems.length) {
          emptyItems.forEach(function (i) { i.markMissing(); });
          missingWarning.textContent = emptyItems.length === 1
            ? "Il te manque une réponse : complète-la avant de valider (repère-la en orange)."
            : "Il te manque " + emptyItems.length + " réponses : complète-les avant de valider (repères en orange).";
          missingWarning.classList.remove("show", "ok", "ko");
          missingWarning.style.display = "block";
          missingWarning.classList.add("show");
          if (emptyItems[0].focus) emptyItems[0].focus();
          return;
        }
        missingWarning.style.display = "none";
        missingWarning.classList.remove("show");

        active.forEach(function (i) {
          var userVal = normalize(i.getValue());
          var accepted = [i.item.answer].concat(i.item.acceptable || []).map(normalize);
          var ok = accepted.indexOf(userVal) !== -1;

          if (ok) {
            i.finalized = true;
            i.finalize(true, i.item.answer);
            i.feedbackEl.textContent = "Bonne réponse !";
            i.feedbackEl.classList.remove("show", "ok", "ko", "retry");
            i.feedbackEl.classList.add("show", "ok");
            correctCount++;
          } else if (i.attempts === 0) {
            i.attempts = 1;
            i.markRetry();
            i.feedbackEl.textContent = "Ce n'est pas ça, réessaye !";
            i.feedbackEl.classList.remove("show", "ok", "ko", "retry");
            i.feedbackEl.classList.add("show", "retry");
          } else {
            i.finalized = true;
            i.finalize(false, i.item.answer);
            i.feedbackEl.textContent = "La bonne réponse est : " + i.item.answer;
            i.feedbackEl.classList.remove("show", "ok", "ko", "retry");
            i.feedbackEl.classList.add("show", "ko");
          }
        });

        var finalizedCount = inputs.filter(function (i) { return i.finalized; }).length;
        scoreLabel.textContent = finalizedCount + " réponse(s) sur " + picked.length + " essayée(s)";
        scoreValue.textContent = correctCount + " / " + picked.length;

        if (finalizedCount === picked.length) {
          checkBtn.disabled = true;
          actionsRow.style.display = "flex";
          if (window.DefisScore) {
            window.DefisScore.record(gameId, correctCount, picked.length);
          }
        } else {
          checkBtn.textContent = "Vérifier à nouveau";
        }
      });

      replayBtn.addEventListener("click", render);

      host.appendChild(setEl);
    }

    render();
  }

  return { mount: mount };
})();
