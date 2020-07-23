import actions, { setMessageAction } from './actions';
import setMessage from './reducers/messageReducer';

const initialState = {
    menuIndex: 0,
    message: { message: '', messageType: '', show: false },
    floor: null,
    menu: { children: [] },//Трябва да изглежда така, защото във PriceList.js се достъпва масивът children
    tables: [
        { width: 100, height: 100, name: 1 }
    ],
    currentTable: { width: 100, height: 100, name: 1 },
    floors: [
        { name: "Етаж 1", tables: [{ width: 100, height: 100, name: 1 }] }
    ],
    menuItems: [
        {
            id: 1,
            name: "Drinks",
            menuItems: [
                {
                    id: 1,
                    name: "Coca Cola",
                    menuItems: [
                        { id: 1, name: "500ml" },
                        { id: 2, name: "1.5l" },
                        { id: 3, name: "2l" }
                    ]
                },
                {
                    id: 2,
                    name: "Devin 500.000ml",
                },
                {
                    id: 3,
                    name: "Zagorka",
                    menuItems: [
                        { id: 1, name: "Nalivna" },
                        { id: 2, name: "500ml ken" },
                    ]
                },
            ]
        }
    ]
};

const startBill = (obj) => {
    obj.currentTable.bill = { billFrom: new Date(), items: [] };
}

const addItemToBill = ({ bill, item }) => {
    let items = bill.items || [];
    items = [...items, item];

    let margedItems = {};
    items.forEach(element => {
        if (!margedItems[element.name]) margedItems[element.name] = element;
        else margedItems[element.name].quantity++;
    });

    items = [];
    for (let key in margedItems) {
        items.push(margedItems[key]);
    }

    return {
        ...bill,
        items
    }
}

const changeQuantity = ({ bill, item, quantity }) => {
    let items = [...bill.items].map(el => {
        if (el.name === item.name) {
            el.quantity += (Number(quantity) || 0);
        }

        return el;
    }).filter(el => !(el.quantity <= 0));

    return {
        ...bill,
        items
    }
}

const updateMenu = (menu, item) => {
    let path = item.path.split(',').filter(element => element != "");

    console.log("UPDATE MENU -|");
    return { ...recUpdateMenu(menu, item, path.splice(1, path.length)) };//path[0] = root а сравнявам параметрите индекс на неговите деца
}

const recUpdateMenu = (menu, newCache, path) => {
    let flag = false;
    if (path.length === 0)
        return newCache;

    for (let i = 0; menu.children && i < menu.children.length; i++) {
        let current = menu.children[i];
        console.log(current.index, path[0]);
        if (Number(current.index) === Number(path[0])) {
            menu.children[i] = recUpdateMenu(menu.children[i], newCache, path.splice(1, path.length));
            flag = true;
            break;
        }
    }

    if (!flag) {
        if (!menu.children) menu.children = [];
        menu.children.push(newCache);
    }

    return menu;
}

const reducer = (state = initialState, { type, payload }) => {
    const newState = { ...state };

    switch (type) {
        case actions.ADD_TABLE:
            newState.tables = [...newState.tables, payload];
            break;

        case actions.SET_CURRENT_TABLE:
            newState.currentTable = payload;
            break;

        case actions.ADD_TO_CURRENT_TABLE:
            if (!newState.currentTable || !newState.currentTable.bill) {
                startBill(newState);
            }

            newState.currentTable.bill = addItemToBill({ bill: { ...newState.currentTable.bill }, item: payload })

            break;

        case actions.START_TABLE_BILL:
            startBill(newState);
            break;

        case actions.CHANGE_QUANTITY:
            newState.currentTable.bill = changeQuantity({ ...payload, bill: { ...newState.currentTable.bill } });
            break;

        case actions.UPDATE_MENU:
            newState.menu = updateMenu({ ...newState.menu }, payload);
            break;

        case actions.ADD_MENU:
            newState.menu = updateMenu({ ...newState.menu }, payload);
            break;

        case actions.SET_MENU:
            newState.menu = { ...payload };
            break;

        case actions.SET_MESSAGE:
            newState.message = setMessage({
                message: payload.message,
                messageType: payload.messageType,
                show: payload.show
            });
            break;

        case actions.SET_FLOOR:
            newState.floor = payload;
            break;

        default:
    }

    return newState;
}

export default reducer;