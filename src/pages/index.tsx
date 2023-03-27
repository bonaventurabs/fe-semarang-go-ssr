import Head from 'next/head'

import Separator from '@/components/separator/Separator'
import AboutSemarangGoSection from '@/containers/_beranda/aboutSemarangGoSection/AboutSemarangGoSection'
import AgendaSection from '@/containers/_beranda/agendaSection/AgendaSection'
import InformationSection from '@/containers/_beranda/informationSection/InformationSection'
import NewsSection from '@/containers/_beranda/newsSection/NewsSection'
import ServiceSection from '@/containers/_beranda/serviceSection/ServiceSection'
import SmartCityAnalysisSection from '@/containers/_beranda/smartCityAnalysisSection/SmartCityAnalysis'
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
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<StaticSearchHeader />
			<main className={styles.wrapper}>
				<Separator />
				<ServiceSection />
				<Separator />
				<InformationSection />
				<Separator />
				<SmartCityAnalysisSection />
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
