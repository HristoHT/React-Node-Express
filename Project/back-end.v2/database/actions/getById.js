const getById = (collection, ObjectId) => async (id = "") => {
    try {
        //Взема от базата
        const result = await collection.findOne({_id: ObjectId(id)});

        //Връща записания резултат
        return result;
    } catch (e) {
        throw e;
    }
}

module.exports = getById;