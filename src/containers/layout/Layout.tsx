import React, { Suspense, type PropsWithChildren } from 'react'

import LoadingSection from '../loadingSection/LoadingSection'
import NavBar from '../navBar/NavBar'

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<Suspense fallback={<LoadingSection />}>{children}</Suspense>
			<NavBar />
		</>
	)
}
export default Layout
