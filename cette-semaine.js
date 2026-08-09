/* =======================================================================
   CETTE SEMAINE — Les Gracieux
   -----------------------------------------------------------------------
   Ces deux blocs sont les premiers éléments visibles de la page
   d'accueil, juste après le texte d'intro. Pour les mettre à jour
   chaque semaine : modifie simplement les textes ci-dessous. Rien
   d'autre à toucher (le titre "Semaine du ... au ..." est calculé
   automatiquement à partir de la date du jour).

   ---- infos ----
   Regroupe TOUT ce qui est ponctuel cette semaine : sorties,
   événements, piscine, gym, matériel spécial à prendre, changement
   particulier, information importante pour les familles, rappel
   exceptionnel... Pour AJOUTER un élément, copie un bloc { ... } et
   colle-le avant le "]" final. Pour EN SUPPRIMER un, supprime son
   bloc entier.

   type : détermine l'icône et l'étiquette affichées. Utilise une des
          valeurs suivantes :
          - "sortie"   : sorties, événements, piscine (regroupés sous
                         "Sorties / Événements")
          - "materiel" : quelque chose à prendre ou à prévoir (gym,
                         matériel spécial...)
          - "info"     : toute autre information importante
   text : le texte affiché (une phrase suffit).

   ---- devoirs ----
   Les devoirs de la semaine, répartis dans les 4 colonnes affichées
   sur la page d'accueil : mardi, mercredi, jeudi, vendredi. Chaque
   jour est une liste de phrases : ajoute ou supprime une ligne selon
   les besoins. Une liste vide affiche simplement "Rien de prévu"
   pour ce jour, rien à faire de particulier.
   ======================================================================= */

window.CETTE_SEMAINE_DATA = {
  infos: [
    {
      type: "sortie",
      text: "1er cours de natation : mardi 25 août."
    },
    {
      type: "info",
      text: "Rentrée : le lundi 17 août à 8h40 !"
    },
    {
      type: "materiel",
      text: "Lundi de la rentrée : prendre ses affaires de gym."
    }
  ],

  devoirs: {
    mardi: [
      "Reprendre un rythme scolaire."
    ],
    mercredi: [],
    jeudi: [
      "Bien s'hydrater."
    ],
    vendredi: [
      "Dormir suffisamment."
    ]
  }
};
