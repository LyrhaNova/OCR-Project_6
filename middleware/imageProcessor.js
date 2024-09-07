const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Désactivation du cache de Sharp
sharp.cache(false);

const compressImage = (req, res, next) => {
  // Vérification s'il n'y a pas de fichier dans la requête
  if (!req.file) {
    return next();
  }

  // Définition du chemin de sortie pour l'image compressée
  const outputImagePath = `images/compressed-${req.file.filename}`;

  // Utilisation de Sharp pour compresser l'image
  sharp(req.file.path)
    .toFormat('jpeg')
    .jpeg({ quality: 40 })
    .toFile(outputImagePath, (err) => {
      if (err) {
        console.error("Erreur lors de la compression de l'image:", err);
        return res
          .status(500)
          .json({ error: "Erreur lors de la compression de l'image" });
      }

      // Construction de l'URL pour l'image compressée
      const protocol = req.protocol;
      const host = req.get('host');
      const imageUrl = `${protocol}://${host}/${outputImagePath.replace(/\\/g, '/')}`;

      // Ajout du chemin de l'image compressée à l'objet `req.file`
      req.file.compressedPath = imageUrl;

      // Suppression du fichier d'image original pour économiser de l'espace disque
      fs.unlink(req.file.path, (unlinkErr) => {
        if (unlinkErr) {
          console.error(
            "Erreur lors de la suppression de l'image originale:",
            unlinkErr
          );
        }
        next();
      });
    });
};

module.exports = compressImage;
