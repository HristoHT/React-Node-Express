const getOneBy = (collection) => async (query = {}) => {
    try {
        //Взема от базата
        const result = await collection.findOne(query);

        //Връща записания резултат
        return result;
    } catch (e) {
        throw e;
    }
}

module.exports = getOneBy;