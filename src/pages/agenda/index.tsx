import { Suspense, useEffect, useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'

import notFoundImg from '@/assets/images/not-found-2.png'
import AgendaCard from '@/components/agendaCard/AgendaCard'
import DateSlider from '@/components/dateSlider/DateSlider'
import Separator from '@/components/separator/Separator'
import Header from '@/containers/header/Header'

import styles from './index.module.scss'

const data = [
	{
		title: 'Upacara Hari Perhubungan Nasional Tahun 2022 Tk. Kita Semarang',
		time: new Date('2022-11-08T09:00:00'),
		location: 'Halaman Kantor Dinas Perhubungan Kota Semarang',
	},
	{
		title:
			'Rapat Badan Anggaran DPRD Kota Semarang Pembahasan Raperda tentang Perubahanan APBD Kota Semarang TA. 2022',
		time: new Date('2022-11-08T09:00:00'),
		location: 'Ballroom Quest Hotel Semarang',
	},
]

const AgendaPage = () => {
	const [dateValue, setDateValue] = useState<Date | undefined | null>(
		new Date(),
	)
	// TODO: fetch data and type for data
	const [filteredData, setFilteredData] = useState<any[]>([])

	const handleDateChange = (date: Date | null) => {
		setDateValue(date)
	}

	useEffect(() => {
		if (dateValue !== undefined && dateValue !== null) {
			setFilteredData(
				data.filter(
					(d) => d.time.toLocaleDateString() === dateValue.toLocaleDateString(),
				),
			)
		}
	}, [dateValue])

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
			<Header
				title="Agenda Kegiatan Kota Semarang"
				isBackButtonDisplayed={false}
			/>
			<main className={styles.pageWrapper}>
				<Separator />
				<section className={styles.agendaSection}>
					<DateSlider value={dateValue} onChange={handleDateChange} />
					<div className={styles.cardWrapper}>
						{/* TODO: Loading/skeleton */}
						<Suspense fallback={<p>Loading...</p>}>
							{filteredData.length === 0 ? (
								<div className={styles.notFoundWrapper}>
									<Image src={notFoundImg} alt="" />
									<span>Tidak ada kegiatan hari ini!</span>
								</div>
							) : (
								filteredData.map((element, index) => (
									<AgendaCard
										key={index}
										title={element.title}
										time={element.time}
										location={element.location}
										isDateDisplayed={false}
									/>
								))
							)}
						</Suspense>
					</div>
				</section>
			</main>
		</>
	)
}
export default AgendaPage
