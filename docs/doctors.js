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
        },
        {
          "name": "specialization",
          "in": "query",
          "description": "A parameter that filters the doctors by their specialization",
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "governorate",
          "in": "query",
          "description": "A parameter that filters the doctors by their clinic's governorate",
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "dateFrom",
          "in": "query",
          "description": "A parameter that filters the doctors by the start date of their appointments",
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "dateTo",
          "in": "query",
          "description": "A parameter that filters the doctors by the end date of their appointments",
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "feesFrom",
          "in": "query",
          "description": "A parameter that filters the doctors by the starting fees of their clinic",
          "schema": {
            "type": "number"
          }
        },
        {
          "name": "feesTo",
          "in": "query",
          "description": "A parameter that filters the doctors by the maximum fees of their clinic",
          "schema": {
            "type": "number"
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
  },
  "/doctors/login": {
    "post": {
      "tags": [
        "Doctor"
      ],
      "description": "An endpoint to sign doctors in",
      "requestBody": {
        "description": "An object that has two properties; an email and a password",
        "required": "true",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "required": ["email", "password"],
              "properties": {
                "email": {
                  "type": "string"
                },
                "password": {
                  "type": "string"
                }
              }
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "A message that confirms the sign in and the doctor's data",
          "headers": {
            "Set-Cookie": {
              "schema": {
                "type": "string",
                "description": "A header that allows the server to store a cookie in the client's browser to be used as a store for the access token",
                "emaple": "accessToken=sdfweqgf123as; Path=/; Max-Age=2104; HttpOnly; Secure;"
              }
            }
          },
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string",
                    "description": "Authentication status"
                  },
                  "data": {
                    "type": "string",
                    "description": "The signed-in doctor's data"
                  },
                }
              }
            }
          },
        },
        "404": {
          "description": "A message that explains where the sign in process failed",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
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