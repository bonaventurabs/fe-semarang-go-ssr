import Image from 'next/image'

import styles from './GuideSection.module.scss'

interface GuideSectionProps {
	text?: string
	image?: string
	emText?: string
}

const GuideSection = ({ text, image, emText }: GuideSectionProps) => {
	return (
		<section className={styles.guideSection}>
			<div className={styles.imageWrapper}>
				{image && <Image src={image} alt="Guide Image" />}
			</div>
			<div className={styles.textWrapper}>
				{text && <p>{text}</p>}
				{emText && <span>{emText}</span>}
			</div>
		</section>
	)
}

export default GuideSection
