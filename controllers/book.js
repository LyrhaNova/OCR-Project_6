const Book = require('../models/Book');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Fonction pour créer un nouveau livre
exports.createBook = (req, res) => {
  // Convertis la chaîne JSON en objet
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;

  console.log('Creating book with image:', req.file.compressedPath);

  // Créer une instance du modèle Book avec les données fournies
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    // Construction l'URL de l'image
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.compressedPath.split('/').pop()}`,
    averageRating: bookObject.ratings[0].grade,
  });

  console.log('Image compressée sauvegardée à :', req.file.compressedPath);

  // Sauvegarder le livre dans la base de données
  book
    .save()
    .then(() => res.status(201).json({ message: 'Objet enregistré' }))
    .catch((error) => {
      return res.status(400).json({ error });
    });
};

// Fonction de modification d'un livre
exports.modifyBook = (req, res) => {
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        // URL de la nouvelle image
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.compressedPath.split('/').pop()}`,
      }
    : { ...req.body };

  delete bookObject._userId;

  // Trouver le livre à modifier
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        return res.status(401).json({ message: 'Non-autorisé' });
      }

      if (req.file) {
        // Si une nouvelle image est envoyée
        const oldImageFilename = path.basename(book.imageUrl);
        const oldImagePath = path.join(
          __dirname,
          '../images',
          oldImageFilename
        );

        // Supprimer l'ancienne image
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error(
              "Erreur lors de la suppression de l'ancienne image:",
              err
            );
            return res.status(500).json({
              message: "Erreur lors de la suppression de l'ancienne image",
            });
          }

          // Mise à jour du livre avec la nouvelle image
          Book.updateOne(
            { _id: req.params.id },
            { ...bookObject, _id: req.params.id }
          )
            .then(() =>
              res
                .status(200)
                .json({ message: 'Objet modifié avec nouvelle image' })
            )
            .catch((error) => res.status(400).json({ error }));
        });
      } else {
        // Si aucune nouvelle image n'est envoyée
        Book.updateOne(
          { _id: req.params.id },
          { ...bookObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: 'Objet modifié' }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

// Fonction de suppression d'un livre
exports.deleteBook = (req, res) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (!book) {
        // Vérifie si le livre existe
        return res.status(404).json({ message: 'Livre non trouvé' });
      }

      if (book.userId !== req.auth.userId) {
        return res.status(401).json({ message: 'Non-autorisé' });
      }

      const filename = path.basename(book.imageUrl);
      const imagePath = path.join(__dirname, '../images', filename);

      // Supprimer l'image associée au livre
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Erreur lors de la suppression de l'image:", err);
          return res
            .status(500)
            .json({ message: "Erreur lors de la suppression de l'image" });
        }

        // Supprimer le livre de la base de données
        Book.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Livre supprimé' }))
          .catch((error) => res.status(404).json({ error }));
      });
    })
    .catch((error) => res.status(400).json({ error }));
};

// Fonction pour obtenir un livre par son ID
exports.getOneBook = (req, res) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error }));
};

// Fonction pour obtenir tous les livres
exports.getAllBooks = (req, res) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(404).json({ error }));
};

// Fonction pour ajouter une note à un livre
exports.addRating = async (req, res) => {
  const rating = req.body.rating;
  const userId = req.auth.userId;
  const newRating = { userId, grade: rating };

  try {
    // Trouver le livre par ID
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Livre introuvable' });
    }

    // Vérifie si l'utilisateur a déjà noté ce livre
    const userRatingExists = book.ratings.some((r) => r.userId === userId);
    if (userRatingExists) {
      return res.status(400).json({ message: 'Vous avez déjà noté ce livre' });
    }

    // Ajout de la nouvelle note
    book.ratings.push(newRating);

    // Calculer la nouvelle moyenne de note
    book.averageRating = averageRating(book.ratings);

    // Sauvegarder les modifications
    const updatedBook = await book.save();
    return res.status(201).json(updatedBook);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Fonction pour calculer la moyenne des notes
function averageRating(ratings) {
  const totalGrades = ratings.reduce(
    (total, rating) => total + rating.grade,
    0
  );
  const average = ratings.length > 0 ? totalGrades / ratings.length : 0;
  return parseFloat(average.toFixed(1));
}

// Fonction pour obtenir les livres avec les meilleures notes
exports.getBestRating = async (req, res) => {
  try {
    const books = await Book.find().sort({ averageRating: -1 }).limit(3);
    return res.status(200).json(books);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};
