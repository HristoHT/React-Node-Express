const requiredParam = require('../../utils/requiredParam');
const normalizeString = require('../utils/normalizeString');

const add = floorsColletion => async ({ name = requiredParam('име'), ...rest }) => {
    try {
        name = normalizeString(name);

        floorsColletion.add({ name });
    } catch (e) {
        throw e;
    }
}

module.exports = add;