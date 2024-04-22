import { setUser } from '../../../store/slices/userSlice'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { LuEyeOff } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../hooks/redux'
import { useBoolean } from '../../../hooks/useBoolean'
import styles from '../Form.module.scss'

export function Login() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const auth = getAuth()

	const [email, setEmail] = useState('')
	const [pass, setPass] = useState('')
	const { visible, toggle } = useBoolean(false)

	const handleLogin = async (email: string, password: string) => {
		try {
			const { user } = await signInWithEmailAndPassword(auth, email, password)
			dispatch(
				setUser({
					email: user.email,
					id: user.uid,
					token: (user as unknown as { accessToken: string }).accessToken,
				})
			)
			navigate('/')
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div className={styles.form}>
			<div className={styles.form__block}>
				<h3 className={styles.form__block_title}>Авторизация</h3>
				<label htmlFor='email'>
					Электронная почта
					<input
						required
						type='email'
						id='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						placeholder='example@mail.ru'
						className={styles.form__block_input}
					/>
				</label>
				<label htmlFor='password'>
					Пароль
					<input
						required
						type={visible ? 'text' : 'password'}
						id='password'
						placeholder='Password'
						className={styles.form__block_input}
						onChange={e => setPass(e.target.value)}
					/>
					<button className={styles.form__block_input_eye} onClick={toggle}>
						{visible ? <AiOutlineEye /> : <LuEyeOff />}
					</button>
				</label>
				<button
					className={styles.form__btn}
					onClick={() => handleLogin(email, pass)}
				>
					Войти
				</button>
				<Link to={'/'}> Or Register</Link>
			</div>
		</div>
	)
}
