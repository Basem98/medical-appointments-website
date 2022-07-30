module.exports = {
  "/verify": {
    "put": {
      "tags": [
        "Base"
      ],
      "description": "An endpoint that recieves a verification token to verify the sender",
      "responses":
      {
        "200": {
          "description": "A message that confirms the verification",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string",
                    "description": "Verification status"
                  }
                }
              }
            }
          }
        },
        "404": {
          "description": "A message that says that the token is invalid or that it has expired",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string",
                    "description": "Verification status"
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