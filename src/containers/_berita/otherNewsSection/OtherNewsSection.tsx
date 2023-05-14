import { useEffect, useRef, useState } from 'react'

import useSWR from 'swr'

import NewsCard from '@/components/newsCard/NewsCard'
import Pagination from '@/components/pagination/Pagination'
import { ENDPOINT_PATH } from '@/interfaces'
import { type NewsListResponseData, type newsCategoryType } from '@/models/news'
import { apiFetcher } from '@/services/api'

import styles from './OtherNewsSection.module.scss'

interface OtherNewsSectionProps {
	isTagDisplayed?: boolean
	pagination?: boolean
	itemsPerPage?: number
	newsCategory?: newsCategoryType
}

const OtherNewsSection = ({
	isTagDisplayed = true,
	pagination = false,
	itemsPerPage = 10,
	newsCategory,
}: OtherNewsSectionProps) => {
	const title = 'Berita Lainnya'
	const [pageIndex, setPageIndex] = useState(1)
	const firstPageOffset = 3

	const { data } = useSWR<NewsListResponseData>(
		`${ENDPOINT_PATH.GET_NEWS}?page=${pageIndex}&limit=${itemsPerPage}`,
		apiFetcher,
	)

	const handlePageClick = (event: { selected: number }) => {
		setPageIndex(event.selected + 1)
	}

	const paginationRef = useRef<null | HTMLDivElement>(null)

	const scrollToBottom = () => {
		paginationRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		if (pagination && pageIndex > 1) {
			scrollToBottom()
		}
	}, [pageIndex, pagination])

	return (
		<section className={styles.otherNewsSection} ref={paginationRef}>
			<div className={styles.title}>
				<h3>{title}</h3>
			</div>
			<div className={styles.contentWrapper}>
				{typeof data !== 'undefined' &&
					(pageIndex === 1
						? data.data.slice(-(data.data.length - firstPageOffset))
						: data.data
					).map((value, index) => (
						<NewsCard
							key={index}
							type="M"
							image={value.thumbnail}
							title={value.headline}
							date={new Date(value.postDate)}
							tag={value.category}
							slug={value.slug}
							isTagDisplayed={isTagDisplayed}
						/>
					))}
			</div>
			{pagination && (
				<Pagination
					itemsPerPage={itemsPerPage}
					onPageChange={handlePageClick}
					className={styles.pagination}
					pageCount={data?.totalPage}
				/>
			)}
		</section>
	)
}
export default OtherNewsSection
