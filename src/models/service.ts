export const clusterMap = new Map<string, string>([
	['kesehatan', 'Kesehatan'],
	['pendidikan', 'Pendidikan'],
	['sosial', 'Sosial'],
	['naker', 'Ketenagakerjaan'],
	['umkm', 'UMKM'],
	['pembangunan', 'Pembangunan'],
	['desa', 'Desa'],
])

export interface ServiceType {
	_id: string
	name: string
	domain: string
	tagId: string
	clusterId: string[]
	thumbnail: string
	isPublic: boolean
	description: string
}

export interface ServiceResponseData {
	status: number
	data: ServiceType
}

export interface ServiceListResponseData {
	status: number
	data: ServiceType[]
}

export interface ServiceOPDType {
	_id: string
	name: string
	userCount: number
	appCount: number
}

export interface ServiceOPDListResponseData {
	status: number
	currentPage: number
	totalPage: number
	data: ServiceOPDType[]
}

export interface ServiceListPaginationResponseData {
	status: number
	currentPage: number
	totalPage: number
	data: ServiceType[]
}
