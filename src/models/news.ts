export type newsCategoryTypes = [
	'kesehatan',
	'pendidikan',
	'pariwisata',
	'transportasi',
	'bisnis-umkm',
	'pemerintahan',
]
export type newsCategoryType = newsCategoryTypes[number]

export const newsCategoryTypeToTitle: Record<newsCategoryType, string> = {
	kesehatan: 'Kesehatan',
	pendidikan: 'Pendidikan',
	pariwisata: 'Pariwisata',
	transportasi: 'Transportasi',
	'bisnis-umkm': 'Bisnis & UMKM',
	pemerintahan: 'Pemerintahan',
}
