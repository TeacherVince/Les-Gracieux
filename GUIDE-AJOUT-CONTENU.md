# Ajouter du contenu sur le site — Les Gracieux

Aucune de ces opérations ne touche au design ni à la structure du site : tu modifies juste un fichier texte, tu enregistres, et le contenu apparaît. Tous les fichiers du site sont à plat, à la racine du dépôt (pas de sous-dossiers), pour éviter tout souci lors des envois sur GitHub.

## Ajouter une vidéo

Fichier à modifier : `videos.js`

1. Va sur YouTube, ouvre la vidéo, copie le code qui suit `watch?v=` dans l'adresse (ex. pour `youtube.com/watch?v=aqz-KE-bpKQ`, le code est `aqz-KE-bpKQ`).
2. Dans `videos.js`, copie un bloc existant entre accolades `{ ... }`, colle-le juste avant le `];` final.
3. Remplace `id` (un identifiant unique, ex. `video-maths-2`), `category`, `title`, `description` et `youtubeId` par tes propres valeurs.
4. N'oublie pas la virgule après le bloc précédent.

## Ajouter un document dans une branche (Art, Français, Mathématiques, Sciences)

Chaque branche a son propre fichier :

- `art-documents.js`
- `francais-documents.js`
- `mathematiques-documents.js`
- `sciences-documents.js`

1. Dépose ton fichier (PDF de préférence) à la racine du dépôt, au même niveau que `index.html`. Évite les espaces et les accents dans le nom du fichier (utilise des tirets, ex. `sortie-piscine.pdf`).
2. Dans le fichier de la branche concernée, copie un bloc existant, colle-le avant le `];` final.
3. Renseigne `category`, `title`, `description`, et `file` (le nom exact de ton fichier).

## Modifier la page Infos pratiques

Fichier à modifier : `infos-pratiques.js`. Toute la page (agenda, horaire, natation, dates importantes, sorties, infos parents) est pilotée depuis ce seul fichier.

- Pour changer un texte : modifie directement une ligne dans le tableau `items` de la section concernée.
- Pour ajouter une ligne : copie une ligne existante dans `items` et colle-la juste avant le `]`.
- Pour ajouter une nouvelle section entière : copie un bloc `{ title, icon, items }` et colle-le avant le `];` final. Les icônes disponibles sont `"calendar"`, `"clock"`, `"drop"`, `"star"`, `"bus"`, `"info"`.
- Pour joindre un PDF à une section (comme l'autorisation de sortie) : ajoute ou modifie le bloc `attachment: { label: "...", file: "..." }` à l'intérieur de la section.

## Modifier la page Objectifs

Cette page n'a pas de fichier de contenu séparé : le texte est directement dans `objectifs.html`, dans des blocs qui commencent par `<div class="content-block">`. Pour changer un texte, repère la matière concernée et modifie le texte entre les balises `<li>...</li>` (une ligne = un objectif). Pour ajouter un objectif, copie une ligne `<li>...</li>` et colle-la juste avant `</ul>`.

## Commentaires sous les vidéos

Voir la fin de `GUIDE-MISE-EN-LIGNE.md` pour le fonctionnement complet (modération incluse). En résumé : les nouveaux commentaires arrivent dans l'onglet "Forms" de ton tableau de bord Netlify, pas directement sur le site. Pour publier un commentaire que tu as approuvé, ajoute-le dans `comments.js` (un bloc `{ videoId, name, text }`, `videoId` devant correspondre à l'`id` de la vidéo dans `videos.js`).

## Où éditer ces fichiers

Deux façons de faire, au choix :

**Directement sur GitHub.com** (le plus simple, sans rien installer) : ouvre le fichier dans ton dépôt, clique sur l'icône crayon en haut à droite, modifie le texte, puis clique sur "Commit changes" en bas de page. Le site se met à jour tout seul en moins d'une minute.

**Sur ton ordinateur** avec un éditeur de texte simple (Bloc-notes, TextEdit, ou mieux : Visual Studio Code, gratuit), puis en renvoyant le fichier modifié sur GitHub.

Un dernier conseil : si un ajout ne s'affiche pas ou casse la page, c'est presque toujours une virgule oubliée ou en trop entre deux blocs `{ }`. Compare avec un bloc qui fonctionne déjà.
