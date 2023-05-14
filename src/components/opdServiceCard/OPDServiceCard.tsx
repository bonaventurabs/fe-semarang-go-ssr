import { type UrlObject } from 'url'

import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'

import defaultImg from '@/assets/images/semarang-logo.png'
import { slugify } from '@/utils/string'

import styles from './OPDServiceCard.module.scss'
import { CategoryIcon } from '../icon/SVGIcon'
interface OPDServiceCardProps {
	name: string
	to?: string | UrlObject
	image?: string | StaticImageData
	totalService?: number
}

const OPDServicesCard = ({
	name,
	to,
	image,
	totalService,
}: OPDServiceCardProps) => {
	return (
		<Link
			className={styles.opdServiceCard}
			href={to ?? `layanan/OPD/${slugify(name)}`}
		>
			<Image src={image ?? defaultImg} alt={name} />
			<div className={styles.textWrapper}>
				<span className={styles.name}>{name}</span>
				{totalService && (
					<div className={styles.totalServiceWrapper}>
						<CategoryIcon />
						<span className={styles.totalService}>
							<b>{totalService}</b> Aplikasi
						</span>
					</div>
				)}
			</div>
		</Link>
	)
}
export default OPDServicesCard
