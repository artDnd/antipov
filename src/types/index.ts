export type CardType = {
	id: number
	email: string
	first_name: string
	last_name: string
	avatar: string
}
export type CardState = {
	cards: CardType[]
	isLoading: boolean
}
export type UserType = {
	email: null | string
	token: null | string
	id: null | string
}
