import Image from 'next/image'
import Link from 'next/link'

import map from '@/assets/images/map.png'
import Separator from '@/components/separator/Separator'
import StaticSearchHeader from '@/containers/staticSearchHeader/StaticSearchHeader'

import styles from './404.module.scss'

// interface State {
// 	status: string
// 	title: string
// 	message: string
// }

export default function PageNotFound() {
	const status = '404'
	const title = 'Not Found'
	const message = 'Maaf, halaman yang Anda coba akses tidak tersedia!'
	return (
		<>
			<StaticSearchHeader />
			<main className={styles.wrapper}>
				<Separator />
				<section className={styles.sectionWrapper}>
					<div className={styles.statusWrapper}>
						<span className={styles.statusText}>{status}</span>
						{/\s/g.test(title) ? (
							<div className={styles.titleWrapper}>
								<span className={styles.titleText1}>
									{title.substring(0, title.indexOf(' '))}
								</span>
								<span className={styles.titleText2}>
									{title.substring(title.indexOf(' ') + 1)}
								</span>
							</div>
						) : (
							<span className={styles.titleText2}>{title}</span>
						)}
					</div>
					<div className={styles.messageWrapper}>
						<Image src={map} alt="Not found image" />
						<span>{message}</span>
						<span>
							Kembali ke{' '}
							<Link className={styles.link} href="/">
								Beranda
							</Link>
						</span>
					</div>
				</section>
			</main>
		</>
	)
}
