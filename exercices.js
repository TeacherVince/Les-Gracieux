/* =======================================================================
   ESPACE DE TÉLÉCHARGEMENT — Les Gracieux
   -----------------------------------------------------------------------
   Pour AJOUTER un document :
   1. Dépose ton fichier (PDF de préférence) dans le dossier
      assets/documents/
   2. Copie un bloc { ... } ci-dessous, colle-le avant le "];" final,
      et modifie les valeurs. "file" doit correspondre EXACTEMENT
      au nom du fichier déposé (attention aux majuscules et accents,
      évite les espaces : utilise des tirets).

   category    : sert de filtre sur la page ("Devoirs", "Parents", ...)
   title       : titre affiché
   description : une phrase de contexte (échéance, contenu, etc.)
   file        : chemin vers le fichier, ex : "assets/documents/mon-fichier.pdf"
   ======================================================================= */

window.DOCUMENTS_DATA = [
  {
    category: "Parents",
    title: "Feuille de route de la semaine (exemple)",
    description: "Résumé des apprentissages et informations pratiques.",
    file: "assets/documents/exemple-feuille-de-route.pdf"
  },
  {
    category: "Devoirs",
    title: "Fiche de vocabulaire (exemple)",
    description: "À réviser pour la prochaine évaluation.",
    file: "assets/documents/exemple-fiche-vocabulaire.pdf"
  },
  {
    category: "Administratif",
    title: "Autorisation de sortie (exemple)",
    description: "À imprimer, signer et rapporter à l'enseignant.",
    file: "assets/documents/exemple-autorisation-sortie.pdf"
  }
];
