import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				{/* <link rel="manifest" href="/manifest.json" />
				<link rel="apple-touch-icon" href="/icon.png"></link>
				<meta name="theme-color" content="#930d20" /> */}

				<meta name="application-name" content="SemarangGo" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
				<meta name="apple-mobile-web-app-title" content="SemarangGo" />
				<meta
					name="description"
					content="Public platform dashbord for Semarang Smart City"
				/>
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="msapplication-TileColor" content="#fafafa" />
				<meta name="msapplication-tap-highlight" content="no" />
				<meta name="theme-color" content="#930d20" />

				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				{/* <link rel="apple-touch-icon" sizes="152x152" href="/icon.png" />
				<link rel="apple-touch-icon" sizes="180x180" href="/icon.png" />
				<link rel="apple-touch-icon" sizes="167x167" href="/icon.png" /> */}

				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/manifest.json" />
				{/* <link
					rel="mask-icon"
					href="/icons/safari-pinned-tab.svg"
					color="#5bbad5"
				/> */}
				<link rel="shortcut icon" href="/favicon.ico" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
