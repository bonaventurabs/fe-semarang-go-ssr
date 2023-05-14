/* eslint-disable @typescript-eslint/no-namespace */

import { type NewsType } from './news'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type paramsType = {
	query: string
	type?: string
}

export const params = {
	query: 'q',
	type: 'type',
}

export interface ServiceSearchType {
	url: string
	title: string
	body: string
}
export interface ServiceSearchListResponseData {
	status: number
	searchResult: ServiceSearchType[]
}

export interface NewsSearchListResponseData {
	status: number
	searchResult: NewsType[]
}
