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

	function lockScroll(e: { preventDefault: () => void }) {
		e.preventDefault()
	}

	useEffect(() => {
		const { body, documentElement } = document
		let { scrollTop } = document.documentElement
		if (preventScroll) {
			if (open) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				scrollTop = documentElement.scrollTop
				body.style.top = `-${scrollTop}px`
				body.classList.add(styles.stopScrolling)
				document.addEventListener('mousewheel touchmove', lockScroll)
			} else {
				scrollTop = parseInt(body.style.top)
				body.classList.remove(styles.stopScrolling)
				if (!resetScroll) documentElement.scrollTop = -scrollTop
				body.style.removeProperty('top')
				document.removeEventListener('mousewheel touchmove', lockScroll)
			}
		}
	}, [open, preventScroll, resetScroll])

	useEffect(() => {
		if (!open) {
			const timer = setTimeout(() => {
				setIsShown(open)
			}, delay)
			return () => clearTimeout(timer)
		} else {
			setIsShown(open)
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
