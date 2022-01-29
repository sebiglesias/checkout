import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './reducer'

const store = configureStore({
    reducer: rootReducer
})

export type AppState = ReturnType<typeof rootReducer>

export default store