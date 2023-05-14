import React, { useEffect } from 'react'

import Head from 'next/head'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import Separator from '@/components/separator/Separator'
import PopularSearchSection from '@/containers/_pencarian/popularSearchSection/PopularSearchSection'
import SearchHeader from '@/containers/_pencarian/searchHeader/SearchHeader'
import SearchResultSection from '@/containers/_pencarian/searchResultSection/SearchResultSection'
import * as search from '@/models/search'

import styles from './index.module.scss'

const SearchPage = () => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
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

	const handleResetSearch = (e: React.MouseEvent<HTMLSpanElement>) => {
		void router.replace(router.pathname, undefined, { shallow: true })
	}
	const [query, setQuery] = React.useState<string | null>(
		searchParams.get(search.params.query),
	)
	useEffect(() => {
		setQuery(searchParams.get(search.params.query))
	}, [searchParams])

	return (
		<>
			<Head>
				<title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
			</Head>
			<SearchHeader
				name="q"
				value={searchParams.get(search.params.query) ?? ''}
				onChange={handleSearch}
				onReset={handleResetSearch}
				// backTo="/"
			/>
			<main className={styles.wrapper}>
				<Separator />
				{(() => {
					if (!query || query === '') {
						return <PopularSearchSection />
					} else {
						return <SearchResultSection query={query} />
					}
				})()}
			</main>
		</>
	)
}

export default SearchPage
