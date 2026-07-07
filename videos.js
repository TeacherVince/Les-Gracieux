/* =======================================================================
   VIDÉOTHÈQUE — Les Gracieux
   -----------------------------------------------------------------------
   Pour AJOUTER une vidéo : copie un bloc { ... } ci-dessous, colle-le
   juste avant le "];" final, et modifie les 4 valeurs.
   Pour SUPPRIMER une vidéo : supprime son bloc { ... } en entier.
   N'oublie pas la virgule "," entre chaque bloc, sauf après le dernier.

   category    : matière ou thème (sert de filtre sur la page)
   title       : titre affiché
   description : une phrase de présentation
   youtubeId   : le code après "watch?v=" dans l'adresse YouTube
                 ex : https://www.youtube.com/watch?v=aqz-KE-bpKQ
                      -> youtubeId = "aqz-KE-bpKQ"
   ======================================================================= */

window.VIDEOS_DATA = [
  {
    category: "Sciences",
    title: "Exemple de vidéo — à remplacer",
    description: "Remplace ce titre, cette description et l'identifiant YouTube par ta propre vidéo.",
    youtubeId: "aqz-KE-bpKQ"
  },
  {
    category: "Français",
    title: "Exemple de vidéo — à remplacer",
    description: "Une courte phrase qui explique ce que les élèves vont apprendre.",
    youtubeId: "aqz-KE-bpKQ"
  },
  {
    category: "Mathématiques",
    title: "Exemple de vidéo — à remplacer",
    description: "Cette vidéo peut illustrer une notion vue en classe.",
    youtubeId: "aqz-KE-bpKQ"
  },
  {
    category: "Musique",
    title: "Exemple de vidéo — à remplacer",
    description: "Idéal pour une écoute active ou une découverte d'instrument.",
    youtubeId: "aqz-KE-bpKQ"
  }
];
