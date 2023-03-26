/* eslint-disable react/no-unknown-property */
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Raleway, Montserrat } from 'next/font/google'

const raleway = Raleway({ subsets: ['latin'] })
const montserrat = Montserrat({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<style jsx global>{`
				:root {
					--raleway-font: ${raleway.style.fontFamily};
					--montserrat-font: ${montserrat.style.fontFamily};
				}
			`}</style>
			<Component {...pageProps} />
		</>
	)
}
