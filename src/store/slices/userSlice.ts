import { createSlice } from '@reduxjs/toolkit'
import { UserType } from '../../types'

const initialState = {
	user: null as null | UserType,
}

const UserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload
		},
		removeUser: state => {
			state.user = null
		},
	},
})
export const { setUser, removeUser } = UserSlice.actions

export default UserSlice.reducer
