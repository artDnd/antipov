import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { AiOutlineEye } from 'react-icons/ai'
import { LuEyeOff } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../hooks/redux'
import { useBoolean } from '../../../hooks/useBoolean'
import { setUser } from '../../../store/slices/userSlice'
import styles from '../Form.module.scss'

interface RegisterFormValues {
	email: string
	password: string
	confirmPassword: string
}

export function Register() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { visible, toggle } = useBoolean(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<RegisterFormValues>()

	const handleRegister = async ({
		email,
		password,
		confirmPassword,
	}: RegisterFormValues) => {
		try {
			const auth = getAuth()
			const { user } = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			if (password == confirmPassword) {
				dispatch(
					setUser({
						email: user.email,
						id: user.uid,
						token: (user as unknown as { accessToken: string }).accessToken,
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
			<form
				className={styles.form__block}
				onSubmit={handleSubmit(handleRegister)}
			>
				<h3 className={styles.form__block_title}>Регистрация</h3>

				<label htmlFor='name'>
					Имя
					<input placeholder='Артур' className={styles.form__block_input} />
				</label>

				<label htmlFor='email'>
					Электронная почта
					<input
						placeholder='example@mail.ru'
						className={styles.form__block_input}
						{...register('email', {
							required: 'Ошибка!',
						})}
					/>
					{errors && <p style={{ color: 'red' }}>{errors?.email?.message}</p>}
				</label>
				<label htmlFor='password'>
					Пароль
					<input
						type={visible ? 'text' : 'password'}
						placeholder='Password'
						className={styles.form__block_input}
						{...register('password', {
							required: true,
							minLength: {
								value: 5,
								message: 'Длина пароля должна быть не меньше 5 символов',
							},
						})}
					/>
					<button className={styles.form__block_input_eye} onClick={toggle}>
						{visible ? <AiOutlineEye /> : <LuEyeOff />}
					</button>
					{errors?.password && (
						<p style={{ color: 'red' }}>{errors?.password?.message}</p>
					)}
				</label>

				<label htmlFor='confirmPassword'>
					Подтверждения пароля
					<input
						type={visible ? 'text' : 'password'}
						placeholder='Password confirm'
						className={styles.form__block_input}
						{...register('confirmPassword', {
							required: 'Ошибка!',
							validate: (val: string) => {
								if (watch('password') != val) {
									return 'Your passwords do no match'
								}
							},
						})}
					/>
					<button
						type='button'
						className={styles.form__block_input_eye}
						onClick={toggle}
					>
						{visible ? <AiOutlineEye /> : <LuEyeOff />}
					</button>
					{errors?.confirmPassword && (
						<p style={{ color: 'red' }}>{errors?.confirmPassword?.message}</p>
					)}
				</label>

				<button type='submit' className={styles.form__btn}>
					Зарегистрироваться
				</button>

				<Link to={'/login'}> Or Login</Link>
			</form>
		</div>
	)
}
