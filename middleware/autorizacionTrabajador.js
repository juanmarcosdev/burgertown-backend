const jwt = require("jsonwebtoken");
const { llaveTrabajador } = require("../config/config");

module.exports = async (req, res, next) => {
  try {
    const jwToken = req.header("token");
    if (jwToken) {
      const payload = await jwt.verify(jwToken, llaveTrabajador);

      req.user = payload.Trabajador;
    } else {
      return res.status(401).json("Acceso no autorizado");
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json("Acceso no autorizado");
  }
};
