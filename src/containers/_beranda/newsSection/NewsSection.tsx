import React from 'react'

import Link from 'next/link'

import img from '@/assets/images/news-1.png'
import NewsCard from '@/components/newsCard/NewsCard'
import Separator from '@/components/separator/Separator'

import styles from './NewsSection.module.scss'

const data = [
	{
		image: img,
		title: 'Pelaksanaan PPDB jalur afirmasi untuk siswa inklusi',
		date: new Date('2023-02-07'),
		tag: 'pendidikan',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim tincidunt lacus, quis convallis enim facilisis varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim tincidunt lacus, quis convallis enim facilisis varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim tincidunt lacus, quis convallis enim facilisis varius.',
	},
	{
		image: img,
		title:
			'Kembali Gelar Pelayanan Akhir Pekan, Ita Dorong Masyarakat Gencarkan Urban Farming',
		date: new Date('2023-02-06T00:00:00'),
		tag: 'bisnis-umkm',
	},
	{
		image: img,
		title:
			'TINGKATKAN MUTU PENDIDIKAN, PEMKOT SEMARANG DAN TANOTO FOUNDATION LAKUKAN AUDIENSI',
		date: new Date('2022-08-16T00:00:00'),
		tag: 'pemerintahan',
	},
]

const NewsSection = () => {
	const title = 'Kabar Terkini'
	return (
		<section className={styles.newsSection}>
			<div className={styles.titleCard}>
				<h3>{title}</h3>
				<Link href="/berita" className={styles.viewAllButton}>
					Lihat Semua
				</Link>
			</div>
			<div className={styles.contentWrapper}>
				<NewsCard
					type="XL"
					image={data[0].image}
					title={data[0].title}
					date={data[0].date}
					tag={data[0].tag}
					description={data[0].description}
				/>
				<Separator type="M" />
				{data.slice(-(data.length - 1)).map((element, index) => (
					<React.Fragment key={index}>
						<NewsCard
							type="M"
							title={element.title}
							date={element.date}
							tag={element.tag}
							image={element.image}
							isImageDisplayed={false}
						/>
						<Separator type="M" />
					</React.Fragment>
				))}
			</div>
		</section>
	)
}

export default NewsSection
