import Head from 'next/head'
import { useRouter } from 'next/router'

import Separator from '@/components/separator/Separator'
import OPDSection from '@/containers/_layanan/opdSection/OPDSection'
import ServiceSection from '@/containers/_layanan/serviceSection/ServiceSection'
import Header from '@/containers/header/Header'
import { slugToTitle } from '@/utils/string'

import styles from './index.module.scss'

const data = {
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
	const { name } = router.query
	const title = slugToTitle(name?.toString() ?? '')
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
			<Header title="Dinas" isBackButtonDisplayed />
			<main className={styles.pageWrapper}>
				<Separator />
				<OPDSection
					title={title}
					description={data.description}
					telp={data.telp}
					email={data.email}
					address={data.address}
					url={data.url}
				/>
				<Separator />
				<ServiceSection title="Layanan" opd={name?.toString()} pagination />
			</main>
		</>
	)
}
export default OPDServicePage
