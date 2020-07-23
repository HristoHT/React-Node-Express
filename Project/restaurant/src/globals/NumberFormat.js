const toNumber = (val) => (Number(val) || 0);
const getNumber = (val, dig = 2) => toNumber(toNumber(val).toFixed(dig));
const formatNumber = (val, dig = 2) => (toNumber(val) == 0 ? toNumber(val).toFixed(dig) : '');

export {
    toNumber,
    getNumber,
    formatNumber
}