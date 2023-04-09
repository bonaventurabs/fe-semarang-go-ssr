import Head from 'next/head'

import Separator from '@/components/separator/Separator'
import CityIndeksCluster from '@/containers/_beranda/cityIndeksCluster/CityIndeksCluster'
import PopularCityIndexSection from '@/containers/_indeks-kota-cerdas/popularCityIndexSection/PopularCityIndexSection'
import Header from '@/containers/header/Header'

import styles from './index.module.scss'

const SmartCityIndexPage = () => {
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
			<Header title="Indeks Kota Cerdas" isBackButtonDisplayed={false} />
			<main className={styles.pageWrapper}>
				<Separator />
				<CityIndeksCluster />
				<Separator />
				<PopularCityIndexSection />
			</main>
		</>
	)
}
export default SmartCityIndexPage
