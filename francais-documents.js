/* =======================================================================
   DOCUMENTS — Français
   -----------------------------------------------------------------------
   Pour AJOUTER un document :
   1. Dépose ton fichier (PDF de préférence) à la racine du dépôt,
      au même niveau que index.html.
   2. Copie un bloc { ... } ci-dessous, colle-le avant le "];" final,
      et modifie les valeurs.

   category    : sert de filtre sur la page ("Devoirs", "Fiches", ...)
   title       : titre affiché
   description : une phrase de contexte
   file        : nom exact du fichier, ex : "fiche-vocabulaire.pdf"
   ======================================================================= */

window.DOCUMENTS_DATA = [
  {
    category: "Fiches",
    title: "Les principaux homophones",
    description: "Un dossier pour ne plus confondre les homophones les plus courants (a/à, ou/où, son/sont...).",
    file: "homophon.pdf"
  },
  {
    category: "Fiches",
    title: "Les accords dans le groupe nominal",
    description: "Comment accorder en genre et en nombre les mots du groupe nominal.",
    file: "accordgn.pdf"
  },
  {
    category: "Fiches",
    title: "Les types de phrases",
    description: "Les quatre types de phrases (déclarative, interrogative, impérative, exclamative) et comment les reconnaître.",
    file: "phrases.pdf"
  },
  {
    category: "Fiches",
    title: "Les pronoms",
    description: "Les pronoms personnels selon la personne et le nombre (singulier, pluriel).",
    file: "pronoms.pdf"
  },
  {
    category: "Fiches",
    title: "Synonymes et antonymes",
    description: "La différence entre synonymes et antonymes, avec des exemples.",
    file: "synonyme.pdf"
  },
  {
    category: "Fiches",
    title: "Les classes grammaticales (adj, adv, prép...)",
    description: "Un mémo des classes grammaticales : nom, adjectif, adverbe, préposition, et bien d'autres.",
    file: "classegr.pdf"
  }
];
