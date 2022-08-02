module.exports = {
  required: [
    "firstName",
    "lastName",
    "password",
    "email",
    "phoneNumber",
    "specialization",
    "experiences",
    "education",
    "clinics",
    "profilePicture",
    "professionalLicense"
  ],
  schema: {
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    "password": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "phoneNumber": {
      "type": "string"
    },
    "appointments": {
      "type": "array",
      "description": "An array of objectIds that reference the appointment database model",
      "items": {
        "type": "string"
      }
    },
    "specialization": {
      "type": "string"
    },
    "experiences": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string"
          },
          "workplace": {
            "type": "string"
          },
          "location": {
            type: "object",
            "properties": {
              "city": {
                "type": "string"
              },
              "country": {
                "type": "string"
              }
            }
          },
          "startDate": {
            "type": "string",
            "description": "A JavaScript Date object"
          },
          "endDate": {
            type: "string",
            "description": "A JavaScript Date object"
          },
          "isCurrentlyWorking": {
            "type": "boolean"
          }
        }
      }
    },
    "education": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "degree": {
            "type": "string"
          },
          "granter": {
            type: "string"
          },
          "issueDate": {
            "type": "string",
            "description": "A JavaScript Date object"
          }
        }
      }
    },
    "certifications": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": {
            type: "string"
          },
          "granter": {
            "type": "string"
          },
          "issueDate": {
            "type": "string",
            "description": "A JavaScript Date object"
          }
        }
      }
    },
    clinics: {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          name: {
            type: "string"
          },
          "address": {
            "type": "object",
            "properties": {
              "city": {
                "type": "string"
              },
              "governorate": {
                "type": "string"
              },
              "country": {
                "type": "string"
              },
              "buildingNo": {
                "type": "number"
              },
              "streetName": {
                "type": "string"
              },
              "postalCode": {
                "type": "number"
              }
            }
          },
          "geoLocation": {
            "type": "object",
            "properties": {
              "longitude": {
                "type": "string"
              },
              latitude: {
                "type": "string"
              }
            }
          },
          "phone": {
            "type": "object",
            "properties": {
              "mobile": {
                "type": "string"
              },
              landline: {
                "type": "string"
              }
            }
          },
          fees: {
            "type": "number"
          }
        }
      },
    },
    "rating": {
      "type": "number"
    },
    "profilePicture": {
      "type": "string"
    },
    "professionalLicense": {
      "type": "string"
    },
    "isVerified": {
      "type": "boolean"
    },
    "isAccepted": {
      "type": "boolean"
    }
  }
}