const { userPassword, ...userData } = require("./user");
const { doctorPassword, ...doctorData } = require("./doctor");

module.exports = {
    required: [
        "date",
        "time"
    ],
    schema: {
        "date": {
            "type": "string",
            "format": "date",
            "description": "The day, month, and year of the appointment"
        },
        "time": {
            "type": "object",
            "description": "The hour, minute, and duration of the appointment",
            "properties": {
                "hour": {
                    "type": "integer",
                },
                "minute": {
                    "type": "integer",
                },
                "duration": {
                    "type": "integer",
                }
            }
        },
        "user": {
            "type": "object",
            "description": "Object contains the data of the user who booked the appointment",
            "properties": userData
        },
        "doctor": {
            "type": "object",
            "description": "Object contains the data of the doctor who will examiner doctor",
            "properties": doctorData
        },
        "info": {
            "type": "object",
            "description": "Object contains additional data about the appointment",
            "properties": {
                "prescription": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "drugName": {
                                "type": "string"
                            },
                            "dosage": {
                                "type": "string"
                            }
                        }
                    }
                },
                "diagnosis": {
                    "type": "string"
                },
                "nextVisit": {
                    "type": "string",
                    "description": "Object Id refers to the next (follow up) appointment"
                }
            }
        }
    }
}