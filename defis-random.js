/* =======================================================================
   DÉFIS — utilitaires de mélange aléatoire
   -----------------------------------------------------------------------
   Brique commune pour respecter les règles décidées (voir cahier des
   charges "Randomisation des Défis") :
   1. L'ordre des questions doit être mélangé à chaque partie.
   2. Pour les QCM/vrai-faux/intrus, la position de la bonne réponse
      parmi les choix doit elle aussi être mélangée à chaque partie.
   3. Pour les associations, l'ordre des deux colonnes doit être mélangé.
   4. Pour les remises en ordre, la position des éléments déjà bien
      placés est un LEVIER DE DIFFICULTÉ (facile = groupés au début,
      difficile = dispersés), pas un défaut à corriger systématiquement.
   ======================================================================= */

window.DefisRandom = (function () {
  "use strict";

  /* Mélange Fisher-Yates, ne modifie pas le tableau d'origine. */
  function shuffle(array) {
    var a = array.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  }

  /* Pour un QCM : mélange les choix et renvoie le nouvel index de la
     bonne réponse, sans jamais toucher au texte des choix. */
  function shuffleChoices(choices, correctIndex) {
    var withFlag = choices.map(function (text, i) {
      return { text: text, isCorrect: i === correctIndex };
    });
    var shuffled = shuffle(withFlag);
    var newCorrectIndex = shuffled.findIndex(function (c) { return c.isCorrect; });
    return {
      choices: shuffled.map(function (c) { return c.text; }),
      correctIndex: newCorrectIndex
    };
  }

  /* Pour une remise en ordre : place `placedCount` éléments déjà à leur
     bonne position, le reste mélangé. mode = "facile" (groupés en début
     de séquence) ou "difficile" (dispersés sur toute la séquence). */
  function buildOrderingSequence(correctSequence, placedCount, mode) {
    var n = correctSequence.length;
    placedCount = Math.max(0, Math.min(placedCount, n));

    var placedPositions;
    if (mode === "difficile") {
      placedPositions = shuffle(Array.from({ length: n }, function (_, i) { return i; })).slice(0, placedCount);
    } else {
      placedPositions = Array.from({ length: placedCount }, function (_, i) { return i; });
    }
    var placedSet = {};
    placedPositions.forEach(function (p) { placedSet[p] = true; });

    var remainingValues = shuffle(
      correctSequence.filter(function (_, i) { return !placedSet[i]; })
    );

    var result = new Array(n);
    var ri = 0;
    for (var i = 0; i < n; i++) {
      result[i] = placedSet[i] ? { value: correctSequence[i], locked: true } : { value: remainingValues[ri++], locked: false };
    }
    return result;
  }

  /* Tire n éléments distincts d'un tableau, dans un ordre mélangé.
     Si n >= array.length, renvoie tout le tableau mélangé. */
  function sample(array, n) {
    return shuffle(array).slice(0, Math.min(n, array.length));
  }

  return {
    shuffle: shuffle,
    shuffleChoices: shuffleChoices,
    buildOrderingSequence: buildOrderingSequence,
    sample: sample
  };
})();
