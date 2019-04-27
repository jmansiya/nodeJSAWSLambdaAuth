let jwt = require('jsonwebtoken');
let redisCliente = require('./redisfile');
const config = require('./config.js');
let Person = require('./Person');

let checkToken = async (token) => {

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (token) {
    var persona = await jwt.verify(token, config.secret, async (err, decoded) => {
      if (err) {
        console.log("Error verificación JWT.");
        console.log(err);
        
        return null
      } else {
        console.log("Decoded: " + decoded);
        console.log("username: " + decoded.username);
        var person = await redisCliente.getValue("Jose");

        console.log("Persona obtenida DENTRO: ");
        console.log("Nombre: " + person.nombre);
        console.log("Apellidos: " + person.apellidos);
        console.log("Edad: " + person.edad);

        return person;
      }
    });

    console.log("Persona obtenida FUERA: ");
    console.log("Nombre: " + persona.nombre);
    console.log("Apellidos: " + persona.apellidos);
    console.log("Edad: " + persona.edad);

    return persona;
  }

  return null;
};

module.exports = {
  checkToken: checkToken
}
