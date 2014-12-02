---
layout:      post
title:       Better Grunt files (for organised developers)
description: Monolithic Grunt files are hard to organise and hard to maintain. This tutorial shows you how to break up the Grunt configuration and tasks of Gruntfile.js file in a modular way, just like the rest of your code. 
tags:        grunt, phing, ant, build files, automation
date:        2014-12-02 10:00:00
category:    ["node", "javascript"]
image:
  feature:    abstract-6.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

The first grunt file (`Gruntfile.js`) I ever looked at was a long, confusing, dogs-breakfast of code - at least in terms of what I'd been used to compared to XML based build configuration files like [Phing](http://phing.info) or Ant (and admittedly I was brand new to Node). I fancy myself as a neat-and-tidy coder so this messy file continued to grate on my nerves project after project. One day, I decided to try a new approach.

## Modular Grunt files

My proposition is this:

1. I should be able to keep my `Gruntfile.js` file constant for every project.
2. I should be able to organise configuration and build tasks into individual, modular files (like my other code).
2. If I do that, I can copy whole files of functionality between projects rather than pruning and splicing lines of code.

To achieve these goals, I envisaged the following directory structure in my project:

```
root
|- _build
|  |- config
|  |  |- clean.js
|  |  `- compress.js
|  |
|  |- tasks
|  |  `- default.js
|  |
|  `- ... all the other stuff
|
|- ... all the other folders
|
|- Gruntfile.js
|- package.json
|
`- all the other files
```

The idea is to have a parent directory in which to house Grunt configuration options and build tasks. I call mine `_build` but you can call it anything (I use the underscore prefix to denote directories that should not be copied to production).

Under `_build` I have two directories that are used by Grunt: `config`, holding a configuration file for individual Grunt modules; and `tasks` to define the grunt build tasks. You will usually end up with many files in `config` and few files in `tasks`.

But to start, we need a universal `Gruntfile.js` that stays constant across all my projects.

> You will, of course, have to add the appropriate packages in `package.json` for npm to install and Grunt to run.

## The universal Grunt file

```js
var fs = require('fs');
var path = require('path');

module.exports = function (grunt) {
	var configPath = path.resolve('./_build/config');
	var taskPath = path.resolve('./_build/tasks');

	fs.readdirSync(configPath)
		.forEach(function (fileName) {
			require(path.join(configPath, fileName))(grunt);
		});

	fs.readdirSync(taskPath)
		.forEach(function (fileName) {
			require(path.join(taskPath, fileName))(grunt);
		});
};
```

Here we have the typical Grunt exports scenario. It's pretty simple - just loop over the configuration and task directories, and pass the modules the `grunt` object.

## Module Grunt configuration
 
In the directory tree shown above, I have two configuration file examples. This example assumes you have included (at least) `grunt-contrib-clean` and `grunt-contrib-compress` in your `package.json` file.
 
Here's the code for `_build/config/clean.js`
 
```js
module.exports = function (grunt) {
	grunt.config.set('clean', {
		src: [
			'dist/**'
		],
		docs: [
			'_build/api'
		],
		coverage: [
			'_build/coverage/'
		]
	});
	
	grunt.loadNpmTasks('grunt-contrib-clean');
};
```
 
There is nothing particularly special about this file. In fact, it's a valid Grunt configuration file within its own right.

The role of the configuration file is two-fold:

1. To set the required configuration setting for the appropriate package (you have to refer to the individual packages for what they require), and
2. to load the Grunt module.
  
To do this we make calls to `grunt.config.set` (instead of the typical `grunt.initConfig`) and `grunt.loadNpmTasks` respectively. Basically we do everything we need to get the `clean` task ready to run.

Likewise, the `_build/config/compress.js` file might look something like this:

```js
module.exports = function (grunt) {
	grunt.config.set('compress', {
		main: {
			options: {
				mode: 'tgz',
				archive: 'dist/package.tar.gz'
			},
			files: [
				{
					src: [
						'config/**',
						'api/**',
						'bin/**',
						'bootstrap/**',
						'node_modules/**',
						'Gruntfile.js',
						'package.json',
						'server.js'
					]
				}
			]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compress');
};
```

All we need to do now is set up the tasks.

## Modular Grunt tasks

To set up the individual grunt tasks, we use the same pattern as for the configuration (and master Grunt file itself).

Here's a really simple example of what the `default` tasks might look like.

```js
module.exports = function (grunt) {
	grunt.registerTask('default', 'Build an application archive for deployment.', [
		'clean:src',
		'package'
	]);
};
```

## Conclusion

Organising Grunt configuration and tasks as discrete modules gives you a more portable, and less error-prone approach to configuring your Grunt build tasks as compared to using one, huge, messy Grunt file that is built from copy-pasting from past projects. This example is meant to just give you ideas on how to better organise your build code. There are probably fancy ways one could add project defaults and overrides using a local 'JSON` file, to make the code even less coupled to, for instance, hard-coded paths, but you should get the general idea.

                                                                                                                                                                                                                                                                                                                                                         


