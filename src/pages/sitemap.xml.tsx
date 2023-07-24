/* eslint-disable @typescript-eslint/restrict-template-expressions */
import fs from 'fs'

import { type GetServerSideProps } from 'next'

import { ENDPOINT_PATH } from '@/interfaces'
import { type CityIndexListResponseData } from '@/models/cityIndex'
import { type NewsListResponseData } from '@/models/news'
import { api } from '@/services/api'
import { slugify } from '@/utils/string'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const Sitemap = () => {}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const baseUrl = {
		development: 'http://localhost:3000',
		production: process.env.NEXT_PUBLIC_BASE_URL,
		test: process.env.NEXT_PUBLIC_BASE_URL,
	}[process.env.NODE_ENV]

	const staticPages = fs
		.readdirSync(
			{
				development: 'pages',
				production: 'src/',
				test: 'src/pages',
			}[process.env.NODE_ENV],
		)
		.filter((staticPage) => {
			return ![
				'_app.js',
				'_document.js',
				'_error.js',
				'sitemap.xml.js',
			].includes(staticPage)
		})
		.map((staticPagePath) => {
			return `${baseUrl}/${staticPagePath}`
		})

	const newsRes = await api.get(`${ENDPOINT_PATH.GET_NEWS}?page=1&limit=100`)
	const newsData = newsRes.data as NewsListResponseData

	const cityIndexRes = await api.get(`${ENDPOINT_PATH.GET_CITY_INDEX}`)
	const cityIndexData = cityIndexRes.data as CityIndexListResponseData

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
				.map((url) => {
					return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>1.0</priority>
            </url>
          `
				})
				.join('')}
      ${newsData.data
				.map(({ postDate, category, slug }) => {
					return `
              <url>
                <loc>${baseUrl}/berita/${
						typeof category === 'undefined' || category === ''
							? 'lainnya'
							: category
					}/${slug}</loc>
                <lastmod>${postDate}</lastmod>
                <changefreq>daily</changefreq>
                <priority>1.0</priority>
              </url>
            `
				})
				.join('')}
      ${cityIndexData.data
				.map(({ title, cluster }) => {
					return `
              <url>
                <loc>${baseUrl}/indeks-kota-cerdas/${slugify(
						cluster,
					)}/${title.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>1.0</priority>
              </url>
            `
				})
				.join('')}
    </urlset>
  `

	res.setHeader('Content-Type', 'text/xml')
	res.write(sitemap)
	res.end()

	return {
		props: {},
	}
}

export default Sitemap
