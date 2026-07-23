/* =======================================================================
   CETTE SEMAINE — Les Gracieux
   -----------------------------------------------------------------------
   Cette carte est le premier élément visible de la page d'accueil.
   Pour la mettre à jour chaque semaine : modifie simplement les textes
   ci-dessous. Rien d'autre à toucher.

   updated : la petite phrase affichée à droite du titre (facultative,
             mets "" pour la masquer).

   items : la liste des choses à afficher cette semaine. Pour AJOUTER
           un élément, copie un bloc { ... } et colle-le avant le "]"
           final. Pour EN SUPPRIMER un, supprime son bloc entier.

   type  : détermine l'icône et l'étiquette affichées. Utilise une des
           valeurs suivantes : "devoir", "sortie" (regroupe sorties et
           événements) ou "info".
   text  : le texte affiché (une phrase suffit).
   ======================================================================= */

window.CETTE_SEMAINE_DATA = {
  updated: "Semaine du 24 août 2026",
  items: [
    {
      type: "devoir",
      text: "Exemple à remplacer : réviser la leçon 4 de mathématiques pour vendredi."
    },
    {
      type: "sortie",
      text: "Exemple à remplacer : sortie à la piscine mardi matin — prévoir maillot, bonnet et serviette."
    },
    {
      type: "info",
      text: "Exemple à remplacer : pas d'école mercredi après-midi (formation continue des enseignants)."
    }
  ]
};
