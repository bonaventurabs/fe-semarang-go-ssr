import Head from 'next/head'

import Separator from '@/components/separator/Separator'
import CityIndeksCluster from '@/containers/_beranda/cityIndeksCluster/CityIndeksCluster'
import PopularCityIndexSection from '@/containers/_indeks-kota-cerdas/popularCityIndexSection/PopularCityIndexSection'
import Header from '@/containers/header/Header'

import styles from './index.module.scss'

const SmartCityIndexPage = () => {
	const title = 'Indeks Kota Cerdas'
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta
					name="description"
					content={process.env.NEXT_PUBLIC_APP_DESCRIPTION}
				/>
			</Head>
			<Header
				title={title}
				isBackButtonDisplayed={false}
				isSearchButtonDisplayed
			/>
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
