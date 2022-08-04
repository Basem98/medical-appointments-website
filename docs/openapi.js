const paths = require('./paths');

module.exports = {
  "openapi": "3.0.0",
  "info": {
    "description": "Welcome to v1 of the Medical Appointments Website (MAW) API!\nMAW is a medical appointments website that makes booking medical appointments in Egypt easier, and more accessible.\n\nThis API is built in Node.js and Express.js, using nothing other than JavaScript's raw power to build a performant and reliable server, that is able to handle as many requests as the website needs in a period of time that's as short as it can get.",
    "version": "1.0.0",
    "title": "Medical Appointments Website - MAW",
    "contact": {
      "email": "mawteam@yahoo.com"
    },
    "license": {
      "name": "MIT",
      "url": "https://opensource.org/licenses/MIT"
    }
  },
  "externalDocs": {
    "description": "Visit the website",
    "url": "localhost:3000"
  },
  "tags": [
    {
      "name": "Base",
      "description": "All the functionality used by different roles"
    },
    {
      "name": "User",
      "description": "All the functionality exposed for the main consumers that want to book appointments"
    },
    {
      "name": "Doctor",
      "description": "All the functionality the doctors on out platform can use to provide their service to the consumers"
    },
    {
      "name": "Appointment",
      "description": "All the functionality related to the booking process exposed to doctors and users"
    },
    {
      "name": "Admin",
      "description": "All the functionality the admin can do in the API"
    }
  ],
  "servers": [
    {
      "url": "http://localhost:8080/api",
      "description": "Development Server"
    },
    {
      "url": "https://maw-api.herokuapp.com/api",
      "description": "Production Server"
    }
  ],
  "paths": paths,
  "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
    "cookieAuth": {
      "type": "http-only",
      "in": "cookie",
      "name": "accessToken"
    }
  }
}