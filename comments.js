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
   ======================================================================= */

window.COMMENTS_DATA = [
  {
    videoId: "video-sciences-1",
    name: "Exemple",
    text: "Ceci est un commentaire d'exemple, à supprimer une fois que de vrais commentaires arrivent."
  }
];
