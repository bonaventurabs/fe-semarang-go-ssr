import { type Url } from 'next/dist/shared/lib/router/router'
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
}: {
	title: string
	description: string
	to: Url
	Icon: React.FC<React.SVGProps<SVGSVGElement>> | StaticImageData
}) => {
	return (
		<Link className={styles.reportServiceCard} href={to}>
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
			title: 'Sapa Mba Ita',
			description: 'Formulir pengaduan Sapa Mba Ita',
			to: '/',
			icon: sapaImg,
		},
		{
			title: 'Lapor.go.id',
			description: 'Lapor kejadian dan keluhan terkait pelayanan publik',
			to: '/',
			icon: ReportIcon,
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
			<Header title="Lapor Kota Semarang" isBackButtonDisplayed={false} />
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
								to={el.to}
								Icon={el.icon}
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
