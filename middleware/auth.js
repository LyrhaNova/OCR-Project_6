const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

module.exports = (req, res, next) => {
  console.log('Headers:', req.headers); // Vérifier les en-têtes reçus

  try {
    const authorization = req.headers.authorization;
    console.log('Authorization Header:', authorization); // Voir le contenu de l'en-tête Authorization

    if (!authorization) {
      throw 'Requête non authentifiée';
    }

    const token = authorization.split(' ')[1];
    console.log('Token:', token); // Voir le contenu du token

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decodedToken); // Voir le contenu du token décodé
    console.log(
      'JWT_SECRET lors de la vérification du token (auth) :',
      process.env.JWT_SECRET
    );

    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    console.error('Authentication Error:', error); // Loguer l'erreur
    res.status(401).json({ error });
  }
};

// ____________________________________

// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv').config();

// module.exports = (req, res, next) => {
//   console.log('Headers:', req.headers);
//   try {
//     const authorization = req.headers.authorization;
//     console.log('auth:', authorization);
//     if (!authorization) {
//       throw 'Requête non authentifiée';
//     }

//     const token = authorization.split(' ')[1];

//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     const userId = decodedToken.userId;

//     req.auth = {
//       userId: userId,
//     };

//     next();
//   } catch (error) {
//     res.status(401).json({ error });
//   }
// };
