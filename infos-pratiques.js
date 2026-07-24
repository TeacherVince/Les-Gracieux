/* =======================================================================
   INFOS PRATIQUES — Les Gracieux
   -----------------------------------------------------------------------
   Toute la page se pilote depuis ce seul fichier, organisé en cinq
   grandes parties : horaire, agenda, contacts, documents et FAQ.

   ---- horaire ----
   image : le nom exact du fichier image de l'horaire, déposé à la
   racine du dépôt (ex. "horaire.jpg"). Affiché en miniature cliquable,
   qui s'agrandit au clic. Mets image: "" pour masquer la section.

   ---- agenda ----
   Chaque ligne renvoie simplement au numéro de la page correspondante
   dans l'agenda officiel de l'élève (pas besoin de recopier le contenu).
   label : le nom de la catégorie.
   page  : le numéro de page à indiquer (texte libre : "12", "12-13"...).

   ---- contacts ----
   label : le rôle (Enseignant, École, Secrétariat, PPLS, Urgence...).
   value : le texte affiché (nom, téléphone, email...).

   ---- documents ----
   Même principe que sur les pages de branches : title, description
   (facultatif) et file (nom exact du fichier déposé à la racine du
   dépôt). Le bouton de téléchargement est ajouté automatiquement.

   ---- faq ----
   Une petite liste de questions/réponses, affichée discrètement en bas
   de page. q : la question. a : la réponse.
   ======================================================================= */

window.INFOS_DATA = {
  horaire: {
    image: "horaire.png"
  },

  agenda: [
    { label: "Horaire", page: "3" },
    { label: "Vacances scolaires", page: "5" },
    { label: "Absences et demandes de congé", page: "8" },
    { label: "Contacts utiles", page: "10" },
    { label: "Éducation numérique", page: "12" },
    { label: "Relations école-famille", page: "14" }
  ],

  contacts: [
    { label: "École", value: "Etablissement primaire de Morges-Est" },
    { label: "Secrétariat", value: "021 557 95 15" },
    { label: "PPLS", value: "021 557 85 60" }
  ],

  documents: [
    {
      title: "Autorisation de sortie (exemple)",
      description: "Document d'exemple à remplacer par tes propres formulaires.",
      file: "exemple-autorisation-sortie.pdf"
    }
  ],

  faq: [
    {
      q: "Comment annoncer une absence ?",
      a: "Contacter le secrétariat par téléphone avant 8h00 (voir la carte Contacts ci-dessus)."
    },
    {
      q: "Où trouver les devoirs ?",
      a: "Dans la carte « Cette semaine » sur la page d'accueil."
    },
    {
      q: "Où télécharger un document ?",
      a: "Dans la carte « Documents utiles » ci-dessus, ou sur la page de chaque branche."
    },
    {
      q: "Comment contacter l'enseignant ?",
      a: "Voir ses coordonnées dans la carte Contacts ci-dessus."
    }
  ]
};
