import { useEffect, useRef, useState } from 'react'

import newsImg from '@/assets/images/news-1.png'
import NewsCard from '@/components/newsCard/NewsCard'
import Pagination from '@/components/pagination/Pagination'
import { type newsCategoryType } from '@/models/news'

import styles from './OtherNewsSection.module.scss'

let newsData = [
	{
		title: 'Pelaksanaan PPDB jalur afirmasi untuk siswa inklusi',
		date: new Date('2023-02-07'),
		tag: 'pendidikan',
		image: newsImg,
	},
	{
		title:
			'Kembali Gelar Pelayanan Akhir Pekan, Ita Dorong Masyarakat Gencarkan Urban Farming',
		date: new Date('2023-02-06'),
		tag: 'bisnis-umkm',
		image: newsImg,
	},
	{
		title:
			'TINGKATKAN MUTU PENDIDIKAN, PEMKOT SEMARANG DAN TANOTO FOUNDATION LAKUKAN AUDIENS',
		date: new Date('2023-02-05'),
		tag: 'pendidikan',
		image: newsImg,
	},
	{
		title: 'YUK BUNDA, TES IVA DETEKSI KANKER SERVIKS',
		date: new Date('2023-02-02'),
		tag: 'kesehatan',
		image: newsImg,
	},
	{
		title: 'Penyakit Pasca Banjir',
		date: new Date('2023-01-12'),
		tag: 'kesehatan',
		image: newsImg,
	},
	{
		title: 'Peranan Dinas Kesehatan Kota Semarang dalam Penanganan Banjir',
		date: new Date('2023-01-07'),
		tag: 'kesehatan',
		image: newsImg,
	},
	{
		title: 'Pembukaan HKN 2022 "Bangkit Indonesiaku, Sehat Negeriku"',
		date: new Date('2022-10-21'),
		tag: 'kesehatan',
		image: newsImg,
	},
]

interface OtherNewsSectionProps {
	isTagDisplayed?: boolean
	pagination?: boolean
	itemsPerPage?: number
	newsCategory?: newsCategoryType
}

const OtherNewsSection = ({
	isTagDisplayed = true,
	pagination = false,
	itemsPerPage = 4,
	newsCategory,
}: OtherNewsSectionProps) => {
	const title = 'Berita Lainnya'
	const [itemOffset, setItemOffset] = useState<number>(0)

	if (newsCategory !== undefined) {
		newsData = newsData.filter((el) => el.tag === newsCategory)
	}
	const endOffset = pagination ? itemOffset + itemsPerPage : newsData.length
	const currentItems = newsData.slice(itemOffset, endOffset)

	const handlePageClick = (event: { selected: number }) => {
		const newOffset = (event.selected * itemsPerPage) % newsData.length
		setItemOffset(newOffset)
	}

	const paginationRef = useRef<null | HTMLDivElement>(null)

	const scrollToBottom = () => {
		paginationRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		if (pagination) {
			scrollToBottom()
		}
	}, [itemOffset, pagination])

	return (
		<section className={styles.otherNewsSection}>
			<div className={styles.title}>
				<h3>{title}</h3>
			</div>
			<div className={styles.contentWrapper}>
				{currentItems.map((value, index) => (
					<NewsCard
						key={index}
						type="M"
						image={value.image}
						title={value.title}
						date={value.date}
						tag={value.tag}
						isTagDisplayed={isTagDisplayed}
					/>
				))}
			</div>
			{pagination && (
				<Pagination
					totalItem={newsData.length}
					itemsPerPage={itemsPerPage}
					onPageChange={handlePageClick}
					className={styles.pagination}
				/>
			)}
			<div ref={paginationRef} />
		</section>
	)
}
export default OtherNewsSection
