---
layout:      post
title:       Building a command line application with the Joomla Framework - Part 1 - Getting started
description: This is part 1 of a set of tutorials about building a command line application with the Joomla Framework.
date:        2013-08-23 19:40:49
category:    joomla-framework
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
## It Works!

Command line utilities are useful for many things, especially if you want to do something quickly and keep the code light.

Here's how to start a command line application using the Joomla Framework and just get it to work. The application is going to be a utility for scanning a Github repository and generating change log reports based on the tags in the repository.

The source code for this tutorial is available on [Github][0].

## Basic Files

The following tree is how I set out the folder and file structure for the basic application, and you'd probably be storing in some sort of source control system like git/Github.
    
    |- bin
    | \- tagaliser.php
    |- src
    | \- Tagaliser
    |   \- Application.php
    |- composer.json

Those are all the files we need for a start.

### composer.json

The Joomla Framework is distributed in package via a utility called [Composer][1]. It's an awesome system that allows us to pull in code from many different sources (and not just Joomla sources) and wire it all up to do amazing things.

To do this, we need a "composer.json" file that tells Composer what to install.

### Application.php

This will hold the main application object that will make everything work.

### tagaliser.php

This is our executable PHP file that is going to load and execute the application.

## Installing dependancies using Composer

To perform the next steps, you need to install Composer within your development environment. Instructions for how to install Composer can be found by [clicking here][2].

This is what the "composer.json" file looks like in order for us to get the basics for our command line application:
    
    {
      "minimum-stability" : "beta",
      "require" : {
        "joomla/application" : "1.0-beta2"
      },
      "autoload" : {
        "psr-0" : {
          "Tagaliser\\" : "src"
        }
      }
    }

There is a mountain of documentation on the [schema for Composer][3] but there are a few things to note.

At the time of writing, the Joomla Framework is still in 'beta' so we set the minimum stability to "beta".

We 'require' the application package ("joomla\\application") from the Joomla Framework, setting the version to "1.0-beta2".

Finally, we are telling composer where to autoload our custom files for the application. I'm going to give my application the namespace of "Tagaliser" and telling Composer that it can find classes in that namespace in the "src" folder.

### Running Composer

When running Composer for the first time, you'll use the `composer install` command. Running will give you output similar to the following:
    
    $ composer install
    Loading composer repositories with package information
    Installing dependencies (including require-dev)
      - Installing psr/log (1.0.0)
        Loading from cache
    
      - Installing joomla/filesystem (1.0-beta2)
        Loading from cache
    
    <snip>
    
      - Installing joomla/application (1.0-beta2)
        Loading from cache
    
      - Installing joomla/http (1.0-beta2)
        Downloading: 100%
    
      - Installing joomla/github (1.0-beta2)
        Downloading: 100%
    
    joomla/registry suggests installing symfony/yaml
     (Install 2.* if you require YAML support.)
    joomla/filter suggests installing joomla/language
     (Required only if you want to use `OutputFilter::stringURLSafe`.)
    Writing lock file
    Generating autoload files

After it's done all its work, the file tree is going to look something like this:
    
    |- bin
    | \- tagaliser.php
    |- src
    | \- Tagaliser
    |   \- Application.php
    |- vendor
    | |- composer
    | | \- ...
    | |- joomla
    | | \- ...
    | |- psr
    | | \- ...
    | \- autoload.php
    |- composer.json
    |- composer.lock

Composer has added a "composer.lock" file and a "vendor" folder. The lock file simply contains a manifest of all the things that it installed. The "vendor" folder contains all the code and dependancies that Composer downloaded. It has a few of its own files to manage the autoloading, but you can see it pulled down all of the dependencies for the Joomla Framework's Application package (and there are quite a few of them).

### Running the application

To run the application, we just have to run the "bin\\tagaliser.php" file through the PHP interpreter.
    
    $ php -f bin/tagaliser.php
    It works!

There's also a help option in the basic application.
    
    $ php -f bin/tagaliser.php -- --help
    Tagaliser 1.0
    
    Usage:     php -f tagaliser.php -- [switches]
               tagaliser [switches]
    
    Switches:  -h | --help    Prints this usage information.
    
    Examples:  tagaliser -h

## End of Part 1

So, that's how to get a basic command line application up and running with Composer and the Joomla Framework. In the [next part][4], we'll have a look at how the application files work.

---

You might also like to read:

* [Getting Started with Composer and Joomla!][5] by [David Hurley][6]

[0]: https://github.com/eddieajau/tagaliser/tree/v1.0 "Click here to see the source code for part 1 of building a command line application with the Joomla Framework."
[1]: http:://getcomposer.org "Click here to go to the Composer web site."
[2]: http://getcomposer.org/download/
[3]: http://getcomposer.org/doc/04-schema.md "Click here to get more information about the composer.json file."
[4]: /posts/building-a-command-line-application-with-the-joomla-framework-part-2.html "Building a command line application with the Joomla Framework - Part 2 - Why it works"
[5]: http://magazine.joomla.org/issues/issue-aug-2013/item/1450-getting-started-with-composer-and-joomla
[6]: https://github.com/dbhurley
