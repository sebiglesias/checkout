import {Order} from "../common/models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: {order?: Order} = {
    order: undefined
}

const slice = createSlice({
    initialState,
    name: 'order',
    reducers: {
        addWaitingForPaymentOrder(state, {payload}: PayloadAction<Order>) {
            state.order = payload
        },
        addPayedOrder(state, {payload}: PayloadAction<Order>) {
            state.order = payload
        },
        removeOrder(state) {
            state.order = undefined
        }
    }
})

export const {addWaitingForPaymentOrder, addPayedOrder, removeOrder} = slice.actions

export default slice.reducer