const bcrypt = require('bcrypt');
const ValidationError = require('../../../utils/ValidationError');

/**
 * Изпълнява логиката по валидиране на един User Object подаден от @function createUserBody
 * 
 * @param {User Object} param
 */
const userValidation = ({ password = "", firstName = "", secondName = "", lastName = "", job = "", ...rest }) => {
    validPassword(password);
    password = cryptPassword(password);

    firstName = normalizeString(firstName);
    secondName = normalizeString(secondName);
    lastName = normalizeString(lastName);
    job = normalizeString(job);

    return {
        password,
        firstName,
        secondName,
        lastName,
        job,
        ...rest
    };
}

/**
 * Криптира синхронно паролата, има възможност и за асинхронно, но трябва да се променят и функиите на асинхронни
 * 
 * @param {String} password 
 */
const cryptPassword = (password) => bcrypt.hashSync(password, 10);

/**
 * Прави първата буква главна и всички останали малки
 * 
 * @param {String} name 
 */
const normalizeString = (name) => (name.charAt(0).toUpperCase() + name.toLowerCase().slice(1));


/**
 * Проверява дали един стринг отговаря на критериите, за да е парола
 *  1. Да е с дължина от 8 до 32 символа
 *  2. Да има поне една малка латинска буква
 *  3. Да има поне една главна латинска буква
 *  4. Да има поне едно число
 * 
 * @param {String} password 
 */
const validPassword = (password) => {
    let passwordExpression = new RegExp(`^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$`, 'gm');

    if (8 > password.length || password.length > 32) {
        ValidationError('Паролата трябва да е между 8 и 32 символа');
    }

    if (!passwordExpression.test(password)) {
        ValidationError(`Паролата не отговаря на изискванията: 
            - поне една малка латинска буква
            - поне една главна латинска буква
            - поне една цифра`);
    }
}


module.exports = userValidation;