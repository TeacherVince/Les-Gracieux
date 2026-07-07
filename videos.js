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
   category    : matière ("Art", "Français", "Mathématiques" ou
                 "Sciences & Histoire"). Une matière sans aucune vidéo
                 n'affiche tout simplement pas de section sur la page.
   title       : titre affiché
   description : une phrase de présentation (facultatif, peut être "")
   youtubeId   : le code après "watch?v=" dans l'adresse YouTube
                 ex : https://www.youtube.com/watch?v=aqz-KE-bpKQ
                      -> youtubeId = "aqz-KE-bpKQ"
   ======================================================================= */

window.VIDEOS_DATA = [
  {
    id: "video-art-1",
    category: "Art",
    title: "Concerto de clarinette",
    description: "",
    youtubeId: "0-jZJcpiy8I"
  },
  {
    id: "video-art-2",
    category: "Art",
    title: "Un super bassiste !",
    description: "",
    youtubeId: "2_qQzd-haA8"
  },
  {
    id: "video-art-3",
    category: "Art",
    title: "Chanson à l'harmonica !",
    description: "",
    youtubeId: "d6UtcxyUspQ"
  },
  {
    id: "video-art-4",
    category: "Art",
    title: "Une musique de Zelda à l'accordéon !",
    description: "",
    youtubeId: "uhPhK57_Hbo"
  },
  {
    id: "video-maths-1",
    category: "Mathématiques",
    title: "Maître Lucas – Multiplier par 10, 100 et 1000",
    description: "",
    youtubeId: "5P8jLOcZMoc"
  },
  {
    id: "video-maths-2",
    category: "Mathématiques",
    title: "Lire les grands nombres !",
    description: "",
    youtubeId: "U0KwKF4Swvg"
  },
  {
    id: "video-sciences-2",
    category: "Sciences & Histoire",
    title: "Une vidéo passionnante sur la profondeur des océans !",
    description: "",
    youtubeId: "PhS30G3utyo"
  },
  {
    id: "video-sciences-3",
    category: "Sciences & Histoire",
    title: "Une vidéo montrant un astronaute sortant de la Station spatiale internationale !",
    description: "",
    youtubeId: "mMZtpMSmqoE"
  },
  {
    id: "video-sciences-4",
    category: "Sciences & Histoire",
    title: "Pourquoi y a-t-il des saisons sur la Terre ?",
    description: "",
    youtubeId: "Ps1UPv4ETRk"
  },
  {
    id: "video-sciences-1",
    category: "Sciences & Histoire",
    title: "Voyage de la Préhistoire à l'Antiquité",
    description: "",
    youtubeId: "Cz4TpP2Isgs"
  }
];
