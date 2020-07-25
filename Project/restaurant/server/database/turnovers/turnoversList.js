const turnoversList = ({ database, ObjectId }) => {
    const turnoversCollection = database.collection('Turnovers');

    const add = async ({ tableId, userId, date, sum }) => {
        try {
            const table = await database.collection('Tables').findOne({ _id: ObjectId(tableId) });
            const user = await database.collection('Users').findOne({ _id: ObjectId(userId) });

            if (!table) {
                throw new Error(`Не съществува маса с id:${tableId}`);
            }
            
            if (!user) {
                throw new Error(`Не съществува потребител с id:${userId}`);
            }
            
            const floor = await database.collection('Floors').findOne({ _id: ObjectId(table.floorId) });

            if (!floor) {
                throw new Error(`Не съществува помещение с id:${table.floorId}`);
            }

            const tableObj = { name: table.name };
            const userObj = { firstName: user.firstName, thirdName: user.thirdName, username: user.username };
            const floorObj = { name: floor.name };

            const entry = {
                tableId,
                userId,
                floorId: floor._id,
                date,
                sum,
                table: tableObj,
                user: userObj,
                floor: floorObj
            }

            await turnoversCollection.insertOne(entry);

            return true;
        } catch (e) {
            console.log(e.stack);
            throw e;
        }
    }

    const get = async ({ tableId, userId, dateFrom = null, dateTo = null }) => {
        try {
            let query = {};

            if (tableId) {
                query.tableId = tableId;
            }

            if (userId) {
                query.userId = userId;
            }

            if (dateFrom || dateTo) {
                query.date = {};
                if (dateFrom) {
                    let date = new Date(dateFrom);
                    date.setHours(0, 0, 0, 0);
                    query.date['$gte'] = date;
                }
                if (dateTo) {
                    let date = new Date(dateTo);
                    date.setHours(23, 59, 59, 999);
                    query.date['$lt'] = date;
                }
            }

            return await turnoversCollection.find(query).toArray();
        } catch (e) {
            console.log(e.stack);
            throw e;
        }
    }

    return Object.freeze({
        add,
        get,
    });
}

module.exports = turnoversList;