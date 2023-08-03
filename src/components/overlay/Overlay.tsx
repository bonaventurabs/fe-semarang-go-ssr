import { useEffect, type ReactNode, useState } from 'react'

import styles from './Overlay.module.scss'

interface OverlayProps {
	open: boolean
	children?: ReactNode
	blur?: boolean
	preventScroll?: boolean
	resetScroll?: boolean
	style?: React.CSSProperties
	delay?: number
}

function Overlay({
	open,
	children,
	blur,
	preventScroll,
	resetScroll,
	style,
	delay,
}: OverlayProps) {
	const [isShown, setIsShown] = useState(open)

	// function lockScroll(e: { preventDefault: () => void }) {
	// 	e.preventDefault()
	// }

	useEffect(() => {
		const { body } = document
		if (preventScroll) {
			if (open) {
				body.classList.add(styles.stopScroll)
			} else {
				body.classList.remove(styles.stopScroll)
			}
		}
	}, [open, preventScroll, resetScroll])

	useEffect(() => {
		if (!open) {
			const timer = setTimeout(() => {
				setIsShown(false)
			}, delay)
			return () => clearTimeout(timer)
		} else {
			setIsShown(true)
		}
	}, [delay, open])

	return (
		<div
			className={`${styles.overlayWrapper} ${blur ? styles.blur : ''}`.trim()}
			hidden={!isShown}
			style={style}
		>
			{children}
		</div>
	)
}

export default Overlay
