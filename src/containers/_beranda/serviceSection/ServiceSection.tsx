import { type Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'

import {
	CustomHealthIcon,
	CustomEducationIcon,
	CustomCitizenshipIcon,
	CustomTradeIcon,
	CustomTransportationIcon,
	CustomTourismIcon,
	CustomAllIcon,
	CustomPermissionIcon,
} from '@/components/icon/SVGIcon'

import styles from './ServiceSection.module.scss'

const SVGIconCard = ({
	name,
	Icon,
	to,
}: {
	name: string
	Icon: React.FC<React.SVGProps<SVGSVGElement>>
	to: Url
}) => {
	return (
		<div className={styles.iconCard}>
			<Link href={to}>
				<div className={styles.iconBackground}>
					<Icon />
				</div>
			</Link>
			<Link href={to}>
				<span className={styles.name}>{name}</span>
			</Link>
		</div>
	)
}

interface ServiceIconProps {
	name: string
	icon: React.FC<React.SVGProps<SVGSVGElement>>
	to: Url
}

const ServiceSection = () => {
	const title = 'Seluruh Layanan'
	const columnCount = 4
	const data: ServiceIconProps[] = [
		{
			name: 'Kesehatan',
			icon: CustomHealthIcon,
			to: '/',
		},
		{
			name: 'Pendidikan',
			icon: CustomEducationIcon,
			to: '/',
		},
		{
			name: 'Kependudukan',
			icon: CustomCitizenshipIcon,
			to: '/',
		},
		{
			name: 'UMKM',
			icon: CustomTradeIcon,
			to: '/',
		},
		{
			name: 'Transportasi',
			icon: CustomTransportationIcon,
			to: '/',
		},
		{
			name: 'Pariwisata',
			icon: CustomTourismIcon,
			to: '/',
		},
		{
			name: 'Perizinan',
			icon: CustomPermissionIcon,
			to: '/',
		},
		{
			name: 'Lihat Semua',
			icon: CustomAllIcon,
			to: '/layanan',
		},
	]
	return (
		<section className={styles.serviceSection}>
			<h3>{title}</h3>
			<div
				className={styles.grid}
				style={{
					gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
				}}
			>
				{data.map((element, index) => (
					<SVGIconCard
						key={index}
						name={element.name}
						Icon={element.icon}
						to={element.to}
					/>
				))}
			</div>
		</section>
	)
}

export default ServiceSection
