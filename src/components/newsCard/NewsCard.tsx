import { type Url } from 'next/dist/shared/lib/router/router'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import ContentLoader from 'react-content-loader'

import { type newsCategoryType, newsCategoryTypeToTitle } from '@/models/news'
import { slugify } from '@/utils/string'

import styles from './NewsCard.module.scss'

type NewsCardType = 'XL' | 'M'

interface NewsCardProps {
	type?: NewsCardType
	title: string
	date: Date
	image: string | StaticImageData
	tag?: string
	description?: string
	to?: Url
	slug: string
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
	if (typeof tag === 'undefined' || tag === '') {
		tag = 'lainnya'
	}
	to ??= `/berita/${slugify(tag)}/${slug}`
	switch (type) {
		case 'XL':
			return (
				<Link
					href={to}
					draggable={false}
					className={styles.xlNewsCard}
					prefetch={false}
				>
					{isImageDisplayed && (
						<Image
							loader={() => image as string}
							src={image}
							draggable={false}
							alt={description ?? ''}
							width={600}
							height={400}
							priority
						/>
					)}
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
				<Link
					href={to}
					draggable={false}
					className={styles.mNewsCard}
					prefetch={false}
				>
					{isImageDisplayed && (
						<Image
							loader={() => image as string}
							src={image}
							draggable={false}
							alt={description ?? ''}
							width={100}
							height={100}
						/>
					)}
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

interface NewsCardSkeletonProps {
	type?: NewsCardType
	isImageDisplayed?: boolean
}

export const NewsCardSkeleton = ({
	type = 'XL',
	isImageDisplayed,
}: NewsCardSkeletonProps) => {
	switch (type) {
		case 'XL':
			return (
				<ContentLoader
					speed={2}
					style={{ width: '100%', height: '225' }}
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb"
					uniqueKey="news-card-skeleton-xl"
				>
					<rect x="0" y="0" rx="8" ry="8" width="100%" height="120" />
					<rect x="0" y="128" rx="8" ry="8" width="140" height="14" />
					<rect x="0" y="155" rx="8" ry="8" width="100%" height="16" />
					<rect x="0" y="175" rx="8" ry="8" width="60%" height="16" />
					<rect x="0" y="200" rx="8" ry="8" width="100%" height="10" />
					<rect x="0" y="215" rx="8" ry="8" width="100%" height="10" />
				</ContentLoader>
			)

		case 'M':
			return (
				<ContentLoader
					speed={2}
					style={{ width: '100%', height: '60' }}
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb"
					uniqueKey="news-card-skeleton-m"
				>
					<rect x="0" y="0" rx="8" ry="8" width="100%" height="16" />
					<rect x="0" y="20" rx="8" ry="8" width="60%" height="16" />
					<rect x="0" y="45" rx="8" ry="8" width="140" height="14" />
				</ContentLoader>
			)
	}
}
