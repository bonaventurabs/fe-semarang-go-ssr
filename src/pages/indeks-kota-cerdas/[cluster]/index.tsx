import Head from 'next/head'
import { useRouter } from 'next/router'

import Separator from '@/components/separator/Separator'
import CityIndexSection from '@/containers/_indeks-kota-cerdas/cityIndexSection/CityIndexSection'
import Header from '@/containers/header/Header'
import {
	clusterMap,
	clusterSubtitleMap,
	clusterBEMap,
} from '@/models/cityIndex'
import ErrorPage from '@/pages/_error'

import styles from './index.module.scss'

const CityIndexClusterPage = () => {
	const router = useRouter()
	const { cluster } = router.query
	const beCluster = clusterBEMap.get(cluster?.toString() ?? '')
	if (!cluster || !beCluster) {
		return <ErrorPage statusCode={404} />
	}

	return (
		<>
			<Head>
				<title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
				<meta name="keywords" content={cluster.toString()} />
			</Head>
			<Header
				title={clusterMap.get(cluster.toString())}
				subTitle={clusterSubtitleMap.get(cluster.toString())}
				isBackButtonDisplayed
			/>
			<main className={styles.pageWrapper}>
				<Separator />
				<CityIndexSection cluster={beCluster} pagination />
			</main>
		</>
	)
}

export default CityIndexClusterPage
