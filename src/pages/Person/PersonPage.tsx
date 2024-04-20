import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../components/hooks/hooks'
import { PersonCard } from '../../components/PersonCard/PersonCard'
import { selectCards } from '../../store/slices/cardSlice'

export function PersonPage() {
	const { cards } = useAppSelector(selectCards)
	const { id } = useParams()
	const currentCard = cards
		.filter(card => card.id == Number(id))
		.map(card => <PersonCard key={card.id} card={card} />)

	return <div>{currentCard}</div>
}
