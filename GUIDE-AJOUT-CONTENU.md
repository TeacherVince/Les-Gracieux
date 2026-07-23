# Ajouter du contenu sur le site — Les Gracieux

Aucune de ces opérations ne touche au design ni à la structure du site : tu modifies juste un fichier texte, tu enregistres, et le contenu apparaît. Tous les fichiers du site sont à plat, à la racine du dépôt (pas de sous-dossiers), pour éviter tout souci lors des envois sur GitHub.

## Mettre à jour "Cette semaine" (page d'accueil)

Fichier à modifier : `cette-semaine.js`. C'est la carte la plus visible du site, pensée pour être modifiée chaque semaine en quelques secondes.

- `updated` : la petite phrase affichée à droite du titre (mets `""` pour la masquer).
- `items` : la liste des choses à afficher. Copie un bloc `{ type, text }` existant, colle-le avant le `]` final, et modifie `text`.
- `type` doit être exactement l'une de ces valeurs : `"devoir"`, `"sortie"`, `"evenement"`, `"materiel"` ou `"info"` (détermine l'icône affichée).

## Ajouter une vidéo

Fichier à modifier : `videos.js`. Les vidéos sont automatiquement regroupées par matière sur la page (Art, Français, Mathématiques, Sciences & Histoire) : une matière sans aucune vidéo n'affiche simplement pas de section, tu n'as rien à faire pour la masquer ou l'afficher.

1. Va sur YouTube, ouvre la vidéo, copie le code qui suit `watch?v=` dans l'adresse (ex. pour `youtube.com/watch?v=aqz-KE-bpKQ`, le code est `aqz-KE-bpKQ`). Si l'adresse contient d'autres paramètres après (`&list=...`, `&index=...`), ignore-les : seul le code juste après `watch?v=` compte.
2. Dans `videos.js`, copie un bloc existant entre accolades `{ ... }`, colle-le juste avant le `];` final.
3. Remplace `id` (un identifiant unique, ex. `video-maths-3`), `category` (exactement `"Art"`, `"Français"`, `"Mathématiques"` ou `"Sciences & Histoire"`), `title`, `description` (facultatif, laisse `""` si tu n'en veux pas) et `youtubeId` par tes propres valeurs.
4. N'oublie pas la virgule après le bloc précédent.

La miniature YouTube et le bouton "Regarder sur YouTube" se génèrent automatiquement à partir du `youtubeId` : tu n'as rien d'autre à fournir. Cliquer sur la miniature lance la vidéo directement sur la page (rien ne se lance tout seul).

À faire plus tard : ajouter la vidéo "Le fantastique Blob !" dans Sciences & Histoire dès que le bon lien YouTube sera transmis (le lien reçu précédemment pointait par erreur vers la vidéo de l'astronaute).

## Ajouter une vidéo à la médiathèque Français

La branche Français a sa propre médiathèque (page `francais-mediatheque.html`), séparée de la bibliothèque de vidéos générale : elle est organisée en quatre catégories (Grammaire, Conjugaison, Orthographe, Vocabulaire) plutôt que par matière, avec une recherche et des favoris. Fichier à modifier : `francais-mediatheque-data.js`.

1. Copie un bloc existant entre accolades `{ ... }`, colle-le juste avant le `];` final.
2. Renseigne `id` (un identifiant unique, ex. `fr-vocab-6`), `category` (exactement `"Grammaire"`, `"Conjugaison"`, `"Orthographe"` ou `"Vocabulaire"`), `title` et `url` (l'adresse complète de la leçon).
3. Pour `image`, ouvre la page de la leçon et récupère l'adresse de son image de présentation (généralement visible juste sous le titre). Cette image sert de vignette sur la carte.
4. N'oublie pas la virgule après le bloc précédent.

Ces vidéos ne sont pas hébergées sur notre site : chaque carte ouvre la leçon d'origine dans un nouvel onglet. La recherche et le compteur par catégorie se mettent à jour automatiquement, rien d'autre à faire.

## Ajouter un document dans une branche (Art, Français, Mathématiques, Sciences & Histoire)

Chaque branche a son propre fichier :

- `art-documents.js`
- `francais-documents.js`
- `mathematiques-documents.js`
- `sciences-histoire-documents.js`

1. Dépose ton fichier (PDF de préférence) à la racine du dépôt, au même niveau que `index.html`. Évite les espaces et les accents dans le nom du fichier (utilise des tirets, ex. `sortie-piscine.pdf`).
2. Dans le fichier de la branche concernée, copie un bloc existant, colle-le avant le `];` final.
3. Renseigne `category`, `title`, `description`, et `file` (le nom exact de ton fichier).

### Ajouter un lien utile à une branche

Chaque branche a aussi son propre fichier de liens : `art-links.js`, `francais-links.js`, `mathematiques-links.js`, `sciences-histoire-links.js`. Copie le bloc d'exemple en commentaire, décommente-le et renseigne `label` (le texte affiché) et `url` (l'adresse complète, avec `https://`). Tant que le fichier est vide, la section "Liens utiles" ne s'affiche pas sur la page — pas besoin de la masquer toi-même.

### Vidéos et exercices sur une page de branche

La section "Aller plus loin" de chaque page de branche s'affiche automatiquement dès que des vidéos ou des exercices existent pour cette matière (voir plus bas pour les exercices) : rien à configurer, elle se base sur `videos.js` et sur les fichiers d'exercices.

## Ajouter un exercice (et le lier à une branche)

Fichiers à modifier : `qcm-questions.js` (choix multiples), `texte-trous-questions.js` (texte à trous), `vrai-faux-questions.js` (vrai/faux). Pour qu'un exercice apparaisse dans la carte "Exercices" d'une page de branche, indique dans `subject` un mot qui correspond à la branche (ex. `"Art"`, `"Français"`, `"Mathématiques"`, `"Sciences"` ou `"Histoire"` — ces deux derniers comptent pour la branche "Sciences & Histoire").

## Modifier la page Infos pratiques

Fichier à modifier : `infos-pratiques.js`, organisé en quatre parties :

- `agenda` : une liste `{ label, page }` qui renvoie simplement au numéro de la page correspondante dans l'agenda officiel (pas besoin de recopier le contenu de l'agenda).
- `contacts` : une liste `{ label, value }` (enseignant, école, secrétariat, PPLS, urgence...).
- `documents` : une liste `{ title, description, file }`, comme sur les pages de branches — dépose le fichier à la racine du dépôt.
- `faq` : une liste `{ q, a }`, affichée discrètement en bas de page.

Pour ajouter une ligne dans n'importe laquelle de ces listes : copie un bloc existant et colle-le juste avant le `]` de la liste concernée.

## Modifier la page Objectifs

Cette page n'a pas de fichier de contenu séparé : le texte est directement dans `objectifs.html`, dans des blocs qui commencent par `<div class="content-block objective-block ...">`. Pour changer un texte, repère la matière concernée et modifie le texte entre les balises `<li>...</li>` (une ligne = un objectif, numérotée automatiquement dans chaque liste). Pour ajouter un objectif, copie une ligne `<li>...</li>` et colle-la juste avant le `</ul>` correspondant. La petite phrase en italique sous chaque titre (`<p class="objective-tagline">...</p>`) peut aussi être modifiée directement. Le bloc "Sciences, Histoire & Géographie" contient deux listes distinctes (Sciences, puis Histoire & Géographie), chacune numérotée indépendamment à partir de 1.

## Changer la date de "Dernière mise à jour"

Fichier à modifier : `main.js`, tout en haut. Une seule ligne à changer : `var LAST_UPDATED = "juillet 2026";`. Elle met à jour le pied de page de TOUTES les pages du site en une seule fois.

## Commentaires sous les vidéos

Voir la fin de `GUIDE-MISE-EN-LIGNE.md` pour le fonctionnement complet (modération incluse). En résumé : les nouveaux commentaires arrivent dans l'onglet "Forms" de ton tableau de bord Netlify, pas directement sur le site. Pour publier un commentaire que tu as approuvé, ajoute-le dans `comments.js` (un bloc `{ videoId, name, text }`, `videoId` devant correspondre à l'`id` de la vidéo dans `videos.js`).

## Traduction (préparation)

Le site n'existe qu'en français pour l'instant, volontairement (pas de sélecteur de langue affiché). Tout le contenu qui change souvent (vidéos, documents, infos pratiques, Cette semaine, FAQ) est déjà centralisé dans des fichiers de données séparés : le jour où une traduction sera nécessaire, il suffira de dupliquer ces fichiers par langue plutôt que de tout réécrire.

## Où éditer ces fichiers

Deux façons de faire, au choix :

**Directement sur GitHub.com** (le plus simple, sans rien installer) : ouvre le fichier dans ton dépôt, clique sur l'icône crayon en haut à droite, modifie le texte, puis clique sur "Commit changes" en bas de page. Le site se met à jour tout seul en moins d'une minute.

**Sur ton ordinateur** avec un éditeur de texte simple (Bloc-notes, TextEdit, ou mieux : Visual Studio Code, gratuit), puis en renvoyant le fichier modifié sur GitHub.

Un dernier conseil : si un ajout ne s'affiche pas ou casse la page, c'est presque toujours une virgule oubliée ou en trop entre deux blocs `{ }`. Compare avec un bloc qui fonctionne déjà.
