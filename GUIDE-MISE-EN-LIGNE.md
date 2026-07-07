# Mettre le site en ligne gratuitement — Les Gracieux

Tu n'as jamais utilisé GitHub, voici toutes les étapes depuis zéro. Compte environ 20 minutes la première fois. Ensuite, mettre le site à jour prend quelques secondes.

## 1. Créer un compte GitHub

Va sur [github.com](https://github.com), clique sur "Sign up", choisis un nom d'utilisateur, ton email et un mot de passe. Le compte est gratuit, pas de carte bancaire demandée.

## 2. Créer un dépôt (repository)

Un dépôt, c'est simplement le dossier en ligne qui va contenir les fichiers du site.

1. Une fois connecté, clique sur le bouton "+" en haut à droite, puis "New repository".
2. Nom du dépôt : `les-gracieux`.
3. Laisse-le en "Public".
4. Ne coche aucune case (pas de README, pas de .gitignore).
5. Clique sur "Create repository".

## 3. Envoyer les fichiers du site

Sur la page du dépôt qui vient de s'ouvrir, clique sur "uploading an existing file" (ou "Add file" > "Upload files").

Ouvre le dossier `les-gracieux` sur ton ordinateur (celui que je t'ai fourni), sélectionne tout son contenu (tous les fichiers et sous-dossiers : `index.html`, `css`, `js`, `data`, `assets`, etc.), et fais-les glisser dans la fenêtre GitHub. Les navigateurs récents (Chrome, Edge, Firefox) acceptent de glisser des dossiers entiers, la structure est conservée automatiquement.

Une fois l'envoi terminé, descends en bas de page et clique sur "Commit changes".

## 4. Mettre le site en ligne avec Netlify

1. Va sur [netlify.com](https://netlify.com) et inscris-toi avec "Sign up with GitHub" (le plus simple : ça relie directement les deux comptes).
2. Clique sur "Add new site" > "Import an existing project".
3. Choisis "Deploy with GitHub", autorise l'accès si demandé, puis sélectionne le dépôt `les-gracieux`.
4. Ne change rien aux réglages proposés (pas de commande de build, dossier de publication = racine `/`).
5. Clique sur "Deploy site".

Après une minute environ, Netlify te donne une adresse du type `nom-aleatoire.netlify.app`. Le site est en ligne.

## 5. Personnaliser l'adresse (facultatif)

Dans Netlify : "Site configuration" > "Change site name", tu peux remplacer le nom aléatoire par quelque chose comme `les-gracieux` (si disponible), ce qui donnera `les-gracieux.netlify.app`.

## 6. Mettre à jour le site ensuite

Chaque fois que tu modifies un fichier directement sur GitHub.com (voir le guide d'ajout de contenu) et que tu cliques sur "Commit changes", Netlify republie automatiquement le site en moins d'une minute, sans aucune action supplémentaire de ta part.

## Pour donner accès aux parents

Une fois l'adresse Netlify obtenue, génère un QR code pointant vers cette adresse (des sites gratuits comme qr-code-generator.com le font en un clic, sans inscription), et diffuse-le comme prévu.
