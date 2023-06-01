import { useState } from 'react'

import semarangLogo from '@/assets/images/semarang-logo.png'
import Pagination from '@/components/pagination/Pagination'
import ServiceCard from '@/components/serviceCard/ServiceCard'
import {
	GetServiceListByCluster,
	GetServiceListByOPD,
} from '@/services/service'

import styles from './ServiceSection.module.scss'

interface ServiceSectionProps {
	title: string
	opdID?: string
	clusterID?: string
	pagination: boolean
	itemsPerPage?: number
}

const ServiceSection = ({
	title,
	opdID,
	clusterID,
	pagination,
	itemsPerPage = 4,
}: ServiceSectionProps) => {
	const [page, setPage] = useState<number>(1)
	const { data } = opdID
		? GetServiceListByOPD(opdID, page, itemsPerPage)
		: GetServiceListByCluster(clusterID, page, itemsPerPage)

	const handlePageClick = (event: { selected: number }) => {
		setPage(event.selected + 1)
	}
	return (
		<section className={styles.serviceSection}>
			<div className={styles.titleWrapper}>
				<h3>{title}</h3>
				<span className={styles.totalService}>
					<b>{data?.data.length}</b> layanan ditemukan
				</span>
			</div>
			{data?.data.map((item, index) => (
				<ServiceCard
					key={index}
					image={item.thumbnail === '-' ? semarangLogo : item.thumbnail}
					title={item.name}
					desc={item.description}
					org={item.tagId}
					url={item.domain}
					isImageDisplayed
					isOrgDisplayed={typeof opdID === 'undefined'}
					id={item._id}
				/>
			))}
			{pagination && (
				<Pagination
					totalItem={data?.data.length}
					itemsPerPage={itemsPerPage}
					onPageChange={handlePageClick}
					className={styles.pagination}
				/>
			)}
		</section>
	)
}
export default ServiceSection
