const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('../docs/openapi');



module.exports = [
  swaggerUi.serve,
  swaggerUi.setup(swaggerDefinition)
];