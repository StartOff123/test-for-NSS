const path = require('path');

module.exports = {
	webpack: {
		alias: {
			'@components': path.resolve(__dirname, 'src/components'),
			'@hooks': path.resolve(__dirname, 'src/hooks'),
			'@services': path.resolve(__dirname, 'src/services'),
			'@redux': path.resolve(__dirname, 'src/redux'),
			'@rootTypes': path.resolve(__dirname, 'src/types'),
			'@static': path.resolve(__dirname, 'src/static')
		}
	}
};
