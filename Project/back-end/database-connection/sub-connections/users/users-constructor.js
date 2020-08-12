const pipe = require('../../../utils/Pipe');
const userCreation = require('./user-skeleton');
const userValidation = require('./user-validation');

const userNormalizer = (data) => {
    return pipe(userCreation(false), userValidation, userCreation(true))(data);
}

module.exports = userNormalizer;