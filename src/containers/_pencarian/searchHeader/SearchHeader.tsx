import { type To, useNavigate, useLocation } from 'react-router-dom'

import { BackIcon } from '@/components/icon/SVGIcon'
import SearchBar from '@/components/searchBar/SearchBar'

import styles from './SearchHeader.module.scss'

const SearchHeader = ({
	name,
	value,
	backTo,
	onChange,
	onReset,
}: {
	name?: string
	value?: string
	backTo?: To
	onChange?: React.ChangeEventHandler
	onReset?: React.MouseEventHandler
}) => {
	const navigate = useNavigate()
	const location = useLocation()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (typeof onChange !== 'undefined') {
			onChange(e)
		}
	}

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
			<BackIcon className={styles.icon} onClick={handleBackClick} />
			<SearchBar
				name={name}
				placeholder="Cari layanan dan informasi..."
				value={value}
				onChange={handleChange}
				onReset={onReset}
			/>
		</header>
	)
}

export default SearchHeader
