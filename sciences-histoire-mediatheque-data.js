/* =======================================================================
   MÉDIATHÈQUE SCIENCES & HISTOIRE — Les Gracieux
   -----------------------------------------------------------------------
   Vidéos YouTube de sciences et d'histoire, organisées par grand thème
   et affichées sur sciences-histoire-mediatheque.html avec un système de
   pastilles de filtre (plus agréable à parcourir que des catégories
   strictes) combiné à la recherche. Ces vidéos sont hébergées sur
   YouTube et se lisent directement dans la carte, comme dans l'onglet
   "Vidéos" : rien à héberger nous-mêmes.

   Pour AJOUTER une vidéo : copie un bloc { ... } ci-dessous, colle-le
   avant le "];" final de son thème, et renseigne :

   id        : un identifiant unique et stable (sert à relier les
               commentaires à la bonne vidéo — ne change jamais l'id
               d'une vidéo qui a déjà des commentaires).
   theme     : exactement l'une de ces valeurs : "univers", "nature",
               "eau", "vivant" ou "histoire" (détermine sous quelle
               pastille de filtre la vidéo apparaît — voir
               sciences-histoire-mediatheque.html).
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
   les pastilles de filtre (data-theme) de
   sciences-histoire-mediatheque.html.
   ======================================================================= */

window.SCIENCES_HISTOIRE_MEDIATHEQUE_DATA = [

  /* ---------------------- univers : 🪐 L'Univers et ses mystères -------- */
  { id: "video-sciences-4", theme: "univers", title: "Pourquoi y a-t-il des saisons sur la Terre ?", youtubeId: "Ps1UPv4ETRk" },
  { id: "video-sciences-3", theme: "univers", title: "Une vidéo montrant un astronaute sortant de la Station spatiale internationale !", youtubeId: "mMZtpMSmqoE" },
  { id: "video-sciences-8", theme: "univers", title: "Pourquoi flotte-t-on dans l'espace ?", youtubeId: "Njz8Gl6FLug" },
  { id: "video-sciences-21", theme: "univers", title: "Le vent sur Mars entendu par la sonde InSight (NASA)", youtubeId: "ZK5bOZx2xXs" },
  { id: "video-sciences-37", theme: "univers", title: "La Terre, la Lune et le Soleil expliqués", youtubeId: "KpkIHFqOE-I" },

  /* -------------------------- nature : 🌿 Mystérieuse Nature ------------ */
  { id: "video-sciences-5", theme: "nature", title: "Pourquoi le ciel est bleu ?", youtubeId: "fwiEcPCXLcI" },
  { id: "video-sciences-9", theme: "nature", title: "Comment fonctionne le cerveau ?", youtubeId: "5JnwC8ajz18" },
  { id: "video-sciences-14", theme: "nature", title: "Un cristal qui pousse, vu au microscope", youtubeId: "K297toCvHtY" },
  { id: "video-sciences-25", theme: "nature", title: "Une fleur qui s'ouvre sous nos yeux (National Geographic)", youtubeId: "LjCzPp-MK48" },
  { id: "video-sciences-26", theme: "nature", title: "La naissance d'un flocon de neige", youtubeId: "Nnq6RU690dg" },

  /* --------------------- eau : 🌊 Le monde magique de l'eau ------------- */
  { id: "video-sciences-12", theme: "eau", title: "Pourquoi les océans sont-ils salés ?", youtubeId: "Ha01wK-DmSY" },
  { id: "video-sciences-2", theme: "eau", title: "Une vidéo passionnante sur la profondeur des océans !", youtubeId: "PhS30G3utyo" },
  { id: "video-sciences-15", theme: "eau", title: "Comment marche une étoile de mer ? Vue par-dessous", youtubeId: "p0VM67cQUWw" },
  { id: "video-sciences-16", theme: "eau", title: "Le camouflage impressionnant d'un poulpe", youtubeId: "XocHDvHlcJM" },
  { id: "video-sciences-28", theme: "eau", title: "La méduse, un prédateur extrêmement fragile (National Geographic)", youtubeId: "-Yw90YgzA3I" },
  { id: "video-sciences-33", theme: "eau", title: "Le cycle de l'eau, de la pluie à l'océan", youtubeId: "4ZDC4bHVYaw" },

  /* ------------------------------ vivant : 🦋 La vie sauvage ------------ */
  { id: "video-sciences-6", theme: "vivant", title: "Comment les abeilles fabriquent le miel ?", youtubeId: "9W6y_ug_MuE" },
  { id: "video-sciences-11", theme: "vivant", title: "Pourquoi les dinosaures ont disparu ?", youtubeId: "ClRM6DELlV8" },
  { id: "video-sciences-17", theme: "vivant", title: "Une chenille devient papillon sous nos yeux", youtubeId: "ocWgSgMGxOc" },
  { id: "video-sciences-18", theme: "vivant", title: "Une fourmi observée en train de manger, au microscope", youtubeId: "w8_nivwW9Kc" },
  { id: "video-sciences-29", theme: "vivant", title: "La chorégraphie rythmée de l'araignée paon (National Geographic)", youtubeId: "I16wCyrB3fA" },
  { id: "video-sciences-30", theme: "vivant", title: "Un colibri filmé au ralenti (BBC Earth)", youtubeId: "cro1KFKmCzg" },
  { id: "video-sciences-35", theme: "vivant", title: "Le blob, un être vivant sans cerveau", youtubeId: "XHEc4Lm06gY" },
  { id: "video-sciences-36", theme: "vivant", title: "Le narval, la licorne des mers", youtubeId: "3vAxOH-Syd4" },
  { id: "video-sciences-38", theme: "vivant", title: "La chauve-souris, des oreilles qui voient", youtubeId: "6-q3K8ogqZo" },

  /* --------------------- histoire : 📜 L'Histoire et ses histoires ------ */
  { id: "video-sciences-1", theme: "histoire", title: "Voyage de la Préhistoire à l'Antiquité", youtubeId: "Cz4TpP2Isgs" },
  { id: "video-sciences-10", theme: "histoire", title: "La Préhistoire", youtubeId: "vxD_G8_WMVE" },
  { id: "video-sciences-19", theme: "histoire", title: "1996 : c'est quoi Internet ? — Archive INA", youtubeId: "NmSEJq4Mfk0" },
  { id: "video-sciences-31", theme: "histoire", title: "1969 : le premier vol du Concorde — Archive INA", youtubeId: "Uipm-O53GTQ" },
  { id: "video-sciences-34", theme: "histoire", title: "Le tout premier son enregistré de l'Histoire", youtubeId: "NyWBI8UtsD4" },
  { id: "video-sciences-39", theme: "histoire", title: "La conquête de la Terre par nos ancêtres", youtubeId: "YWynUCwXrGo" }

];
