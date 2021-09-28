{
 components: {
      schemas: {
        identificationNumber: {
          type: 'integer',
          description: 'User identification number',
          example: 1234
        },
        username: {
          type: 'string',
          example: 'raparicio'
        },
        userType: {
          type: 'string',
          enum: USER_TYPES,
          default: REGULAR
        },
        companyId: {
          type: 'integer',
          description: 'Company id where the user works',
          example: 15
        },
        User: {
          type: 'object',
          properties: {
            identificationNumber: {
              $ref: '#/components/schemas/identificationNumber'
            },
            username: {
              $ref: '#/components/schemas/username'
            },
            userType: {
              $ref: '#/components/schemas/userType'
            },
            companyId: {
              $ref: '#/components/schemas/companyId'
            }
          }
        },
        Users: {
          type: 'object',
          properties: {
            users: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string'
            },
            internal_code: {
              type: 'string'
            }
          }
        }
      }
    }
}