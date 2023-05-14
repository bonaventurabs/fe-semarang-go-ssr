import { type Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import { Navigation, Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/scss'
import 'swiper/scss/pagination'
import 'swiper/scss/scrollbar'

import {
	CustomAgendaIcon,
	CustomAllIcon,
	CustomNewsIcon,
	CustomReportIcon,
	CustomSmartCityIcon,
} from '@/components/icon/SVGIcon'

import styles from './MainFeatureSection.module.scss'

interface MainFeatureCardProps {
	title: string
	Icon: React.FC<React.SVGProps<SVGSVGElement>>
	description: string
	to: Url
}

const MainFeatureCard = ({
	title,
	Icon,
	description,
	to,
}: MainFeatureCardProps) => {
	return (
		<Link href={to} className={styles.mainFeatureCard}>
			<div className={styles.iconWrapper}>
				<Icon />
			</div>
			<span className={styles.title}>{title}</span>
			<p>{description}</p>
		</Link>
	)
}

const MainFeatureSection = () => {
	const title = 'Fitur Utama'
	const data = [
		{
			title: 'Layanan Publik',
			icon: CustomAllIcon,
			description: 'Temukan berbagai layanan digital publik',
			to: '/layanan',
		},
		{
			title: 'Berita Kota',
			icon: CustomNewsIcon,
			description: 'Temukan berbagai berita & pengumuman',
			to: '/berita',
		},
		{
			title: 'Indeks Pencapaian Kota',
			icon: CustomSmartCityIcon,
			description: 'Cari tahu statistik keadaan Kota Semarang',
			to: '/indeks-kota-cerdas',
		},
		{
			title: 'Agenda Kegiatan',
			icon: CustomAgendaIcon,
			description: 'Temukan berbagai agenda kegiatan',
			to: '/agenda',
		},
		{
			title: 'Buat Laporan Kota',
			icon: CustomReportIcon,
			description: 'Laporkan kejadian dan pelayanan publik',
			to: '/lapor',
		},
	]
	return (
		<section className={styles.newsCategorySection}>
			<div className={styles.titleCard}>
				<h3>{title}</h3>
			</div>
			<Swiper
				modules={[Navigation, Scrollbar]}
				slidesPerView="auto"
				spaceBetween={10}
				effect="slide"
				className={styles.contentWrapper}
				scrollbar={{ draggable: true, dragSize: 100 }}
			>
				{data.map((el, index) => (
					<SwiperSlide key={index} style={{ width: 'fit-content' }}>
						<MainFeatureCard
							title={el.title}
							Icon={el.icon}
							description={el.description}
							to={el.to}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	)
}
export default MainFeatureSection
