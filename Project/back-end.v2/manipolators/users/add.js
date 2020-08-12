const add = usersCollection => async userData => {
    try{
        usersCollection.add(userData);
    } catch(e){
        throw e;
    }
}

module.exports = add;