import styles from './BackButton.module.scss'

interface BackButtonProps {
	title: 'Выход' | 'Назад'
}

export function BackButton({ title }: BackButtonProps) {
	return (
		<button type='button' className={styles.btn}>
			{title}
		</button>
	)
}
