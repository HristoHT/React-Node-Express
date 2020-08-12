const usersList = require('./usersList');
const floorsList = require('./floorsList');
const tablesList = require('./tablesList');

const manipolators = databaseActions => {
    const floors = databaseActions("Floors");

    return {
        usersList: usersList(databaseActions("Users")),
        floorsList: floorsList(floors),
        tablesList: tablesList(databaseActions("Tables"), floors)
    };
}

module.exports = manipolators;