import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import img from '@/assets/images/news-1.png'
import Separator from '@/components/separator/Separator'
import Header from '@/containers/header/Header'
import { type newsCategoryType, newsCategoryTypeToTitle } from '@/models/news'
import ErrorPage from '@/pages/_error'
import html from '@/utils/html'
import { slugToTitle } from '@/utils/string'

import styles from './index.module.scss'

const NewsContentPage = () => {
	const router = useRouter()
	const { category, slug } = router.query
	if (
		typeof category === 'undefined' ||
		!(category.toString() in newsCategoryTypeToTitle)
	) {
		return <ErrorPage statusCode={404} />
	}
	const title = slugToTitle(slug?.toString() ?? '', '-')
	const date = new Date()
	const image = img
	const content =
		'<p style="text-align: justify;"><span id="news-prefix"><strong>PORTALJABAR, KOTA BANDUNG - </strong></span><span>Gubernur Jawa Rarat Ridwan Kamil menghadiri Penandatanganan Kerja Sama Badan Usaha Milik Daerah Provinsi Jabar PT. Jasa Sarana dengan beberapa mitra di Gedung Sate, Kota Bandung, Kamis (16/3/2023). </span></p>\n<p dir="ltr" style="text-align: justify;"><span>Dalam kesempatan tersebut Kang Emil,&nbsp; sapaan akrab Ridwan Kamil&nbsp; menyampaikan kondisi pembangunan Jawa Barat yang sarat prestasi. </span></p>\n<p dir="ltr" style="text-align: justify;"><span class="selectable-text copyable-text">Ini ditunjukkan dari prestasi Jabar yang telah mendapatkan 500 penghargaan, kondisi ekonomi yang baik, penurunan angka kemiskinan, hingga penurunan tengkes (</span><em class="selectable-text copyable-text h432zind">stunting</em><span class="selectable-text copyable-text">). </span></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><span class="selectable-text copyable-text">Dari aspek ekonomi, investasi di Jabar tinggi. Tercatat per hari ini dari jumlah investasi yang masuk sekitar Rp175 triliun. </span></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><span class="selectable-text copyable-text">"Ini artinya keyakinan investor lokal, regional, ataupun nasional, kepada Jawa Barat sangat tinggi hampir setara dengan investasi asing," kata Kang Emil. </span></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><span class="selectable-text copyable-text">Dalam penandatanganan ada 17 proyek dari enam </span><em class="selectable-text copyable-text h432zind">cluster</em><span class="selectable-text copyable-text"> yang disepakati kerja samanya dan Ini menandakan kebangkitan dan kemajuan ekonomi di Jabar. </span></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><span class="selectable-text copyable-text">"Hal ini menandakan kebangkitan dan kemajuan ekonomi Jawa Barat di tahun 2023," ujarnya. </span></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><span class="selectable-text copyable-text">Gubernur Ridwan Kamil berharap PT Jasa Sarana sebagai wajah dari BUMD infrastruktur segera mengakselerasi pembangunan jalan, digital, rumah sakit, transportasi, kawasan, dan lainnya agar prestasi Jabar terus baik seperti yang diharapkan. </span></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><span class="selectable-text copyable-text">Adapun penandatanganan nota kesepahaman tersebut meliputi: </span></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><strong class="selectable-text copyable-text nbipi2bn">1. Cluster Pembiayaan</strong></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><span class="selectable-text copyable-text">a. PT. Indonesia Infrastructure Finance</span></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><span class="selectable-text copyable-text">b. PT. Sarana Multi Infrastruktur </span></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><span class="selectable-text copyable-text">c. PT. Bahana TCW Investment Management </span></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><span class="selectable-text copyable-text">d. PT. Bank Pembangunan Daerah Jawa Barat &amp; Banten Tbk</span></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><span class="selectable-text copyable-text">e. PT. Bank Tabungan Negara Tbk </span></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><strong class="selectable-text copyable-text nbipi2bn">2. Cluster Transportasi</strong></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><span class="selectable-text copyable-text">a. PT Blue Bird Tbk</span></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><span class="selectable-text copyable-text">b. PT VKTR Teknologi Mobilitas</span></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><span class="selectable-text copyable-text">c. PT Aino Indonesia </span></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><strong class="selectable-text copyable-text nbipi2bn">3. Cluster Pengembangan Kawasan</strong></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><span class="selectable-text copyable-text">PT Interport Mandiri Utama (Indika Group) </span></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><strong class="selectable-text copyable-text nbipi2bn">4. Cluster Rumah Sakit</strong></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><span class="selectable-text copyable-text">a. PT. Permata Hospital </span></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><span class="selectable-text copyable-text">b. PT. Daya Dinamika Medika </span></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><strong class="selectable-text copyable-text nbipi2bn">5. Cluster Sinergi BUMD</strong></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><span class="selectable-text copyable-text">PT. Jaswita Jabar </span></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><strong class="selectable-text copyable-text nbipi2bn">6. Cluster Digitalisasi X PT Jabar Telematika</strong></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><span class="selectable-text copyable-text">a. PT. Citi Asia Internasional </span></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><span class="selectable-text copyable-text">b. PT. Cloud Hosting Indonesia </span></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><span class="selectable-text copyable-text">c. PT. Asa Kreasi Asia </span></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><span class="selectable-text copyable-text">d. PT. Digi Asia Bios </span></p>\n<p class="selectable-text copyable-text iq0m558w" dir="ltr" style="text-align: justify;"><span class="selectable-text copyable-text">e. PT. Mandalika Wilasita Sajiwa </span></p>'

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
			<Header isBackButtonDisplayed />
			<main className={styles.newsPage}>
				<Separator />
				<section className={styles.newsSection}>
					<h2 className={styles.title}>{title}</h2>
					<div className={styles.imgTagDateWrapper}>
						<Image src={image} alt="" />
						<div className={styles.tagDateWrapper}>
							<span className={styles.tag}>
								{newsCategoryTypeToTitle[category as newsCategoryType]}
							</span>
							<span className={styles.date}>
								{date.toLocaleDateString('id-ID', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</span>
						</div>
					</div>
					<div className={styles.textWrapper}>{html(content)}</div>
				</section>
			</main>
		</>
	)
}

export default NewsContentPage
