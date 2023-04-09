import styles from './IndexCard.module.scss'
import { IndexIcon, TargetIcon } from '../icon/SVGIcon'

const Tag = ({ text }: { text: string }) => {
	return (
		<div className={`${styles.tag}`}>
			<span className={`${styles.tagText}`}>{text}</span>
		</div>
	)
}

interface IndexCardProps {
	title: string
	currentIndex: number
	targetIndex: number
	description: string
	tag?: string
	isTagDisplayed?: boolean
}

const IndexCard = ({
	title,
	currentIndex,
	targetIndex,
	description,
	tag,
	isTagDisplayed = false,
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
			{tag && isTagDisplayed && <Tag text={tag} />}
		</div>
	)
}

export default IndexCard
