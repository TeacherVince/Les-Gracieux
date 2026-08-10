/* =======================================================================
   DÉFIS — CALCUL MENTAL — moteur (calcul rapide + livrets chronométrés)
   -----------------------------------------------------------------------
   Deux modes :
   1. "Calcul rapide" — questions +/- générées à la volée (opérations
      vérifiées par calcul, aucun risque d'erreur), sans chrono strict.
      Les multiplications sont laissées aux Livrets (mode 2), qui s'en
      occupent déjà.
   2. "Livrets" — tables de multiplication (1 à 12), question par
      question, chronométrées (4 à 7 secondes réglables, ou temps libre
      choisi par l'élève, ou sans chrono).
   Aucune banque Excel n'est nécessaire ici : tout est calculé, pas rédigé.
   ======================================================================= */

(function () {
  "use strict";

  function el(tag, className) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    return e;
  }

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /* ---------------- Génération des questions ---------------- */

  function genQuickQuestion() {
    var ops = ["+", "-"];
    var op = ops[randInt(0, 1)];
    var a, b, answer, text;
    if (op === "+") {
      a = randInt(10, 89); b = randInt(10, 99 - a);
      answer = a + b; text = a + " + " + b;
    } else {
      a = randInt(20, 99); b = randInt(1, a);
      answer = a - b; text = a + " - " + b;
    }
    return { text: text + " = ?", answer: String(answer) };
  }

  function genLivretQuestions(tables) {
    var qs = [];
    tables.forEach(function (t) {
      for (var i = 1; i <= 12; i++) {
        qs.push({ text: t + " x " + i + " = ?", answer: String(t * i) });
      }
    });
    return window.DefisRandom.shuffle(qs);
  }

  /* ---------------- Écran de réglages ---------------- */

  function renderSettings(host, onStart) {
    host.innerHTML = "";
    var wrap = el("div", "quiz-set");

    var h2 = el("h2");
    h2.textContent = "Calcul mental";
    wrap.appendChild(h2);

    var modeLabel = el("p", "q-text");
    modeLabel.style.fontWeight = "600";
    modeLabel.textContent = "Mode de jeu";
    wrap.appendChild(modeLabel);

    var modeRow = el("div", "exercise-tabs");
    var modes = [
      { id: "rapide", label: "Calcul rapide (+ et -)" },
      { id: "livrets", label: "Livrets (tables x)" }
    ];
    var selectedMode = "rapide";
    var optionsZone = el("div");

    function renderOptionsZone() {
      optionsZone.innerHTML = "";
      if (selectedMode !== "livrets") return;

      var tableLabel = el("p", "q-text");
      tableLabel.style.marginTop = "16px";
      tableLabel.style.fontWeight = "600";
      tableLabel.textContent = "Table(s) à réviser (sélection multiple)";
      optionsZone.appendChild(tableLabel);

      var selectedTables = { 2: true };
      var tableButtons = {};

      function syncTableButtons() {
        for (var k = 1; k <= 12; k++) {
          if (tableButtons[k]) {
            tableButtons[k].classList.toggle("active", !!selectedTables[k]);
          }
        }
      }

      // Présélection "Livrets 1 à 10" : les 10 tables à maîtriser d'ici
      // la fin de l'année, en un clic plutôt que de cocher une par une.
      var presetRow = el("div", "exercise-tabs");
      var presetBtn = el("button", "exercise-tab exercise-tab-preset");
      presetBtn.textContent = "Livrets 1 à 10";
      presetBtn.addEventListener("click", function () {
        selectedTables = {};
        for (var k = 1; k <= 10; k++) selectedTables[k] = true;
        syncTableButtons();
      });
      presetRow.appendChild(presetBtn);
      optionsZone.appendChild(presetRow);

      var tableRow = el("div", "exercise-tabs");
      for (var t = 1; t <= 12; t++) {
        (function (t) {
          var btn = el("button", "exercise-tab" + (t === 2 ? " active" : ""));
          btn.textContent = "Table de " + t;
          btn.addEventListener("click", function () {
            var isActive = btn.classList.contains("active");
            var count = Object.keys(selectedTables).length;
            if (isActive && count === 1) return;
            if (isActive) { btn.classList.remove("active"); delete selectedTables[t]; }
            else { btn.classList.add("active"); selectedTables[t] = true; }
          });
          tableButtons[t] = btn;
          tableRow.appendChild(btn);
        })(t);
      }
      optionsZone.appendChild(tableRow);
      optionsZone.dataset.getTables = "1";
      optionsZone._getTables = function () {
        return Object.keys(selectedTables).map(Number);
      };

      var timerLabel = el("p", "q-text");
      timerLabel.style.marginTop = "16px";
      timerLabel.style.fontWeight = "600";
      timerLabel.textContent = "Temps par question";
      optionsZone.appendChild(timerLabel);

      var timerRow = el("div", "exercise-tabs");
      var timerChoices = [4, 5, 6, 7, 10, 0]; /* 0 = illimité */
      var selectedTimer = 5;
      timerChoices.forEach(function (sec, i) {
        var btn = el("button", "exercise-tab" + (sec === 5 ? " active" : ""));
        btn.textContent = sec === 0 ? "Illimité" : sec + " s";
        btn.addEventListener("click", function () {
          selectedTimer = sec;
          timerRow.querySelectorAll(".exercise-tab").forEach(function (b) { b.classList.remove("active"); });
          btn.classList.add("active");
          customInput.value = "";
        });
        timerRow.appendChild(btn);
      });
      optionsZone.appendChild(timerRow);

      var customWrap = el("p", "q-text");
      customWrap.style.marginTop = "10px";
      customWrap.appendChild(document.createTextNode("Ou choisis ton propre temps (secondes) : "));
      var customInput = document.createElement("input");
      customInput.type = "number";
      customInput.min = "1";
      customInput.max = "60";
      customInput.className = "blank-input";
      customInput.style.width = "80px";
      customInput.addEventListener("input", function () {
        if (customInput.value) {
          selectedTimer = parseInt(customInput.value, 10) || 5;
          timerRow.querySelectorAll(".exercise-tab").forEach(function (b) { b.classList.remove("active"); });
        }
      });
      customWrap.appendChild(customInput);
      optionsZone.appendChild(customWrap);

      optionsZone._getTimer = function () { return selectedTimer; };
    }

    modes.forEach(function (m, i) {
      var btn = el("button", "exercise-tab" + (i === 0 ? " active" : ""));
      btn.textContent = m.label;
      btn.addEventListener("click", function () {
        selectedMode = m.id;
        modeRow.querySelectorAll(".exercise-tab").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        renderOptionsZone();
      });
      modeRow.appendChild(btn);
    });
    wrap.appendChild(modeRow);
    wrap.appendChild(optionsZone);

    var startBtn = el("button", "btn btn-primary");
    startBtn.style.marginTop = "24px";
    startBtn.textContent = "Commencer";
    startBtn.addEventListener("click", function () {
      if (selectedMode === "rapide") {
        onStart({ mode: "rapide" });
      } else {
        var tables = optionsZone._getTables ? optionsZone._getTables() : [2];
        var timer = optionsZone._getTimer ? optionsZone._getTimer() : 5;
        onStart({ mode: "livrets", tables: tables, timer: timer });
      }
    });
    wrap.appendChild(startBtn);

    host.appendChild(wrap);
  }

  /* ---------------- Écran de jeu (question par question) ---------------- */

  function renderGame(host, settings) {
    host.innerHTML = "";

    var questions = settings.mode === "livrets"
      ? genLivretQuestions(settings.tables)
      : (function () { var arr = []; for (var i = 0; i < 15; i++) arr.push(genQuickQuestion()); return arr; })();

    var timerSeconds = settings.mode === "livrets" ? settings.timer : 0;

    var setEl = el("div", "quiz-set");
    var subjectLine = el("span", "quiz-subject");
    subjectLine.textContent = settings.mode === "livrets"
      ? "Calcul mental — Livrets (table" + (settings.tables.length > 1 ? "s" : "") + " de " + settings.tables.join(", ") + ")"
      : "Calcul mental — Calcul rapide";
    setEl.appendChild(subjectLine);

    var h2 = el("h2");
    h2.textContent = "À toi de jouer";
    setEl.appendChild(h2);

    var progressEl = el("p", "quiz-progress");
    setEl.appendChild(progressEl);

    var qEl = el("div", "quiz-question");
    var qText = el("p", "q-text");
    qText.style.fontSize = "1.4rem";
    qEl.appendChild(qText);

    var timerBar = el("div");
    timerBar.style.height = "6px";
    timerBar.style.borderRadius = "3px";
    timerBar.style.background = "rgba(255,255,255,0.08)";
    timerBar.style.overflow = "hidden";
    timerBar.style.marginBottom = "14px";
    var timerFill = el("div");
    timerFill.style.height = "100%";
    timerFill.style.width = "100%";
    timerFill.style.background = "var(--accent-gold)";
    timerFill.style.transition = "width 0.1s linear";
    timerBar.appendChild(timerFill);
    qEl.appendChild(timerBar);

    var input = document.createElement("input");
    input.type = "text";
    input.className = "blank-input";
    input.style.width = "140px";
    input.style.fontSize = "1.2rem";
    qEl.appendChild(input);

    var validateBtn = el("button", "btn btn-primary");
    validateBtn.textContent = "Valider";
    validateBtn.style.marginLeft = "10px";
    qEl.appendChild(validateBtn);

    var feedbackEl = el("p", "q-feedback");
    qEl.appendChild(feedbackEl);

    setEl.appendChild(qEl);

    var scoreBar = el("div", "quiz-score");
    var scoreLabel = el("span", "score-label");
    var scoreValue = el("span", "score-value");
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
    var backBtn = el("button", "btn btn-outline");
    backBtn.textContent = "Retour aux réglages";
    actionsRow.appendChild(backBtn);
    var defisBtn = el("a", "btn btn-outline");
    defisBtn.textContent = "Retour aux défis";
    defisBtn.href = "defis.html";
    actionsRow.appendChild(defisBtn);
    setEl.appendChild(actionsRow);

    host.appendChild(setEl);

    var index = 0;
    var correctCount = 0;
    var missed = [];
    var intervalId = null;

    function clearTimer() {
      if (intervalId) { clearInterval(intervalId); intervalId = null; }
    }

    function normalize(str) { return String(str).trim().toLowerCase().replace(/\s+/g, " "); }

    function nextQuestion() {
      clearTimer();
      if (index >= questions.length) {
        finish();
        return;
      }
      var q = questions[index];
      progressEl.textContent = "Question " + (index + 1) + " / " + questions.length;
      qText.textContent = q.text;
      input.value = "";
      input.classList.remove("correct", "incorrect");
      feedbackEl.classList.remove("show", "ok", "ko");
      feedbackEl.textContent = "";
      input.disabled = false;
      validateBtn.disabled = false;
      input.focus();

      if (timerSeconds > 0) {
        timerBar.style.display = "block";
        var elapsed = 0;
        timerFill.style.width = "100%";
        intervalId = setInterval(function () {
          elapsed += 0.1;
          var pct = Math.max(0, 100 - (elapsed / timerSeconds) * 100);
          timerFill.style.width = pct + "%";
          if (elapsed >= timerSeconds) {
            clearTimer();
            submit(true);
          }
        }, 100);
      } else {
        timerBar.style.display = "none";
      }
    }

    function submit(timedOut) {
      clearTimer();
      var q = questions[index];
      var ok = !timedOut && normalize(input.value) === normalize(q.answer);
      input.classList.add(ok ? "correct" : "incorrect");
      input.disabled = true;
      validateBtn.disabled = true;
      feedbackEl.textContent = ok
        ? "Bonne réponse !"
        : (timedOut ? "Temps écoulé ! " : "") + "La bonne réponse était : " + q.answer;
      feedbackEl.classList.add("show", ok ? "ok" : "ko");
      if (ok) correctCount++; else missed.push(q);

      index++;
      setTimeout(nextQuestion, 700);
    }

    validateBtn.addEventListener("click", function () { submit(false); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") submit(false);
    });

    function finish() {
      qEl.style.display = "none";
      progressEl.textContent = "Partie terminée !";
      scoreLabel.textContent = correctCount + " bonnes réponses sur " + questions.length;
      scoreValue.textContent = correctCount + " / " + questions.length;
      if (missed.length) {
        var missedEl = el("p", "q-text");
        missedEl.style.marginTop = "10px";
        missedEl.textContent = "À revoir : " + missed.map(function (m) { return m.text.replace(" = ?", " = " + m.answer); }).join(" · ");
        setEl.insertBefore(missedEl, scoreBar);
      }
      actionsRow.style.display = "flex";

      if (window.DefisScore) {
        var gameId = settings.mode === "livrets"
          ? "calcul-livrets-" + settings.tables.slice().sort(function (a, b) { return a - b; }).join("+")
          : "calcul-rapide";
        window.DefisScore.record(gameId, correctCount, questions.length);
      }
    }

    replayBtn.addEventListener("click", function () { renderGame(host, settings); });
    backBtn.addEventListener("click", function () {
      renderSettings(host, function (s) { renderGame(host, s); });
    });

    nextQuestion();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var host = document.getElementById("calcul-content");
    if (!host) return;
    renderSettings(host, function (settings) { renderGame(host, settings); });
  });
})();
