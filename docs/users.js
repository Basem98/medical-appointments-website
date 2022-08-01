const userModel = require('./models/user');

module.exports = {
    "/users/": {
        "post": {
            "tags": ["User"],
            "description": "An endpoint to register a new user.",
            "requestBody": {
                "description": "An object that matches the user's schems.",
                "required": "true",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "required": userModel.required,
                            "properties": userModel.schema
                        }
                    }
                }
            },
            "responses": {
                "201": {
                    "description": "A response that indicates that the user is registered successfully.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "description": "Registeration status"
                                    },
                                    "id": {
                                        "type": "string",
                                        "description": "Id of the newly registered user"
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "A resonse that indicates that the registeration is failed because of validation errors",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "error": {
                                        "type": "string",
                                        "description": "Validation error message/Array of messages"
                                    }
                                }
                            }
                        }
                    }
                },
                "500": {
                    "description": "A response that indicates that an error occured in runtime",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "error": {
                                        "type": "string",
                                        "description": "Internal Error message"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/users/login/": {
        "post": {
            "tags": ["User"],
            "description": "An endpoint to allow registered users to login to their accounts",
            "requestBody": {
                "description": "An object that contains login credintials",
                "required": "true",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "required": {
                                "email": userModel.schema.email,
                                "password": userModel.schema.password
                            },
                            "properties": {
                                "email": userModel.schema.email,
                                "password": userModel.schema.password
                            }
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "A response that indicates that the user can access his account",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "token": {
                                        "type": "string",
                                        "description": "Json web token to give access to read, delete, and update user's data"
                                    },
                                    "id": {
                                        "type": "string",
                                        "description": "The id of the logged in user"
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "A response containing wrong credintial error message",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "description": "Wrong credintials error message"
                                    }
                                }
                            }
                        }
                    }
                },
                "500": {
                    "description": "A response that indicates that an error occured in runtime",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "error": {
                                        "type": "string",
                                        "description": "Internal Error message"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/users/{id}": {
        "get": {
            "tags": ["User"],
            "description": "An endpoint to retrieve user's data for authorized roles only",
            "security": [
                {
                    "bearerAuth": []
                }
            ],
            "parameters": [
                {
                    "name": "id",
                    "description": "Id of the user to retrive his data",
                    "required": "ture",
                    "in": "path",
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "A response that contains the user's data",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "_id": {
                                        "type": "string",
                                        "description": "Retrieved user's id"
                                    },
                                    "firstName": userModel.schema.firstName,
                                    "lastName": userModel.schema.lastName,
                                    "email": userModel.schema.email,
                                    "phoneNumber": userModel.schema.phoneNumber,
                                    "appointments": userModel.schema.appointments,
                                    "isVerified": userModel.schema.isVerified
                                }
                            }
                        }
                    }
                },
                "401": {
                    "description": "A response that contains message of authorization error",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "description": "Authorization error message"
                                    }
                                }
                            }
                        }
                    }
                },
                "404": {
                    "description": "A response that contains message saying that user is not found",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "description": "User is not found error message"
                                    }
                                }
                            }
                        }
                    }
                },
                "500": {
                    "description": "A response that indicates that an error occured in runtime",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "error": {
                                        "type": "string",
                                        "description": "Internal Error message"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "delete": {
            "tags": ["User"],
            "description": "An endpoint to delete user's data from database",
            "security": [
                {
                    "bearerAuth": []
                }
            ],
            "parameters": [
                {
                    "name": "id",
                    "description": "Id of the user to delete his data",
                    "required": "true",
                    "in": "path",
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "A response indicate that the user's data is deleted successfully",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "decription": "Message saying that the user's data is deleted successfullty"
                                    }
                                }
                            }
                        }
                    }
                },
                "401": {
                    "description": "A response that contains message of authorization error",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "description": "Authorization error message"
                                    }
                                }
                            }
                        }
                    }
                },
                "404": {
                    "description": "A response that contains message saying that user is not found",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "description": "User is not found error message"
                                    }
                                }
                            }
                        }
                    }
                },
                "500": {
                    "description": "A response that indicates that an error occured in runtime",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "error": {
                                        "type": "string",
                                        "description": "Internal Error message"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "patch": {
            "tags": ["User"],
            "description": "An endpoint to update user's data",
            "security": [
                {
                    "bearerAuth": []
                }
            ],
            "parameters": [
                {
                    "name": "id",
                    "description": "Id of the user to update his data",
                    "required": "true",
                    "in": "path",
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "requestBody": {
                "description": "The field/fields of the user's data to be updated.",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": userModel.schema
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "A response that indicates that the user's data is updates successfully",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "object",
                                        "description": "Message saying that the user's data is updated successfully"
                                    }
                                }
                            }
                        }
                    }
                },
                "401": {
                    "description": "A response that contains message of authorization error",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "description": "Authorization error message"
                                    }
                                }
                            }
                        }
                    }
                },
                "404": {
                    "description": "A response that contains message saying that user is not found",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "description": "User is not found error message"
                                    }
                                }
                            }
                        }
                    }
                },
                "500": {
                    "description": "A response that indicates that an error occured in runtime",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "error": {
                                        "type": "string",
                                        "description": "Internal Error message"
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

