import { type UrlObject } from 'url'

import { useEffect, useState } from 'react'

import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'

import { slugify } from '@/utils/string'
import { checkHTTPS, removeProtocol } from '@/utils/url'

import styles from './ServiceCard.module.scss'

interface ServiceCardProps {
	image: string | StaticImageData
	title: string
	desc: string
	org: string
	to?: UrlObject | string
	url: string
	isImageDisplayed?: boolean
	isOrgDisplayed?: boolean
	cluster?: string
	id?: string
}

const ServiceCard = ({
	image,
	title,
	desc,
	org,
	to,
	url,
	isImageDisplayed = true,
	isOrgDisplayed = true,
	cluster,
	id,
}: ServiceCardProps) => {
	const [isHttpsTo, setIsHttpsTo] = useState(false)
	url = removeProtocol(url)
	to ??= `/layanan/${cluster ?? 'semua'}/${id ?? slugify(title)}`
	const originTo = to
	if (!id) {
		to = `${to as string}?url=https://${url}&title=${title}`
	}

	useEffect(() => {
		async function checkProtocol() {
			setIsHttpsTo(await checkHTTPS(url))
		}
		void checkProtocol()
	}, [url])
	return (
		<Link
			href={isHttpsTo ? to : `http://${url}`}
			as={isHttpsTo ? originTo : undefined}
			rel={isHttpsTo ? undefined : 'noopener noreferrer'}
			target={isHttpsTo ? undefined : '_blank'}
			className={styles.wrapper}
			draggable={false}
			prefetch={false}
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
					{isOrgDisplayed && (
						<div className={styles.orgWrapper}>
							<span className={styles.org}>{org}</span>
						</div>
					)}
				</div>
			</div>
		</Link>
	)
}

export default ServiceCard
