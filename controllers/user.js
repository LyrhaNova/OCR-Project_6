const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Controller signup
exports.signup = (req, res, next) => {
  // Hachage du mot de passe avec bcrypt
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      // Création d'un nouvel utilisateur avec l'email et le mot de passe haché
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      return user.save();
    })
    .then(() => {
      console.log('Utilisateur créé avec succès');
      res.status(201).json({ message: 'Utilisateur créé' });
    })
    .catch((error) => {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      res.status(400).json({ error });
    });
};

// Controller login
exports.login = (req, res, next) => {
  // Recherche de l'utilisateur par email dans la base de données
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        console.log('Utilisateur non trouvé');
        return res
          .status(401)
          .json({ message: 'Paire login/mot de passe incorrecte' });
      }

      console.log('Utilisateur trouvé:', user);

      // Comparaison du mot de passe fourni avec le mot de passe haché en base de données
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            console.log('Mot de passe incorrect');
            return res
              .status(401)
              .json({ message: 'Paire login/mot de passe incorrecte' });
          }

          console.log('Mot de passe correct, génération du token');

          // Génération d'un token JWT contenant l'ID utilisateur et une expiration de 24h
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '24h',
          });

          // Envoi de la réponse avec l'ID utilisateur et le token
          res.status(200).json({
            userId: user._id,
            token: token,
          });
        })
        .catch((error) => {
          console.error(
            'Erreur lors de la comparaison des mots de passe:',
            error
          );
          res.status(500).json({ error });
        });
    })
    .catch((error) => {
      console.error("Erreur lors de la recherche de l'utilisateur:", error);
      res.status(500).json({ error });
    });
};
