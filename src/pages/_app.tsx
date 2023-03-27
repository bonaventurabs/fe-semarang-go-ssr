/* eslint-disable react/no-unknown-property */
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Raleway, Montserrat } from 'next/font/google'

import Layout from '@/containers/layout/Layout'
import styles from '@/styles/Home.module.scss'
const raleway = Raleway({ subsets: ['latin-ext'] })
const montserrat = Montserrat({ subsets: ['latin-ext'] })

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<style jsx global>{`
				:root {
					--raleway-font: ${raleway.style.fontFamily};
					--montserrat-font: ${montserrat.style.fontFamily};
				}
			`}</style>
			<main className={styles.app}>
				<Layout>
					<Component classN {...pageProps} />
				</Layout>
			</main>
		</>
	)
}
