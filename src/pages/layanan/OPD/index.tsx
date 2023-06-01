import { useEffect, useState } from 'react'

import Head from 'next/head'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import SearchBar from '@/components/searchBar/SearchBar'
import Separator from '@/components/separator/Separator'
import OPDServiceSearchResult from '@/containers/_layanan/opdServiceSearchResult/OPDServiceSearchResult'
import Header from '@/containers/header/Header'

import styles from './index.module.scss'

const ServicePage = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const [query, setQuery] = useState<string | null>(searchParams.get('q'))

	// create
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value) {
			const url = {
				pathname: router.pathname,
				query: { ...router.query, q: e.target.value },
			}
			void router.replace(url, undefined, { shallow: true })
		} else {
			void router.replace(router.pathname, undefined, { shallow: true })
		}
	}

	const handleSearchReset = (e: React.MouseEvent<HTMLSpanElement>) => {
		void router.replace(router.pathname, undefined, { shallow: true })
	}

	useEffect(() => {
		setQuery(searchParams.get('q'))
	}, [searchParams])

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
			<Header title="Layanan Publik" />
			<main className={styles.pageWrapper}>
				<Separator />
				<section className={styles.searchHeaderSection}>
					<h3>Temukan Layanan berdasarkan Dinas</h3>
					<SearchBar
						placeholder="Cari dinas..."
						value={query ?? undefined}
						onChange={handleSearchChange}
						onReset={handleSearchReset}
					/>
				</section>
				<OPDServiceSearchResult query={query} pagination itemsPerPage={5} />
			</main>
		</>
	)
}
export default ServicePage
