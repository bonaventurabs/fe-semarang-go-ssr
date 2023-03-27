import { useSearchParams } from 'react-router-dom'

import OutlinedButton from '@/components/outlinedButton/OutlinedButton'

import styles from './PopularSearchSection.module.scss'

const popularSearchData = [
	'COVID-19',
	'Transportasi',
	'Semarang',
	'Ekonomi',
	'G20',
]

const PopularSearchSection = () => {
	const [, setSearchParams] = useSearchParams()

	const handlePopularSearchClick = (e: React.MouseEvent) => {
		setSearchParams(
			{ q: e.currentTarget.getAttribute('value') ?? '' },
			{ replace: true },
		)
	}

	return (
		<section className={styles.popularSearchSection}>
			<h3>Pencarian Populer</h3>
			<div className={styles.contentWrapper}>
				{popularSearchData.map((value, index) => (
					<OutlinedButton
						key={index}
						text={value}
						value={value}
						onClick={handlePopularSearchClick}
					/>
				))}
			</div>
		</section>
	)
}

export default PopularSearchSection
