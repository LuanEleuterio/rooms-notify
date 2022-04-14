const vendor = process.env.GATEWAY_NAME
const gateway = require(`./vendor/${vendor}.vendor`)

const interface = {
    getBanks: async () =>{
        return await gateway.getBanks()
    },
    getBusiness: async () =>{
        return await gateway.getBusiness()
    },
    createAccount: async (data) =>{
        return await gateway.createAccount(data)
    },
    getBalance: async (resourceToken) =>{
        return await gateway.getBalance(resourceToken)
    },
    getDocuments: async (resourceToken) =>{
        return await gateway.getDocuments(resourceToken)
    },
    sendDocuments: async (data) =>{
        return await gateway.sendDocuments(data)
    },
    createCharge: async (data) =>{
        return await gateway.createCharge(data)
    },
    cancelCharge: async (data) =>{
        return await gateway.cancelCharge(data)
    },
    sendPayment: async (data) =>{
        return await gateway.sendPayment(data)
    },
    cancelPayment: async (paymentId, data) =>{
        return await gateway.cancelPayment(paymentId, data)
    },
    cardTokenization: async (data) =>{
        return await gateway.cardTokenization(data)
    },
}

module.exports = interface