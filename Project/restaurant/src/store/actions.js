const actions = {
    ADD_TABLE: 'ADD_TABLE',
    SET_MESSAGE: 'SET_MESSAGE',
    SET_CURRENT_TABLE: 'SET_CURRENT_TABLE',
    ADD_TO_CURRENT_TABLE: 'ADD_TO_CURRENT_TABLE',
    CHANGE_QUANTITY: 'CHANGE_QUANTITY',
    START_TABLE_BILL: "START_TABLE_BILL",
    UPDATE_MENU: "UPDATE_MENU",
    ADD_MENU:"ADD_MENU",
    SET_MENU:"SET_MENU",
    SET_FLOOR:"SET_FLOOR"
}

export default actions;

export const addTableAction = table => ({
    type: actions.ADD_TABLE,
    payload: table
});

export const setCurrentTableAction = table => ({
    type: actions.SET_CURRENT_TABLE,
    payload: table
});

export const addToCurrentTableAction = item => ({
    type: actions.ADD_TO_CURRENT_TABLE,
    payload: { ...item, quantity: 1 }
});

export const startTableBillAction = () => ({
    type: actions.START_TABLE_BILL,
    payload: new Date()
});

export const changeQuantityAction = ({ item, quantity }) => ({
    type: actions.CHANGE_QUANTITY,
    payload: { item, quantity }
});

export const updateMenuAction = (item) => ({
    type: actions.UPDATE_MENU,
    payload: item
});

export const addMenuAction = (item) => ({
    type: actions.ADD_MENU,
    payload: item
});

export const setMenuAction = (menu) => ({
    type: actions.SET_MENU,
    payload: menu
});

export const setFloorAction = (floor) => ({
    type: actions.SET_FLOOR,
    payload: floor
});

export const setMessageAction = ({message, messageType, show}) => ({
  type: actions.SET_MESSAGE,
  payload: {message, messageType, show} 
})