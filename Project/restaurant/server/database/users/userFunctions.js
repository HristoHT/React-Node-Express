const { requiredParam } = require('../../helpers');

const createUser = ({
    username = requiredParam('username'),
    firstName = requiredParam('first name'),
    thirdName = requiredParam('third name'),
    startDate = requiredParam('start date'),
    password = requiredParam('password'),
    job = requiredParam('job'), ...rest }) => ({
        username,
        firstName,
        thirdName,
        startDate,
        password,
        job,
        ...rest
    });

module.exports = {
    createUser
}