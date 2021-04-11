export const initialState = {
    links: [],
    customerInfo: []
}
const reducer = (state, action) => {

    switch (action.type) {
        case 'SET_LINK':
            return {
                ...state,
                links: action.links
            }
        case 'SET_CUSTOMER_INFO':
            return {
                ...state,
                customerInfo: action.customerInfo
            }
        case 'DELETE_CUSTOMER_INFO':
            const updatedCustomerInfo = state.customerInfo.filter(element => !element.links.find(li => li.href === action.href));
            return {
                ...state,
                customerInfo: updatedCustomerInfo
            }
        default: return state;
    }
}
export default reducer;