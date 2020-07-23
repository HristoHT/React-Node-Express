const { createFloor, createTable } = require('./floorsFunctions');
const { requiredParam } = require('../../helpers');

const floorsList = ({ database, ObjectId }) => {
    const floorsCollection = database.collection('Floors');
    const tablesCollection = database.collection('Tables');

    const addFloor = async (dataObj) => {
        try {
            let entry = createFloor(dataObj);

            const result = await floorsCollection.insertOne(entry);

            return result.ops[0];
        } catch (e) {
            throw e.stack;
        }
    }

    const addTable = async (floorId, dataObj) => {
        try {
            let floor = await floorsCollection.findOne({ _id: ObjectId(floorId) });

            if (floor == null) {
                throw new Error(`Не съществува етаж със следното id:${floorId}`);
            }

            const entry = createTable({ ...dataObj, floorId });

            const result = await tablesCollection.insertOne(entry);

            return await getFloorById(floorId);
        } catch (e) {
            console.log(e.stack);
            throw e.stack;
        }
    }

    const updateTable = async (dataObj) => {
        try {
            const tableId = dataObj._id;
            delete dataObj._id;

            await tablesCollection.updateOne({ _id: ObjectId(tableId) }, { '$set': dataObj });

            return true;
        } catch{
            console.log(e.stack);
            throw e;
        }
    }

    const getFloorById = async (id) => {
        try {
            const floor = await floorsCollection.findOne({ _id: ObjectId(id) });
            const tables = await tablesCollection.find({ floorId: id }).toArray();
            console.log({ ...floor, tables: tables })
            return { ...floor, tables: tables };
        } catch (e) {
            throw e.stack;
        }
    }

    const get = async (query = {}) => {
        try {
            const floors = await floorsCollection.find(query).toArray();
            // const tables = await tablesCollection.find().toArray();
            // let obj = {}, result = [];

            // floors.forEach(floor => {
            //     obj[floor._id] = { ...floor, tables: [] };
            // })

            // tables.forEach(table => {
            //     if (obj[table.floorId]) {
            //         obj[table.floorId].tables.push(table);
            //     }
            // })

            // console.log(JSON.stringify(obj));
            // for (let floorId in obj) {
            //     result.push(obj[floorId]);
            // }

            return floors;

        } catch (e) {
            throw e.stack;
        }
    }

    const updateFloor = async (dataObj) => {
        try {
            const floorId = dataObj._id;
            delete dataObj._id;

            dataObj.tables.forEach(async table => {
                await updateTable(table);
            });

            return await getFloorById(floorId);
        } catch (e) {
            throw e.stack;
        }
    }

    const length = async (query = {}) => floorsCollection.countDocuments(query);

    return Object.freeze({
        addFloor,
        addTable,
        updateTable,
        get,
        length,
        getFloorById,
        updateFloor
    });
}

module.exports = floorsList;