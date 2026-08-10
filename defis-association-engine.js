/* =======================================================================
   DÉFIS — moteur générique "association" (deux colonnes à relier)
   -----------------------------------------------------------------------
   Réutilisable par tout sujet où l'élève doit relier chaque élément
   d'une colonne A à son correspondant en colonne B (synonymes, sujet
   -> forme conjuguée, unité -> exemple...). Clic sur un élément à
   gauche puis sur son pair à droite (ou l'inverse) : ça marche donc
   aussi bien à la souris qu'au doigt sur tablette.

   Les deux colonnes sont mélangées séparément à chaque partie (voir
   defis-random.js, règle n°3 du cahier des charges "Randomisation des
   Défis"). Une paire mal associée ne bloque rien : les deux éléments
   se remettent disponibles après un court flash rouge, pour que la
   partie reste toujours finissable. Le score ne compte que les paires
   trouvées du premier coup (même logique de "seconde chance" que les
   exercices à trous du site).

   Banque attendue : [{ left: "...", right: "..." }, ...]
   ======================================================================= */

window.DefisAssociation = (function () {
  "use strict";

  function el(tag, className) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    return e;
  }

  function mount(containerId, opts) {
    var host = document.getElementById(containerId);
    if (!host) return;

    var bank = opts.bank;
    var count = Math.min(opts.count || 6, bank.length);
    var gameId = opts.gameId;
    var title = opts.title || "Associe chaque paire";
    var subjectLabel = opts.subjectLabel || "";
    var instruction = opts.instruction || "Clique un mot à gauche, puis son mot correspondant à droite.";

    function render() {
      host.innerHTML = "";
      var picked = window.DefisRandom.sample(bank, count);
      var total = picked.length;

      var setEl = el("div", "quiz-set");

      var subjectLine = el("span", "quiz-subject");
      subjectLine.textContent = subjectLabel;
      setEl.appendChild(subjectLine);

      var h2 = el("h2");
      h2.textContent = title;
      setEl.appendChild(h2);

      var instructionEl = el("p", "q-text");
      instructionEl.style.color = "var(--text-secondary)";
      instructionEl.style.marginBottom = "18px";
      instructionEl.textContent = instruction;
      setEl.appendChild(instructionEl);

      var progressEl = el("p", "quiz-progress");
      progressEl.textContent = "Paires trouvées : 0 / " + total;
      setEl.appendChild(progressEl);

      var boardEl = el("div", "assoc-board");
      var leftCol = el("div", "assoc-col");
      var rightCol = el("div", "assoc-col");
      boardEl.appendChild(leftCol);
      boardEl.appendChild(rightCol);
      setEl.appendChild(boardEl);

      var feedbackEl = el("p", "q-feedback");
      setEl.appendChild(feedbackEl);

      var indices = picked.map(function (_, i) { return i; });
      var leftOrder = window.DefisRandom.shuffle(indices);
      var rightOrder = window.DefisRandom.shuffle(indices);

      function buildItem(pairIndex, side, text, positionLabel) {
        var btn = el("button", "assoc-item");
        btn.type = "button";
        btn.dataset.pairIndex = pairIndex;
        btn.dataset.side = side;
        if (positionLabel) {
          var numEl = el("span", "assoc-item-number");
          numEl.textContent = positionLabel + ".";
          btn.appendChild(numEl);
        }
        var textSpan = el("span", "assoc-item-text");
        textSpan.textContent = text;
        btn.appendChild(textSpan);
        return btn;
      }

      leftOrder.forEach(function (pairIndex, pos) {
        leftCol.appendChild(buildItem(pairIndex, "left", picked[pairIndex].left, pos + 1));
      });
      rightOrder.forEach(function (pairIndex) {
        rightCol.appendChild(buildItem(pairIndex, "right", picked[pairIndex].right, null));
      });

      var attempts = {};
      var matchedCount = 0;
      var correctFirstTry = 0;
      var selected = null; // { side, pairIndex, el }
      var finished = false;

      function clearSelection() {
        if (selected) selected.el.classList.remove("selected");
        selected = null;
      }

      function onItemClick(btn) {
        if (finished) return;
        if (btn.classList.contains("matched")) return;

        var side = btn.dataset.side;
        var pairIndex = Number(btn.dataset.pairIndex);

        if (!selected) {
          selected = { side: side, pairIndex: pairIndex, el: btn };
          btn.classList.add("selected");
          return;
        }

        if (selected.el === btn) {
          clearSelection();
          return;
        }

        if (selected.side === side) {
          selected.el.classList.remove("selected");
          selected = { side: side, pairIndex: pairIndex, el: btn };
          btn.classList.add("selected");
          return;
        }

        var leftBtn = side === "left" ? btn : selected.el;
        var rightBtn = side === "right" ? btn : selected.el;
        var isMatch = selected.pairIndex === pairIndex;

        if (isMatch) {
          leftBtn.classList.remove("selected");
          rightBtn.classList.remove("selected");
          leftBtn.classList.add("matched", "correct");
          rightBtn.classList.add("matched", "correct");
          matchedCount++;
          if (!attempts[pairIndex]) correctFirstTry++;
          selected = null;

          feedbackEl.textContent = "Bien joué !";
          feedbackEl.classList.remove("ko", "retry");
          feedbackEl.classList.add("show", "ok");
          progressEl.textContent = "Paires trouvées : " + matchedCount + " / " + total;

          if (matchedCount === total) {
            finished = true;
            feedbackEl.textContent = correctFirstTry === total
              ? "Parfait ! Toutes les paires trouvées du premier coup."
              : "Bravo, toutes les paires sont associées !";
            if (window.DefisScore) {
              window.DefisScore.record(gameId, correctFirstTry, total);
            }
          }
        } else {
          attempts[pairIndex] = (attempts[pairIndex] || 0) + 1;
          attempts[selected.pairIndex] = (attempts[selected.pairIndex] || 0) + 1;

          leftBtn.classList.add("incorrect");
          rightBtn.classList.add("incorrect");
          feedbackEl.textContent = "Ce n'est pas la bonne paire, réessaie.";
          feedbackEl.classList.remove("ok");
          feedbackEl.classList.add("show", "retry");

          selected = null;
          setTimeout(function () {
            leftBtn.classList.remove("incorrect", "selected");
            rightBtn.classList.remove("incorrect", "selected");
          }, 650);
        }
      }

      Array.prototype.forEach.call(leftCol.children, function (btn) {
        btn.addEventListener("click", function () { onItemClick(btn); });
      });
      Array.prototype.forEach.call(rightCol.children, function (btn) {
        btn.addEventListener("click", function () { onItemClick(btn); });
      });

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
