import Head from 'next/head'
import { useRouter } from 'next/router'

import Separator from '@/components/separator/Separator'
import MainServiceSection from '@/containers/_layanan/mainServiceSection/MainServiceSection'
import { ClusterServiceSection } from '@/containers/_layanan/serviceSection/ServiceSection'
import Header from '@/containers/header/Header'
import { clusterMap } from '@/models/service'
import NotFoundPage from '@/pages/404'

import styles from './index.module.scss'

const ServiceClusterPage = () => {
	const router = useRouter()
	const { cluster } = router.query
	if (typeof cluster === 'undefined' || !clusterMap.has(cluster.toString())) {
		return <NotFoundPage />
	}
	const title = `Layanan ${clusterMap.get(cluster.toString()) ?? ''}`
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="author" content={process.env.NEXT_PUBLIC_COMPANY_NAME} />
			</Head>
			<Header title={title} isBackButtonDisplayed />
			<main className={styles.pageWrapper}>
				<Separator />
				<MainServiceSection cluster={cluster.toString()} />
				<Separator />
				<ClusterServiceSection
					title="Layanan Lainnya"
					cluster={cluster.toString()}
					pagination
				/>
			</main>
		</>
	)
}
export default ServiceClusterPage
