import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'

import notFoundImg from '@/assets/images/not-found-2.png'
import AgendaCard from '@/components/agendaCard/AgendaCard'
import { ENDPOINT_PATH } from '@/interfaces'
import { type AgendaResponseData } from '@/models/agenda'
import { apiFetcher } from '@/services/api'
import { toISOStringDate } from '@/utils/date'

import styles from './AgendaSection.module.scss'

const AgendaSection = () => {
	const title = 'Agenda kegiatan'
	const { data } = useSWR<AgendaResponseData>(
		`${
			ENDPOINT_PATH.GET_AGENDA
		}?startDate=${toISOStringDate()}&endDate=${toISOStringDate()}`,
		apiFetcher,
	)
	const isError =
		typeof data === 'undefined' || data.status !== 200 || data.data.length === 0

	return (
		<div className={styles.agendaSection}>
			<div className={styles.titleCard}>
				<h3>{title}</h3>
				<Link href="/agenda" className={styles.viewAllButton}>
					Lihat Semua
				</Link>
			</div>
			<div className={styles.cardWrapper}>
				{isError ? (
					<div className={styles.notFoundWrapper}>
						<Image src={notFoundImg} alt="" />
						<span>Tidak ada kegiatan hari ini!</span>
					</div>
				) : (
					data.data
						.slice(0, 3)
						.map((element, index) => (
							<AgendaCard
								key={index}
								title={element.title}
								time={
									new Date(
										element.scheduleDate.split('T')[0] +
											'T' +
											element.scheduleTime,
									)
								}
								location={element.location}
							/>
						))
				)}
			</div>
		</div>
	)
}
export default AgendaSection
