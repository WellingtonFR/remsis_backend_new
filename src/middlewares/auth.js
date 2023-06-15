const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const secret = process.env.SECRET_JWT;

  if (!authHeader) {
    return res.status(401).send({ message: "Nenhum token foi informado" });
  }

  const parts = authHeader.split(" ");

  if (!parts.length == 2) {
    return res.status(401).send({ message: "Erro no token informado" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ message: "Token malformatado" });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Token inválido" });
    req.userId = decoded.id;
    return next();
  });
};
