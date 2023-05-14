import useSWR from 'swr'

import IndexCard from '@/components/indexCard/IndexCard'
import { ENDPOINT_PATH } from '@/interfaces'
import {
	cityIndexDesc,
	clusterBEMap,
	type CityIndexListResponseData,
} from '@/models/cityIndex'
import { apiFetcher } from '@/services/api'
import { getKey } from '@/utils/map'
import { camelCaseToTitleCase } from '@/utils/string'

import styles from './PopularCityIndexSection.module.scss'

const PopularCityIndexSection = () => {
	const { data } = useSWR<CityIndexListResponseData>(
		`${ENDPOINT_PATH.GET_CITY_INDEX}`,
		apiFetcher,
	)
	const totalItem = 5
	return (
		<section className={styles.section}>
			<h3>Indeks Populer</h3>
			{data?.data.slice(0, totalItem).map((item, index) => (
				<IndexCard
					key={index}
					title={camelCaseToTitleCase(item.title)}
					currentIndex={item.data['2022']}
					targetIndex={item.data['2023']}
					description={cityIndexDesc[item.title]}
					tag={getKey(clusterBEMap, item.cluster)}
					isTagDisplayed
					id={index.toString()}
					to={`/indeks-kota-cerdas/${getKey(clusterBEMap, item.cluster)}/${
						item.title
					}`}
				/>
			))}
		</section>
	)
}
export default PopularCityIndexSection
