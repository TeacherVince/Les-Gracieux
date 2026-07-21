/* Les Gracieux — moteur des 3 modèles d'exercices autocorrectifs.
   Ce fichier lit le contenu dans data/qcm-questions.js,
   data/texte-trous-questions.js et data/vrai-faux-questions.js.
   Il n'a pas besoin d'être modifié pour ajouter des questions :
   modifiez uniquement les fichiers du dossier data/. */

(function () {
  "use strict";

  function el(tag, className, text) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  function addScoreBar(container) {
    var bar = el("div", "quiz-score");
    var label = el("span", "score-label", "0 réponse sur " + container.dataset.total + " essayée");
    var value = el("span", "score-value", "0 / " + container.dataset.total);
    bar.appendChild(label);
    bar.appendChild(value);
    container.appendChild(bar);
    return { bar: bar, label: label, value: value };
  }

  function updateScore(scoreEls, container, correctCount, answeredCount) {
    var total = container.dataset.total;
    scoreEls.label.textContent = answeredCount + " réponse(s) sur " + total + " essayée(s)";
    scoreEls.value.textContent = correctCount + " / " + total + " bonnes réponses";
  }

  /* ---------------- Filtrage par matière (?matiere=...) ---------------- */
  /* Permet aux pages de branches de créer un lien du type
     exercices.html?matiere=Sciences%20%26%20Histoire pour ne montrer
     que les exercices de cette matière (si aucun n'est encore associé,
     tous les exercices restent affichés, avec un message explicatif). */

  function getMatiereFilter() {
    try {
      var params = new URLSearchParams(window.location.search);
      return params.get("matiere");
    } catch (e) {
      return null;
    }
  }

  function subjectMatches(matiere, subject) {
    if (!matiere || !subject) return false;
    var s = subject.trim().toLowerCase();
    var parts = matiere.trim().toLowerCase().split("&").map(function (p) { return p.trim(); });
    return parts.indexOf(s) !== -1;
  }

  function filterSets(data, matiere) {
    if (!data) return data;
    if (!matiere) return data;
    var filtered = data.filter(function (set) { return subjectMatches(matiere, set.subject); });
    return filtered.length ? filtered : data;
  }

  function initFilterNote() {
    var note = document.getElementById("exercice-filter-note");
    var matiere = getMatiereFilter();
    if (!note || !matiere) return;

    var anyMatch = [window.QCM_DATA, window.BLANKS_DATA, window.TF_DATA].some(function (data) {
      return (data || []).some(function (set) { return subjectMatches(matiere, set.subject); });
    });

    note.textContent = anyMatch
      ? "Exercices filtrés pour : " + matiere + ". "
      : "Aucun exercice n'est encore associé à « " + matiere + " » : tous les exercices sont affichés. ";

    var link = document.createElement("a");
    link.href = "exercices.html";
    link.textContent = "Voir tous les exercices";
    note.appendChild(link);

    if (anyMatch) {
      var order = [
        { key: "QCM_DATA", target: "panel-qcm", tabSelector: '[data-target="panel-qcm"]' },
        { key: "BLANKS_DATA", target: "panel-blanks", tabSelector: '[data-target="panel-blanks"]' },
        { key: "TF_DATA", target: "panel-tf", tabSelector: '[data-target="panel-tf"]' }
      ];
      var firstMatch = order.filter(function (o) {
        return (window[o.key] || []).some(function (set) { return subjectMatches(matiere, set.subject); });
      })[0];
      if (firstMatch) {
        document.querySelectorAll(".exercise-tab").forEach(function (t) { t.classList.remove("active"); });
        document.querySelectorAll(".exercise-panel").forEach(function (p) { p.classList.remove("active"); });
        document.querySelector(firstMatch.tabSelector).classList.add("active");
        document.getElementById(firstMatch.target).classList.add("active");
      }
    }
  }

  /* ---------------- Onglets ---------------- */

  function initTabs() {
    var tabs = document.querySelectorAll(".exercise-tab");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.classList.remove("active"); });
        document.querySelectorAll(".exercise-panel").forEach(function (p) {
          p.classList.remove("active");
        });
        tab.classList.add("active");
        document.getElementById(tab.dataset.target).classList.add("active");
      });
    });
  }

  /* ---------------- Modèle 1 : QCM ---------------- */

  function renderQCM() {
    var host = document.getElementById("panel-qcm");
    if (!host || !window.QCM_DATA) return;

    var sets = filterSets(window.QCM_DATA, getMatiereFilter());
    sets.forEach(function (set) {
      var setEl = el("div", "quiz-set");
      setEl.dataset.total = set.questions.length;

      setEl.appendChild(el("span", "quiz-subject", set.subject));
      setEl.appendChild(el("h2", null, set.title));

      var correctCount = 0;
      var answeredCount = 0;
      var scoreEls;

      set.questions.forEach(function (q, qIndex) {
        var qEl = el("div", "quiz-question");
        qEl.appendChild(el("p", "q-text", q.question));

        var choicesEl = el("div", "quiz-choices");
        var feedbackEl = el("p", "q-feedback");

        q.choices.forEach(function (choiceText, cIndex) {
          var choiceEl = el("div", "quiz-choice", choiceText);
          choiceEl.addEventListener("click", function () {
            if (choicesEl.classList.contains("answered")) return;
            choicesEl.classList.add("answered");

            var isCorrect = cIndex === q.correct;
            choiceEl.classList.add(isCorrect ? "correct" : "incorrect");
            if (!isCorrect) {
              choicesEl.children[q.correct].classList.add("correct");
            }
            Array.prototype.forEach.call(choicesEl.children, function (c) {
              c.classList.add("disabled");
            });

            feedbackEl.textContent = isCorrect
              ? "Bonne réponse !"
              : "Pas tout à fait : la bonne réponse était « " + q.choices[q.correct] + " ».";
            feedbackEl.classList.add("show", isCorrect ? "ok" : "ko");

            answeredCount++;
            if (isCorrect) correctCount++;
            updateScore(scoreEls, setEl, correctCount, answeredCount);
          });
          choicesEl.appendChild(choiceEl);
        });

        qEl.appendChild(choicesEl);
        qEl.appendChild(feedbackEl);
        setEl.appendChild(qEl);
      });

      scoreEls = addScoreBar(setEl);
      host.appendChild(setEl);
    });
  }

  /* ---------------- Modèle 2 : Texte à trous ---------------- */

  function normalize(str) {
    return str.trim().toLowerCase();
  }

  function renderBlanks() {
    var host = document.getElementById("panel-blanks");
    if (!host || !window.BLANKS_DATA) return;

    var sets = filterSets(window.BLANKS_DATA, getMatiereFilter());
    sets.forEach(function (set) {
      var setEl = el("div", "quiz-set");
      setEl.dataset.total = set.questions.length;

      setEl.appendChild(el("span", "quiz-subject", set.subject));
      setEl.appendChild(el("h2", null, set.title));

      var inputs = [];

      set.questions.forEach(function (q) {
        var qEl = el("div", "quiz-question");
        var parts = q.text.split("___");
        var p = el("p", "q-text");
        p.appendChild(document.createTextNode(parts[0] || ""));

        var input = document.createElement("input");
        input.type = "text";
        input.className = "blank-input";
        input.setAttribute("aria-label", "Réponse");
        p.appendChild(input);

        p.appendChild(document.createTextNode(parts[1] || ""));
        qEl.appendChild(p);
        setEl.appendChild(qEl);

        inputs.push({ input: input, answer: q.answer });
      });

      var checkBtn = el("button", "btn btn-primary", "Vérifier mes réponses");
      var scoreEls = addScoreBar(setEl);
      setEl.insertBefore(checkBtn, scoreEls.bar);

      checkBtn.addEventListener("click", function () {
        var correctCount = 0;
        inputs.forEach(function (item) {
          var ok = normalize(item.input.value) === normalize(item.answer);
          item.input.classList.remove("correct", "incorrect");
          item.input.classList.add(ok ? "correct" : "incorrect");
          if (ok) correctCount++;
        });
        updateScore(scoreEls, setEl, correctCount, inputs.length);
      });

      host.appendChild(setEl);
    });
  }

  /* ---------------- Modèle 3 : Vrai ou faux ---------------- */

  function renderTF() {
    var host = document.getElementById("panel-tf");
    if (!host || !window.TF_DATA) return;

    var sets = filterSets(window.TF_DATA, getMatiereFilter());
    sets.forEach(function (set) {
      var setEl = el("div", "quiz-set");
      setEl.dataset.total = set.questions.length;

      setEl.appendChild(el("span", "quiz-subject", set.subject));
      setEl.appendChild(el("h2", null, set.title));

      var correctCount = 0;
      var answeredCount = 0;
      var scoreEls;

      set.questions.forEach(function (q) {
        var qEl = el("div", "quiz-question");
        qEl.appendChild(el("p", "q-text", q.statement));

        var tfEl = el("div", "tf-choices");
        var trueBtn = el("button", "tf-btn", "Vrai");
        var falseBtn = el("button", "tf-btn", "Faux");
        var feedbackEl = el("p", "q-feedback");

        function answer(choiceIsTrue, btnClicked, otherBtn) {
          if (tfEl.classList.contains("answered")) return;
          tfEl.classList.add("answered");

          var isCorrect = choiceIsTrue === q.answer;
          btnClicked.classList.add(isCorrect ? "quiz-choice correct" : "quiz-choice incorrect");
          if (!isCorrect) {
            otherBtn.classList.add("quiz-choice", "correct");
          }
          trueBtn.classList.add("disabled");
          falseBtn.classList.add("disabled");

          feedbackEl.textContent = isCorrect
            ? "Bonne réponse !"
            : "Pas tout à fait : l'affirmation était " + (q.answer ? "vraie" : "fausse") + ".";
          feedbackEl.classList.add("show", isCorrect ? "ok" : "ko");

          answeredCount++;
          if (isCorrect) correctCount++;
          updateScore(scoreEls, setEl, correctCount, answeredCount);
        }

        trueBtn.addEventListener("click", function () { answer(true, trueBtn, falseBtn); });
        falseBtn.addEventListener("click", function () { answer(false, falseBtn, trueBtn); });

        tfEl.appendChild(trueBtn);
        tfEl.appendChild(falseBtn);
        qEl.appendChild(tfEl);
        qEl.appendChild(feedbackEl);
        setEl.appendChild(qEl);
      });

      scoreEls = addScoreBar(setEl);
      host.appendChild(setEl);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTabs();
    renderQCM();
    renderBlanks();
    renderTF();
    initFilterNote();
  });
})();
