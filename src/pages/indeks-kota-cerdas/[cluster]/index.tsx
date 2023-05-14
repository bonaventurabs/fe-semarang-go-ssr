import Head from 'next/head'
import { useRouter } from 'next/router'

import Separator from '@/components/separator/Separator'
import CityIndexSection from '@/containers/_indeks-kota-cerdas/cityIndexSection/CityIndexSection'
import Header from '@/containers/header/Header'
import { clusterMap, clusterSubtitleMap } from '@/models/cityIndex'
import NotFoundPage from '@/pages/404'

import styles from './index.module.scss'

const CityIndexClusterPage = () => {
	const router = useRouter()
	const { cluster } = router.query
	if (typeof cluster === 'undefined' || !clusterMap.has(cluster.toString())) {
		return <NotFoundPage />
	}
	return (
		<>
			<Head>
				<title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
				<meta
					name="description"
					content={process.env.NEXT_PUBLIC_APP_DESCRIPTION}
				/>
				<meta name="keywords" content={process.env.NEXT_PUBLIC_APP_KEYWORDS} />
				<meta name="author" content={process.env.NEXT_PUBLIC_COMPANY_NAME} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header
				title={clusterMap.get(cluster.toString())}
				subTitle={clusterSubtitleMap.get(cluster.toString())}
				isBackButtonDisplayed
			/>
			<main className={styles.pageWrapper}>
				<Separator />
				<CityIndexSection cluster={cluster.toString()} pagination />
			</main>
		</>
	)
}
export default CityIndexClusterPage
