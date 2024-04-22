import { useAppSelector } from './redux'

export function useAuth() {
	const { user } = useAppSelector(state => state.user)
	return {
		isAuth: !!user,
		user,
	}
}
