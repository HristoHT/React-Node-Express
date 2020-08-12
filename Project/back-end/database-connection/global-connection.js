const usersList = require('./sub-connections/users/users-list');

const collections = {
    user: 'Users'
}

/**
 * Функцията връща обект, отговарящ за всички взаимодействия с колекциите от базата данни
 * 
 * @param {MongoDB Connection} database 
 * @param {MongoDB ObjectId} ObjectId 
 */
const globalConnection = (database, ObjectId) => {
    return Object.freeze({
        //Обектът, отговарящ за взаимодействията с колекцията на потребителите
        usersList: usersList(database.collection(collections.user), ObjectId)
    });
}

module.exports = { collections, globalConnection }