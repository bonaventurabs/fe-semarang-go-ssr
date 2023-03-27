import styles from './IndexCard.module.scss'
import { IndexIcon, TargetIcon } from '../icon/SVGIcon'

interface IndexCardProps {
	title: string
	currentIndex: number
	targetIndex: number
	description: string
}

const IndexCard = ({
	title,
	currentIndex,
	targetIndex,
	description,
}: IndexCardProps) => {
	return (
		<div className={styles.indexCard}>
			<h4 className={styles.title}>{title}</h4>
			<div className={styles.indexWrapper}>
				<div className={styles.index}>
					<IndexIcon />
					<div className={styles.textWrapper}>
						<span className={styles.valueType}>Indeks</span>
						<span className={styles.value}>{currentIndex}</span>
					</div>
				</div>
				<div className={styles.index}>
					<TargetIcon />
					<div className={styles.textWrapper}>
						<span className={styles.valueType}>Target Indeks</span>
						<span className={styles.value}>{targetIndex}</span>
					</div>
				</div>
			</div>
			<p className={styles.description}>{description}</p>
		</div>
	)
}

export default IndexCard
