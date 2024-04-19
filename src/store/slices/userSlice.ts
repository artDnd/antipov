import { createSlice } from '@reduxjs/toolkit'
import { UserType } from '../../types'

const initialState: UserType = {
	email: null,
	token: null,
	id: null,
}

const UserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state: UserType, action) => {
			state.email = action.payload.email
			state.token = action.payload.token
			state.id = action.payload.id
		},
		removeUser: (state: UserType) => {
			state.email = null
			state.token = null
			state.id = null
		},
	},
})
export const { setUser, removeUser } = UserSlice.actions

export default UserSlice.reducer
