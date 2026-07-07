/* =======================================================================
   MODÈLE 3 — VRAI OU FAUX
   -----------------------------------------------------------------------
   Pour AJOUTER une série : copie un bloc { title, subject, questions }.
   Pour AJOUTER une affirmation : copie un bloc { statement, answer }.

   answer : true si l'affirmation est vraie, false si elle est fausse
   ======================================================================= */

window.TF_DATA = [
  {
    title: "Exemple — Le corps humain",
    subject: "Sciences",
    questions: [
      { statement: "Le cœur est un muscle.", answer: true },
      { statement: "Les humains ont 4 poumons.", answer: false },
      { statement: "Le sang circule grâce au cœur.", answer: true }
    ]
  },
  {
    title: "Exemple — Histoire",
    subject: "Histoire",
    questions: [
      { statement: "La Suisse compte 26 cantons.", answer: true },
      { statement: "La Confédération suisse a été fondée en 1291.", answer: true }
    ]
  }
];
