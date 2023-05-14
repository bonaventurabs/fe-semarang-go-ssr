import { type Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'

import {
	CustomEducationIcon,
	CustomGovernanceIcon,
	CustomHealthIcon,
	CustomTourismIcon,
	CustomTradeIcon,
	CustomTransportationIcon,
} from '@/components/icon/SVGIcon'

import styles from './NewsCategorySection.module.scss'

interface NewsCategoryCardProps {
	title: string
	Icon: React.FC<React.SVGProps<SVGSVGElement>>
	description: string
	to: Url
}

const NewsCategoryCard = ({
	title,
	Icon,
	description,
	to,
}: NewsCategoryCardProps) => {
	return (
		<Link href={to} className={styles.newsCategoryCard}>
			<div className={styles.iconWrapper}>
				<Icon />
			</div>
			<span className={styles.title}>{title}</span>
			<p>{description}</p>
		</Link>
	)
}

const NewsCategorySection = () => {
	const title = 'Telusuri Kategori Berita'
	const data = [
		{
			title: 'Kesehatan',
			icon: CustomHealthIcon,
			description: 'Imunisasi, vaksin, penyuluhan kesehatan',
			to: '/berita/kesehatan',
		},
		{
			title: 'Pendidikan',
			icon: CustomEducationIcon,
			description: 'Prestasi masyarakat, PPDB, beasiswa',
			to: '/berita/pendidikan',
		},
		{
			title: 'Pariwisata',
			icon: CustomTourismIcon,
			description: 'Rekomendasi, info tempat wisata, turis',
			to: '/berita/pariwisata',
		},
		{
			title: 'Transportasi',
			icon: CustomTransportationIcon,
			description: 'Keadaan jalan, info kemacetan, proyek PU',
			to: '/berita/transportasi',
		},
		{
			title: 'Bisnis & UMKM',
			icon: CustomTradeIcon,
			description: 'Perizinan, acara bisnis, cerita UMKM',
			to: '/berita/bisnis-umkm',
		},
		{
			title: 'Pemerintahan',
			icon: CustomGovernanceIcon,
			description: 'Kegiatan pemerintah kota, kebijakan daerah',
			to: '/berita/pemerintahan',
		},
	]
	return (
		<section className={styles.newsCategorySection}>
			<div className={styles.titleCard}>
				<h3>{title}</h3>
			</div>
			<div className={styles.contentWrapper}>
				{data.map((el, index) => (
					<NewsCategoryCard
						key={index}
						title={el.title}
						Icon={el.icon}
						description={el.description}
						to={el.to}
					/>
				))}
			</div>
		</section>
	)
}
export default NewsCategorySection
