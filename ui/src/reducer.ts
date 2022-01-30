import { combineReducers } from 'redux'
import catalogueReducer from "./catalogue/catalogueSlice";
import cartReducer from "./cart/cartSlice";
import orderReducer from "./order/orderSlice";

const rootReducer = combineReducers({
    catalogue: catalogueReducer,
    cart: cartReducer,
    order: orderReducer
})


export default rootReducer