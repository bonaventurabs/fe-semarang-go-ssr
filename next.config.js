/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	webpack(config, { dev }) {
		// camel-case style names from css modules
		config.module.rules
			.find(({ oneOf }) => !!oneOf)
			.oneOf.filter(({ use }) => JSON.stringify(use)?.includes('css-loader'))
			.reduce((acc, { use }) => acc.concat(use), [])
			.forEach(({ options }) => {
				if (options.modules) {
					options.modules.exportLocalsConvention = 'camelCase'
				}
			})

		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack'],
		})

		return config
	},
}

module.exports = nextConfig
