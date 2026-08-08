/* =======================================================================
   MÉDIATHÈQUE ARTS — Les Gracieux
   -----------------------------------------------------------------------
   Vidéos YouTube d'arts, organisées par catégorie et affichées sur
   arts-mediatheque.html. Contrairement aux médiathèques Français et
   Mathématiques (qui renvoient vers maitrelucas.fr), ces vidéos sont
   hébergées sur YouTube et se lisent directement dans la carte, comme
   dans l'onglet "Vidéos" : rien à héberger nous-mêmes.

   Pour AJOUTER une vidéo : copie un bloc { ... } ci-dessous, colle-le
   avant le "];" final de sa catégorie, et renseigne :

   id        : un identifiant unique et stable (sert à relier les
               commentaires à la bonne vidéo — ne change jamais l'id
               d'une vidéo qui a déjà des commentaires).
   category  : exactement l'une de ces valeurs : "Musique", "Image",
               "Création" ou "Expression" (détermine la section dans
               laquelle la vidéo apparaît).
   title     : le titre affiché sur la carte.
   youtubeId : le code après "watch?v=" dans l'adresse YouTube
               ex : https://www.youtube.com/watch?v=aqz-KE-bpKQ
                    -> youtubeId = "aqz-KE-bpKQ"

   N'oublie pas la virgule après le bloc précédent.
   ======================================================================= */

window.ARTS_MEDIATHEQUE_DATA = [

  /* ----------------------------- Musique ------------------------------ */
  {
    id: "video-art-1",
    category: "Musique",
    title: "Sergio Sobrino - Clarinette",
    youtubeId: "L7W-OoQVEE0"
  },
  {
    id: "video-art-2",
    category: "Musique",
    title: "Charles Berthoud - Basse",
    youtubeId: "2_qQzd-haA8"
  },
  {
    id: "video-art-3",
    category: "Musique",
    title: "Indiara Sfair - Harmonica",
    youtubeId: "aB9zBhRlCQk"
  },
  {
    id: "video-art-4",
    category: "Musique",
    title: "Zelda BOTW - Accordéon",
    youtubeId: "uhPhK57_Hbo"
  },

  /* ------------------------------- Image --------------------------------- */
  {
    id: "video-art-8",
    category: "Image",
    title: "Une des premières vidéos de l'histoire de l'Humanité",
    youtubeId: "XxdBtYyiViY"
  },
  {
    id: "video-art-9",
    category: "Image",
    title: "Les premiers effets spéciaux du cinéma - Georges Méliès, 1898",
    youtubeId: "IKQRV4XKZt4"
  },

  /* ---------------------------- Création -------------------------------- */
  {
    id: "video-art-5",
    category: "Création",
    title: "Fabriquer un bateau en papier",
    youtubeId: "ZdPtowjRPL4"
  },
  {
    id: "video-art-6",
    category: "Création",
    title: "Fabriquer un avion en papier",
    youtubeId: "-wL3wEKc6sg"
  },

  /* ---------------------------- Expression ------------------------------ */
  {
    id: "video-art-7",
    category: "Expression",
    title: "Tutoriel danse",
    youtubeId: "MRs6lxkRykQ"
  }

];
