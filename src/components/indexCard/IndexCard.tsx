import { type Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'

import { titleCase } from '@/utils/string'

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
	id?: string
	title: string
	currentIndex: number
	targetIndex: number
	description: string
	tag: string
	isTagDisplayed?: boolean
	to?: Url
}

const IndexCard = ({
	id,
	title,
	currentIndex,
	targetIndex,
	description,
	tag,
	isTagDisplayed = false,
	to,
}: IndexCardProps) => {
	return (
		<Link href={to ?? '/indeks-kota-cerdas'} className={styles.indexCard}>
			<h4 className={styles.title}>{title}</h4>
			<div className={styles.indexWrapper}>
				<div className={styles.index}>
					<IndexIcon />
					<div className={styles.textWrapper}>
						<span className={styles.valueType}>Indeks</span>
						<span className={styles.value}>
							{currentIndex.toLocaleString('id-ID')}
						</span>
					</div>
				</div>
				<div className={styles.index}>
					<TargetIcon />
					<div className={styles.textWrapper}>
						<span className={styles.valueType}>Target Indeks</span>
						<span className={styles.value}>
							{targetIndex.toLocaleString('id-ID')}
						</span>
					</div>
				</div>
			</div>
			<p className={styles.description}>{description}</p>
			{tag && isTagDisplayed && <Tag text={titleCase(tag)} />}
		</Link>
	)
}

export default IndexCard
