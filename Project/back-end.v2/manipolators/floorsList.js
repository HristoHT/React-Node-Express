const add = require('./floors/add');

const floorsList = floorsCollection => {
    return Object.freeze({
        ...floorsCollection,
        add: add(floorsCollection)
    });
}

module.exports = floorsList;