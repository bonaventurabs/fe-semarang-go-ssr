import { type Url } from 'next/dist/shared/lib/router/router'

import {
	BrandingIcon,
	EconomyIcon,
	EnvirontmentIcon,
	GovernanceIcon,
	LivingIcon,
	SocietyIcon,
} from '@/components/icon/SVGIcon'
import IconCard from '@/components/iconCard/IconCard'

import styles from './SmartCityAnalysis.module.scss'

interface IconProps {
	name: string
	icon: React.FC<React.SVGProps<SVGSVGElement>>
	to: Url
}

const SmartCityAnalysisSection = () => {
	const title = 'Analisis Smart City Semarang'
	const columnCount = 3
	const data: IconProps[] = [
		{
			name: 'Governance',
			icon: GovernanceIcon,
			to: '/smart-city/governance',
		},
		{
			name: 'Branding',
			icon: BrandingIcon,
			to: '/smart-city/branding',
		},
		{
			name: 'Economy',
			icon: EconomyIcon,
			to: '/smart-city/economy',
		},
		{
			name: 'Living',
			icon: LivingIcon,
			to: '/smart-city/living',
		},
		{
			name: 'Society',
			icon: SocietyIcon,
			to: '/smart-city/society',
		},
		{
			name: 'Environment',
			icon: EnvirontmentIcon,
			to: '/smart-city/environment',
		},
	]
	return (
		<section className={styles.smartCitySection}>
			<h3>{title}</h3>
			<div
				className={styles.grid}
				style={{
					gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
				}}
			>
				{data.map((element, index) => (
					<IconCard
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

export default SmartCityAnalysisSection
