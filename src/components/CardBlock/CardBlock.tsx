import { UnknownAction } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCards, selectCards } from '../../store/slices/cardSlice'
import { Skeleton } from '../Skeleton/Skeleton'
import { Card } from './Card/Card'
import styles from './CardBlock.module.scss'

export function CardBlock() {
	const API_URL = 'https://reqres.in/api/users?page=1'
	const dispatch = useDispatch()
	const { cards, isLoading } = useSelector(selectCards)
	const cardElement = cards.map(card => <Card key={card.id} card={card} />)

	useEffect(() => {
		dispatch(fetchCards(API_URL) as unknown as UnknownAction)
	}, [])

	return (
		<div className={styles.cardBlock}>
			{isLoading ? <Skeleton /> : cardElement}
		</div>
	)
}
