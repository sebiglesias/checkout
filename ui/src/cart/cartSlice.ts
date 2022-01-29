import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {CartItem, Item} from "../common/models";

const initialState: {items: CartItem[]} = {
    items: [],
}

const slice = createSlice({
    initialState,
    name: 'cart',
    reducers: {
        // Should only store id instead of whole item, but for simplicity and time I'll pass on the entire item
        addItem(state, {payload}: PayloadAction<{item: Item, quantity: number}>) {
            const {item, quantity} = payload
            // Maybe could move this logic downwards to the component, but just want to use the same method in one place
            if (quantity === 0) {
                state.items = [...removeItemFromArray(item.id, state.items)]
            } else if(quantity > 0) {
                const existingItemIndex = state.items.findIndex(cartItem => cartItem.item.id === item.id);
                const auxArray = [...state.items]
                existingItemIndex >= 0 ?
                    auxArray[existingItemIndex].quantity = quantity : auxArray.push({ item, quantity} as CartItem)
                state.items = [...auxArray]
            }
        },
        removeItem(state, {payload}: PayloadAction<string>) {
            state.items = [...removeItemFromArray(payload, state.items)]
        }
    }
})

/**
 * Removes an element or returns original array
 * @param id
 * @param array
 */
const removeItemFromArray = (id: string, array: CartItem[]): CartItem[] => {
    const existingItemIndex = array.findIndex(cartItem => cartItem.item.id === id);
    if (existingItemIndex >= 0) array = array.splice(existingItemIndex, existingItemIndex)
    return array
}

export const {addItem, removeItem} = slice.actions

export default slice.reducer