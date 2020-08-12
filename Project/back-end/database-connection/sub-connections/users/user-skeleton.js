const requiredParam = require('../../../utils/requiredParam');

/**
 * Функцията свежда обект до обект отговарящ за потребител, ако някои параметри липсват хвърля грешка
 * 
 * @param {Boolean} freeze - ако е true ще freeze-не обекта на потребителя, да не може да се променя 
 */
const createUserBody = (freeze = false) => ({
    username = requiredParam(`потребителско име`),
    password = requiredParam('парола'),
    firstName = requiredParam('собствено име'),
    secondName = requiredParam('бащино име'),
    lastName = requiredParam('фамилно име'),
    job = requiredParam('длъжност'),
    permissions,
    ...rest }) => {
    const body = {
        username,
        password,
        firstName,
        secondName,
        lastName,
        job,
        permissions: permissions || []
    }

    return freeze ? Object(body) : body;
}

module.exports = createUserBody;