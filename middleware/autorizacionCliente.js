const jwt = require("jsonwebtoken");
const { llaveCliente } = require("../config/config");

module.exports = async (req, res, next) => {
  try {
    const jwToken =  req.header('token');
    if (jwToken) {
      const payload =  await jwt.verify(jwToken, llaveCliente);
      req.user = payload.Cliente;

    } else {
      return res.status(401).json("Acceso no autorizado");
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json("Acceso no autorizado");
  }
};
