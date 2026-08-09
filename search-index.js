/* =======================================================================
   PRÉPARATION — Recherche globale du portail
   -----------------------------------------------------------------------
   Ce fichier n'est PAS branché sur les pages du site pour l'instant
   (aucune barre de recherche n'existe aujourd'hui) : il ne coûte donc
   rien en performance tant qu'il n'est chargé nulle part. C'est une
   préparation technique, prête à être activée le jour où une recherche
   globale devient pertinente (quand il y aura assez de contenu pour
   que ça vaille la peine).

   Deux briques, pensées pour rester simples à maintenir :

   1. SITE_PAGES : la carte de toutes les pages du site (titre, adresse,
      description courte). Se met à jour à la main, une ligne par page
      ajoutée ou retirée — il n'y en a qu'une quinzaine, pas besoin de
      plus compliqué. Permet dès aujourd'hui de retrouver une PAGE par
      son nom ou son thème.

   2. buildLocalSearchIndex() : à appeler sur une page qui contient déjà
      des données (DOCUMENTS_DATA, VIDEOS_DATA, INFOS_DATA, ou les
      *_MEDIATHEQUE_DATA), renvoie une liste plate et normalisée
      { type, title, description, url } de tout ce qui est cherchable
      sur CETTE page. C'est la même logique que la recherche déjà
      utilisée dans la médiathèque Français, généralisée pour être
      réutilisable ailleurs.

   Pour une VRAIE recherche globale (qui traverse toutes les pages, pas
   seulement celle en cours), la suite logique le jour venu : ajouter
   une étape à la commande de build Netlify (voir netlify.toml, déjà en
   place pour build-info.js) qui parcourt les fichiers *-data.js du
   dépôt et assemble un seul fichier search-index.json avec le résultat
   de buildLocalSearchIndex() pour chaque page. Pas besoin d'y toucher
   avant que ce soit vraiment utile : la structure ci-dessous suffit à
   démarrer ce jour-là sans tout repenser.
   ======================================================================= */

(function () {
  "use strict";

  window.SITE_PAGES = [
    { title: "Accueil", url: "index.html", description: "Informations de la semaine, devoirs et portail du site." },
    { title: "Objectifs", url: "objectifs.html", description: "Les compétences visées cette année, matière par matière." },
    { title: "Branches", url: "branches.html", description: "Arts, français, mathématiques, Sciences & Histoire : documents par matière." },
    { title: "Arts", url: "art.html", description: "Documents et ressources de la branche Arts." },
    { title: "Français", url: "francais.html", description: "Documents et ressources de la branche Français." },
    { title: "Mathématiques", url: "mathematiques.html", description: "Documents et ressources de la branche Mathématiques." },
    { title: "Sciences & Histoire", url: "sciences-histoire.html", description: "Documents et ressources de la branche Sciences & Histoire." },
    { title: "Vidéos", url: "videos.html", description: "Les 4 médiathèques et les vidéos ponctuelles à regarder." },
    { title: "Médiathèque Français", url: "francais-mediatheque.html", description: "Grammaire, conjugaison, orthographe, vocabulaire en vidéo." },
    { title: "Médiathèque Mathématiques", url: "mathematiques-mediatheque.html", description: "Numération, calcul, mesures, géométrie en vidéo." },
    { title: "Médiathèque Arts", url: "arts-mediatheque.html", description: "Musique, image, création, expression en vidéo." },
    { title: "Médiathèque Sciences & Histoire", url: "sciences-histoire-mediatheque.html", description: "Découvertes, exploration, temps et inventions en vidéo." },
    { title: "Infos pratiques", url: "infos-pratiques.html", description: "Horaire, agenda, piscine et gym, documents, contacts, FAQ." }
  ];

  // Même règle que sur Infos pratiques et les pages de branches : file
  // peut être un nom de fichier local (à encoder) ou une adresse
  // complète vers un document externe (à laisser telle quelle).
  function docHref(file) {
    return /^https?:\/\//i.test(file) ? file : encodeURIComponent(file);
  }

  // Rassemble tout ce qui est cherchable sur LA PAGE EN COURS (pas les
  // autres pages) à partir des variables globales déjà utilisées pour
  // afficher le contenu : pas de nouvelle source de données à
  // maintenir, juste une lecture normalisée de ce qui existe déjà.
  window.buildLocalSearchIndex = function () {
    var index = [];

    (window.DOCUMENTS_DATA || []).forEach(function (d) {
      index.push({ type: "document", title: d.title, description: d.description || "", url: docHref(d.file) });
    });

    (window.VIDEOS_DATA || []).forEach(function (v) {
      index.push({ type: "video", title: v.title, description: v.description || "", url: "videos.html#video-" + v.category });
    });

    if (window.INFOS_DATA) {
      (window.INFOS_DATA.documents || []).forEach(function (d) {
        index.push({ type: "document", title: d.title, description: d.description || "", url: docHref(d.file) });
      });
      (window.INFOS_DATA.faq || []).forEach(function (f) {
        index.push({ type: "faq", title: f.q, description: f.a, url: "infos-pratiques.html" });
      });
    }

    // Médiathèques (francais/mathematiques/arts/sciences-histoire) :
    // chacune expose ses vidéos sous un nom de variable propre à la
    // page (ex. FRANCAIS_MEDIATHEQUE_DATA). On regroupe ici tous les
    // noms connus ; en ajouter un nouveau ne prend qu'une ligne.
    [
      "FRANCAIS_MEDIATHEQUE_DATA",
      "MATHEMATIQUES_MEDIATHEQUE_DATA",
      "ARTS_MEDIATHEQUE_DATA",
      "SCIENCES_HISTOIRE_MEDIATHEQUE_DATA"
    ].forEach(function (key) {
      (window[key] || []).forEach(function (v) {
        index.push({ type: "video", title: v.title, description: v.category || "", url: v.url || "" });
      });
    });

    return index;
  };
})();
