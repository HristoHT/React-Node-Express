const add = require('./actions/add');
const get = require('./actions/get');
const getOneBy = require('./actions/getOneBy');
const getById = require('./actions/getById');

const actions = (database, ObjectId) => collectionName => {
    const collection = database.collection(collectionName);

    return {
        add: add(collection),
        get: get(collection),
        getOneBy: getOneBy(collection),
        getById: getById(collection, ObjectId)
    }
}

module.exports = actions;