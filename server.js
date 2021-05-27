const express = require("express");
const morgan = require("morgan")
const router = require("./routes");

// Iniciando express
const app = express();

// Iniciando el middleware de JSON para que parsee el body
app.use(express.json());

// Iniciamos morgan
app.use(morgan("dev"))

// Usar las rutas creadas en el router y le voy a poner un prefijo `/api`
app.use('/api', router)

// Exportando el server
module.exports = app;