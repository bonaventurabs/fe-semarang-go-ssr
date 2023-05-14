/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { type BareFetcher } from 'swr'

export const mocksApi = axios.create({
	baseURL: process.env.MOCK_API,
})

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API,
	timeout: 10000,
})

export const mockFetcher: BareFetcher = async (resource: string) =>
	await mocksApi.get(resource).then((res) => res.data)

export const apiFetcher: any = async (resource: string) =>
	await api.get(resource).then((res) => res.data)

api.interceptors.request.use(
	function (config) {
		config.headers.Authorization = 'ytta'
		config.headers['Content-Type'] = 'application/json'
		return config
	},
	async function (error) {
		return await Promise.reject(error)
	},
)

api.interceptors.response.use(
	function (response) {
		return response
	},
	async function (error) {
		// if ([401].includes(error.response.code)) {
		// 	// TODO: status code menyesuaikan BE
		// 	window.location.replace('/logout')
		// 	// window.history.replaceState({}, '')
		// 	return await Promise.reject(error)
		// }
		// TODO: mapping error mengikuti BE
		return await Promise.reject(error.response)
	},
)

mocksApi.interceptors.response.use(
	function (response) {
		return response
	},
	async function (error) {
		// TODO: mapping error mengikuti BE
		return await Promise.reject(error)
	},
)
