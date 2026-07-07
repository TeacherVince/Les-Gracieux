/* =======================================================================
   INFOS PRATIQUES — Les Gracieux
   -----------------------------------------------------------------------
   Toute la page se pilote depuis ce seul fichier : pas besoin de toucher
   à infos-pratiques.html pour mettre à jour une date ou un horaire.

   Pour MODIFIER une section : change le texte dans le tableau "items".
   Chaque élément du tableau "items" devient une ligne affichée.

   Pour AJOUTER une section : copie un bloc { ... } ci-dessous (entre
   les crochets [ ]), colle-le avant le "];" final, et modifie son contenu.

   icon : une des valeurs suivantes → "calendar", "clock", "drop", "star",
          "bus", "info" (sinon une icône par défaut est utilisée).

   attachment (facultatif) : ajoute un bouton de téléchargement PDF à la
   fin d'une section. Dépose le fichier à la racine du dépôt et indique
   son nom exact dans "file".
   ======================================================================= */

window.INFOS_DATA = [
  {
    title: "Agenda de la classe",
    icon: "calendar",
    items: [
      "Consulte ici les événements de la semaine (exemple à remplacer).",
      "Rappel des évaluations et travaux à rendre."
    ]
  },
  {
    title: "Horaire hebdomadaire",
    icon: "clock",
    items: [
      "Lundi : 8h00 - 15h30",
      "Mardi : 8h00 - 15h30",
      "Mercredi : 8h00 - 11h45",
      "Jeudi : 8h00 - 15h30",
      "Vendredi : 8h00 - 12h00"
    ]
  },
  {
    title: "Piscine / Natation",
    icon: "drop",
    items: [
      "Périodes de natation : à compléter (exemple).",
      "Prévoir maillot, bonnet et serviette."
    ]
  },
  {
    title: "Dates importantes",
    icon: "star",
    items: [
      "Réunion de parents : date à compléter.",
      "Vacances scolaires : à compléter."
    ]
  },
  {
    title: "Sorties scolaires",
    icon: "bus",
    items: [
      "Prochaine sortie : à compléter.",
      "L'autorisation ci-dessous est un exemple à remplacer."
    ],
    attachment: {
      label: "Autorisation de sortie (exemple)",
      file: "exemple-autorisation-sortie.pdf"
    }
  },
  {
    title: "Informations pour les parents",
    icon: "info",
    items: [
      "Merci de consulter régulièrement cette page.",
      "Pour toute question, voir la page Contacts (à venir)."
    ]
  }
];
