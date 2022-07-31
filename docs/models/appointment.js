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
            "type": "string",
            "description": "Id of the examinee user"
        },
        "doctor": {
            "type": "string",
            "description": "Id of the examiner doctor",
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