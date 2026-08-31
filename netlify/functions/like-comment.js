/* Les Gracieux — compteur de "j'aime" partagé pour les commentaires.

   Rôle : mémoriser, côté serveur (Netlify Blobs), combien de fois
   chaque commentaire a été aimé, pour que TOUS les visiteurs voient
   le même chiffre (contrairement aux favoris, qui restent propres à
   chaque appareil via localStorage).

   GET  /.netlify/functions/like-comment
        -> renvoie { "id-du-commentaire": nombreDeLikes, ... } pour
           tous les commentaires connus.

   POST /.netlify/functions/like-comment   body: { "commentId": "..." }
        -> incrémente le compteur de ce commentaire de 1 et renvoie
           { "commentId": "...", "likes": nouveauTotal }.

   Aucune vérification d'unicité : un même élève peut aimer plusieurs
   fois le même commentaire depuis plusieurs appareils, c'est voulu. */

const { getStore } = require("@netlify/blobs");

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: CORS_HEADERS, body: "" };
  }

  const store = getStore("comment-likes");

  if (event.httpMethod === "GET") {
    const list = await store.list();
    const counts = {};
    for (const item of list.blobs) {
      const raw = await store.get(item.key);
      counts[item.key] = parseInt(raw, 10) || 0;
    }
    return {
      statusCode: 200,
      headers: Object.assign({ "Content-Type": "application/json" }, CORS_HEADERS),
      body: JSON.stringify(counts)
    };
  }

  if (event.httpMethod === "POST") {
    let payload;
    try {
      payload = JSON.parse(event.body || "{}");
    } catch (e) {
      return { statusCode: 400, headers: CORS_HEADERS, body: "Requête invalide." };
    }

    const commentId = payload.commentId;
    if (!commentId || typeof commentId !== "string") {
      return { statusCode: 400, headers: CORS_HEADERS, body: "commentId manquant." };
    }

    const current = parseInt((await store.get(commentId)) || "0", 10) || 0;
    const next = current + 1;
    await store.set(commentId, String(next));

    return {
      statusCode: 200,
      headers: Object.assign({ "Content-Type": "application/json" }, CORS_HEADERS),
      body: JSON.stringify({ commentId: commentId, likes: next })
    };
  }

  return { statusCode: 405, headers: CORS_HEADERS, body: "Méthode non supportée." };
};
