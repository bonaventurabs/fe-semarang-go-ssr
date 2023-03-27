import axios from 'axios'
import { type BareFetcher } from 'swr'

export const mocksApi = axios.create({
	baseURL: process.env.MOCK_API,
})

export const api = axios.create({
	baseURL: process.env.VITE_API,
})

export const mockFetcher: BareFetcher = async (resource: string) =>
	mocksApi.get(resource).then((res) => res.data.content)

export const apiFetcher: BareFetcher = async (resource: string) =>
	api.get(resource).then((res) => res.data.content)

api.interceptors.request.use(
	function (config) {
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
		if ([401].includes(error.response.code)) {
			// TODO: status code menyesuaikan BE
			window.location.replace('/logout')
			// window.history.replaceState({}, '')
			return await Promise.reject(error)
		}
		// TODO: mapping error mengikuti BE
		return await Promise.reject(error)
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
