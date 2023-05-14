import { useState } from 'react'

import { type ColumnDef } from '@tanstack/react-table'
import Head from 'next/head'
import { useRouter } from 'next/router'

import LineChart from '@/components/lineChart/LineChart'
import Separator from '@/components/separator/Separator'
import { Tab, Tabs } from '@/components/tab/Tab'
import Table from '@/components/table/Table'
import Header from '@/containers/header/Header'

import styles, { colorMonoWhite } from './index.module.scss'

interface Item {
	year: number
	value: number
}

const data = [
	{
		year: 2015,
		value: 84392,
	},
	{
		year: 2016,
		value: 84392,
	},
	{
		year: 2017,
		value: 84392,
	},
	{
		year: 2018,
		value: 84392,
	},
	{
		year: 2019,
		value: 84392,
	},
	{
		year: 2020,
		value: 84392,
	},
	{
		year: 2021,
		value: 90000,
	},
	{
		year: 2022,
		value: 100102,
	},
	{
		year: 2023,
		value: 84392,
	},
	{
		year: 2024,
		value: 84392,
	},
	{
		year: 2025,
		value: 84392,
	},
]
const columns: Array<ColumnDef<Item>> = [
	{
		accessorKey: 'year',
		id: 'year',
		header: 'Tahun',
		cell: (row) => row.renderValue(),
	},
	{
		accessorKey: 'value',
		id: 'value',
		header: 'Nilai Indeks',
		cell: (row) => row.getValue<number>().toLocaleString('id-ID'),
	},
]

const CityIndexContentPage = () => {
	const router = useRouter()
	const { cluster, id } = router.query
	const [activeTab, setActiveTab] = useState(0)
	const handleTabChange = (
		e: React.MouseEvent<HTMLButtonElement>,
		value: string | number,
	) => {
		setActiveTab(typeof value === 'string' ? parseInt(value) : value)
	}
	const pageTitle = 'Indeks Kota'
	const title = 'Indeks Pembangunan Manusia (IPM)'
	const desc =
		'Indeks Pembangunan Manusia (IPM) adalah pengukuran perbandingan dari harapan hidup, melek huruf, pendidikan dan standar hidup.'
	const yearData = 84392
	const targetData = 84392
	return (
		<>
			<Head>
				<title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
				<meta
					name="description"
					content={process.env.NEXT_PUBLIC_APP_DESCRIPTION}
				/>
				<meta name="keywords" content={process.env.NEXT_PUBLIC_APP_KEYWORDS} />
				<meta name="author" content={process.env.NEXT_PUBLIC_COMPANY_NAME} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header title={pageTitle} isBackButtonDisplayed />
			<main className={styles.pageWrapper}>
				<Separator />
				<section className={styles.detailedIndexSection}>
					<h3>{title}</h3>
					<p>{desc}</p>
					<div className={styles.currentDataWrapper}>
						<div className={styles.currentData}>
							<span className={styles.tag}>Tahun ini</span>
							<span className={styles.value}>
								{yearData.toLocaleString('id-ID')}
							</span>
						</div>
						<div className={styles.currentData}>
							<span className={styles.tag}>Target</span>
							<span className={styles.value}>
								{targetData.toLocaleString('id-ID')}
							</span>
						</div>
					</div>
				</section>
				<Separator height={20} color={colorMonoWhite} />
				<section className={styles.chartSection}>
					<div className={styles.tabWrapper}>
						<Tabs selectedTab={activeTab} onChange={handleTabChange}>
							<Tab label="Grafik" value={0} />
							<Tab label="Tabel" value={1} />
						</Tabs>
					</div>
					<Separator style={{ width: '100%' }} />
					<div className={styles.chartWrapper}>
						{(() => {
							switch (activeTab) {
								case 0:
									return (
										<LineChart
											data={data}
											title="Perkembangan Indeks per Tahun"
											chartTitle={title}
											xAxisTitle="Tahun"
											yAxisTitle="Indeks"
											xAxisKey="year"
											yAxisKey="value"
										/>
									)
								case 1:
									return (
										<Table
											defaultData={data}
											columns={columns}
											showNavigation
											showIndex
										/>
									)
								default:
									return (
										<LineChart
											data={[]}
											title=""
											chartTitle=""
											xAxisTitle=""
											yAxisTitle=""
											xAxisKey={[]}
											yAxisKey={[]}
										/>
									)
							}
						})()}
					</div>
				</section>
			</main>
		</>
	)
}
export default CityIndexContentPage
