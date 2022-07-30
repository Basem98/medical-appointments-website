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
  },
  "/doctors/all": {
    "get": {
      "tags": ["Doctor"],
      "description": "An endpoint used to get a paginated list of doctors without any filters",
      "parameters": [
        {
          "name": "page",
          "in": "query",
          "description": "A parameter that specifies the desired page. Default value is 0",
          "schema": {
            "type": "integer"
          }
        },
        {
          "name": "limit",
          "in": "query",
          "description": "A parameter that specifies the number of documents per page. Default value is 9",
          "schema": {
            "type": "integer"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "A list of the required page of doctors",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties":
                {
                  "doctors":
                  {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": doctorModel.schema
                    }
                  }
                }
              }
            }
          }
        },
        "404": {
          "description": "A message specifies the reason why the request failed to find resources",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string"
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