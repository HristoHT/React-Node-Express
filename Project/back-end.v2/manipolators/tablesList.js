const add = require('./tables/add');

const tablesList = (tablesCollection, floorsCollection) => {
    return Object.freeze({
        ...tablesCollection,
        add: add(tablesCollection, floorsCollection)
    });
}

module.exports = tablesList;