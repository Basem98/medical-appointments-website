const appointmentModel = require("./models/appointment");

module.exports = {
    "/appointments/": {
        "post": {
            "tags": ["Appointment"],
            "description": "An endpoint to add new appointment to database",
            "requestBody": {
                "description": "Json object contains the appointment details",
                "required": "true",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "required": appointmentModel.required,
                            "properties": appointmentModel.schema
                        }
                    }
                }
            },
            "parameters": [
                {
                    "name": "Authorization header",
                    "in": "header",
                    "required": "true",
                    "description": "Json web token to authorize user/doctoe before making and appointment",
                    "schema": {
                        "type": "string"
                    }
                },
            ],
            "reponseses": {
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
    }
}