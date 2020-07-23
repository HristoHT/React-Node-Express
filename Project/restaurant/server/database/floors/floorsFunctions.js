const { requiredParam } = require('../../helpers');

const createFloor = ({ name = requiredParam('floor name'), ...other }) => ({
    name,
    tables: []
});

const createTable = ({
    floorId = requiredParam('table name'),
    name = requiredParam('table name'), ...other }) => ({
        name,
        floorId,
        history: [],
        bill: {},
        _data: { x: 0, y: 0, w: 2, h: 2 },
        active: false
    });
module.exports = { createFloor, createTable };