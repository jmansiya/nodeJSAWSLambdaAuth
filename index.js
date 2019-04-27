let middleware = require('./middleware');
let policy = require('./PolicyAuthentication');

exports.handler = async function(event, context, callback) {
try{
    context.callbackWaitsForEmptyEventLoop = false
    var token = event.authorizationToken;
    var usuario = await middleware.checkToken(token);
    console.log("usuario : : " + usuario);

    const authorizerContext = { user: JSON.stringify(usuario) };
    console.log("Context: " + authorizerContext);

    const effect = (usuario != null) ? 'Allow' : 'Deny';
    console.log("Effect : : " + effect);

    const policyDocument = policy.buildIAMPolicy(usuario.nombre, effect, event.methodArn, authorizerContext);
    console.log("Policy : : " + policyDocument);

    callback(null, policyDocument);
  } catch (e) {
    console.log(e);
    callback('Unauthorized'); // Return a 401 Unauthorized response
  }
};
