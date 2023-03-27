import { useRouter } from 'next/router'

import OutlinedButton from '@/components/outlinedButton/OutlinedButton'

import styles from './AboutSemarangGoSection.module.scss'

const AboutSemarangGoSection = () => {
	const title = 'Tentang SemarangGo'
	const description =
		'SemarangGo merupakan sebuah platform informasi publik yang berfungsi sebagai portal bagi masyarakat Kota Semarang. Masyarakat dapat mengakses berbagai informasi dan layanan publik yang berada di Kota Semarang.'
	const router = useRouter()
	return (
		<section className={styles.sectionWrapper}>
			<h1>{title}</h1>
			<p>{description}</p>
			<div className={styles.buttonWrapper}>
				<OutlinedButton
					className={styles.button}
					iconClassName={styles.icon}
					text="Selengkapnya"
					onClick={async () => await router.push('/')}
				/>
				{/* <button className={styles.button}>
					Selengkapnya
					<Icon icon="arrow_outward" className={styles.icon} />
				</button> */}
			</div>
		</section>
	)
}

export default AboutSemarangGoSection
