import { combineReducers } from 'redux'
import catalogueReducer from "./catalogue/catalogueSlice";
import cartReducer from "./cart/cartSlice";

const rootReducer = combineReducers({
    catalogue: catalogueReducer,
    cart: cartReducer
})


export default rootReducer