import Head from 'next/head'

import Separator from '@/components/separator/Separator'
import AboutSemarangGoSection from '@/containers/_beranda/aboutSemarangGoSection/AboutSemarangGoSection'
import AgendaSection from '@/containers/_beranda/agendaSection/AgendaSection'
import CityIndeksCluster from '@/containers/_beranda/cityIndeksCluster/CityIndeksCluster'
import IntroGuideline from '@/containers/_beranda/introGuideline/IntroGuideline'
import MainFeatureSection from '@/containers/_beranda/mainFeatureSection/MainFeatureSection'
import NewsSection from '@/containers/_beranda/newsSection/NewsSection'
import ServiceClusterSection from '@/containers/_beranda/serviceClusterSection/ServiceClusterSection'
import StaticSearchHeader from '@/containers/staticSearchHeader/StaticSearchHeader'
import styles from '@/styles/Home.module.scss'

function HomePage() {
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
			</Head>
			<IntroGuideline />
			<StaticSearchHeader />
			<main className={styles.wrapper}>
				<Separator />
				<ServiceClusterSection id="service" />
				<Separator />
				<MainFeatureSection />
				<Separator />
				<CityIndeksCluster />
				<Separator />
				<NewsSection />
				<Separator />
				<AgendaSection />
				<Separator />
				<AboutSemarangGoSection />
				<Separator />
			</main>
		</>
	)
}

export default HomePage
