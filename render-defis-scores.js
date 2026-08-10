/* =======================================================================
   DÉFIS — page "Mes scores"
   -----------------------------------------------------------------------
   Lit tout ce que DefisScore a enregistré sur CET appareil (localStorage,
   donc rien n'est partagé entre les ordinateurs/tablettes) et affiche,
   pour chaque Défi déjà joué : le meilleur score, la dernière partie et
   le nombre de parties. Pas de compte, pas de nom d'élève : chaque
   appareil garde son propre historique, comme prévu dès le départ.
   ======================================================================= */

(function () {
  "use strict";

  function el(tag, className) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    return e;
  }

  var FIXED_LABELS = {
    "defis-grammaire": { branch: "francais", order: 1, label: "Grammaire" },
    "defis-orthographe": { branch: "francais", order: 2, label: "Orthographe" },
    "defis-vocabulaire": { branch: "francais", order: 3, label: "Vocabulaire" },
    "defis-vocabulaire-assoc-synonymes": { branch: "francais", order: 3, label: "Vocabulaire — Association (synonymes)" },
    "defis-vocabulaire-assoc-antonymes": { branch: "francais", order: 3, label: "Vocabulaire — Association (antonymes)" },
    "defis-vocabulaire-assoc-familles": { branch: "francais", order: 3, label: "Vocabulaire — Association (familles de mots)" },
    "defis-numeration": { branch: "mathematiques", order: 2, label: "Numération" },
    "defis-operations": { branch: "mathematiques", order: 3, label: "Opérations" },
    "defis-mesures": { branch: "mathematiques", order: 4, label: "Mesures" },
    "defis-geometrie": { branch: "mathematiques", order: 5, label: "Géométrie" },
    "defis-problemes": { branch: "mathematiques", order: 6, label: "Résolution de problèmes" }
  };

  function describeGame(gameId) {
    if (FIXED_LABELS[gameId]) return FIXED_LABELS[gameId];

    if (gameId.indexOf("conjugaison-") === 0) {
      var tenses = gameId.slice("conjugaison-".length).split("+");
      var tenseLabels = tenses.map(function (t) {
        return (window.CONJ_TENSE_LABELS && window.CONJ_TENSE_LABELS[t]) || t;
      });
      return { branch: "francais", order: 0, label: "Conjugaison (" + tenseLabels.join(", ") + ")" };
    }

    if (gameId === "calcul-rapide") {
      return { branch: "mathematiques", order: 1, label: "Calcul mental — Calcul rapide" };
    }

    if (gameId.indexOf("calcul-livrets-") === 0) {
      var tables = gameId.slice("calcul-livrets-".length).split("+");
      var plur = tables.length > 1 ? "s" : "";
      return { branch: "mathematiques", order: 1, label: "Calcul mental — Livret" + plur + " (table" + plur + " de " + tables.join(", ") + ")" };
    }

    // Repli générique si un gameId inconnu apparaît un jour.
    return { branch: "francais", order: 99, label: gameId };
  }

  function formatDate(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    var datePart = d.toLocaleDateString("fr-CH", { day: "2-digit", month: "2-digit", year: "numeric" });
    var timePart = d.toLocaleTimeString("fr-CH", { hour: "2-digit", minute: "2-digit" });
    return datePart + " à " + timePart;
  }

  function buildCard(gameId) {
    var info = describeGame(gameId);
    var best = window.DefisScore.best(gameId);
    var last = window.DefisScore.lastPlayed(gameId);
    var count = window.DefisScore.history(gameId).length;
    if (!best || !last) return null;

    var card = el("div", "card score-card");

    var h3 = el("h3");
    h3.textContent = info.label;
    card.appendChild(h3);

    var pctBest = best.total ? Math.round((best.score / best.total) * 100) : 0;
    var bestLine = el("p");
    bestLine.innerHTML = "<strong>Meilleur score :</strong> " + best.score + " / " + best.total + " (" + pctBest + " %)";
    card.appendChild(bestLine);

    var pctLast = last.total ? Math.round((last.score / last.total) * 100) : 0;
    var lastLine = el("p");
    lastLine.innerHTML = "<strong>Dernière partie :</strong> " + last.score + " / " + last.total + " (" + pctLast + " %) — " + formatDate(last.date);
    card.appendChild(lastLine);

    var countLine = el("p");
    countLine.style.color = "var(--text-muted)";
    countLine.style.fontSize = "0.85rem";
    countLine.textContent = count + " partie" + (count > 1 ? "s" : "") + " enregistrée" + (count > 1 ? "s" : "") + " sur cet appareil";
    card.appendChild(countLine);

    info._sortLabel = info.label;
    card._order = info.order;
    card._label = info.label;
    card._branch = info.branch;
    return card;
  }

  function renderBranch(branchKey, title, cards, host) {
    if (!cards.length) return;
    var section = el("section", "section defis-branch");
    var wrap = el("div", "wrap");

    var h2 = el("h2", "section-title");
    h2.innerHTML = '<span class="spark">✦</span> ' + title;
    wrap.appendChild(h2);

    var grid = el("div", "card-grid defis-grid");
    cards.forEach(function (c) { grid.appendChild(c); });
    wrap.appendChild(grid);

    section.appendChild(wrap);
    host.appendChild(section);
  }

  function renderEmpty(host) {
    var section = el("section", "section defis-branch");
    var wrap = el("div", "wrap");
    var p = el("p", "lead");
    p.textContent = "Aucune partie enregistrée pour l'instant sur cet appareil. Joue à un Défi, ton score apparaîtra ici automatiquement !";
    wrap.appendChild(p);
    section.appendChild(wrap);
    host.appendChild(section);
  }

  function render(host) {
    host.innerHTML = "";
    if (!window.DefisScore) return;

    var gameIds = window.DefisScore.listGames();
    var allCards = gameIds.map(buildCard).filter(Boolean);

    if (!allCards.length) {
      renderEmpty(host);
      return;
    }

    var frCards = allCards.filter(function (c) { return c._branch === "francais"; })
      .sort(function (a, b) { return a._order - b._order || a._label.localeCompare(b._label, "fr"); });
    var mathCards = allCards.filter(function (c) { return c._branch === "mathematiques"; })
      .sort(function (a, b) { return a._order - b._order || a._label.localeCompare(b._label, "fr"); });

    renderBranch("francais", "Français", frCards, host);
    renderBranch("mathematiques", "Mathématiques", mathCards, host);

    var resetSection = el("section", "section");
    var resetWrap = el("div", "wrap");
    var resetBtn = el("button", "btn btn-outline");
    resetBtn.textContent = "Effacer l'historique de cet appareil";
    resetBtn.addEventListener("click", function () {
      if (window.confirm("Effacer tous les scores enregistrés sur cet appareil ? Cette action ne peut pas être annulée.")) {
        window.DefisScore.clearAll();
        render(host);
      }
    });
    resetWrap.appendChild(resetBtn);
    resetSection.appendChild(resetWrap);
    host.appendChild(resetSection);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var host = document.getElementById("defis-scores-content");
    if (!host) return;
    render(host);
  });
})();
