import { useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { LuEyeOff } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import styles from './Form.module.scss'

interface FormProps {
	title: 'Авторизация' | 'Регистрация'
	changeVariant: 'login' | 'register'
	handleClick: (email: string, password: string, confirmPass: string) => void
}
export function Form({ handleClick, changeVariant, title }: FormProps) {
	const [email, setEmail] = useState('')
	const [pass, setPass] = useState('')
	const [confirmPass, setConfirmPass] = useState('')
	const [visible, setVisible] = useState(false)

	const toggleVisible = () => {
		setVisible(prev => !prev)
	}

	return (
		<div className={styles.form}>
			<div className={styles.form__block}>
				<h3 className={styles.form__block_title}>{title}</h3>
				{changeVariant === 'register' && (
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
				)}

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
				{changeVariant === 'register' && (
					<label htmlFor='password-confirm'>
						Подтверждения пароля
						<input
							required
							type={visible ? 'text' : 'password'}
							id='password-confirm'
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
				)}

				<button
					className={styles.form__btn}
					onClick={() => handleClick(email, pass, confirmPass)}
				>
					{title}
				</button>
				{changeVariant === 'register' ? (
					<Link to={'/login'}> Or Login</Link>
				) : (
					<Link to={'/register'}> Or Register</Link>
				)}
			</div>
		</div>
	)
}
