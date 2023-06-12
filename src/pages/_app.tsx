/* eslint-disable react/no-unknown-property */
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Raleway, Montserrat } from 'next/font/google'
import Head from 'next/head'
import { RecoilRoot } from 'recoil'

import Layout from '@/containers/layout/Layout'
import styles from '@/styles/Home.module.scss'
const raleway = Raleway({ subsets: ['latin'] })
const montserrat = Montserrat({ subsets: ['cyrillic'] })

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="dns-prefetch" href="https://api.semarang-go.me" />
			</Head>
			<style jsx global>{`
				:root {
					--raleway-font: ${raleway.style.fontFamily};
					--montserrat-font: ${montserrat.style.fontFamily};
				}
			`}</style>
			<RecoilRoot>
				<main className={styles.app}>
					<Layout>
						<Component classN {...pageProps} />
					</Layout>
				</main>
			</RecoilRoot>
		</>
	)
}
