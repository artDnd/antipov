import { IoMdExit } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { removeUser } from '../../store/slices/userSlice'
import { BackButton } from '../Buttons/BackButton'

import styles from './Header.module.scss'

export function Header() {
	const dispatch = useDispatch()
	return (
		<div className={styles.header}>
			<span
				className={styles.header__btn_wrapper}
				onClick={() => dispatch(removeUser())}
			>
				<BackButton title='Выход' />
			</span>
			<span className={styles.header__btn_wrapper_media}>
				<button
					className={styles.header__btn_media}
					onClick={() => dispatch(removeUser())}
				>
					<IoMdExit />
				</button>
			</span>
			<div className={styles.header__content}>
				<h1 className={styles.header__title}>Наша команда</h1>
				<p className={styles.header__suptitle}>
					Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые
					ложатся на их плечи, и умеющие находить выход из любых, даже самых
					сложных ситуаций.
				</p>
			</div>
		</div>
	)
}
