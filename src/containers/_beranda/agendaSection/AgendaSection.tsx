import Link from 'next/link'

import AgendaCard from '@/components/agendaCard/AgendaCard'

import styles from './AgendaSection.module.scss'

const data = [
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

const AgendaSection = () => {
	const title = 'Agenda kegiatan'
	return (
		<div className={styles.agendaSection}>
			<div className={styles.titleCard}>
				<h3>{title}</h3>
				<Link href="/agenda" className={styles.viewAllButton}>
					Lihat Semua
				</Link>
			</div>
			<div className={styles.cardWrapper}>
				{data.map((element, index) => (
					<AgendaCard
						key={index}
						title={element.title}
						time={element.time}
						location={element.location}
					/>
				))}
			</div>
		</div>
	)
}

export default AgendaSection
