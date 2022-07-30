const doctorModel = require('./models/doctor');

module.exports = {
  "/doctors/": {
    "post": {
      "tags": [
        "Doctor"
      ],
      "description": "An endpoint used to register new doctors",
      "requestBody": {
        "description": "An object that matches the doctor's schema",
        "required": "true",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "required": doctorModel.required,
              "properties": doctorModel.schema
            }
          }
        }
      },
      "responses": {
        "201": {
          "description": "A message that confirms the registration",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string",
                    "description": "Registration status"
                  }
                }
              }
            }
          },
        },
        "400": {
          "description": "A message that explains where the validation failed",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string",
                    "description": "Validation status"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}