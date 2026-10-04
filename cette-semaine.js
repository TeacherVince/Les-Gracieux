/* =======================================================================
   CETTE SEMAINE — Les Gracieux
   -----------------------------------------------------------------------
   Ces deux blocs sont les premiers éléments visibles de la page
   d'accueil, juste après le texte d'intro. Pour les mettre à jour
   chaque semaine : modifie simplement les textes ci-dessous. Rien
   d'autre à toucher (le titre "Semaine du ... au ..." est calculé
   automatiquement à partir de la date du jour, et s'affiche maintenant
   à côté du titre "Devoirs").

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
                         piscine, matériel spécial...)
          - "info"     : toute autre information importante (congé,
                         changement d'horaire...)
   text : le texte affiché (une phrase suffit). Si le texte est trop
          long pour tenir sur une ligne, mets la date à la ligne avec
          "\n" (voir l'exemple "Morges est au musée" plus bas).
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

   Pour un test/concours un jour précis (pas forcément le vendredi),
   remplace le texte simple par { text: "...", test: true } : la ligne
   s'affiche alors en doré, comme le cadre "note" plus bas. Exemple :
   { text: "Test Assimilé : voc page 10", test: true }

   note : (optionnel) une ligne mise en avant sous les 4 colonnes,
          pour un concours ou un test à venir qui ne concerne pas un
          jour précis. Précise toujours le jour dans le texte, ex.
          "Concours du vendredi : verbes 5P (présent et
          imparfait)". Enlève cette ligne (ou mets-la à "") une fois
          le concours passé.
   parentNote : (optionnel) un 2e cadre doré, identique à "note",
          mais réservé à ce que les parents doivent faire (signer un
          carnet, ramener un document...), ex. "Parents : signer
          le concours n°1". Enlève cette ligne une fois fait.
   ======================================================================= */

window.CETTE_SEMAINE_DATA = {
  infos: [
    {
      type: "sortie",
      text: "Night Run : samedi 31 octobre !"
    },
    {
      type: "info",
      text: "Mardi 6 octobre : réunion de parents à 19h00."
    },
    {
      type: "materiel",
      text: "Lundi : prendre ses affaires de gym"
    },
    {
      type: "info",
      text: "Vendredi : début des vacances !"
    },
    {
      type: "divers",
      text: "L'app du site est maintenant disponible sur smartphone."
    }
  ],

  devoirs: {
    mardi: [
      "Piscine ! (bonnet et linge)"
    ],
    mercredi: [
      "Allemand : apprendre voc p.13 - suite"
    ],
    jeudi: [
      "Fiche maths n°5 - recto",
      { text: "TS maths - numération", test: true }
    ],
    vendredi: [
      "Fiche maths 5 - verso"
    ]
  }
};
