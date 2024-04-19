import { Link } from 'react-router-dom'
import { CardType } from '../../../types'
import styles from './Card.module.scss'

interface CardProps {
	card: CardType
}
export const Card = ({ card }: CardProps) => {
	return (
		<Link to={`/person/${card.id}`} className={styles.card}>
			<img className={styles.card__img} src={card.avatar} alt='' />
			<p
				className={styles.card__title}
			>{`${card.first_name} ${card.last_name}`}</p>
		</Link>
	)
}
