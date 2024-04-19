import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { CardState } from '../../types'
import { RootState } from '../store'

const initialState: CardState = {
	cards: [],
	isLoading: true,
}
export const fetchCards = createAsyncThunk(
	'card/fetchCard',
	async (url: string) => {
		const res = await axios.get(url)
		return res.data.data
	}
)
export const CardSlice = createSlice({
	name: 'card',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchCards.fulfilled, (state, action) => {
			const data = action.payload

			if (data) {
				state.cards = data
				console.log(state.cards)
				state.isLoading = false
			}
		})
	},
})
export const selectCards = (state: RootState) => state.cards
export default CardSlice.reducer
