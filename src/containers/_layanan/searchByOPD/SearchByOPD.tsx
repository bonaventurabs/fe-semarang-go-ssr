import { useState } from 'react'

import OPDServicesCard from '@/components/opdServiceCard/OPDServiceCard'
import Pagination from '@/components/pagination/Pagination'
import SearchBar from '@/components/searchBar/SearchBar'

import styles from './SearchByOPD.module.scss'

interface SearchByOPDProps {
	pagination?: boolean
	itemsPerPage?: number
}

const SearchByOPD = ({ pagination, itemsPerPage = 4 }: SearchByOPDProps) => {
	const [value, setValue] = useState('')

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}

	const handleSearchReset = () => {
		setValue('')
	}

	const data = [
		{
			name: 'Dinas Kesehatan',
			img: '',
			totalService: 25,
		},
		{
			name: 'Dinas Pekerjaan Umum',
			img: '',
			totalService: 15,
		},
		{
			name: 'BPBD',
			img: '',
			totalService: 3,
		},
		{
			name: 'PMI Kota Semarang',
			img: '',
			totalService: 25,
		},
	]

	// TODO: data fetching
	const [itemOffset, setItemOffset] = useState<number>(0)
	const endOffset = pagination ? itemOffset + itemsPerPage : data.length
	const currentItems = data.slice(itemOffset, endOffset)

	const handlePageClick = (event: { selected: number }) => {
		const newOffset = (event.selected * itemsPerPage) % data.length
		setItemOffset(newOffset)
	}

	return (
		<section className={styles.searchByOpdSection}>
			<h3>Temukan Layanan berdasarkan Dinas</h3>
			<SearchBar
				placeholder="Cari dinas..."
				value={value}
				onChange={handleSearchChange}
				onReset={handleSearchReset}
			/>
			<span className={styles.totalOpd}>
				<b>{data.length}</b> dinas ditemukan
			</span>
			{currentItems.map((item, index) => (
				<OPDServicesCard
					key={index}
					name={item.name}
					totalService={item.totalService}
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
export default SearchByOPD
