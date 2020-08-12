const CustomError = require('../../../utils/CustomError');
const userConstructor = require('./users-constructor');

/**
 * Функцията връща всички позволени методи за обработване на потребителите
 * 
 * @param {MongoDB колекция} collection - колекцията, в която се намират потребителите
 * @param {MongoDB ObjectId} ObjectId 
 */
const userList = (collection, ObjectId) => {
    /**
     * Добавяне на служител в базата
     * 
     * @param {Object} data - валиден обект, от който да се направи обект за потребител
     */
    const add = async (data) => {
        try {
            //Нормализира обекта за запис на потребител
            const user = userConstructor(data);

            //Ако вече съществува служител със същото потребителско име ще върне обект, а ако не съществува - null
            if (await getOne({ username: user.username })) {
                throw new CustomError(409, 'Служител с това потребителско име вече съществува');
            }

            //Записва в базата
            const result = await collection.insertOne(user);

            //Връща записания резултат
            return result.ops[0];
        } catch (e) {
            throw e;
        }
    }

    /**
     * Функцията връща първия служител, отговарящ на \p query-то
     * 
     * @param {Object} query - Валиден обект, по който да се търси в базата от данни
     */
    const getOne = async (query) => {
        try {
            return await collection.findOne(query);
        } catch (e) {
            throw e;
        }
    }

    /**
     * Функцията връща всички служители, отговарящи на \p query-то
     * 
     * @param {Object} query 
     */
    const get = async (query) => {
        try {
            return await collection.find(query).toArray();
        } catch (e) {
            throw e;
        }
    }

    /**
     * Функцията отговаря за ъпдейтването на един потребител 
     * 
     * @param {Object} data - задължително садържа _id и останалите параметри, отговарящи за създаване на валиден потребител. Ако има атрибут password ще се ъпдейтне, ако няма няма да го ъпдейтне
     */
   /* const update = async (data) => {
        try {
            const id = String(data._id);
            //Нормализира обекта за запис на потребител
            const user = userConstructor(data);

            //Ъпдейтва в базата
            const result = await collection.updateOne({ _id: ObjectId(id) }, { "$set": user });

            //Връща записания резултат
            return result.ops[0];
        } catch (e) {
            throw e;
        }
    }

    const insideGet = async (data) => {
        
    }*/

    return Object.freeze({
        add,
        getOne,
        get,
        update: () => {}
    });
}


module.exports = userList;
