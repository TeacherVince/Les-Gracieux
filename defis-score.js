/* =======================================================================
   DÉFIS — moteur de score local (par appareil)
   -----------------------------------------------------------------------
   Pas de compte, pas de serveur : chaque appareil garde son propre
   historique dans localStorage. Sert de brique commune à tous les futurs
   jeux Défis (un jeu appelle DefisScore.record(...) à la fin d'une
   partie, et DefisScore.best(...) / DefisScore.history(...) pour afficher
   un suivi de progression).

   Clé de stockage : "defis-scores" → objet { [gameId]: [ {date, score,
   total, difficulty}, ... ] }, gameId = ex. "conjugaison-present-facile".
   ======================================================================= */

window.DefisScore = (function () {
  "use strict";

  var STORAGE_KEY = "defis-scores";
  var MAX_ENTRIES_PER_GAME = 20;

  function readAll() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function writeAll(data) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      /* localStorage indisponible (navigation privée, quota...) :
         on échoue silencieusement, le jeu reste jouable sans suivi. */
    }
  }

  function record(gameId, score, total, difficulty, timeMs) {
    if (!gameId) return;
    var all = readAll();
    if (!all[gameId]) all[gameId] = [];
    all[gameId].unshift({
      date: new Date().toISOString(),
      score: score,
      total: total,
      difficulty: difficulty || null,
      timeMs: (typeof timeMs === "number" && timeMs > 0) ? timeMs : null
    });
    all[gameId] = all[gameId].slice(0, MAX_ENTRIES_PER_GAME);
    writeAll(all);
  }

  // Meilleur temps (le plus rapide) parmi les parties chronométrées ayant
  // obtenu EXACTEMENT ce score (ex. 15/15) — sert à afficher un record
  // "à battre" pour les élèves qui utilisent le chronomètre.
  function bestTimeForScore(gameId, score) {
    var entries = history(gameId).filter(function (e) {
      return e.score === score && typeof e.timeMs === "number" && e.timeMs > 0;
    });
    if (!entries.length) return null;
    return entries.reduce(function (a, b) { return b.timeMs < a.timeMs ? b : a; }).timeMs;
  }

  function history(gameId) {
    var all = readAll();
    return all[gameId] || [];
  }

  function best(gameId) {
    var entries = history(gameId);
    if (!entries.length) return null;
    return entries.reduce(function (a, b) {
      var ra = a.total ? a.score / a.total : 0;
      var rb = b.total ? b.score / b.total : 0;
      return rb > ra ? b : a;
    });
  }

  function lastPlayed(gameId) {
    var entries = history(gameId);
    return entries.length ? entries[0] : null;
  }

  // Liste tous les gameId pour lesquels cet appareil a au moins une
  // partie enregistrée. Sert à construire une page "Mes scores" sans
  // avoir à connaître à l'avance toutes les combinaisons possibles
  // (ex. conjugaison-present+futur, calcul-livrets-2+3...).
  function listGames() {
    return Object.keys(readAll());
  }

  function clearAll() {
    try { window.localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
  }

  return {
    record: record,
    history: history,
    best: best,
    bestTimeForScore: bestTimeForScore,
    lastPlayed: lastPlayed,
    listGames: listGames,
    clearAll: clearAll
  };
})();
