/* =======================================================================
   DOCUMENTS — Sciences & Histoire
   -----------------------------------------------------------------------
   Pour AJOUTER un document :
   1. Dépose ton fichier (PDF de préférence) à la racine du dépôt,
      au même niveau que index.html.
   2. Copie un bloc { ... } ci-dessous, colle-le avant le "];" final,
      et modifie les valeurs.

   category    : sert de filtre sur la page ("Devoirs", "Fiches", ...)
   title       : titre affiché
   description : une phrase de contexte
   file        : nom exact du fichier, ex : "fiche-observation.pdf"

   Deux champs optionnels permettent de faire ressortir un document dans
   une zone dédiée en haut de page (sinon il reste dans la liste
   générale ci-dessus) :
   dateAdded : "2026-08-09" → apparaît dans "Documents récents" pendant
               21 jours, puis retombe automatiquement dans sa zone
               normale.
   type      : "reference" → "Fiches de référence" (documents à garder
               sous la main toute l'année), ou "revision" → "Pour
               réviser" (exercices, fiches à retravailler).
   ======================================================================= */

window.DOCUMENTS_DATA = [
  {
    category: "Fiches",
    title: "Fiche d'observation (exemple)",
    description: "Document d'exemple à remplacer par tes propres fiches.",
    file: "exemple-sciences-histoire.pdf"
  }
];
