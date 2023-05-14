import React from 'react'

import img from '@/assets/images/news-1.png'
import NewsCard from '@/components/newsCard/NewsCard'
import Separator from '@/components/separator/Separator'
import { type newsCategoryType } from '@/models/news'

import styles from './RecentNewsSection.module.scss'

// TODO: Fetching data (useeffect or useSWR)
let data = [
	{
		image: img,
		title:
			'Tim Verifikasi Lapangan PPD Provinsi Jawa Tengah Apresiasi Inovasi Urban Farming Pemkot Semarang',
		date: new Date('2023-02-08'),
		tag: 'pemerintahan',
		description:
			'Pemerintah Kota Semarang terus berkomitmen untuk meningkatkan kualitas pembangunan daerah dengan tolak ukur dari aspek pencapaian pembangunan, aspek kualitas, aspek penyusunan dokumen, dan aspek inovasi. Tahun ini, Pemerintah Kota Semarang mengusung inovasi program seperti Food Startup Challenge, Urban Farming Corner, Rumah Gizi Pelangi Nusantara, dan Sekolah Berkebun yang diikutsertakan dalam penilaian Penghargaan Pembangunan Daerah (PPD) Kabupaten/Kota tingkat Provinsi Jawa Tengah. ',
	},
	{
		image: img,
		title: 'Pemkot Semarang Siapkan Daycare untuk Penanganan Stunting',
		date: new Date('2023-02-07T00:00:00'),
		tag: 'kesehatan',
	},
	{
		image: img,
		title: 'Pergeseran Anggaran Ita Fokuskan Untuk Tuntaskan Banjir',
		date: new Date('2023-02-07T00:00:00'),
		tag: 'pemerintahan',
	},
	{
		image: img,
		title: 'WORKSHOP TEKNOLOGI NYAMUK AEDES AEGYPTI WOLBACHIA',
		date: new Date('2023-01-07'),
		tag: 'kesehatan',
		description:
			'Kota Semarang terpilih sebagai salah satu dari 5 Kabupaten/Kota dalam pilot project Penyelenggaraan Teknologi Nyamuk Aedes Aegypti Ber-Wolbachia oleh Kementerian Kesehatan Republik Indonesia. Implementasi Teknologi Nyamuk Aedes Aegypti Ber-Wolbachia merupakan pelengkap dari Program Pengendalian DBD lainnya seperti Pemberantasan Sarang Nyamuk (PSN) dan Pemantauan Jentik Nyamuk (PJN).',
	},
	{
		image: img,
		title:
			'Kepala Dinas Kesehatan Kota Semarang Menerima Penghargaan SATYALANCANA KARYA SATYA',
		date: new Date('2022-11-29T00:00:00'),
		tag: 'kesehatan',
	},
	{
		image: img,
		title:
			'NOTIFIKASI PASANGAN UNTUK DETEKSI DINI KASUS HIV BARU DI KOTA SEMARANG',
		date: new Date('2022-11-14T00:00:00'),
		tag: 'kesehatan',
	},
	{
		title:
			'TINGKATKAN MUTU PENDIDIKAN, PEMKOT SEMARANG DAN TANOTO FOUNDATION LAKUKAN AUDIENS',
		date: new Date('2023-02-05'),
		tag: 'pendidikan',
		image: img,
	},
	{
		title: 'Pembukaan HKN 2022 "Bangkit Indonesiaku, Sehat Negeriku"',
		date: new Date('2022-10-21'),
		tag: 'pariwisata',
		image: img,
	},
]

interface RecentNewsSectionProps {
	isTagDisplayed?: boolean
	newsCategory?: newsCategoryType
}

const RecentNewsSection = ({
	isTagDisplayed = true,
	newsCategory,
}: RecentNewsSectionProps) => {
	const title = 'Kabar Terkini'
	if (newsCategory !== undefined) {
		data = data.filter((el) => el.tag === newsCategory)
	}
	return (
		<section className={styles.newsSection}>
			<div className={styles.titleCard}>
				<h3>{title}</h3>
			</div>
			<div className={styles.contentWrapper}>
				<NewsCard
					type="XL"
					image={data[0].image}
					title={data[0].title}
					date={data[0].date}
					tag={data[0].tag}
					description={data[0].description}
					isTagDisplayed={isTagDisplayed}
				/>
				<Separator type="M" />
				{data.length > 1 &&
					data.slice(-(data.length - 1)).map((element, index) => (
						<React.Fragment key={index}>
							<NewsCard
								type="M"
								title={element.title}
								date={element.date}
								tag={element.tag}
								image={element.image}
								isImageDisplayed={false}
								isTagDisplayed={isTagDisplayed}
							/>
							<Separator type="M" />
						</React.Fragment>
					))}
			</div>
		</section>
	)
}

export default RecentNewsSection
