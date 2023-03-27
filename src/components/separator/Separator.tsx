import styles from './Separator.module.scss'

type SeparatorTypes = ['XL', 'M']

type SeparatorType = SeparatorTypes[number]

const Separator = ({
	height,
	type = 'XL',
}: {
	height?: string | number
	type?: SeparatorType
}) => {
	switch (type) {
		case 'XL':
			return (
				<hr
					className={`${styles.separator} ${styles.xlSeparator}`}
					style={{ borderTopWidth: height }}
				/>
			)
		case 'M':
			return (
				<hr
					className={`${styles.separator} ${styles.mSeparator}`}
					style={{ borderTopWidth: height }}
				/>
			)
	}
}

export default Separator
