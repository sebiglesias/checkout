import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {Category, Item} from "../common/models";

const initialState: {items: Item[], categories: Category[], selectedCategory?: Category} = {
    items: [],
    categories: [],
}

const slice = createSlice({
    initialState,
    name: 'catalogue',
    reducers: {
        addItems(state, {payload}: PayloadAction<Item[]>) {
            state.items = payload
        },
        addCategories(state, {payload}: PayloadAction<Category[]>) {
            state.categories = payload
        },
        selectCategory(state, {payload}: PayloadAction<Category | undefined>) {
            state.selectedCategory = payload
        }
    }
})

export const {addItems, addCategories, selectCategory} = slice.actions

export default slice.reducer