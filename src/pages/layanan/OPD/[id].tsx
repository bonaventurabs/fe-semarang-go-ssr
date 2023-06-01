import Head from 'next/head'
import { useRouter } from 'next/router'

import Separator from '@/components/separator/Separator'
import OPDSection from '@/containers/_layanan/opdSection/OPDSection'
import ServiceSection from '@/containers/_layanan/serviceSection/ServiceSection'
import Header from '@/containers/header/Header'

import styles from './index.module.scss'

const staticData = {
	title: 'Dinas Pekerjaan Umum',
	telp: '02476433969',
	email: 'dpu.smgkota@gmail.com',
	address: 'Jl. Pemuda No. 1, Semarang',
	url: 'https://dpu.semarangkota.go.id/',
	description:
		'Dinas Pekerjaan Umum Kota Semarang adalah organisasi pemerintah daerah yang mempunyai tugas untuk melaksanakan urusan pemerintahan yang menjadi kewenangan daerah dan tugas pembantuan di bidang pekerjaan umum.',
}

const OPDServicePage = () => {
	const router = useRouter()
	const { id } = router.query
	// const { data, error } = GetOPDByID(id as string)

	// if (error) {
	// 	return <ErrorPage />
	// }
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
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header title="Dinas" isBackButtonDisplayed />
			<main className={styles.pageWrapper}>
				<Separator />
				<OPDSection
					title={staticData.title}
					description={staticData.description}
					telp={staticData.telp}
					email={staticData.email}
					address={staticData.address}
					url={staticData.url}
				/>
				<Separator />
				<ServiceSection title="Layanan" opdID={id?.toString()} pagination />
			</main>
		</>
	)
}
export default OPDServicePage
