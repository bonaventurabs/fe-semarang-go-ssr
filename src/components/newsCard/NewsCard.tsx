import { type Url } from 'next/dist/shared/lib/router/router'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'

import { type newsCategoryType, newsCategoryTypeToTitle } from '@/models/news'
import { slugify } from '@/utils/string'

import styles from './NewsCard.module.scss'

type NewsCardType = 'XL' | 'M'

interface NewsCardProps {
	type?: NewsCardType
	title: string
	date: Date
	image: string | StaticImageData
	tag: string
	description?: string
	to?: Url
	slug?: string
	isImageDisplayed?: boolean
	isTagDisplayed?: boolean
}

const NewsCard = ({
	type = 'XL',
	title,
	date,
	image,
	tag,
	description,
	to,
	slug,
	isImageDisplayed = true,
	isTagDisplayed = true,
}: NewsCardProps) => {
	slug ??= slugify(title)
	to ??= `/berita/${slugify(tag)}/${slug}`
	switch (type) {
		case 'XL':
			return (
				<Link href={to} draggable={false} className={styles.xlNewsCard}>
					{isImageDisplayed && <Image src={image} draggable={false} alt="" />}
					<div className={styles.textWrapper}>
						<div className={styles.tagDateWrapper}>
							{isTagDisplayed && (
								<span className={styles.tag}>
									{newsCategoryTypeToTitle[tag as newsCategoryType]}
								</span>
							)}
							<span className={styles.date}>
								{date.toLocaleDateString('id-ID', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</span>
						</div>
						<h4 className={styles.title}>{title}</h4>
						<p>{description}</p>
					</div>
				</Link>
			)
		case 'M':
			return (
				<Link href={to} draggable={false} className={styles.mNewsCard}>
					{isImageDisplayed && <Image src={image} draggable={false} alt="" />}
					<div className={styles.textWrapper}>
						<h4 className={styles.title}>{title}</h4>
						<div className={styles.tagDateWrapper}>
							{isTagDisplayed && (
								<span className={styles.tag}>
									{newsCategoryTypeToTitle[tag as newsCategoryType]}
								</span>
							)}
							<span className={styles.date}>
								{date.toLocaleDateString('id-ID', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</span>
						</div>
					</div>
				</Link>
			)
	}
}

export default NewsCard
export type { NewsCardType }
