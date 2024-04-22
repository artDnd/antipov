import { setUser } from '../../../store/slices/userSlice'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineEye } from 'react-icons/ai'
import { LuEyeOff } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../hooks/redux'
import { useBoolean } from '../../../hooks/useBoolean'
import styles from '../Form.module.scss'
interface LoginFormValues {
	email: string
	password: string
}

export function Login() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const [incorrectValue, setIncorrectValue] = useState('')
	const auth = getAuth()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>()

	const { visible, toggle } = useBoolean(false)

	const handleLogin = async ({ email, password }: LoginFormValues) => {
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
		} catch (err) {
			setIncorrectValue('Неверный пароль или почта.')
		}
	}
	return (
		<form className={styles.form} onSubmit={handleSubmit(handleLogin)}>
			<div className={styles.form__block}>
				<h3 className={styles.form__block_title}>Авторизация</h3>
				<label htmlFor='email'>
					Электронная почта
					<input
						type='email'
						placeholder='example@mail.ru'
						className={styles.form__block_input}
						{...register('email', {
							required: true,
						})}
					/>
					{errors.email && (
						<p style={{ color: 'red' }}>{errors.email?.message}</p>
					)}
				</label>
				<label htmlFor='password'>
					Пароль
					<input
						type={visible ? 'text' : 'password'}
						placeholder='Password'
						className={styles.form__block_input}
						{...register('password', {
							required: 'Ошибка!',
						})}
					/>
					<button className={styles.form__block_input_eye} onClick={toggle}>
						{visible ? <AiOutlineEye /> : <LuEyeOff />}
					</button>
					{incorrectValue && <p style={{ color: 'red' }}>{incorrectValue}</p>}
				</label>
				<button className={styles.form__btn}>Войти</button>
				<Link to={'/'}> Or Register</Link>
			</div>
		</form>
	)
}
