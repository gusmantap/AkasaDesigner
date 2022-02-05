const config = {
	webpack(config) {
		config.resolve.alias['fabric'] = 'fabric-pure-browser'
		return config;
	}
}

module.exports = config;