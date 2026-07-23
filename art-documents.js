/* =======================================================================
   DOCUMENTS — Art
   -----------------------------------------------------------------------
   Pour AJOUTER un document :
   1. Dépose ton fichier (PDF de préférence) à la racine du dépôt,
      au même niveau que index.html.
   2. Copie un bloc { ... } ci-dessous, colle-le avant le "];" final,
      et modifie les valeurs.

   category    : sert de filtre sur la page ("Devoirs", "Fiches", ...)
   title       : titre affiché
   description : une phrase de contexte
   file        : nom exact du fichier, ex : "fiche-arts-visuels.pdf"
   ======================================================================= */

window.DOCUMENTS_DATA = [
  {
    category: "Chansons",
    title: "Dossier de chansons",
    description: "Un recueil de chansons à écouter et à chanter en classe.",
    file: "chansons.pdf"
  },
  {
    category: "Fiches",
    title: "Les styles musicaux",
    description: "Un tour d'horizon des grands styles musicaux : classique, reggae, électro, rock et jazz.",
    file: "styles.pdf"
  },
  {
    category: "Fiches",
    title: "Les familles des instruments",
    description: "Un tableau résumant les 3 familles d'instruments : vents, cordes et percussions.",
    file: "familles.pdf"
  }
];
