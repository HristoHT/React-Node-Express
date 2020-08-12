/**
 * Прави първата буква главна и всички останали малки
 * 
 * @param {String} name 
 */
const normalizeString = (name) => (name.charAt(0).toUpperCase() + name.toLowerCase().slice(1));

module.exports = normalizeString;