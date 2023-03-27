import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'

import styles from './ServiceCard.module.scss'

interface ServiceCardProps {
	image: string | StaticImageData
	title: string
	desc: string
	org: string
}

const ServiceCard = ({ image, title, desc, org }: ServiceCardProps) => {
	return (
		<Link href="/layanan/" className={styles.wrapper} draggable={false}>
			<div className={styles.serviceCard}>
				<div className={styles.imageWrapper}>
					<Image src={image} draggable={false} alt="" />
				</div>
				<div className={styles.textWrapper}>
					<h4 className={styles.title}>{title}</h4>
					<p className={styles.description}>{desc}</p>
					<div className={styles.orgWrapper}>
						<span className={styles.org}>{org}</span>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default ServiceCard
