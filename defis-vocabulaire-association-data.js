/* =======================================================================
   DEFIS -- Vocabulaire -- banques pour le jeu d'association (2 colonnes)
   -----------------------------------------------------------------------
   Deux banques SEPAREES (synonymes / antonymes) : chaque partie ne tire
   que dans une seule des deux, pour qu'un mot n'ait jamais deux paires
   valides possibles en même temps (pas d'ambiguïté). Chaque mot
   n'apparaît qu'une seule fois, à gauche comme à droite, dans sa banque.
   ======================================================================= */

window.VOCABULAIRE_ASSOC_SYNONYMES = [
  { left: "content", right: "heureux" },
  { left: "rapide", right: "vite" },
  { left: "manger", right: "déguster" },
  { left: "beau", right: "joli" },
  { left: "regarder", right: "observer" },
  { left: "grand", right: "immense" },
  { left: "peur", right: "crainte" },
  { left: "beaucoup", right: "énormément" },
  { left: "triste", right: "chagriné" },
  { left: "parler", right: "discuter" }
];

window.VOCABULAIRE_ASSOC_ANTONYMES = [
  { left: "construire", right: "détruire" },
  { left: "intérieur", right: "extérieur" },
  { left: "augmenter", right: "diminuer" },
  { left: "aimer", right: "détester" },
  { left: "loin", right: "près" },
  { left: "peu", right: "beaucoup" },
  { left: "toujours", right: "jamais" },
  { left: "sale", right: "propre" },
  { left: "ouvrir", right: "fermer" },
  { left: "jeune", right: "âgé" },
  { left: "lourd", right: "léger" }
];

window.VOCABULAIRE_ASSOC_FAMILLES = [
  { left: "terre", right: "terrain" },
  { left: "dent", right: "dentiste" },
  { left: "fleur", right: "fleuriste" },
  { left: "chant", right: "chanteur" },
  { left: "lait", right: "laitier" },
  { left: "mer", right: "marin" },
  { left: "main", right: "manuel" },
  { left: "chaud", right: "chaleur" },
  { left: "doux", right: "douceur" },
  { left: "vent", right: "venteux" }
];
