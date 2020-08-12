const requiredParam = require('../../utils/requiredParam');
const normalizeString = require('../utils/normalizeString');

const add = (tablesCollection, floorsCollection) => async ({ name = requiredParam('име'), floorId, ...rest }) => {
    try {
        name = normalizeString(name);
        let floor = await floorsCollection.getById(floorId);
        console.log(floor);
        if (!floor) {
            throw new Error(`Не съществува етаж с _id:${floorId}`);
        } else {
            delete floor._id;
        }

        await tablesCollection.add({ name, floor, floorId, x: 0, y: 0, w: 0, h: 0 });

        return tablesCollection.get({ floorId });
    } catch (e) {
        throw e;
    }
}

module.exports = add;