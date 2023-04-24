import { useState } from 'react'

import IndexCard from '@/components/indexCard/IndexCard'
import Pagination from '@/components/pagination/Pagination'

import styles from './CityIndexSection.module.scss'

const data = [
	{
		title: 'Tingkat Keatifan Budaya Lokal',
		currentIndex: 17,
		targetIndex: 18,
		cluster: 'masyarakat',
		description:
			'Tingkat Kearifan Budaya Lokal merupakan indikator bagian dari budaya suatu masyarakat yang tidak dapat dipisahkan dari bahasa masyarakat itu sendiri.',
	},
	{
		title: 'Tingkat Pengangguran Terbuka (TPT)',
		currentIndex: 8.39,
		targetIndex: 9.38,
		cluster: 'masyarakat',
		description:
			'Tingkat Pengangguran Terbuka (TPT) adalah persentase jumlah pengangguran terhadap jumlah angkatan kerja.',
	},
	{
		title: 'Indeks Kualitas Lingkungan Hidup (IKLH)',
		currentIndex: 77.098,
		targetIndex: 82.031,
		cluster: 'lingkungan',
		description:
			'Indeks Kualitas Lingkungan Hidup (IKLH) merupakan gambaran atau indikasi awal yang memberikankesimpulan cepat dari suatu kondisi lingkungan hidup pada lingkup dan periode tertentu.',
	},
	{
		title: 'Indeks Pembangunan Manusia (IPM)',
		currentIndex: 84392,
		targetIndex: 84882,
		cluster: 'masyarakat',
		description:
			'Indeks Pembangunan Manusia (IPM) adalah pengukuran perbandingan dari harapan hidup, melek huruf, pendidikan dan standar hidup.',
	},
]

interface Props {
	cluster: string
	pagination?: boolean
}

const CityIndexSection = ({ cluster, pagination }: Props) => {
	const itemsPerPage = 4
	// TODO: data fetching
	const [itemOffset, setItemOffset] = useState<number>(0)
	const endOffset = pagination ? itemOffset + itemsPerPage : data.length
	const currentItems = data.slice(itemOffset, endOffset)

	const handlePageClick = (event: { selected: number }) => {
		const newOffset = (event.selected * itemsPerPage) % data.length
		setItemOffset(newOffset)
	}
	return (
		<section className={styles.section}>
			<span className={styles.totalIndex}>
				<b>{data.length}</b> indeks ditemukan
			</span>
			{currentItems.map((item, index) => (
				<IndexCard
					id={index.toString()}
					key={index}
					title={item.title}
					currentIndex={item.currentIndex}
					targetIndex={item.targetIndex}
					description={item.description}
					tag={item.cluster}
					isTagDisplayed={false}
					to={`/indeks-kota-cerdas/${item.cluster}/${item.title}`}
				/>
			))}
			{pagination && (
				<Pagination
					totalItem={data.length}
					itemsPerPage={itemsPerPage}
					onPageChange={handlePageClick}
					className={styles.pagination}
				/>
			)}
		</section>
	)
}
export default CityIndexSection
