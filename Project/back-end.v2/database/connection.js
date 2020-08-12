require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const actions = require('./actions.js');
const manipolators = require('../manipolators/manipolators.js');

const uri = process.env.DATABASE;
const databaseConnection = async databaseName => {
    try {
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const database = client.db(databaseName);
        const databaseActions = actions(database, ObjectId);
        
        return {
            ...manipolators(databaseActions),
            close: () => client.close()
        };
    } catch (e) {
        throw e;
    }
}

module.exports = databaseConnection;