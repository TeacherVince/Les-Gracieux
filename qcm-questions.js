/* =======================================================================
   MODÈLE 1 — QUESTIONS À CHOIX MULTIPLES (QCM)
   -----------------------------------------------------------------------
   Pour AJOUTER une série d'exercices : copie un bloc { title, subject,
   questions } ci-dessous et modifie son contenu.
   Pour AJOUTER une question dans une série existante : copie un bloc
   { question, choices, correct } dans la liste "questions".

   correct : numéro de la bonne réponse dans "choices", en commençant
             à compter à partir de 0 (0 = premier choix, 1 = deuxième, etc.)
   ======================================================================= */

window.QCM_DATA = [
  {
    title: "Exemple — Le système solaire",
    subject: "Sciences",
    questions: [
      {
        question: "Combien de planètes compte notre système solaire ?",
        choices: ["6", "7", "8", "9"],
        correct: 2
      },
      {
        question: "Quelle est la planète la plus proche du Soleil ?",
        choices: ["Vénus", "Mercure", "Mars", "Terre"],
        correct: 1
      },
      {
        question: "Comment appelle-t-on le trajet de la Terre autour du Soleil ?",
        choices: ["Une rotation", "Une révolution", "Une éclipse", "Une orbite lunaire"],
        correct: 1
      }
    ]
  },
  {
    title: "Exemple — Les fractions",
    subject: "Mathématiques",
    questions: [
      {
        question: "Que représente la fraction 1/2 ?",
        choices: ["Un tiers", "Un quart", "La moitié", "Le double"],
        correct: 2
      },
      {
        question: "Quelle fraction est équivalente à 2/4 ?",
        choices: ["1/2", "1/3", "3/4", "2/3"],
        correct: 0
      }
    ]
  }
];
