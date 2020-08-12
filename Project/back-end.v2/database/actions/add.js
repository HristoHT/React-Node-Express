const add = (collection) => async (data) => {
    try {
        //Записва в базата
        const result = await collection.insertOne(data);

        //Връща записания резултат
        return result.ops[0];
    } catch (e) {
        throw e;
    }
}

module.exports = add;