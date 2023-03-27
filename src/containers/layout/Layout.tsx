import React, { type PropsWithChildren, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import LoadingSection from '../loadingSection/LoadingSection'
import NavBar from '../navBar/NavBar'

function Loading() {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const handleStart = (url: string) =>
			url !== router.asPath && setLoading(true)
		const handleComplete = () => setLoading(false)

		router.events.on('routeChangeStart', handleStart)
		router.events.on('routeChangeComplete', handleComplete)
		router.events.on('routeChangeError', handleComplete)

		return () => {
			router.events.off('routeChangeStart', handleStart)
			router.events.off('routeChangeComplete', handleComplete)
			router.events.off('routeChangeError', handleComplete)
		}
	}, [router.asPath, router.events])

	return loading && <LoadingSection />
}

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<>
			{Loading()}
			{children}
			<NavBar />
		</>
	)
}
export default Layout
