/* =======================================================================
   DEFIS -- Orthographe -- banque de questions (homophones)
   -----------------------------------------------------------------------
   Format mixte, volontaire : certaines questions ont 4 choix cliquables
   à côté de la phrase à trou (choices), d'autres demandent d'écrire la
   réponse (answer + acceptable). Alternance régulière dans chaque
   famille d'homophones pour que l'élève pratique les deux : reconnaître
   le bon mot ET l'écrire correctement.

   Les phrases ont été ajustées pour qu'une seule réponse soit correcte,
   même en écriture libre (ex. "Ces histoires-là" : le "-là" impose la
   lecture démonstrative et écarte "ses").

   Genere par script, a valider via le fichier Excel correspondant avant
   utilisation en classe.
   ======================================================================= */

window.ORTHOGRAPHE_DATA = [
  { prompt: "Elle rigole avec ___ petit frère.", answer: "son", acceptable: [] },
  { prompt: "Mes parents ___ partis au marché.", choices: ["son", "sont", "sa", "ont"], answer: "sont" },
  { prompt: "Julie a perdu ___ cahier.", answer: "son", acceptable: [] },
  { prompt: "Ils ___ contents de te voir.", choices: ["son", "sont", "sa", "ont"], answer: "sont" },
  { prompt: "Le bébé dort dans ___ lit.", answer: "son", acceptable: [] },

  { prompt: "Tu préfères le jus de pomme ___ le jus d'orange ?", choices: ["ou", "où", "et", "on"], answer: "ou" },
  { prompt: "Je ne sais pas ___ il est parti.", answer: "où", acceptable: [] },
  { prompt: "Veux-tu du thé ___ du café ?", choices: ["ou", "où", "et", "on"], answer: "ou" },
  { prompt: "C'est la ville ___ je suis né.", answer: "où", acceptable: [] },
  { prompt: "Range tes affaires ___ tu veux.", choices: ["ou", "où", "et", "on"], answer: "où" },

  { prompt: "___ livre appartient à Thomas.", answer: "Ce", acceptable: ["ce"] },
  { prompt: "Il va ___ coucher tôt.", choices: ["ce", "se", "ces", "ses"], answer: "se" },
  { prompt: "___ chat est très joueur.", answer: "Ce", acceptable: ["ce"] },
  { prompt: "Elle va ___ promener au parc.", choices: ["ce", "se", "ces", "ses"], answer: "se" },
  { prompt: "___ dessin est magnifique.", answer: "Ce", acceptable: ["ce"] },

  { prompt: "___ une belle journée.", choices: ["C'est", "S'est", "Ce", "Se"], answer: "C'est" },
  { prompt: "Il ___ blessé au genou en tombant.", answer: "s'est", acceptable: [] },
  { prompt: "___ mon anniversaire aujourd'hui.", choices: ["C'est", "S'est", "Ce", "Se"], answer: "C'est" },
  { prompt: "Elle ___ endormie tard hier soir.", answer: "s'est", acceptable: [] },
  { prompt: "___ ici que j'habite.", choices: ["C'est", "S'est", "Ce", "Se"], answer: "C'est" },

  { prompt: "___ enfants-là sont très polis.", answer: "Ces", acceptable: ["ces"] },
  { prompt: "Il range ___ propres affaires dans son sac.", choices: ["ces", "ses", "c'est", "s'est"], answer: "ses" },
  { prompt: "___ fleurs-ci sentent très bon.", answer: "Ces", acceptable: ["ces"] },
  { prompt: "Julie a oublié ___ propres clés à la maison.", choices: ["ces", "ses", "c'est", "s'est"], answer: "ses" },
  { prompt: "___ histoires-là me font toujours rire.", answer: "Ces", acceptable: ["ces"] },

  { prompt: "___ amis viennent demain à la maison.", choices: ["Mes", "Mais", "Met", "Mai"], answer: "Mes" },
  { prompt: "J'aime le chocolat, ___ je préfère les fraises.", answer: "mais", acceptable: [] },
  { prompt: "Mon anniversaire est au mois de ___.", choices: ["mes", "mais", "met", "mai"], answer: "mai" },
  { prompt: "Elle ___ son manteau avant de sortir.", answer: "met", acceptable: [] },
  { prompt: "___ parents travaillent tous les jours.", choices: ["Mes", "Mais", "Met", "Mai"], answer: "Mes" },

  { prompt: "Il ___ un chat noir à la maison.", answer: "a", acceptable: [] },
  { prompt: "Nous allons ___ l'école à pied.", choices: ["a", "à", "as", "on"], answer: "à" },
  { prompt: "Elle ___ fini tous ses devoirs.", answer: "a", acceptable: [] },
  { prompt: "Le livre appartient ___ Thomas.", choices: ["a", "à", "as", "on"], answer: "à" },
  { prompt: "Julie ___ mangé une pomme.", answer: "a", acceptable: [] },

  { prompt: "___ joue au parc cet après-midi ?", choices: ["On", "Ont", "Sont", "Et"], answer: "On" },
  { prompt: "Ils ___ gagné le match de football.", answer: "ont", acceptable: [] },
  { prompt: "___ mange à midi à la cantine.", choices: ["On", "Ont", "Sont", "Et"], answer: "On" },
  { prompt: "Mes parents ___ une voiture rouge.", answer: "ont", acceptable: [] },

  { prompt: "Le ciel ___ tout bleu aujourd'hui.", choices: ["est", "et", "es", "ont"], answer: "est" },
  { prompt: "Julie ___ Thomas jouent ensemble dans le jardin.", answer: "et", acceptable: [] },
  { prompt: "Il ___ très fatigué ce soir.", choices: ["est", "et", "es", "ont"], answer: "est" },
  { prompt: "J'aime les chats ___ les chiens.", answer: "et", acceptable: [] }
];
