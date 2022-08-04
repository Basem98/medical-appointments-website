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
  },
  "/logout": {
    "get": {
      "tags": [
        "Base"
      ],
      "description": "An endpoint that resets a cookie, making it empty to log a user out",
      "responses": {
        "200": {
          description: "A message that confirm the sign out status",
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
                    "description": "Signing out status"
                  }
                }
              }
            }
          }
        },
        "500": {
          "description": "A message describing an internal error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string",
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