import Head from 'next/head'

import Separator from '@/components/separator/Separator'
import SearchByOPD from '@/containers/_layanan/searchByOPD/SearchByOPD'
import Header from '@/containers/header/Header'

import styles from './index.module.scss'

const ServicePage = () => {
	return (
		<>
			<Head>
				<title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
				<meta
					name="description"
					content={process.env.NEXT_PUBLIC_APP_DESCRIPTION}
				/>
				<meta name="keywords" content={process.env.NEXT_PUBLIC_APP_KEYWORDS} />
				<meta name="author" content={process.env.NEXT_PUBLIC_COMPANY_NAME} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header title="Layanan Publik" />
			<main className={styles.pageWrapper}>
				<Separator />
				<SearchByOPD pagination itemsPerPage={2} />
			</main>
		</>
	)
}
export default ServicePage
