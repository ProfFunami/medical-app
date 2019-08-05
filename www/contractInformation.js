const HospitalContractAddress = "0x7ee7a263f47a3732cfe9ac675bc1621ea6afb8c1"; 

const HospitalContractABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_passportNo",
				"type": "string"
			},
			{
				"name": "_patientData",
				"type": "string"
			},
			{
				"name": "_signature",
				"type": "bytes"
			},
			{
				"name": "_patientPassPhrase",
				"type": "string"
			}
		],
		"name": "startExamination",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "contractAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "hospitalAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "patientAddress",
				"type": "address"
			}
		],
		"name": "StartExamination",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getExaminationList",
		"outputs": [
			{
				"components": [
					{
						"name": "passportNo",
						"type": "string"
					},
					{
						"name": "examinationContract",
						"type": "address"
					},
					{
						"name": "start",
						"type": "uint256"
					}
				],
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

const ExaminationContractABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "validatePatientAddress",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withDraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getPatientAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_medicalCost",
				"type": "uint256"
			}
		],
		"name": "setMedicalCost",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "refund",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_signature",
				"type": "bytes"
			}
		],
		"name": "signMedicalCost",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getContractData",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"components": [
					{
						"name": "name",
						"type": "string"
					},
					{
						"name": "symbol",
						"type": "string"
					},
					{
						"name": "decimals",
						"type": "uint8"
					}
				],
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTokenData",
		"outputs": [
			{
				"components": [
					{
						"name": "name",
						"type": "string"
					},
					{
						"name": "symbol",
						"type": "string"
					},
					{
						"name": "decimals",
						"type": "uint8"
					}
				],
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_patientData",
				"type": "string"
			},
			{
				"name": "_signature",
				"type": "bytes"
			},
			{
				"name": "_patientPassPhrase",
				"type": "string"
			},
			{
				"name": "_hospitalAddress",
				"type": "address"
			},
			{
				"name": "_tokenAddress",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "medicalCost",
				"type": "uint256"
			}
		],
		"name": "SetMedicalCost",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "SignMedicalCost",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "isCompleted",
				"type": "bool"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Payment",
		"type": "event"
	}
];