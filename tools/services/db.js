var Schema = require('jugglingdb').Schema;

/**
 * Mysql service provider.
 *
 * @param {object} config
 * @param {object} logger
 * @returns {Schema}
 */
module.exports = function(config) {

	console.log('Connecting to MySQL: %s@%s/%s',
		config.get('mysql:user'),
		config.get('mysql:host'),
		config.get('mysql:database')
	);

	var schema = new Schema('mysql', {
		host: config.get('mysql:host'),
		port: config.get('mysql:port') || 3306,
		username: config.get('mysql:user'),
		password: config.get('mysql:password'),
		database: config.get('mysql:database')
	});

	return schema;
};
