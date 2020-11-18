const { Op } = require("sequelize");
const Cliente = require("../models/Cliente");
const Trabajador = require("../models/Trabajador");
const Tarjeta = require("../models/Tarjeta");


async function validarCliente(req, res, next) {
  const { cliente_celular, cliente_documento } = req.body;

  if (req.path === "/Create") {
    let findCliente = await Cliente.findOne({
      where: { [Op.or]: [{ cliente_celular }, { cliente_documento }] }
    });
    if (findCliente) {
      res.json({
        error: 1, //Cliente existente
        message:
          "ya hay un cliente registrado con este numero de celular o con este documento",
      });
    } 
    else {
      next();
    }
  }
}
async function validarTrabajador(req, res, next) {
  const { trabajador_documento, trabajador_celular } = req.body;

  if (req.path === "/Create") {
    let findTrabajador = await Trabajador.findOne({
      where: {
        [Op.or]:[{trabajador_documento},{trabajador_celular}]
      }
    });
    if(findTrabajador){
      res.json({
        error:1,//Trabajador existente
        message: "ya hay un trabajador con este numero de celular o con este documento"
      })
    }
    else{
      next();
    }
  }
}

async function validarTarjeta(req,res,next){
  const {tarjeta_numero,cliente_id} = req.body

  if(req.path === "/Create"){
    let findTarjeta = await Tarjeta.findOne({
      where:{
        [Op.and]:[{tarjeta_numero},{cliente_id}]
      }
    })
    if(findTarjeta){
      res,json({
        error:1,//Esta tarjeta ya esta inscrita para este trabajador
        message: 'esta tarjeta ya se encuentra registrada para este trabajador'
      })
    }

  }
}



exports.validarCliente = validarCliente;
exports.validarTrabajador = validarTrabajador;
exports.validarTarjeta = validarTarjeta;