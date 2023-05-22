import { type Url } from 'next/dist/shared/lib/router/router'
import Head from 'next/head'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'

import igImg from '@/assets/images/instagram.png'
import guideImg from '@/assets/images/report-guide.png'
import sapaImg from '@/assets/images/sapa-icon.png'
import twitterImg from '@/assets/images/twitter.png'
import waImg from '@/assets/images/whatsapp.png'
import { MailIcon, ReportIcon } from '@/components/icon/SVGIcon'
import Separator from '@/components/separator/Separator'
import GuideSection from '@/containers/guideSection/GuideSection'
import Header from '@/containers/header/Header'

import styles from './index.module.scss'

const ReportServiceCard = ({
	title,
	description,
	to,
	Icon,
	url,
	openInApp = true,
}: {
	title: string
	description: string
	to?: Url
	Icon: React.FC<React.SVGProps<SVGSVGElement>> | StaticImageData
	url: string
	openInApp?: boolean
}) => {
	to ??= `/layanan/semua/'id'?url=${url}&title=${title}`
	return (
		<Link
			className={styles.reportServiceCard}
			href={openInApp ? to : url}
			rel={openInApp ? undefined : 'noopener noreferrer'}
			target={openInApp ? undefined : '_blank'}
		>
			{typeof Icon === 'function' ? (
				<Icon className={styles.icon} />
			) : (
				<Image src={Icon} className={styles.icon} alt="" />
			)}
			<span className={styles.title}>{title}</span>
			<p>{description}</p>
		</Link>
	)
}

const SocialMediaCard = ({
	title,
	to,
	Icon,
}: {
	title: string
	to: Url
	Icon: React.FC<React.SVGProps<SVGSVGElement>> | StaticImageData | string
}) => {
	return (
		<Link className={styles.socialMediaCard} href={to}>
			{typeof Icon === 'function' ? (
				<Icon className={styles.icon} />
			) : (
				<Image src={Icon} className={styles.icon} alt="" />
			)}
			<span className={styles.title}>{title}</span>
		</Link>
	)
}

const ReportPage = () => {
	const reportServiceData = [
		{
			title: 'Sapa Mbak Ita',
			description: 'Formulir pengaduan Sapa Mba Ita',
			icon: sapaImg,
			url: 'https://sapambakita.semarangkota.go.id/',
		},
		{
			title: 'Lapor.go.id',
			description: 'Lapor kejadian dan keluhan terkait pelayanan publik',
			icon: ReportIcon,
			url: 'https://www.lapor.go.id/',
			openInApp: false,
		},
	]

	const socialMediaData = [
		{
			title: 'Instagram',
			to: '/',
			icon: igImg,
		},
		{
			title: 'Twitter',
			to: '/',
			icon: twitterImg,
		},
		{
			title: 'Whatsapp',
			to: '/',
			icon: waImg,
		},
		{
			title: 'Email',
			to: '/',
			icon: MailIcon,
		},
	]

	return (
		<>
			<Head>
				<title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
				<meta
					name="description"
					content={process.env.NEXT_PUBLIC_APP_DESCRIPTION}
				/>
			</Head>
			<Header
				title="Lapor Kota Semarang"
				isBackButtonDisplayed={false}
				isSearchButtonDisplayed
			/>
			<main className={styles.pageWrapper}>
				<Separator />
				<GuideSection
					image={guideImg}
					text="Memiliki aduan terhadap pelayanan publik dan fasilitas di Kota
							Semarang?"
					emText="Yuk, Lapor!"
				/>
				<Separator />
				<section className={styles.reportServiceSection}>
					<h3>Lapor</h3>
					<div className={styles.contentWrapper}>
						{reportServiceData.map((el, index) => (
							<ReportServiceCard
								key={index}
								title={el.title}
								description={el.description}
								Icon={el.icon}
								url={el.url}
								openInApp={el.openInApp}
							/>
						))}
					</div>
				</section>
				<Separator />
				<section className={styles.socialMediaSection}>
					<h3>Sosial Media</h3>
					<div className={styles.contentWrapper}>
						{socialMediaData.map((el, index) => (
							<SocialMediaCard
								key={index}
								title={el.title}
								to={el.to}
								Icon={el.icon}
							/>
						))}
					</div>
				</section>
				<Separator />
			</main>
		</>
	)
}
export default ReportPage
