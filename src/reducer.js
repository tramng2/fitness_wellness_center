export const initialState = {
    links: [],
    customerInfo: [],
    trainingInfo: [],
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
        case 'DELETE_TRAINNING_INFO':
            const updatedTrainningInfo = state.trainingInfo.filter(element => element.id !== action.id);
            return {
                ...state,
                trainingInfo: updatedTrainningInfo
            }
        case 'ADD_NEW_CUSTOMER':
            return {
                ...state,
                customerInfo: [...state.customerInfo, action.newCustomerInfo]
            }

        case 'SET_TRAINNING_INFO':
            return {
                ...state,
                trainingInfo: action.trainingInfo
            }
        default: return state;
    }

}
export default reducer;