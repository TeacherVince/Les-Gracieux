/* =======================================================================
   DÉFIS — Les Gracieux
   -----------------------------------------------------------------------
   Liste des sujets de l'onglet Défis, organisés par branche (Français /
   Mathématiques). Chaque sujet correspond à un seul format de jeu (voir
   cahier des charges interne) : pas de catégories/sous-catégories, une
   liste plate et directe.

   status :
     "bientot"    → sujet visible mais pas encore jouable (tuile grisée,
                    pas de lien actif). C'est l'état par défaut tant que
                    le contenu n'a pas été construit ET validé.
     "disponible" → sujet jouable, la tuile pointe vers page (page HTML
                    du jeu correspondant).

   Rien ici n'est publié sur le site en ligne tant que ce n'est pas
   demandé explicitement : ce fichier n'existe que dans le dossier local.
   ======================================================================= */

window.DEFIS_DATA = {
  francais: {
    label: "Français",
    subjects: [
      {
        id: "conjugaison",
        name: "Conjugaison",
        tagline: "Présent, imparfait, futur, passé composé.",
        icon: "pencil",
        color: "gold",
        status: "disponible"
      },
      {
        id: "grammaire",
        name: "Grammaire",
        tagline: "Nature des mots, fonctions, classes grammaticales.",
        icon: "puzzle",
        color: "blue",
        status: "disponible"
      },
      {
        id: "orthographe",
        name: "Orthographe",
        tagline: "Homophones, accords, pièges courants.",
        icon: "check",
        color: "green",
        status: "disponible"
      },
      {
        id: "vocabulaire",
        name: "Vocabulaire",
        tagline: "Sens des mots, synonymes, familles de mots.",
        icon: "book",
        color: "violet",
        status: "disponible"
      },
      {
        id: "dictee",
        name: "Dictée",
        tagline: "Écouter et écrire correctement.",
        icon: "headphones",
        color: "rose",
        status: "bientot",
        note: "Encore secret... reviens bientôt !"
      },
      {
        id: "ecriture",
        name: "Écriture",
        tagline: "Construire des phrases, organiser un texte.",
        icon: "feather",
        color: "gold",
        status: "disponible"
      }
    ]
  },

  mathematiques: {
    label: "Mathématiques",
    subjects: [
      {
        id: "calcul-mental",
        name: "Calcul mental",
        tagline: "Additions, soustractions, multiplications — vite et bien.",
        icon: "brain",
        color: "blue",
        status: "disponible"
      },
      {
        id: "numeration",
        name: "Numération",
        tagline: "Lire, écrire et comparer les nombres.",
        icon: "hash",
        color: "gold",
        status: "disponible"
      },
      {
        id: "operations",
        name: "Opérations",
        tagline: "Poser et résoudre les 4 opérations.",
        icon: "grid",
        color: "green",
        status: "disponible"
      },
      {
        id: "mesures",
        name: "Mesures",
        tagline: "Longueurs, masses, temps, monnaie.",
        icon: "ruler",
        color: "violet",
        status: "disponible"
      },
      {
        id: "geometrie",
        name: "Géométrie",
        tagline: "Formes, figures, périmètres et aires.",
        icon: "shape",
        color: "rose",
        status: "disponible"
      },
      {
        id: "problemes",
        name: "Résolution de problèmes",
        tagline: "Comprendre une situation et trouver la bonne opération.",
        icon: "bulb",
        color: "gold",
        status: "disponible"
      }
    ]
  }
};
