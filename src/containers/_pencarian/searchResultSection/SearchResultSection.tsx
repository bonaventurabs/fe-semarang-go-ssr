import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import Separator from '@/components/separator/Separator'
import { ENDPOINT_PATH } from '@/interfaces'
import * as search from '@/models/search'
import { apiFetcher } from '@/services/api'

import {
	AgendaSearchResult,
	IndexSearchResult,
	NewsSearchResult,
	ServiceSearchResult,
} from './SearchResult'
import styles from './SearchResult.module.scss'
import NotFoundSection from '../notFoundSection/NotFoundSection'

const searchCategory = {
	service: {
		name: 'Layanan',
		value: 'layanan',
	},
	news: {
		name: 'Berita',
		value: 'berita',
	},
	agenda: {
		name: 'Kegiatan',
		value: 'kegiatan',
	},
	index: {
		name: 'Indeks',
		value: 'indeks',
	},
}

const searchCategoryData = [
	{
		name: 'Semua',
		value: '',
	},
	{
		name: 'Layanan',
		value: 'layanan',
	},
	{
		name: 'Berita',
		value: 'berita',
	},
	{
		name: 'Kegiatan',
		value: 'kegiatan',
	},
	{
		name: 'Indeks',
		value: 'indeks',
	},
]

const FilterButton = ({
	name,
	type,
	onClick,
}: {
	name?: string
	type?: string
	onClick?: React.MouseEventHandler
}) => {
	const searchParams = useSearchParams()
	const isActive = (searchParams.get(search.params.type) ?? '') === type
	return (
		<button
			className={
				isActive
					? `${styles.filterButton} ${styles.filterButtonActive} `
					: `${styles.filterButton}`
			}
			value={type}
			onClick={onClick}
		>
			{name}
		</button>
	)
}

const SearchResultSection = ({ query }: { query: string }) => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const handleSearchTypeClick = (e: React.MouseEvent) => {
		const value = e.currentTarget.getAttribute('value')
		if (value && value !== '') {
			const url = {
				pathname: router.pathname,
				query: { ...router.query, type: value },
			}
			void router.replace(url, undefined, { shallow: true })
		} else {
			const { type, ...routerQuery } = router.query
			void router.replace(
				{
					query: { ...routerQuery },
				},
				undefined,
				{ shallow: true },
			)
		}
	}

	const AllServiceResult = () => {
		const { data } = useSWR<search.ServiceSearchListResponseData>(
			`${ENDPOINT_PATH.GET_SERVICE_SEARCH}?query=${query}`,
			apiFetcher,
		)
		if (!data || data.status !== 200) {
			return <NotFoundSection />
		}
		return <ServiceSearchResult showAll data={data.searchResult} />
	}

	const AllNewsResult = () => {
		const { data } = useSWR<search.NewsSearchListResponseData>(
			`${ENDPOINT_PATH.GET_NEWS_SEARCH}?query=${query}`,
			apiFetcher,
		)
		if (!data || data.status !== 200) {
			return <NotFoundSection />
		}
		return <NewsSearchResult showAll data={data.searchResult} />
	}

	const AllAgendaResult = () => {
		const { data } = useSWR<search.AgendaSearchListResponseData>(
			`${ENDPOINT_PATH.GET_AGENDA_SEARCH}?query=${query}`,
			apiFetcher,
		)
		if (!data || data.status !== 200) {
			return <NotFoundSection />
		}
		return <AgendaSearchResult showAll data={data.searchResult} />
	}

	const AllIndexResult = () => {
		const { data } = useSWR<search.CityIndexSearchListResponseData>(
			`${ENDPOINT_PATH.GET_CITY_INDEX_SEARCH}?query=${query}`,
			apiFetcher,
		)
		if (!data || data.status !== 200) {
			return <NotFoundSection />
		}
		return <IndexSearchResult showAll data={data.searchResult} />
	}

	const SearchAllResult = ({ limit }: { limit?: number }) => {
		const { data } = useSWR<search.SearchResponseData>(
			`${ENDPOINT_PATH.GET_SEARCH}?query=${query}`,
			apiFetcher,
		)
		if (!data || data.status !== 200) {
			return <NotFoundSection />
		}
		return (
			<>
				{data.applications !== null && (
					<>
						<ServiceSearchResult
							data={data.applications}
							showAll={false}
							limit={limit}
							onViewAllClick={handleSearchTypeClick}
						/>
						<Separator />
					</>
				)}
				{data.news !== null && (
					<>
						<NewsSearchResult
							data={data.news}
							showAll={false}
							limit={limit}
							onViewAllClick={handleSearchTypeClick}
						/>
						<Separator />
					</>
				)}
				{data.agendas.length > 0 && (
					<>
						<AgendaSearchResult
							data={data.agendas}
							showAll={false}
							limit={limit}
							onViewAllClick={handleSearchTypeClick}
						/>
						<Separator />
					</>
				)}
				<IndexSearchResult
					showAll={false}
					limit={limit}
					onViewAllClick={handleSearchTypeClick}
				/>
			</>
		)
	}

	return (
		<>
			<section className={styles.searchCategorySection}>
				<h3>Kategori Pencarian</h3>
				<div className={styles.buttonWrapper}>
					{searchCategoryData.map((value, index) => (
						<FilterButton
							key={index}
							name={value.name}
							type={value.value}
							onClick={handleSearchTypeClick}
						/>
					))}
				</div>
			</section>
			<Separator />
			{(() => {
				switch (searchParams.get('type')) {
					case searchCategory.service.value:
						return <AllServiceResult />
					case searchCategory.news.value:
						return <AllNewsResult />
					case searchCategory.agenda.value:
						return <AllAgendaResult />
					case searchCategory.index.value:
						return <AllIndexResult />
					default:
						return <SearchAllResult limit={3} />
				}
			})()}
		</>
	)
}

export default SearchResultSection
