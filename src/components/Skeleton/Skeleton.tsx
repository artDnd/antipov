import ContentLoader from 'react-content-loader'

export const Skeleton = () => (
	<ContentLoader
		speed={2}
		width={300}
		height={260}
		viewBox='0 0 300 260'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'
	>
		<rect x='92' y='323' rx='0' ry='0' width='2' height='0' />
		<circle cx='121' cy='83' r='61' />
		<rect x='60' y='149' rx='7' ry='7' width='125' height='34' />
	</ContentLoader>
)
