import useSWR from 'swr'

import { ENDPOINT_PATH } from '@/interfaces'
import { type ServiceListPaginationResponseData } from '@/models/service'

import { apiFetcher } from './api'

export function GetServiceListByOPD(
	opdID: string,
	page: number,
	sizePerPage: number,
) {
	const params = new URLSearchParams()
	params.append('dinas', opdID)
	params.append('page', page.toString())
	params.append('limit', sizePerPage.toString())

	const { data, isLoading, error, mutate } =
		useSWR<ServiceListPaginationResponseData>(
			`${ENDPOINT_PATH.GET_SERVICE}?${params.toString()}`,
			apiFetcher,
		)
	return {
		data,
		isLoading,
		error,
		mutate,
	}
}

export function GetServiceListByCluster(
	clusterID: string | undefined,
	page: number,
	sizePerPage: number,
) {
	const params = new URLSearchParams()
	if (clusterID) params.append('cluster', clusterID)
	params.append('page', page.toString())
	params.append('limit', sizePerPage.toString())

	const { data, isLoading, error, mutate } =
		useSWR<ServiceListPaginationResponseData>(
			`${ENDPOINT_PATH.GET_SERVICE}?${params.toString()}`,
			apiFetcher,
		)
	return {
		data,
		isLoading,
		error,
		mutate,
	}
}
