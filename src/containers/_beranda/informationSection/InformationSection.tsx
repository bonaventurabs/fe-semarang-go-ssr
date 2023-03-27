import Image from 'next/image'
import AliceCarousel from 'react-alice-carousel'

import 'react-alice-carousel/lib/alice-carousel.css'
import img1 from '@/assets/images/slide-1.png'
import img2 from '@/assets/images/slide-2.png'
import img3 from '@/assets/images/slide-3.png'

import styles from './InformationSection.module.scss'

const InformationSection = () => {
	const data = [
		{
			image: img1,
		},
		{
			image: img2,
		},
		{
			image: img3,
		},
	]

	const itemComponent = data.map((element, index) => {
		return <Image key={index} src={element.image} draggable={false} alt="" />
	})

	const renderDotsItem = ({ isActive }: { isActive: boolean }) => {
		return isActive ? (
			<div className={`${styles.indicator} ${styles.selected}`} />
		) : (
			<div className={`${styles.indicator}`} />
		)
	}

	return (
		<div className={styles.informationSection}>
			<h3>Informasi</h3>
			<AliceCarousel
				autoHeight
				autoPlay
				autoPlayInterval={3000}
				infinite
				mouseTracking
				disableButtonsControls
				renderDotsItem={renderDotsItem}
				items={itemComponent}
			/>
		</div>
	)
}

export default InformationSection
