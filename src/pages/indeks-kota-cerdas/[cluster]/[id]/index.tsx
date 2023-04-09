import { useRouter } from 'next/router'

const CityIndexContentPage = () => {
	const router = useRouter()
	const { cluster, id } = router.query

	return (
		<div>
			<h1>Cluster {cluster}</h1>
			<h1>ID {id}</h1>
		</div>
	)
}
export default CityIndexContentPage
