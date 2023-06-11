const jwt = require('jsonwebtoken');

const generateSign = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_KEY, { expiresIn: '1h' });
 
};
const verifySign = (token) => {
  return jwt.verify(token, process.env.JWT_KEY);

};

const closeSesion = (token) => {
  const payload = jwt.decode(token);
  const tokenId = payload.jti;
  payload.exp = payload.iat;
  console.log(tokenId);
  return payload;
};

module.exports = { generateSign, verifySign, closeSesion };
