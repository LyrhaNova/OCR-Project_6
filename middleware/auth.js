const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

// Middleware d'authentification pour valider les tokens JWT
module.exports = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw 'Requête non authentifiée';
    }

    // Extraction du token JWT de l'en-tête
    const token = authorization.split(' ')[1];

    // Vérification et décryptage du token JWT
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Récupération du userId contenu dans le token déchiffré
    const userId = decodedToken.userId;

    req.auth = {
      userId: userId,
    };

    next();
  } catch (error) {
    console.error('Authentication Error:', error);
    res.status(401).json({ error });
  }
};
