const server = require("./server");

const PORT = 3000;

server.listen(PORT, () => console.log(`Se esta ejecutando el servidor en el puerto ${PORT}`))