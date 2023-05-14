import { useState } from 'react'

import serviceImg1 from '@/assets/images/service-1.png'
import serviceImg2 from '@/assets/images/service-2.png'
import serviceImg3 from '@/assets/images/service-3.png'
import Pagination from '@/components/pagination/Pagination'
import ServiceCard from '@/components/serviceCard/ServiceCard'

import styles from './ServiceSection.module.scss'

const data = [
	{
		title: 'Ambulan Hebat',
		desc: 'Aplikasi Ambulan Hebat yang dikelola oleh Dinas Kesehatan Kota Semarang',
		org: 'Dinas Kesehatan',
		image: serviceImg1,
		url: 'ambulanhebat.semarangkota.go.id',
		_id: '642623d5277d40b9d8644bb2',
	},
	{
		title: 'Sistem Informasi GIS Kesehatan Lingkungan',
		desc: 'Aplikasi Sistem Informasi GIS Kesehatan Lingkungan yang dikelola oleh Dinas Lingkungan Kota Semarang',
		org: 'Dinas Lingkungan',
		image: serviceImg2,
		url: 'dlh.semarangkota.go.id',
	},
	{
		title: 'E-Puskesmas',
		desc: 'Aplikasi E-Puskesmas yang dikelola oleh Dinas Kesehatan Kota Semarang',
		org: 'Dinas Kesehatan',
		image: serviceImg3,
		url: 'epuskesmas.semarangkota.go.id',
		_id: '642623d5277d40b9d8644bca',
	},
]

interface ServiceSectionProps {
	title: string
	opd?: string
	cluster?: string
	pagination: boolean
	itemsPerPage?: number
}

const ServiceSection = ({
	title,
	opd,
	cluster,
	pagination,
	itemsPerPage = 4,
}: ServiceSectionProps) => {
	// TODO: data fetching
	const [itemOffset, setItemOffset] = useState<number>(0)
	const endOffset = pagination ? itemOffset + itemsPerPage : data.length
	const currentItems = data.slice(itemOffset, endOffset)

	const handlePageClick = (event: { selected: number }) => {
		const newOffset = (event.selected * itemsPerPage) % data.length
		setItemOffset(newOffset)
	}
	return (
		<section className={styles.serviceSection}>
			<div className={styles.titleWrapper}>
				<h3>{title}</h3>
				<span className={styles.totalService}>
					<b>{data.length}</b> layanan ditemukan
				</span>
			</div>
			{currentItems.map((item, index) => (
				<ServiceCard
					key={index}
					image={item.image}
					title={item.title}
					desc={item.desc}
					org={item.org}
					url={item.url}
					isImageDisplayed
					isOrgDisplayed={typeof opd === 'undefined'}
					id={item._id}
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
export default ServiceSection
