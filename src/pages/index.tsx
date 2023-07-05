import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'
import Head from 'next/head'
import lazyHydrate from 'next-lazy-hydrate'

import Separator from '@/components/separator/Separator'
import CityIndeksCluster from '@/containers/_beranda/cityIndeksCluster/CityIndeksCluster'
import MainFeatureSection from '@/containers/_beranda/mainFeatureSection/MainFeatureSection'
import ServiceClusterSection from '@/containers/_beranda/serviceClusterSection/ServiceClusterSection'
import StaticSearchHeader from '@/containers/staticSearchHeader/StaticSearchHeader'
import useMapData from '@/hooks/useMapData'
import styles from '@/styles/Home.module.scss'

// const NewsSection = lazyHydrate(
// 	async () => await import('@/containers/_beranda/newsSection/NewsSection'),
// 	{
// 		on: ['visible', ['scroll', () => document]],
// 	},
// )

const NewsSection = dynamic(
	async () => await import('@/containers/_beranda/newsSection/NewsSection'),
)

const AgendaSection = lazyHydrate(
	async () => await import('@/containers/_beranda/agendaSection/AgendaSection'),
	{
		compatibleMode: true,
		on: ['visible', ['scroll', () => document]],
	},
)

const AboutSemarangGoSection = lazyHydrate(
	async () =>
		await import(
			'@/containers/_beranda/aboutSemarangGoSection/AboutSemarangGoSection'
		),
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
	const [showNewsSection, setShowNewsSection] = useState(false)
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

	useEffect(() => {
		const onScroll = () => {
			if (window.scrollY >= 250) {
				setShowNewsSection(true)
			}
		}
		window.addEventListener('scroll', onScroll)

		return () => {
			window.removeEventListener('scroll', onScroll)
		}
	}, [])
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
				{showNewsSection && <NewsSection />}
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
