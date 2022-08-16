const doctorModel = require("./models/doctor");
const userModel = require('./models/user');
const appointmentModel = require('./models/appointment');
const logModel = require('./models/log');
const adminModel = require("./models/admin");

module.exports = {
  "/admins/": {
    "post": {
      "tags": ["Admin"],
      "description": "an endpoint to create a new admin acount",
      "requestBody": {
        "description": "An object that matches the admin's schema",
        "required": "true",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "required": adminModel.required,
              "properties": adminModel.schema
            }
          }
        }
      },
      "responses": {
        "201": {
          "description": "A message that confirms the account creation",
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
  "/admins/login": {
    "post": {
      "tags": ["Admin"],
      "description": "an endpoint to authenticate and log an admin in",
      "requestBody": {
        "description": "An object with the email and password of an admin",
        "required": "true",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "required": adminModel.required.slice(1),
              "properties": {
                "email": adminModel.schema.email,
                "password": adminModel.schema.password
              }
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "A message that confirms the login success",
          "headers": {
            "Set-Cookie": {
              "schema": {
                "type": "string",
                "description": "A header that allows the server to store a cookie in the client's browser to be used as a store for the access token",
                "exmaple": "accessToken=sdfweqgf123as; Path=/; Max-Age=2104; HttpOnly; Secure;"
              }
            },
            "Set-Cookie": {
              "schema": {
                "type": "string",
                "description": "A header that allows the server to store a cookie in the client's browser to be used as a role identifier when needed",
                "exmaple": "role=Admin; Path=/; Max-Age=2104; HttpOnly; Secure;"
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
                    "description": "Login status"
                  }
                }
              }
            }
          },
        },
        "404": {
          "description": "A message that explains that the email or password are wrong",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string",
                    "description": "Login status"
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "/admins/doctors/all": {
    "get": {
      "tags": ["Admin"],
      "description": "an endpoint to get all doctors in the database",
      "security": [
        {
          "cookieAuth": []
        }
      ],
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
                  "data":
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
  "/admins/doctors": {
    "get": {
      "tags": ["Admin"],
      "description": "an endpoint to get all verified doctors' applications",
      "security": [
        {
          "cookieAuth": []
        }
      ],
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
                  "data":
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
  "/admins/doctors/accept/{id}": {
    "put": {
      "tags": ["Admin"],
      "description": "An endpoint to accept a doctor's application",
      "security": [
        {
          "cookieAuth": []
        }
      ],
      "parameters": [
        {
          "name": "id",
          "required": true,
          "in": "path",
          "description": "The id of the doctor to be accepted"
        }
      ],
      "responses": {
        "204": {
          "description": "A response with a status code that confirms that the resourse is updated successfully",
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
  "/admins/doctors/delete/{id}": {
    "delete": {
      "tags": ["Admin"],
      "description": "An endpoint to reject/delete a doctor's application",
      "security": [
        {
          "cookieAuth": []
        }
      ],
      "parameters": [
        {
          "name": "id",
          "required": true,
          "in": "path",
          "description": "The id of the doctor to be deleted"
        }
      ],
      "responses": {
        "204": {
          "description": "A response with a status code that confirms that the resourse is updated successfully",
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
  "/admins/users/all": {
    "get": {
      "tags": ["Admin"],
      "description": "an endpoint to get all users in the database",
      "security": [
        {
          "cookieAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "A list of the required page of users",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties":
                {
                  "data":
                  {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": userModel.schema
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
  "/admins/users/delete/{id}": {
    "delete": {
      "tags": ["Admin"],
      "description": "An endpoint to delete a users's account",
      "security": [
        {
          "cookieAuth": []
        }
      ],
      "parameters": [
        {
          "name": "id",
          "required": true,
          "in": "path",
          "description": "The id of the user to be deleted"
        }
      ],
      "responses": {
        "204": {
          "description": "A response with a status code that confirms that the resourse is updated successfully",
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
  "/admins/logs": {
    "get": {
      "tags": ["Admin"],
      "description": "an endpoint to get all logs by page",
      "security": [
        {
          "cookieAuth": []
        }
      ],
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
          "description": "A list of the required page of logs",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties":
                {
                  "data":
                  {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": logModel.schema
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
    },
    "delete": {
      "tags": ["Admin"],
      "description": "An endpoint to delete all logs",
      "security": [
        {
          "cookieAuth": []
        }
      ],
      "responses": {
        "204": {
          "description": "A response with a status code that confirms that the resourse is updated successfully",
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
  "/admins/logs/errors": {
    "get": {
      "tags": ["Admin"],
      "description": "an endpoint to get error logs by page",
      "security": [
        {
          "cookieAuth": []
        }
      ],
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
          "description": "A list of the required page of error logs",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties":
                {
                  "data":
                  {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": logModel.schema
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
  "/admins/appointments/all": {
    "get": {
      "tags": ["Admin"],
      "description": "an endpoint to get all appointments in the database",
      "security": [
        {
          "cookieAuth": []
        }
      ],
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
          "description": "A list of the required page of appointments",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties":
                {
                  "data":
                  {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": appointmentModel.schema
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
  "/admins/appointments/upcoming": {
    "get": {
      "tags": ["Admin"],
      "description": "an endpoint to get upcoming appointments in the database",
      "security": [
        {
          "cookieAuth": []
        }
      ],
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
          "description": "A list of the required page of appointments",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties":
                {
                  "data":
                  {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": appointmentModel.schema
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
  "/admins/appointments/previous": {
    "get": {
      "tags": ["Admin"],
      "description": "an endpoint to get previous appointments in the database",
      "security": [
        {
          "cookieAuth": []
        }
      ],
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
          "description": "A list of the required page of appointments",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties":
                {
                  "data":
                  {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": appointmentModel.schema
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
  "/admins/appointments/delete/{id}": {
    "delete": {
      "tags": ["Admin"],
      "description": "An endpoint to delete an appointments and all its references",
      "security": [
        {
          "cookieAuth": []
        }
      ],
      "parameters": [
        {
          "name": "id",
          "required": true,
          "in": "path",
          "description": "The id of the appointment to be deleted"
        }
      ],
      "responses": {
        "204": {
          "description": "A response with a status code that confirms that the resourse is updated successfully",
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
  "/admins/appointments/statistics": {
    "get": {
      "tags": ["Admin"],
      "description": "an endpoint to get statistics for all different states of appointments (in a week)",
      "security": [
        {
          "cookieAuth": []
        }
      ],
      "parameters": [
        {
          "name": "dateFrom",
          "in": "query",
          "description": "A parameter that specifies the date to calculate a week up to",
          "schema": {
            "type": "integer"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "An object that has 5 properties that describe different stats for appointments",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties":
                {
                  "data":
                  {
                    "type": "object",
                    "properties": {
                      "numberOfAppointments": {
                        "type": "number"
                      },
                      "numberOfAvailableAppointments": {
                        "type": "number"
                      },
                      "numberOfBookedAppointments": {
                        "type": "number"
                      },
                      "numberOfFinishedAppointments": {
                        "type": "number"
                      },
                      "numberOfCanceledAppointments": {
                        "type": "number"
                      }
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
  "/admins/appointments/statistics/day": {
    "get": {
      "tags": ["Admin"],
      "description": "an endpoint to get the number of daily appointments in a week",
      "security": [
        {
          "cookieAuth": []
        }
      ],
      "parameters": [
        {
          "name": "dateFrom",
          "in": "query",
          "description": "A parameter that specifies the date to calculate a week up to",
          "schema": {
            "type": "integer"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "An object that has the 7 week days as its properties with the number of appointments in each day. Note that their ordering could change.",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties":
                {
                  "data":
                  {
                    "type": "object",
                    "properties": {
                      "Sat": {
                        "type": "number"
                      },
                      "Sun": {
                        "type": "number"
                      },
                      "Mon": {
                        "type": "number"
                      },
                      "Tue": {
                        "type": "number"
                      },
                      "Wed": {
                        "type": "number"
                      },
                      "Thur": {
                        "type": "number"
                      },
                      "Fri": {
                        "type": "number"
                      }
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
  "/admins/users/statistics": {
    "get": {
      "tags": ["Admin"],
      "description": "an endpoint to get statistics for signed up users in a specific time period (week)",
      "security": [
        {
          "cookieAuth": []
        }
      ],
      "parameters": [
        {
          "name": "dateFrom",
          "in": "query",
          "description": "A parameter that specifies the date to calculate a week up to",
          "schema": {
            "type": "integer"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "An object that has statistics for users and doctors",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties":
                {
                  "data":
                  {
                    "type": "object",
                    "properties": {
                      "doctors": {
                        "type": "number"
                      },
                      "users": {
                        "type": "number"
                      }
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