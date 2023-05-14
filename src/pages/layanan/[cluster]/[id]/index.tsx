import { useEffect, useRef, useState } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import BottomSheet from '@/components/bottomSheet/BottomSheet'
import OutlinedButton from '@/components/outlinedButton/OutlinedButton'
import SnackBar from '@/components/snackBar/SnackBar'
import Header from '@/containers/header/Header'
import LoadingSection from '@/containers/loadingSection/LoadingSection'
import { ENDPOINT_PATH } from '@/interfaces'
import { type ServiceResponseData } from '@/models/service'
import ErrorPage from '@/pages/_error'
import { apiFetcher } from '@/services/api'
import { slugify } from '@/utils/string'

import styles from './index.module.scss'

const ServiceDetailPage = () => {
	const router = useRouter()
	const frameRef = useRef<HTMLIFrameElement>(null)
	const searchParams = useSearchParams()
	const { id } = router.query as { id: string }
	const [idxBack, setIdxBack] = useState(0)
	const [isLoaded, setIsLoaded] = useState(false)
	const [isInfoSheetOpen, setIsInfoSheetOpen] = useState(false)

	const url = searchParams.get('url')
	const title = searchParams.get('title')
	const { data } = useSWR<ServiceResponseData>(
		`${ENDPOINT_PATH.GET_SERVICE}/${id}`,
		apiFetcher,
	)
	const isError = data?.status !== 200 && url === null && title === null

	useEffect(() => {
		const frame = frameRef.current
		if (frame) {
			frame.addEventListener('loadstart', () => setIsLoaded(false))
			frame.addEventListener('progress', () => setIsLoaded(false))
			frame.addEventListener('load', () => setIdxBack(idxBack + 1))

			return () => {
				frame.removeEventListener('loadstart', () => setIsLoaded(false))
				frame.removeEventListener('progress', () => setIsLoaded(false))
				frame.removeEventListener('load', () => setIdxBack(idxBack + 1))
			}
		}
	}, [frameRef, idxBack])

	useEffect(() => {
		if (!isLoaded) {
			setTimeout(() => {
				setIsLoaded(true)
			}, 3000)
		}
	}, [isLoaded])

	if (isError) {
		return <ErrorPage statusCode={data?.status} />
	}

	const extUrl = url ?? (data && 'https://'.concat(data.data.domain)) ?? '/'
	const extTitle = title ?? data?.data.name ?? 'Kota Semarang'

	const staticData = {
		title: 'Ambulan Hebat',
		link: 'https://ambulanhebat.semarangkota.go.id/',
		description:
			'Layanan Ambulance Hebat adalah layanan ambulan yang siap melayani keadaan gawat darurat 24 jam di Kota Semarang.',
		admin: {
			name: 'Dinas Kesehatan',
			description:
				'Dinas Kesehatan adalah organisasi pemerintah daerah di Kota Semarang yang membantu wali kota melaksanakan urusan pemerintah dalam bidang kesehatan yang meliputi kesehatan masyarakat, pencegahan dan pengendalian penyakit, pelayanan dan sumber daya kesehatan.',
		},
	}

	const infoSheet = () => {
		return (
			<BottomSheet
				isOpen={isInfoSheetOpen}
				onClose={() => setIsInfoSheetOpen(false)}
				initialDrawerDistanceTop={325}
			>
				<div className={styles.serviceModal}>
					<h3 className={styles.title}>{staticData.title}</h3>
					<p className={styles.description}>{staticData.description}</p>
					<div className={styles.adminWrapper}>
						<span className={styles.adminTag}>Dikelola oleh</span>
						<h3 className={styles.title}>{staticData.admin.name}</h3>
					</div>
					<p className={styles.description}>{staticData.admin.description}</p>
					<OutlinedButton
						text="Lihat Selengkapnya"
						className={styles.button}
						isIconDisplayed={false}
						onClick={async () => {
							setIsInfoSheetOpen(false)
							await router.push(`/layanan/OPD/${slugify(staticData.title)}`)
						}}
					/>
				</div>
			</BottomSheet>
		)
	}

	return (
		<>
			<Head>
				<title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
				<meta name="author" content={process.env.NEXT_PUBLIC_COMPANY_NAME} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header
				title={title ?? data?.data.name}
				backTo={idxBack === 0 ? -1 : -idxBack}
				isBackButtonDisplayed
				isInfoButtonDisplayed
				shouldConfirmLeave
				onInfoButtonClick={() => setIsInfoSheetOpen(true)}
			/>
			<SnackBar
				open
				message={
					<Link href={extUrl} rel="noopener noreferrer" target="_blank">
						<u>Buka layanan di halaman baru</u>
					</Link>
				}
			/>
			<main className={styles.pageWrapper}>
				{!isLoaded && <LoadingSection />}
				<iframe
					id={extTitle}
					name={extTitle}
					title={`Layanan ${extTitle}`}
					ref={frameRef}
					is="x-frame-bypass"
					loading="lazy"
					src={extUrl}
					sandbox="allow-scripts allow-same-origin allow-downloads allow-popups"
				></iframe>
			</main>
			{infoSheet()}
		</>
	)
}
export default ServiceDetailPage
