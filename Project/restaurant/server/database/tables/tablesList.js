const { requiredParam } = require('../../helpers');

const tablesList = ({ database, ObjectId }) => {
    const collection = database.collection('Tables');

    const updateBill = async (tableId = requiredParam('tableId'), { bill = {}, startDate }) => {
        try {
            const table = await get(tableId);

            if (table == null) {
                throw new Error(`Не съществува маса с id:${tableId}!`);
            }

            const date = table.active ? table.bill.startDate : startDate;
            bill.startDate = date;
            bill.sum = bill.items.reduce((sum, item) => sum += Number(item.price) * Number(item.quantity), 0);
            await collection.updateOne({ _id: ObjectId(tableId) }, { '$set': { bill, active: true } });

            return await get(tableId);
        } catch (e) {
            console.log(e.stack);
            throw e;
        }
    }

    const stopBill = async (tableId = requiredParam('tableId')) => {
        try {
            const table = await get(tableId);

            if (table == null) {
                throw new Error(`Не съществува маса с id:${tableId}!`);
            } else if (!table.active) {
                throw new Error(`Масата с id:${tableId} няма започната сметка!`);
            }

            const tableHistory = [table.history, table.bill];
            const tableBill = {};
            const active = false;
            await collection.updateOne({ _id: ObjectId(tableId) }, { '$set': { bill: tableBill, active, history: tableHistory } });


            return await collection.findOne({ _id: ObjectId(tableId) });
        } catch (e) {
            console.log(e.stack);
            throw e;
        }
    }

    const get = async (tableId) => {
        try {
            return await collection.findOne({ _id: ObjectId(tableId) });
        } catch (e) {
            console.log(e.stack);
            throw e;
        }
    }

    return Object.freeze({
        get,
        updateBill,
        stopBill
    });
}

module.exports = tablesList;