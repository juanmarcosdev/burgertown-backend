const { Op } = require('sequelize');
const Cliente = require("../models/Cliente");

async function validarCliente(req, res, next) {
  const { cliente_celular, cliente_documento } = req.body;

  if (req.path === "/Create") {
    let findCliente = await Cliente.findOne({
      where: { [Op.or]: [{ cliente_celular }, { cliente_documento }] },
    });
    if (findCliente) {
      res.json({
        Error: 1, //Cliente existente
        Message:
          "Ya hay un cliente registrado con este numero de celular o con este documento",
      });
    }
    else{
        next()
    }
  }
}

exports.validarCliente = validarCliente;
