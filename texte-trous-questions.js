/* =======================================================================
   MODÈLE 2 — TEXTE À TROUS
   -----------------------------------------------------------------------
   Pour AJOUTER une série : copie un bloc { title, subject, questions }.
   Pour AJOUTER une phrase : copie un bloc { text, answer }.

   text   : la phrase, avec trois underscores ___ à l'endroit du trou
   answer : le mot attendu (la comparaison ignore les majuscules
            et les espaces avant/après, mais pas les accents)
   ======================================================================= */

window.BLANKS_DATA = [
  {
    title: "Exemple — Vocabulaire de la ferme",
    subject: "Français",
    questions: [
      { text: "La vache donne du ___.", answer: "lait" },
      { text: "Le petit du chat s'appelle un ___.", answer: "chaton" },
      { text: "On récolte le miel grâce aux ___.", answer: "abeilles" }
    ]
  },
  {
    title: "Exemple — Conjugaison, verbe être",
    subject: "Français",
    questions: [
      { text: "Je ___ content d'apprendre.", answer: "suis" },
      { text: "Nous ___ en classe le lundi.", answer: "sommes" }
    ]
  }
];
