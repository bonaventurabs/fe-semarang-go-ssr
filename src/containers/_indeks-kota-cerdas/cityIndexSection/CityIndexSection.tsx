import { useState } from 'react'

import useSWR from 'swr'

import IndexCard from '@/components/indexCard/IndexCard'
import Pagination from '@/components/pagination/Pagination'
import { ENDPOINT_PATH } from '@/interfaces'
import {
	clusterBEMap,
	cityIndexDesc,
	type CityIndexListResponseData,
} from '@/models/cityIndex'
import { apiFetcher } from '@/services/api'
import { getKey } from '@/utils/map'
import { camelCaseToTitleCase } from '@/utils/string'

import styles from './CityIndexSection.module.scss'

interface Props {
	cluster: string
	pagination?: boolean
}

const CityIndexSection = ({ cluster, pagination }: Props) => {
	const itemsPerPage = 10
	const [, setPageIndex] = useState(1)

	const { data } = useSWR<CityIndexListResponseData>(
		`${ENDPOINT_PATH.GET_CITY_INDEX}/cluster/${cluster}`,
		apiFetcher,
	)

	const handlePageClick = (event: { selected: number }) => {
		setPageIndex(event.selected + 1)
	}
	return (
		<section className={styles.section}>
			<span className={styles.totalIndex}>
				<b>{data?.data.length}</b> indeks ditemukan
			</span>
			{data?.data.map((item, index) => (
				<IndexCard
					id={index.toString()}
					key={index}
					title={camelCaseToTitleCase(item.title)}
					currentIndex={item.data['2022']}
					targetIndex={item.data['2023']}
					description={cityIndexDesc[item.title]}
					tag={getKey(clusterBEMap, item.cluster)}
					isTagDisplayed={false}
					to={`/indeks-kota-cerdas/${getKey(clusterBEMap, item.cluster)}/${
						item.title
					}`}
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

export default CityIndexSection
