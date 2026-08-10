/* =======================================================================
   INFOS PRATIQUES — Les Gracieux
   -----------------------------------------------------------------------
   Toute la page se pilote depuis ce seul fichier, organisé en six
   grandes parties, affichées dans cet ordre : horaire, agenda,
   piscine et gym, documents, contacts et FAQ.

   ---- horaire ----
   image : le nom exact du fichier image de l'horaire, déposé à la
   racine du dépôt (ex. "horaire.jpg"). Affiché en miniature cliquable,
   qui s'agrandit au clic. Mets image: "" pour masquer la section.

   ---- agenda ----
   Chaque ligne renvoie simplement au numéro de la page correspondante
   dans l'agenda officiel de l'élève (pas besoin de recopier le contenu).
   label : le nom de la catégorie.
   page  : le numéro de page à indiquer (texte libre : "12", "12-13"...).

   ---- piscineGym ----
   Les infos stables (jour, fréquence) qui ne changent pas chaque
   semaine. Le détail semaine par semaine qui varie réellement d'une
   semaine à l'autre (est-ce qu'il y a piscine cette semaine) reste
   dans la carte "Informations de la semaine" de la page d'accueil.
   label : "Piscine" ou "Gym".
   info  : le texte affiché.

   ---- contacts ----
   label : le rôle (Enseignant, École, Secrétariat, PPLS, Urgence...).
   value : le texte affiché (nom, téléphone, email...).

   ---- documents ----
   Même principe que sur les pages de branches : title, description
   (facultatif) et file. Pour file, deux options : soit le nom exact
   d'un fichier déposé à la racine du dépôt (ex. "mon-document.pdf"),
   soit une adresse complète (https://...) vers un document hébergé
   ailleurs. Le bouton de téléchargement est ajouté automatiquement.

   ---- faq ----
   Une petite liste de questions/réponses, affichée discrètement en bas
   de page. q : la question. a : la réponse.
   ======================================================================= */

window.INFOS_DATA = {
  horaire: {
    image: "horaire.png"
  },

  agenda: [
     { label: "Contacts utiles", page: "2" },
     { label: "Horaire", page: "4" },
     { label: "Absences et congé joker", page: "98" },
     { label: "Justificatifs d'absence", page: "99 à 111" }
  ],

  piscineGym: [
    { label: "Piscine", info: "Un mardi sur deux (semaines paires). Prochain cours sur l'accueil." },
    { label: "Gym", info: "Tous les lundis après-midi. Prendre ses affaires de sport." }
  ],

  contacts: [
    { label: "École", value: "Etablissement primaire de Morges-Est" },
    { label: "Secrétariat", value: "021 557 95 15" },
    { label: "PPLS", value: "021 557 85 60" }
  ],

  documents: [
    {
      title: "Justificatif d'absence / demande de congé",
      description: "Formulaire officiel du Canton de Vaud à remplir et signer par un parent.",
      file: "https://www.vd.ch/fileadmin/user_upload/organisation/dfj/dgeo/fichiers_pdf/formulaires/Formulaire_absence-conge.pdf"
    },
    {
      title: "Utilisation des écrans et conseils",
      description: "Cadre pour l'usage des écrans à l'école et conseils pour la maison (Canton de Vaud).",
      file: "https://www.vd.ch/fileadmin/user_upload/organisation/dfj/dgeo/fichiers_pdf/depliants/DGEO_cadre_usage_ecrans-FR.pdf"
    },
    {
      title: "Vacances scolaires",
      description: "Le calendrier des vacances scolaires vaudoises, jusqu'en 2031 — parce qu'on aime voir loin.",
      file: "vacances-scolaires-vaudoises.pdf"
    }
  ],

  faq: [
    {
      q: "Comment annoncer une absence ?",
      a: "Contacter l'enseignant par message ou téléphone avant 8h30."
    },
    {
      q: "Quand y a-t-il des devoirs ?",
      a: "Du mardi au vendredi. Les devoirs sont affichés sur la page d'accueil et dans l'agenda de l'élève."
    },
    {
      q: "Quand ont lieu les cours de gym ?",
      a: "Tous les lundis après-midi : prendre ses affaires de sport ce jour-là."
    },
    {
      q: "Comment savoir s'il y a piscine cette semaine ?",
      a: "C'est indiqué sur la page d'accueil. Le rythme habituel est un mardi sur 2 (semaines paires)."
    },
    {
      q: "Où télécharger un document ?",
      a: "Dans la carte « Documents utiles » ci-dessus, ou sur la page de chaque branche."
    },
    {
      q: "Où trouver les objectifs ?",
      a: "Dans l'onglet « Objectifs » du menu, matière par matière."
    },
    {
      q: "Où retrouver les vidéos pour réviser ?",
      a: "Dans l'onglet « Vidéos », ou depuis la section « Aller plus loin » de chaque branche."
    },
    {
      q: "Les commentaires publiés sur le site sont-ils modérés ?",
      a: "Oui. Tous les commentaires sont placés en attente et doivent être validés par l'enseignant avant d'apparaître publiquement sur le site."
    },
    {
      q: "Où sont sauvegardés les scores des défis et les textes écrits par les élèves ?",
      a: "Tout reste en local, sur l'appareil de l'enfant (ordinateur ou tablette) : rien n'est envoyé sur un serveur.\nSi l'enfant change d'appareil ou de navigateur, il ne retrouvera pas ses scores ni ses textes."
    }
  ]
};
