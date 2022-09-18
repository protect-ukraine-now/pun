const netlifyPlugin = require('preact-cli-plugin-netlify');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');

module.exports = (config, env, helpers) => {
	// https://github.com/preactjs/preact/issues/3733
	if (env.isProd && !env.isServer) {
		const definePlugins = helpers.getPluginsByName(config, 'DefinePlugin');
		const { plugin: definePlugin } = definePlugins.find(
			({ plugin }) => plugin.definitions['process.env.PRERENDER'],
		);
		definePlugin.definitions['process.env.PRERENDER'] = false;
	}

	netlifyPlugin(config);
	env.production && !env.ssr && config.plugins.push(new ImageminPlugin({
		from: './build/assets/**',
		pngquant: {
			quality: '60'
		},
		plugins: [
			imageminMozjpeg({
				quality: 50,
				progressive: true
			})
		]
	}));
	return config;
};
