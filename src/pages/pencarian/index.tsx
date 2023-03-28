import React from 'react'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import Separator from '@/components/separator/Separator'
import NotFoundSection from '@/containers/_pencarian/notFoundSection/NotFoundSection'
import PopularSearchSection from '@/containers/_pencarian/popularSearchSection/PopularSearchSection'
import SearchHeader from '@/containers/_pencarian/searchHeader/SearchHeader'
import SearchResultSection from '@/containers/_pencarian/searchResultSection/SearchResultSection'
import * as search from '@/models/search'

import styles from './index.module.scss'

const SearchPage = () => {
	const router = useRouter()
	const searchParams = useSearchParams()

	// const setSearchParams = useCallback(
	// 	(
	// 		nextInit?: Record<string, string | string[]> | URLSearchParams,
	// 		navigateOpts?: { replace?: boolean },
	// 	) => {
	// 		if (typeof nextInit === 'undefined') {
	// 			void (navigateOpts?.replace
	// 				? router.replace(pathname)
	// 				: router.push(pathname))
	// 			return
	// 		}
	// 		const params = new URLSearchParams(searchParams)
	// 		params.set(nextInit.keys().next().value, nextInit.values().next().value)
	// 		void (navigateOpts?.replace
	// 			? router.replace(pathname + '?' + params.toString())
	// 			: router.push(pathname + '?' + params.toString()))
	// 	},
	// 	[pathname, router, searchParams],
	// )

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

	return (
		<>
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
					if (!searchParams.get(search.params.query)) {
						return <PopularSearchSection />
					} else {
						return searchParams.get(search.params.query)?.toLowerCase() ===
							'semarang' ? (
							<SearchResultSection />
						) : (
							<NotFoundSection />
						)
					}
				})()}
			</main>
		</>
	)
}

export default SearchPage
