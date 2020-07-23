const { createUser } = require('./userFunctions');
const bcrypt = require('bcrypt');
const { requiredParam } = require('../../helpers');

const userList = ({ database, ObjectId }) => {
    const userCollection = database.collection('Users');

    const length = async (query = {}) => userCollection.countDocuments(query);

    const addUser = async (userData) => {
        try {
            let newUser = createUser(userData);
            const existingUser = await getUsers({ username: userData.username });

            if (existingUser.length > 0) {
                return { status: 1, user: existingUser[0], message: 'Потребител с желаното потребителско име вече съществува' };
            }

            newUser.password = await bcrypt.hash(newUser.password, 10);

            const result = await userCollection.insertOne(newUser);

            return { status: 0, user: result.ops[0] };
        } catch (e) {
            throw e;
        }
    }

    const getUsers = async (query = {}) => {
        try {
            return (await userCollection
                .find(query, { password: 0 })
                .toArray());
        } catch (e) {
            throw e;
        }
    }
    const getById = async (id) => {
        try {
            return (await userCollection
                .find({ _id: ObjectId(id) })
                .toArray());
        } catch (e) {
            throw e;
        }
    }

    const update = async (userData) => {
        try {
            if (!userData._id)
                return { status: 2, error: 'Missing attribute _id' };

            const id = userData._id
            delete userData._id;

            const preresult = await getById(id);

            if (preresult.length === 0)
                return { status: 1, error: 'There is no user with this id' };

            const result = await userCollection.updateOne({ _id: ObjectId(id) }, { '$set': userData });

            return { status: 0 };
        } catch (e) {
            throw e;
        }
    }

    const getByUsername = async (username = requiredParam('username')) => {
        try {
            const result = await userCollection.findOne({ username });

            return result;
        } catch (e) {
            throw e;
        }
    }

    const deleteByUsername = async (username = requiredParam('username')) => {
        try {
            const result = await userCollection.deleteOne({ username });

            return { result, status: 0 };
        } catch (e) {
            throw e;
        }
    }

    return Object.freeze({
        length,
        add: addUser,
        get: getUsers,
        getById,
        getByUsername,
        deleteByUsername,
        update,
        getTimestamp: () => this.timestamp,
        updateTimestamp: () => { this.timestamp = new Date() },
        timestamp: new Date(),
    });
}


module.exports = userList;
