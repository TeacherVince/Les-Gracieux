/* =======================================================================
   VIDÉOTHÈQUE — Les Gracieux
   -----------------------------------------------------------------------
   Pour AJOUTER une vidéo : copie un bloc { ... } ci-dessous, colle-le
   juste avant le "];" final, et modifie les valeurs.
   Pour SUPPRIMER une vidéo : supprime son bloc { ... } en entier.
   N'oublie pas la virgule "," entre chaque bloc, sauf après le dernier.

   id          : identifiant unique et stable de la vidéo (sert à relier
                 les commentaires à la bonne vidéo). Ne change jamais
                 l'id d'une vidéo qui a déjà des commentaires.
   category    : matière ou thème (sert de filtre sur la page)
   title       : titre affiché
   description : une phrase de présentation
   youtubeId   : le code après "watch?v=" dans l'adresse YouTube
                 ex : https://www.youtube.com/watch?v=aqz-KE-bpKQ
                      -> youtubeId = "aqz-KE-bpKQ"
   ======================================================================= */

window.VIDEOS_DATA = [
  {
    id: "video-sciences-1",
    category: "Sciences & Histoire",
    title: "Voyage de la Préhistoire à l'Antiquité",
    description: "PLACEHOLDER : identifiant YouTube d'exemple à remplacer par le vrai lien de cette vidéo.",
    youtubeId: "aqz-KE-bpKQ"
  },
  {
    id: "video-francais-1",
    category: "Français",
    title: "Exemple de vidéo — à remplacer",
    description: "Une courte phrase qui explique ce que les élèves vont apprendre.",
    youtubeId: "aqz-KE-bpKQ"
  },
  {
    id: "video-maths-1",
    category: "Mathématiques",
    title: "Exemple de vidéo — à remplacer",
    description: "Cette vidéo peut illustrer une notion vue en classe.",
    youtubeId: "aqz-KE-bpKQ"
  },
  {
    id: "video-arts-1",
    category: "Arts",
    title: "Exemple de vidéo — à remplacer",
    description: "Idéal pour une écoute active ou une découverte artistique.",
    youtubeId: "aqz-KE-bpKQ"
  }
];
