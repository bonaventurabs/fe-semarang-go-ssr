import { type UrlObject } from 'url'

import { useEffect, useState } from 'react'

import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'

import { slugify } from '@/utils/string'
import { checkHTTPS } from '@/utils/url'

import styles from './ServiceCard.module.scss'

interface ServiceCardProps {
	image: string | StaticImageData
	title: string
	desc: string
	org: string
	to?: UrlObject | string
	url: string
	isImageDisplayed?: boolean
}

const ServiceCard = ({
	image,
	title,
	desc,
	org,
	to,
	url,
	isImageDisplayed = true,
}: ServiceCardProps) => {
	const [isHttpsTo, setIsHttpsTo] = useState(false)
	const slug = slugify(title)
	to ??= `/layanan/${slug}`

	useEffect(() => {
		async function checkProtocol() {
			setIsHttpsTo(await checkHTTPS(url))
		}
		void checkProtocol()
	}, [url])
	return (
		<Link
			href={isHttpsTo ? to : `http://${url}`}
			rel={isHttpsTo ? undefined : 'noopener noreferrer'}
			target={isHttpsTo ? undefined : '_blank'}
			className={styles.wrapper}
			draggable={false}
		>
			<div className={styles.serviceCard}>
				{isImageDisplayed && (
					<div className={styles.imageWrapper}>
						<Image src={image} draggable={false} alt="" />
					</div>
				)}
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
