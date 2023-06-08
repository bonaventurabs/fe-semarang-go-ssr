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
				<title>Berita</title>
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
