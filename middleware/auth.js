import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers('Authorization');

    if (!token) return res.status(403).send('Acces Denied');

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, 'somesuperstrengthpass'); //env
    req.user = verified;
    next();
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};
