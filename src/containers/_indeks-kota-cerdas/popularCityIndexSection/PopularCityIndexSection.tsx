import IndexCard from '@/components/indexCard/IndexCard'

import styles from './PopularCityIndexSection.module.scss'

const PopularCityIndexSection = () => {
	const data = [
		{
			title: 'Tingkat Keatifan Budaya Lokal',
			currentIndex: 17,
			targetIndex: 18,
			cluster: 'Masyarakat',
			description:
				'Tingkat Kearifan Budaya Lokal merupakan indikator bagian dari budaya suatu masyarakat yang tidak dapat dipisahkan dari bahasa masyarakat itu sendiri.',
		},
		{
			title: 'Tingkat Pengangguran Terbuka (TPT)',
			currentIndex: 8.39,
			targetIndex: 9.38,
			cluster: 'Masyarakat',
			description:
				'Tingkat Pengangguran Terbuka (TPT) adalah persentase jumlah pengangguran terhadap jumlah angkatan kerja.',
		},
		{
			title: 'Indeks Kualitas Lingkungan Hidup (IKLH)',
			currentIndex: 77.098,
			targetIndex: 82.031,
			cluster: 'Lingkungan',
			description:
				'Indeks Kualitas Lingkungan Hidup (IKLH) merupakan gambaran atau indikasi awal yang memberikankesimpulan cepat dari suatu kondisi lingkungan hidup pada lingkup dan periode tertentu.',
		},
		{
			title: 'Indeks Pembangunan Manusia (IPM)',
			currentIndex: 84392,
			targetIndex: 84882,
			cluster: 'Masyarakat',
			description:
				'Indeks Pembangunan Manusia (IPM) adalah pengukuran perbandingan dari harapan hidup, melek huruf, pendidikan dan standar hidup.',
		},
	]
	return (
		<section className={styles.section}>
			<h3>Indeks Populer</h3>
			{data.map((item, index) => (
				<IndexCard
					key={index}
					title={item.title}
					currentIndex={item.currentIndex}
					targetIndex={item.targetIndex}
					description={item.description}
					tag={item.cluster}
					isTagDisplayed
				/>
			))}
		</section>
	)
}
export default PopularCityIndexSection
