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

Ouvre le dossier `les-gracieux` sur ton ordinateur (celui que je t'ai fourni), sélectionne tous les fichiers qu'il contient (tout est à plat, il n'y a pas de sous-dossiers), et fais-les glisser dans la fenêtre GitHub.

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

## Le fond de la page d'accueil

La page d'accueil affiche maintenant une photo en arrière-plan (planète et lune) au lieu du fond étoilé animé. Dépose ton image à la racine du dépôt, au même niveau que `index.html`, sous le nom exact `fond-accueil.jpg` (si ton fichier est un `.png` ou `.jpeg`, renomme-le en `.jpg`, ou dis-le-moi pour que j'ajuste la ligne de code). La ligne concernée se trouve dans `style.css`, règle `.home-photo-bg`, propriété `background-image`.

## Les commentaires sous les vidéos : comment ça marche vraiment

Le site est statique (pas de serveur, pas de base de données), donc il ne peut pas stocker seul les commentaires envoyés par les visiteurs. La solution mise en place utilise **Netlify Forms**, une fonctionnalité déjà incluse gratuitement dans ton compte Netlify. Aucun compte supplémentaire, aucune clé secrète, aucune connexion requise pour les parents ou les élèves.

Concrètement :

1. Un élève ou un parent écrit un commentaire sous une vidéo et clique sur "Envoyer".
2. Le commentaire part directement vers Netlify, dans l'onglet **Forms** de ton tableau de bord (sur netlify.com, ouvre ton site puis "Forms" dans le menu de gauche).
3. Un champ invisible ("honeypot") piège automatiquement les robots spammeurs : leurs messages sont filtrés sans jamais t'être notifiés.
4. Le commentaire n'apparaît **pas automatiquement** sur le site : c'est volontaire, pour éviter toute publication anonyme non modérée.
5. Tu relis les commentaires reçus dans l'onglet Forms. Si un commentaire te convient, tu l'ajoutes toi-même dans le fichier `comments.js` (voir `GUIDE-AJOUT-CONTENU.md`), puis tu commits. Il apparaît alors sous la bonne vidéo.

Ce que tu dois encore faire : rien de technique, juste penser à consulter de temps en temps l'onglet Forms de Netlify (tu peux aussi activer les notifications par email dans Netlify : Site configuration > Notifications > "Email notification" pour être prévenu à chaque nouveau commentaire).

Autres solutions existantes et pourquoi je ne les ai pas retenues : Giscus ou Utterances (gratuits, mais obligent les parents et élèves à se créer un compte GitHub pour commenter, peu réaliste ici) ; Disqus (gratuit mais avec publicités et un partage de données à un tiers, peu adapté à un site scolaire). La solution Netlify Forms + validation manuelle reste la plus simple à maintenir et la plus respectueuse de la confidentialité, au prix d'une petite étape manuelle de ta part à chaque nouveau commentaire.
