const multer = require('multer');

// Définition des types MIME acceptés pour les images et leur extension correspondante
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

// Configuration du stockage des fichiers avec multer
const storage = multer.diskStorage({
  // Définition du dossier de destination où les fichiers téléchargés seront stockés
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  // Génération du nom de fichier pour éviter les doublons
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');

    const extension = MIME_TYPES[file.mimetype];

    // Génération du nom final du fichier en ajoutant un timestamp pour garantir l'unicité
    callback(null, name + Date.now() + '.' + extension);
  },
});

module.exports = multer({ storage }).single('image');
