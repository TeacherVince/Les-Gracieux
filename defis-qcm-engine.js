/* =======================================================================
   DÉFIS — moteur générique QCM
   -----------------------------------------------------------------------
   Réutilisable par tout sujet de type "choix multiples" (grammaire,
   vocabulaire, mesures, géométrie...). Tire N questions au hasard dans
   une banque, mélange l'ordre des questions ET la position de la bonne
   réponse à chaque partie, corrige au clic (comme les exercices déjà
   présents sur le site), enregistre le score via DefisScore.

   Banque attendue : [{ question, choices:[...], correct: index }, ...]
   ======================================================================= */

window.DefisQCM = (function () {
  "use strict";

  function el(tag, className) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    return e;
  }

  // Ajoute du texte dans un conteneur en transformant un marquage
  // **mot** en un vrai <u>mot</u> souligné (sans passer par innerHTML,
  // pour rester sûr même si le texte contenait des caractères spéciaux).
  function appendWithUnderline(container, text) {
    var parts = String(text).split(/\*\*(.+?)\*\*/g);
    parts.forEach(function (part, i) {
      if (part === "") return;
      if (i % 2 === 1) {
        var u = document.createElement("u");
        u.textContent = part;
        container.appendChild(u);
      } else {
        container.appendChild(document.createTextNode(part));
      }
    });
  }

  // Construit le paragraphe de question. La consigne reste en texte
  // normal ; la phrase/l'extrait entre guillemets « ... » est mis en
  // valeur avec un style distinct (italique, couleur plus douce) pour
  // qu'on distingue au premier coup d'œil la consigne de la question.
  function buildQuestionEl(questionText, number) {
    var p = el("p", "q-text");
    if (number) {
      var numEl = el("span", "q-number");
      numEl.textContent = number + ".";
      p.appendChild(numEl);
    }
    var parts = String(questionText).split(/(«[^»]*»)/g);
    parts.forEach(function (part) {
      if (part === "") return;
      if (part.charAt(0) === "«") {
        var quote = el("span", "q-quote");
        appendWithUnderline(quote, part);
        p.appendChild(quote);
      } else {
        appendWithUnderline(p, part);
      }
    });
    return p;
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

      var correctCount = 0;
      var answeredCount = 0;
      var scoreBar = el("div", "quiz-score");
      var scoreLabel = el("span", "score-label");
      scoreLabel.textContent = "0 réponse sur " + picked.length + " essayée";
      var scoreValue = el("span", "score-value");
      scoreValue.textContent = "0 / " + picked.length;
      scoreBar.appendChild(scoreLabel);
      scoreBar.appendChild(scoreValue);

      picked.forEach(function (item, index) {
        var shuffled = window.DefisRandom.shuffleChoices(item.choices, item.correct);

        var qEl = el("div", "quiz-question");
        qEl.appendChild(buildQuestionEl(item.question, index + 1));

        var choicesEl = el("div", "quiz-choices");
        var feedbackEl = el("p", "q-feedback");

        shuffled.choices.forEach(function (choiceText, cIndex) {
          var choiceEl = el("div", "quiz-choice");
          choiceEl.textContent = choiceText;
          choiceEl.addEventListener("click", function () {
            if (choicesEl.classList.contains("answered")) return;
            choicesEl.classList.add("answered");

            var isCorrect = cIndex === shuffled.correctIndex;
            choiceEl.classList.add(isCorrect ? "correct" : "incorrect");
            if (!isCorrect) {
              choicesEl.children[shuffled.correctIndex].classList.add("correct");
            }
            Array.prototype.forEach.call(choicesEl.children, function (c) { c.classList.add("disabled"); });

            feedbackEl.textContent = isCorrect
              ? "Bonne réponse !"
              : "Pas tout à fait : la bonne réponse était « " + shuffled.choices[shuffled.correctIndex] + " ».";
            feedbackEl.classList.add("show", isCorrect ? "ok" : "ko");

            answeredCount++;
            if (isCorrect) correctCount++;
            scoreLabel.textContent = answeredCount + " réponse(s) sur " + picked.length + " essayée(s)";
            scoreValue.textContent = correctCount + " / " + picked.length;

            if (answeredCount === picked.length && window.DefisScore) {
              window.DefisScore.record(gameId, correctCount, picked.length);
            }
          });
          choicesEl.appendChild(choiceEl);
        });

        qEl.appendChild(choicesEl);
        qEl.appendChild(feedbackEl);
        setEl.appendChild(qEl);
      });

      setEl.appendChild(scoreBar);

      var actionsRow = el("div", "conj-actions-row");
      actionsRow.style.display = "flex";
      actionsRow.style.gap = "10px";
      actionsRow.style.marginTop = "18px";

      var replayBtn = el("button", "btn btn-outline");
      replayBtn.textContent = "Nouvelle partie";
      replayBtn.addEventListener("click", render);
      actionsRow.appendChild(replayBtn);

      var defisBtn = el("a", "btn btn-outline");
      defisBtn.textContent = "Retour aux défis";
      defisBtn.href = "defis.html";
      actionsRow.appendChild(defisBtn);

      setEl.appendChild(actionsRow);

      host.appendChild(setEl);
    }

    render();
  }

  return { mount: mount };
})();
