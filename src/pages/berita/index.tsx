import Head from 'next/head'

import guideImg from '@/assets/images/news-guide.png'
import Separator from '@/components/separator/Separator'
import NewsCategorySection from '@/containers/_berita/newsCategorySection/NewsCategorySection'
import OtherNewsSection from '@/containers/_berita/otherNewsSection/OtherNewsSection'
import RecentNewsSection from '@/containers/_berita/recentNewsSection/RecentNewsSection'
import GuideSection from '@/containers/guideSection/GuideSection'
import Header from '@/containers/header/Header'

import styles from './index.module.scss'

const NewsPage = () => {
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
			<Header
				title="Berita dan Pengumuman"
				isBackButtonDisplayed={false}
				isSearchButtonDisplayed
			/>
			<main className={styles.pageWrapper}>
				<Separator />
				<GuideSection
					image={guideImg}
					text="Dapatkan informasi terkini dan terpercaya terkait Kota Semarang"
				/>
				<Separator />
				<NewsCategorySection />
				<Separator />
				<RecentNewsSection />
				<Separator />
				<OtherNewsSection />
				<Separator />
			</main>
		</>
	)
}
export default NewsPage
