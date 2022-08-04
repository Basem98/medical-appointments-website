const appointmentModel = require("./models/appointment");

module.exports = {
    "/appointments/": {
        "post": {
            "tags": ["Appointment"],
            "description": "An endpoint to add new appointment to database",
            "security": [
                {
                    "bearerAuth": []
                }
            ],
            "requestBody": {
                "description": "Json object contains the appointment details",
                "required": "true",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "required": appointmentModel.required,
                            "properties": {
                                "date": appointmentModel.schema.date,
                                "time": appointmentModel.schema.time
                            }
                        }
                    }
                }
            },
            "responses": {
                "201": {
                    "description": "A response that indicates adding an appointment successfully",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "object",
                                        "description": "Message saying that the appointment added successfully on the specified date"
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
    "/appointments/upcomings/{id}": {
        "get": {
            "tags": ["Appointment"],
            "description": "An endpoint that fetches the upcoming appointments of the user or the doctor based on the given id",
            "security": [
                {
                    "bearerAuth": []
                }
            ],
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "description": "The id of the user or the doctor to fetch their upcoming appointments",
                    "required": "true",
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "A response that indicates fetching the upcoming appointments successfully",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "array",
                                        "description": "An array of the upcoming appointments"
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
                    "description": "A response that contains message saying that appointment is not found",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "description": "Appointment is not found error message"
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
    "/appointments/previous/{id}": {
        "get": {
            "tags": ["Appointment"],
            "description": "An endpoint to fetch the previous appointments base on the given id of the user or the doctor",
            "security": [
                {
                    "bearerToken": []
                }
            ],
            "parameters": [
                {
                    "name": "id",
                    "description": "The id of the user or the doctor to get their appointments based on the given id",
                    "in": "path",
                    "required": "true",
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "A response indicating that the data is fetched successfully",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "array",
                                        "description": "An array of the previous appointments"
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
                    "description": "A response that contains message saying that appointment is not found",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "description": "Appointment is not found error message"
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
    "/appointments/book/{id}": {
        "post": {
            "tags": ["Appointment"],
            "description": "An endpoint that allows user to book an appointment",
            "security": {
                "bearerAuth": []
            },
            "parameters": [
                {
                    "name": "id",
                    "description": "The id of the appointment to book",
                    "required": "true",
                    "in": "path",
                    "schema": {
                        "type": "true"
                    }

                }
            ],
            "responses": {
                "200": {
                    "description": "A response that indicates that the appointment is booked successfully",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "description": "A message saying that the appointment is booked successfully"
                                    }
                                }
                            }
                        }
                    }
                },
                "404": {
                    "description": "A response that contains message saying that appointment is not found",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "description": "Appointment is not found error message"
                                    }
                                }
                            }
                        }
                    }
                },
                "409": {
                    "description": "A response indicating that the appointment is taken",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "description": "A message saying that the appointment is already taken"
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