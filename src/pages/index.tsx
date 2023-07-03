import dynamic from 'next/dynamic'
import Head from 'next/head'
import lazyHydrate from 'next-lazy-hydrate'

import Separator from '@/components/separator/Separator'
import AboutSemarangGoSection from '@/containers/_beranda/aboutSemarangGoSection/AboutSemarangGoSection'
// import AgendaSection from '@/containers/_beranda/agendaSection/AgendaSection'
import CityIndeksCluster from '@/containers/_beranda/cityIndeksCluster/CityIndeksCluster'
import MainFeatureSection from '@/containers/_beranda/mainFeatureSection/MainFeatureSection'
// import NewsSection from '@/containers/_beranda/newsSection/NewsSection'
import ServiceClusterSection from '@/containers/_beranda/serviceClusterSection/ServiceClusterSection'
import StaticSearchHeader from '@/containers/staticSearchHeader/StaticSearchHeader'
import useMapData from '@/hooks/useMapData'
import styles from '@/styles/Home.module.scss'

const NewsSection = lazyHydrate(
	async () => await import('@/containers/_beranda/newsSection/NewsSection'),
	{
		on: ['visible', ['scroll', () => document]],
	},
)

const AgendaSection = lazyHydrate(
	async () => await import('@/containers/_beranda/agendaSection/AgendaSection'),
	{
		on: ['visible', ['scroll', () => document]],
	},
)

const IntroGuideline = dynamic(
	async () =>
		await import('@/containers/_beranda/introGuideline/IntroGuideline'),
	{
		ssr: false,
	},
)

function HomePage() {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		url: 'https://semarang-go.me/',
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: 'https://semarang-go.me/pencarian?q={search_term_string}',
			},
			'query-input': 'required name=search_term_string',
		},
	}

	useMapData()
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
				<script
					key="structured-data"
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
				/>
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
