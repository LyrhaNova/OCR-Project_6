const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Désactivation du cache de sharp (évite les doublons d'envoie d'images)
sharp.cache(false);

const compressImage = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const outputImagePath = `images/compressed-${req.file.filename}`;

  // Compression de l'image
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

      const protocol = req.protocol;
      const host = req.get('host');
      const imageUrl = `${protocol}://${host}/${outputImagePath.replace(/\\/g, '/')}`;

      req.file.compressedPath = imageUrl;
      console.log('Compressed image URL:', req.file.compressedPath);

      // Suppression de l'image originale
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
