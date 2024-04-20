import { useAppSelector } from './hooks'

export function useAuth() {
	const { user } = useAppSelector(state => state.user)
	return {
		isAuth: !!user,
		user,
	}
}
