const add = require('./users/add');

const usersList = usersCollection => {
    return Object.freeze({
        ...usersCollection,
        add: add(usersCollection)
    });
}

module.exports = usersList;