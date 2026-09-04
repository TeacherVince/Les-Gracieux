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
                         "Sorties & événements")
          - "divers"   : nouveautés du site (nouvelle vidéo ajoutée,
                         mise à jour...). Ajoute "link" (voir plus bas)
                         pour renvoyer directement vers la page
                         concernée.
          - "materiel" : quelque chose à prendre ou à prévoir (gym,
                         matériel spécial...)
          - "info"     : toute autre information importante
   text : le texte affiché (une phrase suffit). Si le texte est trop
          long pour tenir sur une ligne, mets la date à la ligne avec
          "\n" (voir l'exemple "Morges est au musée" ci-dessous).
   link : (optionnel, pour "divers" surtout) une URL de page du site
          (ex. "sciences-histoire-mediatheque.html") qui rend le texte
          cliquable, pour amener directement vers la médiathèque ou
          la page concernée.

   ---- devoirs ----
   Les devoirs de la semaine, répartis dans les 4 colonnes affichées
   sur la page d'accueil : mardi, mercredi, jeudi, vendredi. Chaque
   jour est une liste de phrases : ajoute ou supprime une ligne selon
   les besoins. Une liste vide affiche simplement "Rien de prévu"
   pour ce jour, rien à faire de particulier.

   note : (optionnel) une ligne mise en avant sous les 4 colonnes,
          pour un concours ou un test à venir. Précise toujours le
          jour dans le texte, ex. "Concours du vendredi : verbes 5P
          (présent et imparfait)". Enlève cette ligne (ou mets-la à
          "") une fois le concours passé.
   ======================================================================= */

window.CETTE_SEMAINE_DATA = {
  infos: [
    {
      type: "sortie",
      text: "Morges est au musée : 15 septembre"
    },
    {
      type: "info",
      text: "Rencontre parents - direction : 9 septembre"
    },
    {
      type: "materiel",
      text: "Lundi : prendre ses affaires de gym"
    },
    {
      type: "divers",
      text: "Nouvelle vidéo : La peau de l'eau",
      link: "sciences-histoire-mediatheque.html"
    },
    {
      type: "divers",
      text: "Nouvelle fonction : tu peux maintenant liker les commentaires des vidéos !",
      link: "videos.html"
    }
  ],

  devoirs: {
    mardi: [
      "Fiche devoirs Français 2",
      "Piscine !"
    ],
    mercredi: [
      "Allemand : Exercice 1 - page 11"
    ],
    jeudi: [
      "Fiche maths 2 - recto",
      "Réviser \"libre Max\" en entier"
    ],
    vendredi: [
      "Fiche maths 2 - verso"
    ],
    note: "Concours du vendredi : additions soustractions en colonne"
  }
};
