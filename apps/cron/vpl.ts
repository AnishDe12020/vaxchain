export type Vpl = {
  version: "0.1.0"
  name: "vpl"
  instructions: [
    {
      name: "createUser"
      accounts: [
        {
          name: "user"
          isMut: true
          isSigner: true
        },
        {
          name: "userPda"
          isMut: true
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: "role"
          type: {
            defined: "Role"
          }
        },
      ]
    },
    {
      name: "createBatch"
      accounts: [
        {
          name: "user"
          isMut: true
          isSigner: true
        },
        {
          name: "userPda"
          isMut: false
          isSigner: false
        },
        {
          name: "batch"
          isMut: false
          isSigner: false
        },
        {
          name: "batchPda"
          isMut: true
          isSigner: false
        },
        {
          name: "vault"
          isMut: true
          isSigner: false
        },
        {
          name: "mint"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: "expiresAt"
          type: "i64"
        },
        {
          name: "tempMin"
          type: "u16"
        },
        {
          name: "tempMax"
          type: "u16"
        },
        {
          name: "costPerPiece"
          type: "u16"
        },
        {
          name: "quantity"
          type: "u16"
        },
      ]
    },
    {
      name: "createVaccine"
      accounts: [
        {
          name: "user"
          isMut: true
          isSigner: true
        },
        {
          name: "userPda"
          isMut: false
          isSigner: false
        },
        {
          name: "batch"
          isMut: false
          isSigner: false
        },
        {
          name: "batchPda"
          isMut: false
          isSigner: false
        },
        {
          name: "vaccine"
          isMut: false
          isSigner: false
        },
        {
          name: "vaccinePda"
          isMut: true
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
      ]
      args: []
    },
    {
      name: "distributorReceive"
      accounts: [
        {
          name: "user"
          isMut: true
          isSigner: true
        },
        {
          name: "userPda"
          isMut: false
          isSigner: false
        },
        {
          name: "batch"
          isMut: false
          isSigner: false
        },
        {
          name: "batchPda"
          isMut: true
          isSigner: false
        },
        {
          name: "distributorTokenAccount"
          isMut: true
          isSigner: false
        },
        {
          name: "manufacturerTokenAccount"
          isMut: true
          isSigner: false
        },
        {
          name: "vault"
          isMut: true
          isSigner: false
        },
        {
          name: "mint"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
      ]
      args: []
    },
    {
      name: "doctorReceive"
      accounts: [
        {
          name: "user"
          isMut: true
          isSigner: true
        },
        {
          name: "userPda"
          isMut: false
          isSigner: false
        },
        {
          name: "batch"
          isMut: false
          isSigner: false
        },
        {
          name: "batchPda"
          isMut: true
          isSigner: false
        },
        {
          name: "distributorTokenAccount"
          isMut: true
          isSigner: false
        },
        {
          name: "doctorTokenAccount"
          isMut: true
          isSigner: false
        },
        {
          name: "vault"
          isMut: true
          isSigner: false
        },
        {
          name: "mint"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
      ]
      args: []
    },
    {
      name: "tempLog"
      accounts: [
        {
          name: "user"
          isMut: true
          isSigner: true
        },
        {
          name: "userPda"
          isMut: false
          isSigner: false
        },
        {
          name: "batch"
          isMut: false
          isSigner: false
        },
        {
          name: "batchPda"
          isMut: true
          isSigner: false
        },
        {
          name: "tempLog"
          isMut: false
          isSigner: false
        },
        {
          name: "tempLogPda"
          isMut: true
          isSigner: false
        },
        {
          name: "lastTempLog"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "lastTempLogPda"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "vault"
          isMut: true
          isSigner: false
        },
        {
          name: "mint"
          isMut: true
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: "temp"
          type: "u16"
        },
      ]
    },
    {
      name: "useVaccine"
      accounts: [
        {
          name: "user"
          isMut: true
          isSigner: true
        },
        {
          name: "userPda"
          isMut: false
          isSigner: false
        },
        {
          name: "vaccine"
          isMut: false
          isSigner: false
        },
        {
          name: "vaccinePda"
          isMut: true
          isSigner: false
        },
      ]
      args: []
    },
    {
      name: "checkTemp"
      accounts: [
        {
          name: "user"
          isMut: true
          isSigner: true
        },
        {
          name: "batch"
          isMut: false
          isSigner: false
        },
        {
          name: "batchPda"
          isMut: true
          isSigner: false
        },
        {
          name: "tempLog"
          isMut: false
          isSigner: false
        },
        {
          name: "tempLogPda"
          isMut: false
          isSigner: false
        },
        {
          name: "vault"
          isMut: true
          isSigner: false
        },
        {
          name: "mint"
          isMut: true
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
      ]
      args: []
    },
  ]
  accounts: [
    {
      name: "batch"
      type: {
        kind: "struct"
        fields: [
          {
            name: "pubkey"
            type: "publicKey"
          },
          {
            name: "manufacturer"
            type: "publicKey"
          },
          {
            name: "distributor"
            type: {
              option: "publicKey"
            }
          },
          {
            name: "doctor"
            type: {
              option: "publicKey"
            }
          },
          {
            name: "manufacturedAt"
            type: "i64"
          },
          {
            name: "expiresAt"
            type: "i64"
          },
          {
            name: "quantity"
            type: "u16"
          },
          {
            name: "tempMin"
            type: "u16"
          },
          {
            name: "tempMax"
            type: "u16"
          },
          {
            name: "costPerPiece"
            type: "u16"
          },
          {
            name: "status"
            type: {
              defined: "BatchStatus"
            }
          },
          {
            name: "tempDefect"
            type: "bool"
          },
          {
            name: "startDate"
            type: "i64"
          },
          {
            name: "stopDate"
            type: "i64"
          },
          {
            name: "latestTempLog"
            type: {
              option: "publicKey"
            }
          },
        ]
      }
    },
    {
      name: "tempLog"
      type: {
        kind: "struct"
        fields: [
          {
            name: "batch"
            type: "publicKey"
          },
          {
            name: "timestamp"
            type: "i64"
          },
          {
            name: "temp"
            type: "u16"
          },
          {
            name: "pubkey"
            type: "publicKey"
          },
        ]
      }
    },
    {
      name: "user"
      type: {
        kind: "struct"
        fields: [
          {
            name: "pubkey"
            type: "publicKey"
          },
          {
            name: "createdAt"
            type: "i64"
          },
          {
            name: "updatedAt"
            type: "i64"
          },
          {
            name: "role"
            type: {
              defined: "Role"
            }
          },
        ]
      }
    },
    {
      name: "vaccine"
      type: {
        kind: "struct"
        fields: [
          {
            name: "pubkey"
            type: "publicKey"
          },
          {
            name: "batch"
            type: "publicKey"
          },
          {
            name: "used"
            type: "bool"
          },
          {
            name: "usedBy"
            type: {
              option: "publicKey"
            }
          },
          {
            name: "usedAt"
            type: {
              option: "i64"
            }
          },
        ]
      }
    },
  ]
  types: [
    {
      name: "BatchStatus"
      type: {
        kind: "enum"
        variants: [
          {
            name: "Manufactured"
          },
          {
            name: "StoredByDistributor"
          },
          {
            name: "ReceivedByDoctor"
          },
        ]
      }
    },
    {
      name: "Role"
      type: {
        kind: "enum"
        variants: [
          {
            name: "Manufacturer"
          },
          {
            name: "Distributor"
          },
          {
            name: "Doctor"
          },
        ]
      }
    },
  ]
  errors: [
    {
      code: 6000
      name: "UnauhtorizedRole"
      msg: "Role doesn't have permission to perform this action"
    },
    {
      code: 6001
      name: "BatchNotManufactured"
      msg: "Batch is not manufactured"
    },
    {
      code: 6002
      name: "InvalidExpirationDate"
      msg: "Invalid expiration date"
    },
    {
      code: 6003
      name: "InvalidMint"
      msg: "Invalid mint"
    },
    {
      code: 6004
      name: "BatchEmpty"
      msg: "Empty batch"
    },
    {
      code: 6005
      name: "VaccineAlreadyUsed"
      msg: "Vaccine is already used"
    },
    {
      code: 6006
      name: "InvalidTempLog"
      msg: "Invalid temp log"
    },
    {
      code: 6007
      name: "TempLogNotPassedIn"
      msg: "Temp log not passed in"
    },
    {
      code: 6008
      name: "TempNotExpired"
      msg: "Temp not expired"
    },
    {
      code: 6009
      name: "NoTempLog"
      msg: "No temp log"
    },
  ]
}

export const IDL: Vpl = {
  version: "0.1.0",
  name: "vpl",
  instructions: [
    {
      name: "createUser",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userPda",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "role",
          type: {
            defined: "Role",
          },
        },
      ],
    },
    {
      name: "createBatch",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userPda",
          isMut: false,
          isSigner: false,
        },
        {
          name: "batch",
          isMut: false,
          isSigner: false,
        },
        {
          name: "batchPda",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "expiresAt",
          type: "i64",
        },
        {
          name: "tempMin",
          type: "u16",
        },
        {
          name: "tempMax",
          type: "u16",
        },
        {
          name: "costPerPiece",
          type: "u16",
        },
        {
          name: "quantity",
          type: "u16",
        },
      ],
    },
    {
      name: "createVaccine",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userPda",
          isMut: false,
          isSigner: false,
        },
        {
          name: "batch",
          isMut: false,
          isSigner: false,
        },
        {
          name: "batchPda",
          isMut: false,
          isSigner: false,
        },
        {
          name: "vaccine",
          isMut: false,
          isSigner: false,
        },
        {
          name: "vaccinePda",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "distributorReceive",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userPda",
          isMut: false,
          isSigner: false,
        },
        {
          name: "batch",
          isMut: false,
          isSigner: false,
        },
        {
          name: "batchPda",
          isMut: true,
          isSigner: false,
        },
        {
          name: "distributorTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "manufacturerTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "doctorReceive",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userPda",
          isMut: false,
          isSigner: false,
        },
        {
          name: "batch",
          isMut: false,
          isSigner: false,
        },
        {
          name: "batchPda",
          isMut: true,
          isSigner: false,
        },
        {
          name: "distributorTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "doctorTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "tempLog",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userPda",
          isMut: false,
          isSigner: false,
        },
        {
          name: "batch",
          isMut: false,
          isSigner: false,
        },
        {
          name: "batchPda",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tempLog",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tempLogPda",
          isMut: true,
          isSigner: false,
        },
        {
          name: "lastTempLog",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "lastTempLogPda",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "vault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "temp",
          type: "u16",
        },
      ],
    },
    {
      name: "useVaccine",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userPda",
          isMut: false,
          isSigner: false,
        },
        {
          name: "vaccine",
          isMut: false,
          isSigner: false,
        },
        {
          name: "vaccinePda",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "checkTemp",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "batch",
          isMut: false,
          isSigner: false,
        },
        {
          name: "batchPda",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tempLog",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tempLogPda",
          isMut: false,
          isSigner: false,
        },
        {
          name: "vault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "batch",
      type: {
        kind: "struct",
        fields: [
          {
            name: "pubkey",
            type: "publicKey",
          },
          {
            name: "manufacturer",
            type: "publicKey",
          },
          {
            name: "distributor",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "doctor",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "manufacturedAt",
            type: "i64",
          },
          {
            name: "expiresAt",
            type: "i64",
          },
          {
            name: "quantity",
            type: "u16",
          },
          {
            name: "tempMin",
            type: "u16",
          },
          {
            name: "tempMax",
            type: "u16",
          },
          {
            name: "costPerPiece",
            type: "u16",
          },
          {
            name: "status",
            type: {
              defined: "BatchStatus",
            },
          },
          {
            name: "tempDefect",
            type: "bool",
          },
          {
            name: "startDate",
            type: "i64",
          },
          {
            name: "stopDate",
            type: "i64",
          },
          {
            name: "latestTempLog",
            type: {
              option: "publicKey",
            },
          },
        ],
      },
    },
    {
      name: "tempLog",
      type: {
        kind: "struct",
        fields: [
          {
            name: "batch",
            type: "publicKey",
          },
          {
            name: "timestamp",
            type: "i64",
          },
          {
            name: "temp",
            type: "u16",
          },
          {
            name: "pubkey",
            type: "publicKey",
          },
        ],
      },
    },
    {
      name: "user",
      type: {
        kind: "struct",
        fields: [
          {
            name: "pubkey",
            type: "publicKey",
          },
          {
            name: "createdAt",
            type: "i64",
          },
          {
            name: "updatedAt",
            type: "i64",
          },
          {
            name: "role",
            type: {
              defined: "Role",
            },
          },
        ],
      },
    },
    {
      name: "vaccine",
      type: {
        kind: "struct",
        fields: [
          {
            name: "pubkey",
            type: "publicKey",
          },
          {
            name: "batch",
            type: "publicKey",
          },
          {
            name: "used",
            type: "bool",
          },
          {
            name: "usedBy",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "usedAt",
            type: {
              option: "i64",
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "BatchStatus",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Manufactured",
          },
          {
            name: "StoredByDistributor",
          },
          {
            name: "ReceivedByDoctor",
          },
        ],
      },
    },
    {
      name: "Role",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Manufacturer",
          },
          {
            name: "Distributor",
          },
          {
            name: "Doctor",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "UnauhtorizedRole",
      msg: "Role doesn't have permission to perform this action",
    },
    {
      code: 6001,
      name: "BatchNotManufactured",
      msg: "Batch is not manufactured",
    },
    {
      code: 6002,
      name: "InvalidExpirationDate",
      msg: "Invalid expiration date",
    },
    {
      code: 6003,
      name: "InvalidMint",
      msg: "Invalid mint",
    },
    {
      code: 6004,
      name: "BatchEmpty",
      msg: "Empty batch",
    },
    {
      code: 6005,
      name: "VaccineAlreadyUsed",
      msg: "Vaccine is already used",
    },
    {
      code: 6006,
      name: "InvalidTempLog",
      msg: "Invalid temp log",
    },
    {
      code: 6007,
      name: "TempLogNotPassedIn",
      msg: "Temp log not passed in",
    },
    {
      code: 6008,
      name: "TempNotExpired",
      msg: "Temp not expired",
    },
    {
      code: 6009,
      name: "NoTempLog",
      msg: "No temp log",
    },
  ],
}
