import Head from 'next/head'
import { useRouter } from 'next/router'

import Separator from '@/components/separator/Separator'
import OtherNewsSection from '@/containers/_berita/otherNewsSection/OtherNewsSection'
import RecentNewsSection from '@/containers/_berita/recentNewsSection/RecentNewsSection'
import Header from '@/containers/header/Header'
import { type newsCategoryType, newsCategoryTypeToTitle } from '@/models/news'
import NotFoundPage from '@/pages/404'

import styles from './index.module.scss'

const NewsCategoryPage = () => {
	const router = useRouter()
	const { category } = router.query
	if (
		typeof category === 'undefined' ||
		!(category.toString() in newsCategoryTypeToTitle)
	) {
		return <NotFoundPage />
	}
	const title = `Berita ${
		newsCategoryTypeToTitle[category as newsCategoryType]
	}`

	return (
		<>
			<Head>
				<title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
				{/* <meta
					name="description"
					content={process.env.NEXT_PUBLIC_APP_DESCRIPTION}
				/> */}
				<meta name="keywords" content={process.env.NEXT_PUBLIC_APP_KEYWORDS} />
				<meta name="author" content={process.env.NEXT_PUBLIC_COMPANY_NAME} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header title={title} isBackButtonDisplayed />
			<main className={styles.pageWrapper}>
				<Separator />
				<RecentNewsSection newsCategory={category as newsCategoryType} />
				<Separator />
				<OtherNewsSection
					pagination
					itemsPerPage={3}
					newsCategory={category as newsCategoryType}
				/>
			</main>
		</>
	)
}

export default NewsCategoryPage
