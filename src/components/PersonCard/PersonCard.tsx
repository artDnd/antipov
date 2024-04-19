import { IoMdExit } from 'react-icons/io'
import { LuArrowLeft } from 'react-icons/lu'
import { MdOutlineEmail } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeUser } from '../../store/slices/userSlice'
import { CardType } from '../../types'
import { BackButton } from '../Buttons/BackButton'
import styles from './PersonCard.module.scss'

interface CardProps {
	card: CardType
}
export function PersonCard({ card }: CardProps) {
	const dispatch = useDispatch()
	return (
		<div className={styles.person}>
			<div className={styles.person__header}>
				<Link className={styles.person__btn} to={'/'}>
					<BackButton title='Назад' />
				</Link>
				<Link className={styles.person__btn_media} to={'/'}>
					<LuArrowLeft />
				</Link>

				<div className={styles.person__content}>
					<img className={styles.person__img} src={card.avatar} />
					<span>
						<h1
							className={styles.person__title}
						>{`${card.first_name} ${card.last_name}`}</h1>
						<b>{card.email}</b>{' '}
					</span>
				</div>
				<span
					className={styles.person__btn}
					onClick={() => dispatch(removeUser())}
				>
					<BackButton title='Выход' />
				</span>

				<Link className={styles.person__btn_media} to={'/'}>
					<IoMdExit />
				</Link>
			</div>
			<div className={styles.person__info}>
				<div className={styles.person__info__desc}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
					eligendi. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
					Minima eos ullam corrupti. Sed delectus, ad ipsum sint ipsam porro.
					Maxime, a corporis. Eveniet maxime nam consequatur laboriosam quia
					alias mollitia. Lorem ipsum dolor sit, amet consectetur adipisicing
					elit. Magni odio a molestiae tempore soluta nisi pariatur adipisci
					corporis velit voluptatibus explicabo aperiam nobis est, debitis iste
					recusandae distinctio corrupti doloribus.
				</div>
				<div className={styles.person__info__contact}>
					<MdOutlineEmail /> {card.email}
				</div>
			</div>
		</div>
	)
}
