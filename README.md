# OCR-Project_6

## A PROPOS

Dans le cadre de la formation OpenClassRooms en Développement web, le ``PROJET 6`` nous amène à développer le bacek-end d'un site de notation de livre, en créant un serveur avec Express et le connecter à une base de données MongoDB.

## TABLE DES MATIERES

- 🪧 [À propos](#a-propos)
- 📄 [Scénario](#scenario)
- ⬆️ [Objectifs pédagogiques](#objectifs-pedagogiques)
- 🚀 [Installation](#installation)
- 🏗️ [Construit avec](#construit-avec)

## SCENARIO

Nous sommes développeurs back-end freelance depuis maintenant un an, travaillant régulièrement avec un développeur front-end expérimenté. Il nous contacte pour travailler avec lui sur le back-end du site d'une petite librairie "Mon Vieux Grimoire".

Le [front-end](https://github.com/OpenClassrooms-Student-Center/P7-Dev-Web-livres) ainsi que [la maquette](https://www.figma.com/design/Snidyc45xi6qchoOPabMA9/Maquette-Mon-Vieux-Grimoir?node-id=0-1&node-type=CANVAS&t=rCNrfmZB6FDMAh4x-0) sont déjà réalisés, il ne manque plus qu'à réaliser le back-end du site et le relier correctement au front-end.

[Spécifications fonctionnelles](https://course.oc-static.com/projects/D%C3%A9veloppeur+Web/DW_P7+Back-end/DW+P7+Back-end+-+Specifications+fonctionnelles.pdf)

[Exigence de l'API](https://course.oc-static.com/projects/D%C3%A9veloppeur+Web/DW_P7+Back-end/DW+P7+Back-end+-+Specifications+API.pdf)

## OBJECTIFS PEDAGOGIQUES

- 💡 Implémenter un modèle logique de données conformément à la réglementation
- 💡 Mettre en œuvre des opérations CRUD de manière sécurisée
- 💡 Stocker des données de manière sécurisée

## INSTALLATION

### Étapes d'installation

Avant l'installation, vous devez créer un compte [MongoDB](https://www.mongodb.com/fr-fr/lp/cloud/atlas/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core_prosp-brand_gic-null_emea-fr_ps-all_desktop_eng_lead&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624521&adgroup=115749705063&cq_cmp=12212624521&gad_source=1&gclid=Cj0KCQjw8--2BhCHARIsAF_w1gzyI9uTLByS9PWIbEVO-d5zfNZMF055U8v0-4UCDz6q1DPe85kPhocaAgvTEALw_wcB?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core_prosp-brand_gic-null_emea-fr_ps-all_desktop_eng_lead&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624521&adgroup=115749705063&cq_cmp=12212624521&gad_source=1&gclid=Cj0KCQjw8--2BhCHARIsAF_w1gzyI9uTLByS9PWIbEVO-d5zfNZMF055U8v0-4UCDz6q1DPe85kPhocaAgvTEALw_wcB) (Atlas est utilisé pour ce Projet) afin de pouvoir utiliser la base de données.

Vous aurez également besoin du [code front-end](https://github.com/OpenClassrooms-Student-Center/P7-Dev-Web-livres).

1. Cloner le dépôt :\
Installez [Git](https://git-scm.com/) si ce n'est pas déjà fait. Configurez-le en suivant [ce guide](https://git-scm.com/book/fr/v2/D%C3%A9marrage-rapide-Param%C3%A9trage-%C3%A0-la-premi%C3%A8re-utilisation-de-Git).\
Clonez le dépôt sur votre machine en utilisant la commande suivante dans Git Bash :

````
git clone git@github.com:LyrhaNova/OCR-Project_6.git
````

2. Installation des dépendances :\
Accédez au répertoire du projet cloné, puis installez les dépendances avec :

````
npm install
````

3. Mise à jour du dépôt local :\
Assurez-vous d'avoir la dernière version du projet en exécutant :
````
git pull origin main
````

### Fichier .env

Afin d'assurer le bon fonctionnement du code, vous devez créer un fichier ``.env`` avec les variables suivantes et les remplir selon votre environnement de développement :
````
JWT_SECRET=clé secrète jwt
PORT=port privilégié (4000 frontend)
USER=identifiant user MongoDB
PASSWORD=mot de passe user MongoDB
DB=cluster*
````

### Démarrage du serveur de développement

Pour lancer le projet en mode développement, exécutez dans le dossier back-end :
````
nodemon server
````
Puis, exécutez dans le dossier front-end :
````
npm run dev
````
Le projet sera accessible par défaut à l'adresse suivante :
````
http://localhost:4000/
````

### Documentation supplémentaire
Pour plus d'informations sur les outils et bibliothèques utilisés dans ce projet, consultez leur documentation officielle :

- [React](https://fr.react.dev/)
- [Vite](https://vitejs.fr/guide/)
- [React Router](https://reactrouter.com/en/main)
- [NPM](https://docs.npmjs.com/)

### Structure du projet
````
├── controllers           # Gère la logique des opérations CRUD
├── middleware            # Contient les middlewares pour l'application
├── models                # Définit les modèles de données
├── routes                # Définit les routes API du projet
├── .gitignore            # Spécifie les fichiers à ignorer par Git
├── app.js                # Point d'entrée principal de l'application
├── package-lock.json     # Gère les versions exactes des dépendances
├── package.json          # Dépendances et scripts NPM
└── server.js             # Démarre le serveur
````

## CONSTRUIT AVEC

### Langages

- ``Javascript``
- ``Express``
- ``Node.js``
- ``MongoDB``

### Outils

| TOOLS                  | DESCRIPTION                                    |
|------------------------|------------------------------------------------|
| ``VISUAL STUDIO CODE`` | _IDE_                                          |
| ``GIT``                | _Logiciel de gestion de versions_              |
| ``MongoDB``            | _Service de base de données_                   |
