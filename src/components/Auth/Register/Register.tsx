import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../../../store/slices/userSlice'
import { Form } from '../Form'

export function Register() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const handleRegister = (
		email: string,
		password: string,
		confirmPassword: string
	) => {
		const auth = getAuth()
		createUserWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				if (password == confirmPassword) {
					console.log(user)
					dispatch(
						setUser({
							email: user.email,
							id: user.uid,
							token: user.accessToken,
						})
					)
					navigate('/')
				}
			})
			.catch(err => {
				console.log(err)
				return alert(err)
			})
	}

	return (
		<Form
			title='Регистрация'
			handleClick={handleRegister}
			changeVariant='register'
		/>
	)
}
