const Book = require('../models/Book');
const fs = require('fs');
const path = require('path');

exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  console.log('Creating book with image:', req.file.compressedPath);
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.compressedPath.split('/').pop()}`,
  });
  console.log('Image compressée sauvegardée à :', req.file.compressedPath);

  book
    .save()
    .then(() => res.status(201).json({ message: 'Objet enregistré' }))
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ error });
    });
};

exports.modifyBook = (req, res, next) => {
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.compressedPath.split('/').pop()}`,
      }
    : { ...req.body };

  delete bookObject._userId;

  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        return res.status(401).json({ message: 'Non-autorisé' });
      }
      if (req.file) {
        const oldImageFilename = path.basename(book.imageUrl);
        const oldImagePath = path.join(
          __dirname,
          '../images',
          oldImageFilename
        );

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

exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: 'Livre non trouvé' });
      }

      if (book.userId !== req.auth.userId) {
        return res.status(401).json({ message: 'Non-autorisé' });
      }

      const filename = path.basename(book.imageUrl);

      const imagePath = path.join(__dirname, '../images', filename);

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Erreur lors de la suppression de l'image:", err);
          return res
            .status(500)
            .json({ message: "Erreur lors de la suppression de l'image" });
        }

        Book.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Livre supprimé' }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllBooks = (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
};
