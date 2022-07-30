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
    }
}
