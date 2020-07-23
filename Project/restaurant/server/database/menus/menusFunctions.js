const { requiredParam } = require('../../helpers');

const createRecipe = ({
    name = requiredParam('name'),
    price = requiredParam('price'),
    ...rest }) =>
    ({
        name,
        price,
        parent: String(rest.parent),
        products: rest.products,
        alergens: rest.alergens,
        type: 'product',
        path: rest.path,
        image: rest.image
    });

const createGroup = ({
    name = requiredParam('name'),
    ...rest
}) => ({
    name,
    type: 'group',
    parent: String(rest.parent),
    path: rest.path,
    image: rest.image
});

module.exports = {
    createRecipe,
    createGroup
}