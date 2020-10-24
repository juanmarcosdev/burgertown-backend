const jwt = require("jsonwebtoken");
const {llaveCliente } = require("../config/config");


module.exports = async (req, res, next) => {
  try {
    const jwToken = req.header("token");
    if (!jwToken) {
      return res.status(401).json("Acceso no autorizado");
    }

    const payload = jwt.verify(jwToken, llaveCliente);

    req.user = payload.Cliente;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json("Acceso no autorizado");
  }
};
