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

interface ClusterServiceSectionProps {
	title: string
	cluster: string
	pagination: boolean
	itemsPerPage?: number
}

interface OPDServiceSectionProps {
	title: string
	opdID: string
	pagination: boolean
	itemsPerPage?: number
}

const ClusterServiceSection = ({
	title,
	cluster,
	pagination,
	itemsPerPage = 5,
}: ClusterServiceSectionProps) => {
	const [page, setPage] = useState<number>(1)
	const { get } = useMapData()
	const orgNameMap = get('serviceOrg', 'idToName', {})
	const clusterBEList = clusterBEMap[cluster]
	const clusterMap = get('serviceCluster', 'nameToId', {})
	let data = null
	for (const clusterBE of clusterBEList) {
		const { data: dataItem } = GetServiceListByCluster(
			clusterMap[clusterBE],
			page,
			10,
		)
		if (dataItem) {
			if (data) {
				data.data = data.data.concat(dataItem.data)
				data.totalData += dataItem.totalData
			} else {
				data = dataItem
			}
		}
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
					isOrgDisplayed
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

const OPDServiceSection = ({
	title,
	opdID,
	pagination,
	itemsPerPage = 5,
}: OPDServiceSectionProps) => {
	const [page, setPage] = useState<number>(1)
	const { get } = useMapData()
	const orgNameMap = get('serviceOrg', 'idToName', {})
	const { data } = GetServiceListByOPD(opdID, page, itemsPerPage)

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

export { ClusterServiceSection, OPDServiceSection }
