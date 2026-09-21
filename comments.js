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
   seed    : optionnel. Un nombre de "j'aime" de départ, purement pour
             motiver les élèves (ex. 12). Il s'ajoute discrètement au
             vrai compteur (partagé entre visiteurs, stocké côté
             Netlify) : les vrais clics continuent de s'additionner
             par-dessus normalement. Laisse ce champ de côté pour un
             commentaire qui doit partir de 0.
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
    id: "comment-mattia-video-sciences-2",
    videoId: "video-sciences-2",
    name: "Mattia",
    text: "Incroyable 🤯😱",
    seed: 13
  },
  {
    id: "comment-jora-video-art-16",
    videoId: "video-art-16",
    name: "Jora",
    text: "J'aime la video 👍👍😆😝",
    seed: 11
  },
  {
    id: "comment-alex-video-art-13",
    videoId: "video-art-13",
    name: "alex",
    text: "Incroyable!!!",
    seed: 15
  }
];
