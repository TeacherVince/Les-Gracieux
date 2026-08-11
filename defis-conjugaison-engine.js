/* =======================================================================
   DÉFIS — CONJUGAISON — moteur du jeu
   -----------------------------------------------------------------------
   Écran 1 : choix du temps + de la difficulté.
   Écran 2 : 10 questions "complète la conjugaison", correction groupée,
   score enregistré via DefisScore (localStorage, par appareil).

   Règles respectées :
   - ordre des questions mélangé à chaque partie (tirage aléatoire, pas
     de liste figée) ;
   - je/tu/nous/vous restent des pronoms fixes ; les emplacements 3e
     personne (singulier / pluriel) piochent parmi il/elle/on/ils/elles
     ET des prénoms/groupes nominaux, chaque pronom étant une entrée
     séparée du tirage (pas un seul "pronom 3e personne" générique) ;
   - accord correct du participe passé pour aller/sortir/venir selon le
     genre/nombre réel du sujet tiré ; pour je/tu/nous/vous (genre non
     déductible du pronom), les deux accords (masculin/féminin) sont
     acceptés comme corrects.
   ======================================================================= */

(function () {
  "use strict";

  var QUESTIONS_PER_GAME = 10;

  function el(tag, className) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    return e;
  }

  function pick(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  /* Tirage de la personne (0=je, 1=tu, 2=3e sing., 3=nous, 4=vous,
     5=3e plur.). Les emplacements 2 et 5 sont tirés deux fois plus
     souvent que les autres : ce sont les seuls où un prénom ou un
     groupe nominal peut apparaître (je/tu/nous/vous restent des
     pronoms fixes), donc les favoriser un peu augmente la part de
     sujets variés dans une partie sans pour autant faire disparaître
     je/tu/nous/vous. */
  var PERSON_WEIGHTS = [0, 1, 2, 2, 3, 4, 5, 5];

  function pickPersonIndex() {
    return pick(PERSON_WEIGHTS);
  }

  function participleAgreed(pp, gender, number) {
    var base = pp;
    if (gender === "f") base += "e";
    if (number === "p") base += "s";
    return base;
  }

  /* Renvoie { display: "...", acceptable: ["..."] } pour une personne
     donnée (0..5) d'un verbe à un temps donné, avec le sujet tiré. */
  function resolveAnswer(verb, tense, personIndex, subjectGender) {
    var vdata = window.CONJ_DATA.verbs[verb];
    if (tense !== "passeCompose") {
      var form = vdata.tenses[tense].forms[personIndex];
      return { acceptable: [form], display: form };
    }

    var pc = vdata.tenses.passeCompose;
    var auxForms = window.CONJ_DATA.verbs[pc.aux].tenses.present.forms;
    var auxForm = auxForms[personIndex];

    if (pc.aux === "avoir") {
      var full = auxForm + " " + pc.pp;
      return { acceptable: [full], display: full };
    }

    /* aux === "être" : accord selon genre/nombre */
    var isPlural = (personIndex === 3 || personIndex === 5);
    var number = isPlural ? "p" : "s";
    var acceptable;
    var display;
    if (subjectGender) {
      var part = participleAgreed(pc.pp, subjectGender, number);
      acceptable = [auxForm + " " + part];
      display = auxForm + " " + part;
    } else {
      var partM = participleAgreed(pc.pp, "m", number);
      var partF = participleAgreed(pc.pp, "f", number);
      acceptable = [auxForm + " " + partM, auxForm + " " + partF];
      display = auxForm + " " + partM + "(e" + (number === "p" ? "s" : "") + ")";
    }
    return { acceptable: acceptable, display: display };
  }

  function subjectForPerson(personIndex) {
    switch (personIndex) {
      case 0: return { text: "je", gender: null };
      case 1: return { text: "tu", gender: null };
      case 2: { var s = pick(window.CONJ_SUBJECTS.singulier); return { text: s.text, gender: s.gender }; }
      case 3: return { text: "nous", gender: null };
      case 4: return { text: "vous", gender: null };
      case 5: { var p = pick(window.CONJ_SUBJECTS.pluriel); return { text: p.text, gender: p.gender }; }
    }
  }

  function verbPoolFor(difficulty, tense) {
    var all = window.CONJ_DATA.order;
    if (difficulty === "facile") return window.CONJ_DATA.groupOf5P.slice();
    if (difficulty === "moyen") return all.slice();
    /* difficile : uniquement les formes signalées irrégulières pour ce temps */
    var risky = all.filter(function (v) {
      return window.CONJ_DATA.verbs[v].tenses[tense].risk;
    });
    return risky.length ? risky : all.slice();
  }

  function normalize(str) {
    return str.trim().toLowerCase().replace(/\s+/g, " ");
  }

  /* tenses : tableau d'1 à 4 temps sélectionnés. Chaque question tire
     d'abord son propre temps au hasard parmi ceux sélectionnés (donc
     un mélange de temps différents dans la même partie si plusieurs
     sont cochés), puis un verbe dans le pool adapté à CE temps et à
     la difficulté (important pour le mode "difficile", où les
     exceptions ne sont pas les mêmes d'un temps à l'autre). */
  function buildQuestions(tenses, difficulty) {
    var questions = [];
    for (var i = 0; i < QUESTIONS_PER_GAME; i++) {
      var tense = pick(tenses);
      var pool = verbPoolFor(difficulty, tense);
      var verb = pick(pool);
      var personIndex = pickPersonIndex();
      var subject = subjectForPerson(personIndex);
      var answer = resolveAnswer(verb, tense, personIndex, subject.gender);
      questions.push({
        verb: verb,
        tense: tense,
        personIndex: personIndex,
        subjectText: subject.text,
        acceptable: answer.acceptable,
        display: answer.display
      });
    }
    return questions;
  }

  function renderSettings(host, onStart) {
    host.innerHTML = "";
    var wrap = el("div", "quiz-set conj-settings");

    var h2 = el("h2");
    h2.textContent = "Conjugaison";
    wrap.appendChild(h2);

    var introP = el("p", "q-text");
    introP.textContent = "Choisis un ou plusieurs temps (au moins un), puis une difficulté.";
    wrap.appendChild(introP);

    var tenseLabel = el("p", "q-text");
    tenseLabel.style.marginTop = "18px";
    tenseLabel.style.fontWeight = "600";
    tenseLabel.textContent = "Temps (sélection multiple)";
    wrap.appendChild(tenseLabel);

    var tenseRow = el("div", "exercise-tabs");
    var allTenses = ["present", "imparfait", "futur", "passeCompose"];
    var selectedTenses = { present: true };
    allTenses.forEach(function (t, i) {
      var btn = el("button", "exercise-tab" + (i === 0 ? " active" : ""));
      btn.textContent = window.CONJ_TENSE_LABELS[t];
      btn.addEventListener("click", function () {
        var isActive = btn.classList.contains("active");
        var activeCount = Object.keys(selectedTenses).length;
        if (isActive && activeCount === 1) return; /* toujours au moins 1 temps sélectionné */
        if (isActive) {
          btn.classList.remove("active");
          delete selectedTenses[t];
        } else {
          btn.classList.add("active");
          selectedTenses[t] = true;
        }
      });
      tenseRow.appendChild(btn);
    });
    wrap.appendChild(tenseRow);

    var diffLabel = el("p", "q-text");
    diffLabel.style.marginTop = "18px";
    diffLabel.style.fontWeight = "600";
    diffLabel.textContent = "Difficulté";
    wrap.appendChild(diffLabel);

    var diffRow = el("div", "exercise-tabs");
    var diffs = [
      { id: "facile", label: "Facile (verbes 5P)" },
      { id: "moyen", label: "Moyen (5P + 6P)" },
      { id: "difficile", label: "Difficile (les exceptions)" }
    ];
    var selectedDiff = "facile";
    diffs.forEach(function (d, i) {
      var btn = el("button", "exercise-tab" + (i === 0 ? " active" : ""));
      btn.textContent = d.label;
      btn.addEventListener("click", function () {
        selectedDiff = d.id;
        diffRow.querySelectorAll(".exercise-tab").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
      });
      diffRow.appendChild(btn);
    });
    wrap.appendChild(diffRow);

    var startBtn = el("button", "btn btn-primary");
    startBtn.style.marginTop = "24px";
    startBtn.textContent = "Commencer";
    startBtn.addEventListener("click", function () {
      var tenses = allTenses.filter(function (t) { return selectedTenses[t]; });
      onStart(tenses, selectedDiff);
    });
    wrap.appendChild(startBtn);

    host.appendChild(wrap);
  }

  function renderGame(host, tenses, difficulty) {
    host.innerHTML = "";
    var questions = buildQuestions(tenses, difficulty);

    var tenseLabelsJoined = tenses.map(function (t) { return window.CONJ_TENSE_LABELS[t]; }).join(", ");

    var setEl = el("div", "quiz-set");
    setEl.dataset.total = questions.length;

    var subjectLine = el("span", "quiz-subject");
    subjectLine.textContent = "Conjugaison — " + tenseLabelsJoined + " — " + difficulty;
    setEl.appendChild(subjectLine);

    var h2 = el("h2");
    h2.textContent = "À toi de jouer";
    setEl.appendChild(h2);

    var inputs = [];

    questions.forEach(function (q) {
      var qEl = el("div", "quiz-question");
      var p = el("p", "q-text");
      p.textContent = "Sujet : " + q.subjectText + "  —  verbe : " + q.verb + " (" + window.CONJ_TENSE_LABELS[q.tense] + ")";
      qEl.appendChild(p);

      var input = document.createElement("input");
      input.type = "text";
      input.className = "blank-input";
      input.setAttribute("aria-label", "Réponse");
      input.style.width = "220px";
      qEl.appendChild(input);

      var feedbackEl = el("p", "q-feedback");
      qEl.appendChild(feedbackEl);

      setEl.appendChild(qEl);
      inputs.push({ input: input, feedbackEl: feedbackEl, question: q });
    });

    var checkBtn = el("button", "btn btn-primary");
    checkBtn.textContent = "Vérifier mes réponses";
    setEl.appendChild(checkBtn);

    var missingWarning = el("p", "q-feedback conj-missing-warning");
    missingWarning.style.display = "none";
    setEl.appendChild(missingWarning);

    var scoreBar = el("div", "quiz-score");
    var scoreLabel = el("span", "score-label");
    scoreLabel.textContent = "0 réponse sur " + questions.length + " essayée";
    var scoreValue = el("span", "score-value");
    scoreValue.textContent = "0 / " + questions.length;
    scoreBar.appendChild(scoreLabel);
    scoreBar.appendChild(scoreValue);
    setEl.appendChild(scoreBar);

    var actionsRow = el("div", "conj-actions-row");
    actionsRow.style.display = "flex";
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

    checkBtn.addEventListener("click", function () {
      inputs.forEach(function (item) { item.input.classList.remove("missing"); });

      var emptyItems = inputs.filter(function (item) { return item.input.value.trim() === ""; });
      if (emptyItems.length) {
        emptyItems.forEach(function (item) { item.input.classList.add("missing"); });
        missingWarning.textContent = emptyItems.length === 1
          ? "Il te manque une réponse : complète-la avant de valider (case entourée en orange)."
          : "Il te manque " + emptyItems.length + " réponses : complète-les avant de valider (cases entourées en orange).";
        missingWarning.classList.remove("show", "ok", "ko");
        missingWarning.style.display = "block";
        missingWarning.classList.add("show");
        emptyItems[0].input.focus();
        return;
      }
      missingWarning.style.display = "none";
      missingWarning.classList.remove("show");

      var correctCount = 0;
      inputs.forEach(function (item) {
        var userVal = normalize(item.input.value);
        var ok = item.question.acceptable.some(function (a) { return normalize(a) === userVal; });
        item.input.classList.remove("correct", "incorrect");
        item.input.classList.add(ok ? "correct" : "incorrect");
        item.feedbackEl.textContent = ok
          ? "Bonne réponse !"
          : "La bonne réponse était : " + item.question.display;
        item.feedbackEl.classList.add("show", ok ? "ok" : "ko");
        if (ok) correctCount++;
      });
      scoreLabel.textContent = questions.length + " réponse(s) sur " + questions.length + " essayée(s)";
      scoreValue.textContent = correctCount + " / " + questions.length;
      checkBtn.disabled = true;
      actionsRow.style.display = "flex";

      if (window.DefisScore) {
        var scoreKey = "conjugaison-" + tenses.slice().sort().join("+");
        window.DefisScore.record(scoreKey, correctCount, questions.length, difficulty);
      }
    });

    replayBtn.addEventListener("click", function () {
      renderGame(host, tenses, difficulty);
    });

    backBtn.addEventListener("click", function () {
      renderSettings(host, function (newTenses, newDifficulty) {
        renderGame(host, newTenses, newDifficulty);
      });
    });

    host.appendChild(setEl);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var host = document.getElementById("conj-content");
    if (!host) return;
    renderSettings(host, function (tenses, difficulty) {
      renderGame(host, tenses, difficulty);
    });
  });
})();
