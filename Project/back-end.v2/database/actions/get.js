const get = (collection) => async (query = {}) => {
    try {
        //Взема от базата
        const result = await collection.find(query).toArray();

        //Връща записания резултат
        return result;
    } catch (e) {
        throw e;
    }
}

module.exports = get;