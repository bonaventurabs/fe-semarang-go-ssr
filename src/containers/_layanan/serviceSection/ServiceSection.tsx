import { useState } from 'react'

import semarangLogo from '@/assets/images/semarang-logo.png'
import Pagination from '@/components/pagination/Pagination'
import ServiceCard from '@/components/serviceCard/ServiceCard'
import useMapData from '@/hooks/useMapData'
import { clusterBEMap } from '@/models/service'
import {
	GetServiceListByCluster,
	GetServiceListByOPD,
} from '@/services/service'

import styles from './ServiceSection.module.scss'

interface ServiceSectionProps {
	title: string
	opdID?: string
	cluster?: string
	pagination: boolean
	itemsPerPage?: number
}

const ServiceSection = ({
	title,
	opdID,
	cluster,
	pagination,
	itemsPerPage = 5,
}: ServiceSectionProps) => {
	const [page, setPage] = useState<number>(1)
	const { get } = useMapData()
	const orgNameMap = get('serviceOrg', 'idToName', {})
	let data = null
	if (opdID) {
		const { data: data1 } = GetServiceListByOPD(opdID, page, itemsPerPage)
		data = data1
	} else if (cluster) {
		const clusterBEList = clusterBEMap[cluster]
		const clusterMap = get('serviceCluster', 'nameToId', {})
		let data2 = null
		for (const clusterBE of clusterBEList) {
			const { data: dataItem } = GetServiceListByCluster(
				clusterMap[clusterBE],
				page,
				10,
			)
			if (dataItem) {
				if (data2) {
					data2.data = data2.data.concat(dataItem.data)
					data2.totalData += dataItem.totalData
				} else {
					data2 = dataItem
				}
			}
		}
		data = data2
	}

	const handlePageClick = (event: { selected: number }) => {
		setPage(event.selected + 1)
	}
	return (
		<section className={styles.serviceSection}>
			<div className={styles.titleWrapper}>
				<h3>{title}</h3>
				<span className={styles.totalService}>
					<b>{data?.totalData}</b> layanan ditemukan
				</span>
			</div>
			{data?.data.map((item, index) => (
				<ServiceCard
					key={index}
					image={item.thumbnail === '-' ? semarangLogo : item.thumbnail}
					title={item.name}
					desc={item.description}
					org={orgNameMap[item.tagId]}
					url={item.domain}
					isImageDisplayed
					isOrgDisplayed={typeof opdID === 'undefined'}
					id={item._id}
				/>
			))}
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
export default ServiceSection
