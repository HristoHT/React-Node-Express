const { createRecipe, createGroup } = require('./menusFunctions');
const { requiredParam } = require('../../helpers');

const menuList = ({ database, ObjectId }) => {
    const collection = database.collection('Menus');

    const add = async (dataObj) => {
        try {
            let entry = dataObj.type === 'product' ? createRecipe(dataObj) : createGroup(dataObj);
            let unique = Math.floor((new Date()) / 1000),
                parent = String(entry.parent);
            entry.index = String(unique);
            entry.path += ':' + unique;

            await collection.insertOne(entry);

            return { status: 0, data: await get(parent) };
        } catch (e) {
            console.log(e.stack)
            throw e.stack;
        }
    }

    const get = async (query = 'root') => {
        try {
            const filter = { _id: 0, sales: 0 };
            let parent = await collection.find({ index: String(query) }, filter).toArray();
            let children = await collection.find({ parent: String(query) }, filter).toArray();

            if (parent.length === 0) {
                parent = { index: 'root', name: 'Менюта', path: 'root', parent: 'root' }
            } else {
                parent = parent[0];
            }

            parent.children = children;

            return parent;
        } catch (e) {
            throw e.stack;
        }
    }

    const getByIndex = async (index = requiredParam('index')) => {
        try {
            const result = await collection
                .find({ index }, { _id: 0 })
                .toArray();

            return result;
        } catch (e) {
            throw e.stack;
        }
    }

    const update = async ({ index = requiredParam('index'), ...data }) => {
        try {
            const preresult = await getByIndex(index);

            if (preresult.length === 0)
                return { status: 1, error: 'There is no user with this id' };

            const parent = preresult[0].parent ? preresult[0].parent : 'root';

            if (data._id) delete data._id;
            await collection.updateOne({ index }, { '$set': data });

            return { status: 0, data: await get(parent) };
        } catch (e) {
            throw e.stack;
        }
    }

    const del = async (path = requiredParam('path')) => {
        let pathArr = path.split(':');
        pathArr.pop();
        const parent = pathArr.pop();

        await collection.deleteMany({ path: new RegExp(path) });

        return { status: 0, data: await get(parent) };
    }

    const length = async (query = {}) => collection.countDocuments(query);

    return Object.freeze({
        add,
        get,
        length,
        update,
        getByIndex,
        delete: del
    });
}

module.exports = menuList;