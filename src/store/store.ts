import { configureStore } from '@reduxjs/toolkit'
import CardSlice from './slices/cardSlice'
import UserSlice from './slices/userSlice'

const store = configureStore({
	reducer: {
		cards: CardSlice,
		user: UserSlice,
	},
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
