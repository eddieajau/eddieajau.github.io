#!/usr/bin/env node

var nconf = require('nconf');
var program = require('commander');
var md = require('html-md');
var mu = require('mu2');
var fs = require('fs');
var moment = require('moment');
var util = require('util');

// Default configuration.
nconf.use('memory');
nconf.defaults({
	mysql: {
		host: '127.0.0.1',
		port: 3306,
		user: 'root',
		password: ''
	}
});

// Set up program.
program
	.version('0.0.1')
	.option('-j, --joomla <v>', 'The Joomla version of the source data.')
	.option('-d, --database <v>', 'The name of the MySQL database.')
	.parse(process.argv);

nconf.set('mysql:database', program.database);

var db = require('./services/db')(nconf);
var joomla = program.joomla;

var model = db.define('Article', {
	id: { type: Number },
	title: { type: String },
	alias: { type: String },
	introtext: { type: String },
	fulltext: { type: String },
	metakey: { type: String },
	metadesc: { type: String },
	state: { type: Number },
	created: { type: Date },
	modified: { type: Date }
}, {
	table: 'jos_content'
});


var params = {
	where: {
		state: 1
	},
	order: 'created'
}

mu.root = __dirname + '/templates';

model.all(params, function (err, data) {
	if (err) {
		console.error(err);
		process.exit(0);
	}

	data.forEach(function (row) {
		//console.log("%d, %s", row.id, row.created);
		var created = moment.utc(row.created).local();
		var view = {
			title: row.title,
			alias: row.alias,
			content: md(row.introtext + '\n' + row.fulltext),
			metakeys: row.metakeys || [],
			metadesc: row.metadesc,
			created: created.format('YYYY-MM-DD HH:mm:ss'),
			modified: moment.utc(row.modified).local().format('YYYY-MM-DD HH:mm:ss')
		};
//		console.log(view);
		var file = __dirname + '/output/' + created.format('YYYY-MM-DD') + '-' + row.alias + '.md';
		console.log('Writing %s', file);

		var wstream = fs.createWriteStream(file);
		var stream = mu.compileAndRender('article.md', view);
		util.pump(stream, wstream);

	});

});


