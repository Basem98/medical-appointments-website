module.exports = {
    required: [
        "firstName",
        "lastName",
        "password",
        "email",
        "phoneNumber",
    ],
    schema: {
        "firstName": {
            "type": "string",
        },
        "lastName": {
            "type": "string",
        },
        "password": {
            "type": "string",
        },
        "email": {
            "type": "string",
        },
        "phoneNumber": {
            "type": "string",
        },
        "appointments": {
            "type": "array",
            "description": "An array of mongo object ids. Each Id refers to an appointment in the database.",
            "item": {
                "type": "string"
            }
        },
        "isVerified": {
            "type": "boolean",
            "description": "A boolean values indicates that the user has verified his registered email."
        }
    }
}