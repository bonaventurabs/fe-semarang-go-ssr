import { type To, useLocation, useNavigate } from 'react-router-dom'

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
	backTo?: To
	isBackButtonDisplayed?: boolean
	isInfoButtonDisplayed?: boolean
	onInfoButtonClick?: React.MouseEventHandler
}) => {
	const navigate = useNavigate()
	const location = useLocation()

	const handleBackClick = () => {
		if (backTo) {
			navigate(backTo)
		} else if (location.key !== 'default') {
			navigate(-1)
		} else {
			navigate('/')
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
