/* =======================================================================
   MÉDIATHÈQUE SCIENCES & HISTOIRE — Les Gracieux
   -----------------------------------------------------------------------
   Vidéos YouTube de sciences et d'histoire, organisées par catégorie et
   affichées sur sciences-histoire-mediatheque.html. Contrairement aux
   médiathèques Français et Mathématiques (qui renvoient vers
   maitrelucas.fr), ces vidéos sont hébergées sur YouTube et se lisent
   directement dans la carte, comme dans l'onglet "Vidéos" : rien à
   héberger nous-mêmes.

   Pour AJOUTER une vidéo : copie un bloc { ... } ci-dessous, colle-le
   avant le "];" final de sa catégorie, et renseigne :

   id        : un identifiant unique et stable (sert à relier les
               commentaires à la bonne vidéo — ne change jamais l'id
               d'une vidéo qui a déjà des commentaires).
   category  : exactement l'une de ces valeurs : "Découvertes",
               "Exploration", "Temps" ou "Inventions" (détermine la
               section dans laquelle la vidéo apparaît).
   title     : le titre affiché sur la carte.
   youtubeId : le code après "watch?v=" dans l'adresse YouTube
               ex : https://www.youtube.com/watch?v=aqz-KE-bpKQ
                    -> youtubeId = "aqz-KE-bpKQ"

   N'oublie pas la virgule après le bloc précédent.
   ======================================================================= */

window.SCIENCES_HISTOIRE_MEDIATHEQUE_DATA = [

  /* --------------------------- Découvertes ----------------------------- */
  {
    id: "video-sciences-4",
    category: "Découvertes",
    title: "Pourquoi y a-t-il des saisons sur la Terre ?",
    youtubeId: "Ps1UPv4ETRk"
  },
  {
    id: "video-sciences-5",
    category: "Découvertes",
    title: "Pourquoi le ciel est bleu ?",
    youtubeId: "fwiEcPCXLcI"
  },
  {
    id: "video-sciences-6",
    category: "Découvertes",
    title: "Comment les abeilles fabriquent le miel ?",
    youtubeId: "9W6y_ug_MuE"
  },
  {
    id: "video-sciences-9",
    category: "Découvertes",
    title: "Comment fonctionne le cerveau ?",
    youtubeId: "5JnwC8ajz18"
  },
  {
    id: "video-sciences-12",
    category: "Découvertes",
    title: "Pourquoi les océans sont-ils salés ?",
    youtubeId: "Ha01wK-DmSY"
  },

  /* ---------------------------- Exploration ----------------------------- */
  {
    id: "video-sciences-2",
    category: "Exploration",
    title: "Une vidéo passionnante sur la profondeur des océans !",
    youtubeId: "PhS30G3utyo"
  },
  {
    id: "video-sciences-3",
    category: "Exploration",
    title: "Une vidéo montrant un astronaute sortant de la Station spatiale internationale !",
    youtubeId: "mMZtpMSmqoE"
  },
  {
    id: "video-sciences-7",
    category: "Exploration",
    title: "Les supervolcans : tout comprendre",
    youtubeId: "-Y4jLQBnz2M"
  },
  {
    id: "video-sciences-8",
    category: "Exploration",
    title: "Pourquoi flotte-t-on dans l'espace ?",
    youtubeId: "Njz8Gl6FLug"
  },

  /* ------------------------------- Temps --------------------------------- */
  {
    id: "video-sciences-1",
    category: "Temps",
    title: "Voyage de la Préhistoire à l'Antiquité",
    youtubeId: "Cz4TpP2Isgs"
  },
  {
    id: "video-sciences-10",
    category: "Temps",
    title: "La Préhistoire",
    youtubeId: "vxD_G8_WMVE"
  },
  {
    id: "video-sciences-11",
    category: "Temps",
    title: "Pourquoi les dinosaures ont disparu ?",
    youtubeId: "ClRM6DELlV8"
  }

  /* ----------------------------- Inventions -------------------------------
     (aucune vidéo pour l'instant — ajoute un bloc ici) */

];
