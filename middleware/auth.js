const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

module.exports = (req, res, next) => {
  console.log('Headers:', req.headers);

  try {
    const authorization = req.headers.authorization;
    console.log('Authorization Header:', authorization);

    if (!authorization) {
      throw 'Requête non authentifiée';
    }

    const token = authorization.split(' ')[1];
    console.log('Token:', token);

    const decodedToken = jwt.verify(token, 'kljsdf156198fzef312sdf15');
    console.log('Decoded Token:', decodedToken);
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
    console.error('Authentication Error:', error);
    res.status(401).json({ error });
  }
};
