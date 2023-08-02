import React, { useState, useCallback } from 'react'

const useIsMobile = (mobileScreenSize = 768) => {
	if (typeof window.matchMedia !== 'function') {
		throw Error('matchMedia not supported by browser!')
	}
	const [isMobile, setIsMobile] = useState(
		window.matchMedia(`(max-width: ${mobileScreenSize}px)`).matches,
	)

	const checkIsMobile = useCallback(
		(event: { matches: boolean | ((prevState: boolean) => boolean) }) => {
			setIsMobile(event.matches)
		},
		[],
	)

	React.useEffect(() => {
		const mediaListener = window.matchMedia(
			`(max-width: ${mobileScreenSize}px)`,
		)
		// try catch used to fallback for browser compatibility
		mediaListener.addEventListener('change', checkIsMobile)

		return () => {
			mediaListener.removeEventListener('change', checkIsMobile)
		}
	}, [checkIsMobile, mobileScreenSize])

	return isMobile
}

export default useIsMobile
