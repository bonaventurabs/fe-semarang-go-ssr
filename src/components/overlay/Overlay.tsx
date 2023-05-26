import { useEffect, type ReactNode } from 'react'

import styles from './Overlay.module.scss'

interface OverlayProps {
	open: boolean
	children?: ReactNode
	blur?: boolean
	preventScroll?: boolean
	resetScroll?: boolean
}

function Overlay({
	open,
	children,
	blur,
	preventScroll,
	resetScroll,
}: OverlayProps) {
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

	return (
		<div
			className={`${styles.overlayWrapper} ${blur ? styles.blur : ''}`.trim()}
			hidden={!open}
		>
			{children}
		</div>
	)
}

export default Overlay
