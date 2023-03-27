import { useSearchParams } from 'react-router-dom'

import Image from 'next/image'

import notFoundImg from '@/assets/images/not-found.png'

import styles from './NotFoundSection.module.scss'

const NotFoundSection = () => {
	const [searchParams] = useSearchParams()

	return (
		<section className={styles.notFoundSection}>
			<Image src={notFoundImg} alt="Not found picture" draggable={false} />
			<p>
				Pencarian dengan kata kunci <em>{searchParams.get('q')}</em> tidak
				ditemukan.
			</p>
			<span>Periksa kembali kata kunci yang Anda cari!</span>
		</section>
	)
}

export default NotFoundSection
