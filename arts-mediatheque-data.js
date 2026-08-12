/* =======================================================================
   MÉDIATHÈQUE ARTS — Les Gracieux
   -----------------------------------------------------------------------
   Vidéos YouTube d'arts, organisées par grand thème et affichées sur
   arts-mediatheque.html avec un système de pastilles de filtre (plus
   agréable à parcourir que des catégories strictes) combiné à la
   recherche. Ces vidéos sont hébergées sur YouTube et se lisent
   directement dans la carte, comme dans l'onglet "Vidéos" : rien à
   héberger nous-mêmes.

   Pour AJOUTER une vidéo : copie un bloc { ... } ci-dessous, colle-le
   avant le "];" final de son thème, et renseigne :

   id        : un identifiant unique et stable (sert à relier les
               commentaires à la bonne vidéo — ne change jamais l'id
               d'une vidéo qui a déjà des commentaires).
   theme     : exactement l'une de ces valeurs : "musique", "image",
               "creer" ou "autrement" (détermine sous quelle pastille de
               filtre la vidéo apparaît — voir arts-mediatheque.html).
   title     : le titre affiché sur la carte.
   youtubeId : le code après "watch?v=" dans l'adresse YouTube
               ex : https://www.youtube.com/watch?v=aqz-KE-bpKQ
                    -> youtubeId = "aqz-KE-bpKQ"
   noEmbed   : (optionnel) mettre "true" si la chaîne d'origine
               désactive la lecture intégrée (erreur "Erreur de
               configuration du lecteur vidéo") : dans ce cas, cliquer
               sur la vignette ouvre directement YouTube dans un nouvel
               onglet au lieu de lire la vidéo sur place.

   N'oublie pas la virgule après le bloc précédent. Si tu ajoutes ou
   retires une vidéo, pense aussi à corriger les compteurs affichés dans
   les pastilles de filtre (data-theme) de arts-mediatheque.html.
   ======================================================================= */

window.ARTS_MEDIATHEQUE_DATA = [

  /* ------------------------- musique : 🎵 Sons & musique ---------------- */
  { id: "video-art-1", theme: "musique", title: "Sergio Sobrino - Clarinette", youtubeId: "L7W-OoQVEE0" },
  { id: "video-art-2", theme: "musique", title: "Charles Berthoud - Basse", youtubeId: "2_qQzd-haA8" },
  { id: "video-art-3", theme: "musique", title: "Indiara Sfair - Harmonica", youtubeId: "aB9zBhRlCQk" },
  { id: "video-art-4", theme: "musique", title: "Zelda BOTW - Accordéon", youtubeId: "uhPhK57_Hbo" },
  { id: "video-art-10", theme: "musique", title: "Wintergatan - Marble Machine (machine à billes musicale)", youtubeId: "IvUU8joBb1Q" },
  { id: "video-art-11", theme: "musique", title: "Animusic - Pipe Dream", youtubeId: "hyCIpKAIFyo" },
  { id: "video-art-12", theme: "musique", title: "Animusic - Resonant Chamber", youtubeId: "toXNVbvFXyk" },

  /* -------------------- image : 🎭 Illusions & images étonnantes -------- */
  { id: "video-art-8", theme: "image", title: "Une des premières vidéos de l'histoire de l'Humanité", youtubeId: "XxdBtYyiViY" },
  { id: "video-art-9", theme: "image", title: "Les premiers effets spéciaux du cinéma - Georges Méliès, 1898", youtubeId: "IKQRV4XKZt4" },
  { id: "video-art-13", theme: "image", title: "Ambiguous Cylinder Illusion", youtubeId: "oWfFco7K9v8" },
  { id: "video-art-14", theme: "image", title: "Amazing Anamorphic Illusions !", youtubeId: "tBNHPk-Lnkk" },
  { id: "video-art-15", theme: "image", title: "Silhouette Zoetrope", youtubeId: "2-A_Pcrz6xU" },
  { id: "video-art-16", theme: "image", title: "Fresh Guacamole - PES", youtubeId: "dNJdJIwCF_Y" },

  /* --------------------------- creer : ✋ Créer avec ses mains ----------- */
  { id: "video-art-5", theme: "creer", title: "Fabriquer un bateau en papier", youtubeId: "ZdPtowjRPL4" },
  { id: "video-art-6", theme: "creer", title: "Fabriquer un avion en papier", youtubeId: "-wL3wEKc6sg" },
  { id: "video-art-17", theme: "creer", title: "Créer un flip-book qui s'anime - Centre Pompidou", youtubeId: "UIYrc1ekcTo" },
  { id: "video-art-18", theme: "creer", title: "Le pop-up - Centre Pompidou", youtubeId: "x0GRodqHvoE" },
  { id: "video-art-19", theme: "creer", title: "Le pochoir - Centre Pompidou", youtubeId: "GLSKLorYi6k" },
  { id: "video-art-20", theme: "creer", title: "Le papier découpé - Centre Pompidou", youtubeId: "dE0D2LNn4mg" },
  { id: "video-art-21", theme: "creer", title: "Le théâtre d'ombres - Centre Pompidou", youtubeId: "Ud3Si5qPw4M" },

  /* -------------------------- autrement : 🌀 L'art autrement ------------ */
  { id: "video-art-7", theme: "autrement", title: "Tutoriel danse", youtubeId: "MRs6lxkRykQ" },
  { id: "video-art-22", theme: "autrement", title: "Le portrait géant fait d'objets - Bernard Pras", youtubeId: "s3x5fwv0UdU" },
  { id: "video-art-23", theme: "autrement", title: "Les sculptures géantes qui marchent - Strandbeest", youtubeId: "-JyK-TYpUSY" },
  { id: "video-art-24", theme: "autrement", title: "JR au Louvre et le secret de la Grande Pyramide", youtubeId: "rsnpm1_IXbw", noEmbed: true }

];
