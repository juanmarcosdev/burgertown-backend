const Cliente = require("../models/Cliente");
const Encriptacion = require("../middleware/Encriptacion");
const jwt = require("jsonwebtoken");
const { jwtGeneratorCliente } = require("../utils/jwtGenerator");


async function getCliente(req, res) {
  const { cliente_id } = req.params;
  try {
    let getCliente = await Cliente.findOne({
      where: {
        cliente_id,
      },
    });

    res.json({
      data: getCliente,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      data: {},
    });
  }
}

async function getClientes(req, res) {
  try {
    const Clientes = await Cliente.findAll();
    res.json({
      data: Clientes,
    });
  } catch (error) {}
}

async function createCliente(req, res) {
  const {
    cliente_celular,
    cliente_nombre,
    cliente_apellido,
    cliente_documento,
    cliente_direccion,
    cliente_fecha_nacimiento,
    cliente_password,
  } = req.body;
  const bcryptPassword = await Encriptacion.Encriptar(cliente_password);
  try {
    let newCliente = await Cliente.create(
      {
        cliente_celular,
        cliente_nombre,
        cliente_apellido,
        cliente_documento,
        cliente_direccion,
        cliente_fecha_nacimiento,
        cliente_password: bcryptPassword,
      },
      {
        fields: [
          "cliente_celular",
          "cliente_nombre",
          "cliente_apellido",
          "cliente_documento",
          "cliente_direccion",
          "cliente_fecha_nacimiento",
          "cliente_password",
        ],
      }
    );

    if (newCliente) {
      const token = jwtGeneratorCliente(cliente_celular);

      res.json({
        meesage: "Cliente agregado satisfactoriamente",
        data: newCliente,
        token,
      });
    }
  } catch (error) {
    res.status(500).json({
      meesage: "Error al ingresar el cliente",
      data: error,
    });
  }
}

async function stateCliente(req, res) {
  const { cliente_id } = req.params;
  const clientes = await Cliente.findAll({
    attributes: ["cliente_id", "cliente_estado"],
    where: {
      cliente_id,
    },
  });
  try {
    if (clientes.length > 0) {
      clientes.forEach(async (cliente) => {
        console.log(cliente.cliente_estado);
        nuevoestado = cliente.cliente_estado == 0 ? 1 : 0;
        await cliente.update({
          cliente_estado: nuevoestado,
        });
      });

      return res.json({
        meesage: "Cliente deshabilitado/habilitadoesatisfactoriamente",
        data: clientes,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

async function editCliente(req, res) {
  const { cliente_id } = req.params;
  const {
    cliente_nombre,
    cliente_apellido,
    cliente_documento,
    cliente_direccion,
    cliente_fecha_nacimiento,
    cliente_password,
  } = req.body;

  const clientes = await Cliente.findAll({
    attributes: [
      "cliente_id",
      "cliente_celular",
      "cliente_nombre",
      "cliente_apellido",
      "cliente_documento",
      "cliente_direccion",
      "cliente_fecha_nacimiento",
      "cliente_password",
    ],

    where: {
      cliente_id,
    },
  });

  if (clientes.length > 0) {
    clientes.forEach(async (cliente) => {
      await cliente.update({
        cliente_nombre,
        cliente_apellido,
        cliente_documento,
        cliente_direccion,
        cliente_fecha_nacimiento,
        cliente_password,
      });
    });
  }
  return res.json({
    message: "Datos cambiados correctamente",
    data: clientes,
  });
}

async function loginCliente(req, res) {
  const { cliente_celular } = req.params;
  const { cliente_password } = req.body;

  let getCliente = await Cliente.findOne({
    where: {
      cliente_celular
    },
  });

  if (getCliente) {
    try {
      const compararContraseña = await Encriptacion.Comparar(
        cliente_password,
        getCliente.cliente_password
      );

      const token = await jwtGeneratorCliente(cliente_celular);

      return res.json({ 
          message: "login exitoso" ,
          token
        });
    } catch (error) {
      res.json({
        message: "Error",
      });
    }
  }
}

exports.createCliente = createCliente;
exports.getClientes = getClientes;
exports.getCliente = getCliente;
exports.stateCliente = stateCliente;
exports.editCliente = editCliente;
exports.loginCliente = loginCliente;
