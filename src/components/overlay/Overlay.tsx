import { useEffect, type ReactNode } from 'react'

import styles from './Overlay.module.scss'

interface OverlayProps {
	open: boolean
	children?: ReactNode
	blur?: boolean
	preventScroll?: boolean
}

function Overlay({ open, children, blur, preventScroll }: OverlayProps) {
	// lock window scrolling
	function lockScroll(e: { preventDefault: () => void }) {
		e.preventDefault()
	}

	if (typeof document !== 'undefined') {
		const { body, documentElement } = document
		let { scrollTop } = document.documentElement
		if (preventScroll) {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			useEffect(() => {
				if (open) {
					// document.body.classList.add(styles.stopScrolling)
					// eslint-disable-next-line react-hooks/exhaustive-deps
					scrollTop = documentElement.scrollTop
					body.style.top = `-${scrollTop}px`
					body.classList.add(styles.stopScrolling)
					document.addEventListener('mousewheel touchmove', lockScroll)
				} else {
					// document.body.classList.remove(styles.stopScrolling)
					scrollTop = parseInt(body.style.top)
					body.classList.remove(styles.stopScrolling)
					documentElement.scrollTop = -scrollTop
					body.style.removeProperty('top')
					document.removeEventListener('mousewheel touchmove', lockScroll)
				}
			}, [open])
		}
	}

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
