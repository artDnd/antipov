import { useDispatch } from 'react-redux'
import { setUser } from '../../../store/slices/userSlice'
import { Form } from '../Form'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
export function Login() {
	const dispatch = useDispatch()
	const auth = getAuth()
	const navigate = useNavigate()

	const handleLogin = (email: string, password: string) => {
		console.log(1212)
		signInWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				dispatch(
					setUser({
						email: user.email,
						id: user.uid,
						token: user.accessToken,
					})
				)
				navigate('/')
			})
			.catch(error => {
				return console.log(error)
			})
	}
	return (
		<Form title='Авторизация' handleClick={handleLogin} changeVariant='login' />
	)
}
