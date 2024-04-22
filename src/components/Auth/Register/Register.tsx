import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { LuEyeOff } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../hooks/redux'
import { setUser } from '../../../store/slices/userSlice'
import styles from '../Form.module.scss'

export function Register() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [pass, setPass] = useState('')
	const [confirmPass, setConfirmPass] = useState('')
	const [visible, setVisible] = useState(false)

	const toggleVisible = () => {
		setVisible(prev => !prev)
	}

	const handleRegister = async (
		email: string,
		password: string,
		confirmPassword: string
	) => {
		try {
			const auth = getAuth()
			const { user } = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
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
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className={styles.form}>
			<div className={styles.form__block}>
				<h3 className={styles.form__block_title}>Регистрация</h3>

				<label htmlFor='name'>
					Имя
					<input
						required
						type='text'
						id='name'
						placeholder='Артур'
						className={styles.form__block_input}
					/>
				</label>

				<label htmlFor='email'>
					Электронная почта
					<input
						required
						type='text'
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
					<button
						className={styles.form__block_input_eye}
						onClick={toggleVisible}
					>
						{visible ? <AiOutlineEye /> : <LuEyeOff />}
					</button>
				</label>

				<label htmlFor='password-confirm'>
					Подтверждения пароля
					<input
						required
						type={visible ? 'text' : 'password'}
						id='password-confirm'
						placeholder='Password confirm'
						className={styles.form__block_input}
						onChange={e => setConfirmPass(e.target.value)}
					/>
					<button
						type='button'
						className={styles.form__block_input_eye}
						onClick={toggleVisible}
					>
						{visible ? <AiOutlineEye /> : <LuEyeOff />}
					</button>
				</label>

				<button
					className={styles.form__btn}
					onClick={() => handleRegister(email, pass, confirmPass)}
				>
					Зарегистрироваться
				</button>

				<Link to={'/login'}> Or Login</Link>
			</div>
		</div>
	)
}
