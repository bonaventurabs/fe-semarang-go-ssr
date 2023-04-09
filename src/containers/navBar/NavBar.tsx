import { type Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import { useRouter } from 'next/router'

import {
	CustomAgendaIcon,
	CustomSmartCityIcon,
	CustomReportIcon,
	CustomHomeIcon,
	CustomNewsIcon,
	HomeIcon,
	NewsIcon,
	SmartCityIcon,
	AgendaIcon,
	ReportIcon,
} from '@/components/icon/SVGIcon'

import styles from './NavBar.module.scss'

interface navItemProps {
	to: Url
	icon: React.FC<React.SVGProps<SVGSVGElement>>
	activeIcon: React.FC<React.SVGProps<SVGSVGElement>>
	text: string
}

function NavItemLink({ item, ...props }: { item: navItemProps }) {
	const router = useRouter()
	const isActive = router.pathname === item.to

	return (
		<li className={styles.navItem}>
			<Link href={item.to} {...props}>
				<>
					{isActive ? (
						<item.activeIcon className={`${styles.icon} ${styles.active}`} />
					) : (
						<item.icon className={styles.icon} />
					)}
					<span
						className={
							isActive
								? `${styles.navText} ${styles.active} `
								: `${styles.navText}`
						}
					>
						{item.text}
					</span>
				</>
			</Link>
		</li>
	)
}

const NavBar = () => {
	const data: navItemProps[] = [
		{
			to: '/',
			icon: HomeIcon,
			activeIcon: CustomHomeIcon,
			text: 'Beranda',
		},
		{
			to: '/berita',
			icon: NewsIcon,
			activeIcon: CustomNewsIcon,
			text: 'Berita',
		},
		{
			to: '/indeks-kota-cerdas',
			icon: SmartCityIcon,
			activeIcon: CustomSmartCityIcon,
			text: 'Smart City',
		},
		{
			to: '/agenda',
			icon: AgendaIcon,
			activeIcon: CustomAgendaIcon,
			text: 'Agenda',
		},
		{
			to: '/lapor',
			icon: ReportIcon,
			activeIcon: CustomReportIcon,
			text: 'Lapor',
		},
	]

	const routes = data.map((item) => item.to)
	const router = useRouter()
	const isDisplay = routes.includes(router.asPath)

	if (isDisplay) {
		return (
			<nav className={styles.nav}>
				<ul>
					{data.map((element, index) => (
						<NavItemLink key={index} item={element} />
					))}
				</ul>
			</nav>
		)
	}
	return null
}
export default NavBar
