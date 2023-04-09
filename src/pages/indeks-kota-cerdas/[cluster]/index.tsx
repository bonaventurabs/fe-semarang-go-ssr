import { useRouter } from 'next/router'

const CityIndexClusterPage = () => {
	const router = useRouter()
	const { cluster } = router.query
	return (
		<div>
			<h1>Cluster {cluster}</h1>
		</div>
	)
}
export default CityIndexClusterPage
