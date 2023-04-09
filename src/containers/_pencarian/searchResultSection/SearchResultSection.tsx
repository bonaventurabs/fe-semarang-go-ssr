import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import newsImg from '@/assets/images/news-1.png'
import serviceImg1 from '@/assets/images/service-1.png'
import serviceImg2 from '@/assets/images/service-2.png'
import serviceImg3 from '@/assets/images/service-3.png'
import AgendaCard from '@/components/agendaCard/AgendaCard'
import IndexCard from '@/components/indexCard/IndexCard'
import NewsCard from '@/components/newsCard/NewsCard'
import Separator from '@/components/separator/Separator'
import ServiceCard from '@/components/serviceCard/ServiceCard'
import * as search from '@/models/search'

import styles from './SearchResult.module.scss'

const serviceData = [
	{
		title: 'Ambulan Hebat',
		desc: 'Aplikasi Ambulan Hebat yang dikelola oleh Dinas Kesehatan Kota Semarang',
		org: 'Dinas Kesehatan',
		image: serviceImg1,
		// url: 'ambulanhebat.semarangkota.go.id',
		// url: 'ppebalinusra.menlhk.go.id',
		url: 'dapodik.semarangkota.go.id',
	},
	{
		title: 'Sistem Informasi GIS Kesehatan Lingkungan',
		desc: 'Aplikasi Sistem Informasi GIS Kesehatan Lingkungan yang dikelola oleh Dinas Lingkungan Kota Semarang',
		org: 'Dinas Lingkungan',
		image: serviceImg2,
		url: 'dlh.semarangkota.go.id',
	},
	{
		title: 'E-Puskesmas',
		desc: 'Aplikasi E-Puskesmas yang dikelola oleh Dinas Kesehatan Kota Semarang',
		org: 'Dinas Kesehatan',
		image: serviceImg3,
		url: 'epuskesmas.semarangkota.go.id',
	},
]

const newsData = [
	{
		title: 'Pelaksanaan PPDB jalur afirmasi untuk siswa inklusi',
		date: new Date('2023-02-07'),
		tag: 'Pendidikan',
		image: newsImg,
	},
	{
		title:
			'Kembali Gelar Pelayanan Akhir Pekan, Ita Dorong Masyarakat Gencarkan Urban Farming',
		date: new Date('2023-02-06'),
		tag: 'Bisnis & UMKM',
		image: newsImg,
	},
	{
		title:
			'TINGKATKAN MUTU PENDIDIKAN, PEMKOT SEMARANG DAN TANOTO FOUNDATION LAKUKAN AUDIENS',
		date: new Date('2023-02-05'),
		tag: 'Pendidikan',
		image: newsImg,
	},
]

const agendaData = [
	{
		title: 'Upacara Hari Perhubungan Nasional Tahun 2022 Tk. Kita Semarang',
		time: new Date('2022-11-08T07:30:00'),
		location: 'Halaman Kantor Dinas Perhubungan Kota Semarang',
	},
	{
		title:
			'Rapat Badan Anggaran DPRD Kota Semarang Pembahasan Raperda tentang Perubahanan APBD Kota Semarang TA. 2022',
		time: new Date('2022-11-08T09:00:00'),
		location: 'Ballroom Quest Hotel Semarang',
	},
]

const indexData = [
	{
		title: 'Indeks Pembangunan Manusia (IPM)',
		currentIndex: 84392,
		targetIndex: 84882,
		description:
			'Indeks Pembangunan Manusia (IPM) adalah pengukuran perbandingan dari harapan hidup, melek huruf, pendidikan dan standar hidup.',
	},
	{
		title: 'Tingkat Keatifan Budaya Lokal',
		currentIndex: 17,
		targetIndex: 18,
		description:
			'Tingkat Kearifan Budaya Lokal merupakan indikator bagian dari budaya suatu masyarakat yang tidak dapat dipisahkan dari bahasa masyarakat itu sendiri.',
	},
	{
		title: 'Tingkat Keatifan Budaya Lokal',
		currentIndex: 17,
		targetIndex: 18,
		description:
			'Tingkat Kearifan Budaya Lokal merupakan indikator bagian dari budaya suatu masyarakat yang tidak dapat dipisahkan dari bahasa masyarakat itu sendiri.',
	},
	{
		title: 'Tingkat Pengangguran Terbuka (TPT)',
		currentIndex: 8.39,
		targetIndex: 9.38,
		description:
			'Tingkat Pengangguran Terbuka (TPT) adalah persentase jumlah pengangguran terhadap jumlah angkatan kerja.',
	},
	{
		title: 'Indeks Pembangunan Gender (IPG)',
		currentIndex: 96.45,
		targetIndex: 97.58,
		description:
			'Indeks Pembangunan Gender (IPG) adalah indikator yang menggambarkan perbandingan (rasio) capaian antara IPM Perempuan dengan IPM Laki-laki.',
	},
	{
		title: 'Angka Kemiskinan',
		currentIndex: 3.62,
		targetIndex: 3.41,
		description:
			'Angka Kemiskinan menunjukkan persentase penduduk miskin terhadap jumlah penduduk dalam suatu wilayah.',
	},
]

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

const SearchResultSection = () => {
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
	const isTypeSelected =
		searchParams.get(search.params.type) !== null &&
		searchParams.get(search.params.type) !== ''

	const ServiceSearchResult = () => {
		return (
			<section className={styles.resultSection}>
				<div className={styles.titleWrapper}>
					<div className={styles.title}>
						<h3>{!isTypeSelected ? 'Layanan' : 'Hasil Pencarian'}</h3>
						<span>
							<b>{serviceData.length}</b> layanan ditemukan
						</span>
					</div>
					{!isTypeSelected ? (
						<button
							value={searchCategory.service.value}
							className={styles.viewAllButton}
							onClick={handleSearchTypeClick}
						>
							Lihat Semua
						</button>
					) : (
						<div />
					)}
				</div>
				<div className={styles.serviceContentWrapper}>
					{serviceData.map((value, index) => (
						<ServiceCard
							key={index}
							image={value.image}
							title={value.title}
							desc={value.desc}
							org={value.org}
							url={value.url}
						/>
					))}
				</div>
			</section>
		)
	}

	const NewsSearchResult = () => {
		return (
			<section className={styles.resultSection}>
				<div className={styles.titleWrapper}>
					<div className={styles.title}>
						<h3>{!isTypeSelected ? 'Berita' : 'Hasil Pencarian'}</h3>
						<span>
							<b>{serviceData.length}</b> berita/artikel ditemukan
						</span>
					</div>
					{!isTypeSelected ? (
						<button
							value={searchCategory.news.value}
							className={styles.viewAllButton}
							onClick={handleSearchTypeClick}
						>
							Lihat Semua
						</button>
					) : (
						<div />
					)}
				</div>
				<div className={styles.newsContentWrapper}>
					{newsData.map((value, index) => (
						<NewsCard
							key={index}
							type="M"
							image={value.image}
							title={value.title}
							date={value.date}
							tag={value.tag}
						/>
					))}
				</div>
			</section>
		)
	}

	const AgendaSearchResult = () => {
		return (
			<section className={styles.resultSection}>
				<div className={styles.titleWrapper}>
					<div className={styles.title}>
						<h3>{!isTypeSelected ? 'Kegiatan' : 'Hasil Pencarian'}</h3>
						<span>
							<b>{agendaData.length}</b> kegiatan ditemukan
						</span>
					</div>
					{!isTypeSelected ? (
						<button
							value={searchCategory.agenda.value}
							className={styles.viewAllButton}
							onClick={handleSearchTypeClick}
						>
							Lihat Semua
						</button>
					) : (
						<div />
					)}
				</div>
				<div className={styles.agendaContentWrapper}>
					{agendaData.map((value, index) => (
						<AgendaCard
							key={index}
							title={value.title}
							time={value.time}
							location={value.location}
						/>
					))}
				</div>
			</section>
		)
	}

	const IndexSearchResult = () => {
		return (
			<section className={styles.resultSection}>
				<div className={styles.titleWrapper}>
					<div className={styles.title}>
						<h3>{!isTypeSelected ? 'Indeks' : 'Hasil Pencarian'}</h3>
						<span>
							<b>{indexData.length}</b> indeks ditemukan
						</span>
					</div>
					{!isTypeSelected ? (
						<button
							value={searchCategory.index.value}
							className={styles.viewAllButton}
							onClick={handleSearchTypeClick}
						>
							Lihat Semua
						</button>
					) : (
						<div />
					)}
				</div>
				<div className={styles.indeksContentWrapper}>
					{indexData.map((value, index) => (
						<IndexCard
							key={index}
							title={value.title}
							currentIndex={value.currentIndex}
							targetIndex={value.targetIndex}
							description={value.description}
						/>
					))}
				</div>
			</section>
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
						return <ServiceSearchResult />
					case searchCategory.news.value:
						return <NewsSearchResult />
					case searchCategory.agenda.value:
						return <AgendaSearchResult />
					case searchCategory.index.value:
						return <IndexSearchResult />
					default:
						return (
							<>
								<ServiceSearchResult />
								<Separator />
								<NewsSearchResult />
								<Separator />
								<AgendaSearchResult />
								<Separator />
								<IndexSearchResult />
							</>
						)
				}
			})()}
		</>
	)
}

export default SearchResultSection
