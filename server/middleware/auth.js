const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const hdr = req.headers['authorization'] || '';
  const [scheme, token] = hdr.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).send('Unauthorized');
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, username: payload.username };
    next();
  } catch (e) {
    return res.status(401).send('Unauthorized');
  }
}

module.exports = auth;
