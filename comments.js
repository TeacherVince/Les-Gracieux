/* =======================================================================
   COMMENTAIRES APPROUVÉS — Les Gracieux
   -----------------------------------------------------------------------
   Ce fichier ne contient QUE les commentaires que tu as validés.

   Comment ça marche :
   1. Un visiteur écrit un commentaire sous une vidéo et l'envoie.
   2. Le commentaire part vers Netlify (onglet "Forms" de ton tableau
      de bord Netlify) — il n'apparaît PAS automatiquement sur le site.
   3. Tu relis les commentaires reçus dans Netlify.
   4. Si un commentaire te convient, tu l'ajoutes ici manuellement en
      copiant un bloc { ... } ci-dessous, avant le "];" final.
   5. Tu commits le fichier : le commentaire apparaît alors sur le site.

   Cette étape manuelle est volontaire : c'est ta modération.

   videoId : doit correspondre exactement à l'"id" de la vidéo dans
             videos.js (visible aussi dans le champ caché du
             commentaire reçu sur Netlify).
   name    : prénom affiché avec le commentaire.
   text    : le texte du commentaire.
   teacher : optionnel. Mets "true" pour un commentaire que TU écris toi-
             même (une règle, une astuce, un conseil pour la vidéo). Il
             s'affiche exactement comme les autres (même ordre
             chronologique, même mise en page), seul ton prénom apparaît
             en doré pour le différencier discrètement.
             Exemple :
             {
               id: "comment-exemple",
               videoId: "video-art-1",
               name: "Vincent",
               text: "Astuce : écoute d'abord une fois les yeux fermés,
                      juste pour le son, avant de regarder les doigts.",
               teacher: true
             },
   ======================================================================= */

window.COMMENTS_DATA = [
  {
    id: "comment-teacher-fr-gram-1",
    videoId: "fr-gram-1",
    name: "Vincent",
    text: "L'adjectif donne une précision au nom : → un tir cadré",
    teacher: true
  }
];
