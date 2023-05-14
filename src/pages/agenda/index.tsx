import { useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import useSWR from 'swr'

import notFoundImg from '@/assets/images/not-found-2.png'
import AgendaCard, {
	AgendaCardSkeleton,
} from '@/components/agendaCard/AgendaCard'
import DateSlider from '@/components/dateSlider/DateSlider'
import Separator from '@/components/separator/Separator'
import Header from '@/containers/header/Header'
import { ENDPOINT_PATH } from '@/interfaces'
import { type AgendaResponseData } from '@/models/agenda'
import { apiFetcher } from '@/services/api'
import { toISOStringDate } from '@/utils/date'

import styles from './index.module.scss'

const AgendaPage = () => {
	const [dateValue, setDateValue] = useState<Date | undefined | null>(
		new Date(),
	)
	const { data, isLoading } = useSWR<AgendaResponseData>(
		`${ENDPOINT_PATH.GET_AGENDA}?startDate=${toISOStringDate(
			dateValue,
		)}&endDate=${toISOStringDate(dateValue)}`,
		apiFetcher,
		{ revalidateOnFocus: false },
	)

	const handleDateChange = (date: Date | null) => {
		setDateValue(date)
	}

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
				isSearchButtonDisplayed
			/>
			<main className={styles.pageWrapper}>
				<Separator />
				<section className={styles.agendaSection}>
					<DateSlider value={dateValue} onChange={handleDateChange} />
					<div className={styles.cardWrapper}>
						{(() => {
							if (isLoading) {
								return (
									<>
										<AgendaCardSkeleton />
										<AgendaCardSkeleton />
									</>
								)
							} else if (
								typeof data === 'undefined' ||
								data.status !== 200 ||
								data.data.length === 0
							) {
								return (
									<div className={styles.notFoundWrapper}>
										<Image src={notFoundImg} alt="" />
										<span>Tidak ada kegiatan hari ini!</span>
									</div>
								)
							} else {
								return data.data.map((element, index) => (
									<AgendaCard
										key={index}
										title={element.title}
										time={
											new Date(
												element.scheduleDate + 'T' + element.scheduleTime,
											)
										}
										location={element.location}
										isDateDisplayed={false}
									/>
								))
							}
						})()}
					</div>
				</section>
			</main>
		</>
	)
}
export default AgendaPage
