import { type Url } from 'next/dist/shared/lib/router/router'
import { useRouter } from 'next/router'

import { BackIcon, InfoIcon } from '@/components/icon/SVGIcon'

import styles from './Header.module.scss'

const Header = ({
	title,
	backTo,
	isBackButtonDisplayed = true,
	isInfoButtonDisplayed = false,
	onInfoButtonClick,
}: {
	title?: string
	backTo?: Url
	isBackButtonDisplayed?: boolean
	isInfoButtonDisplayed?: boolean
	onInfoButtonClick?: React.MouseEventHandler
}) => {
	const router = useRouter()

	const handleBackClick = async () => {
		if (backTo) {
			await router.push(backTo)
		} else if (history.length > 1) {
			router.back()
		} else {
			await router.push('/')
		}
	}

	return (
		<header className={styles.headerWrapper}>
			<div className={styles.wrapper}>
				{isBackButtonDisplayed && (
					<BackIcon
						className={`${styles.icon} ${styles.iconBack}`}
						onClick={handleBackClick}
					/>
				)}
				{title && <h3>{title}</h3>}
			</div>
			{isInfoButtonDisplayed && <InfoIcon className={styles.icon} />}
		</header>
	)
}
export default Header
