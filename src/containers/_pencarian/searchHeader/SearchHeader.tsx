import { type To } from 'react-router-dom'

import { useRouter } from 'next/router'

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
	const router = useRouter()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (typeof onChange !== 'undefined') {
			onChange(e)
		}
	}

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
