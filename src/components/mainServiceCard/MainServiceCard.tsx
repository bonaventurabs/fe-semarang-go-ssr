import { type UrlObject } from 'url'

import React, { useEffect, useState } from 'react'

import Link from 'next/link'

import { slugify } from '@/utils/string'
import { checkHTTPS } from '@/utils/url'

import styles from './MainServiceCard.module.scss'

interface MainServiceCardProps {
	Icon: React.FC
	title: string
	description: string
	url: string | UrlObject
}

const MainServiceCard = ({
	Icon,
	title,
	description,
	url,
}: MainServiceCardProps) => {
	const [isHttpsTo, setIsHttpsTo] = useState(false)
	const slug = slugify(title)
	const to = `/layanan/${slug}`

	useEffect(() => {
		async function checkProtocol() {
			setIsHttpsTo(await checkHTTPS(url))
		}
		void checkProtocol()
	}, [url])
	return (
		<Link
			href={isHttpsTo ? to : `http://${url as string}`}
			rel={isHttpsTo ? undefined : 'noopener noreferrer'}
			target={isHttpsTo ? undefined : '_blank'}
			className={styles.serviceCard}
			draggable={false}
		>
			<Icon />
			<span>{title}</span>
			<p>{description}</p>
		</Link>
	)
}
export default MainServiceCard
