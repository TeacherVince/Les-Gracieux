/* =======================================================================
   VIDÉOTHÈQUE — Les Gracieux
   -----------------------------------------------------------------------
   Les 4 matières (Art, Français, Mathématiques, Sciences & Histoire) ont
   chacune leur propre médiathèque dédiée (recherche, catégories,
   favoris, commentaires — voir *-mediatheque-data.js). Ce fichier ne
   sert donc plus qu'à ajouter, si besoin, une vidéo ponctuelle affichée
   directement sur la page "Vidéos" en dehors de toute médiathèque.

   Pour AJOUTER une vidéo : copie un bloc { ... } ci-dessous, colle-le
   juste avant le "];" final, et modifie les valeurs.
   Pour SUPPRIMER une vidéo : supprime son bloc { ... } en entier.
   N'oublie pas la virgule "," entre chaque bloc, sauf après le dernier.

   id          : identifiant unique et stable de la vidéo (sert à relier
                 les commentaires à la bonne vidéo). Ne change jamais
                 l'id d'une vidéo qui a déjà des commentaires.
   category    : matière ("Art", "Français", "Mathématiques" ou
                 "Sciences & Histoire" apparaissent en premier et dans
                 cet ordre ; toute autre valeur crée simplement une
                 nouvelle section, à la suite). Une matière sans aucune
                 vidéo n'affiche tout simplement pas de section.
   title       : titre affiché
   description : une phrase de présentation (facultatif, peut être "")
   youtubeId   : le code après "watch?v=" dans l'adresse YouTube
                 ex : https://www.youtube.com/watch?v=aqz-KE-bpKQ
                      -> youtubeId = "aqz-KE-bpKQ"
   ======================================================================= */

window.VIDEOS_DATA = [];
