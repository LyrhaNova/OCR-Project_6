const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

exports.signup = (req, res, next) => {
  console.log('Requête de signup reçue:', req.body);

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
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

exports.login = (req, res, next) => {
  console.log('Requête de login reçue:', req.body);

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        console.log('Utilisateur non trouvé');
        return res
          .status(401)
          .json({ message: 'Paire login/mot de passe incorrecte' });
      }

      console.log('Utilisateur trouvé:', user);

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
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '24h',
          });
          console.log(
            'JWT_SECRET lors de la génération du token (user) :',
            process.env.JWT_SECRET
          );

          console.log('Token:', token);
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
