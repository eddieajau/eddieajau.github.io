---
layout:      post
title:       Building a command line application with the Joomla Framework - Part 3 - Need more packages
description: This tutorial shows how to add several new packages to the command line application using Composer and the Joomla Framework.
date:        2013-08-27 13:58:13
category:    joomla-framework
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
## Needs more salt

In [part 1][0] and [part 2][1] we looked at how to get a command line application set up using the Joomla Framework and Composer. Any good chef has plenty of herbs and spices to choose from when cooking a master dish, so now it's time to add some more tools to our application stack.

In this tutorial we'll add the Github and DI packages from the Joomla Framework and look at versioning strategies.

The source code for this tutorial is available on [Github][2].

## Adding the Github and DI packages

Like most modern PHP frameworks these days, the Joomla Framework is designed to expand to suit your needs. You just need to import the libraries that you need rather than having one, monolithic stack (just in case you need it).

Because this is an application that is going to need to access a Github server (either [github.com][3] or an in-house enterprise server), we need to add the Github package from the Joomla Framework. While we are at it, I'm going to add the DI package as well because this is a new toy that allows us to make service providers. More on that next time.

First of all, I'm going to start working in a new branch off master.
    
    $ git checkout -b adding-github
    Switched to a new branch 'adding-github'

This is good practice when you are working on any new code. It allows you to keep the master branch clean and allows you to swap between sub-projects when you need to (for example, when you find a bug in master and you need to do a hot fix).

Next we need to add the new dependencies to `composer.json`.
    
    {
      "minimum-stability" : "beta",
      "require" : {
        "joomla/application" : "1.0-beta2",
        "joomla/di" : "1.0-beta2",
        "joomla/github" : "1.0-beta2"
      },
      "autoload" : {
        "psr-0" : {
          "Tagaliser\\" : "src"
        }
      }
    }

So you can see we've added two new lines for "joomla/di" and "joomla/github". Now, because we've already used Composer once, we do an _update_ instead of an _install_.
    
    $ composer update --no-dev
    Loading composer repositories with package information
    Updating dependencies
      - Installing joomla/http (1.0-beta2)
        Downloading: 100%
    
      - Installing joomla/github (1.0-beta2)
        Downloading: 100%
    
      - Installing joomla/di (1.0-beta2)
        Downloading: 100%
    
    Writing lock file
    Generating autoload files

You'll notice that we also got the HTTP package. That's because the Github package has marked it as a dependency and Composer automatically installs it for you.

## Semantic Versioning

We are about to introduce a change which involves new features so I need to think about a version strategy. Fortunately we [semver.org][4] to draw on. In simple terms, it recommends a X.Y.Z strategy. When you introduce a backward compatible change, you should increment the X number. When you introduce new features, you should increment the Y number. When you are fixing bugs, you should increment the Z number.

In our case, we are actually adding some new features (connecting to Github), I'm going to change the version number in the application class to "1.1".
    
    class Application extends AbstractCliApplication
    {
        const VERSION = '1.1';
    
        // <snip>
    }

## End of Part 3

This was short but is provided to demonstrate the steps to take when you want to add new Composer dependancies to your application when you need them. In the [next tutorial][5], we'll look at wiring up the Github package as a service provider using the new DI (Dependency Injection) package.

[0]: /posts/building-a-command-line-application-with-the-joomla-framework-part-1.html "Building a command line application with the Joomla Framework - Part 1 - It works!"
[1]: /posts/building-a-command-line-application-with-the-joomla-framework-part-2.html "Building a command line application with the Joomla Framework - Part 2 - Why it works!"
[2]: https://github.com/eddieajau/tagaliser/tree/v1.1 "Click here to see the source code for part 3 of building a command line application with the Joomla Framework."
[3]: https://github.com
[4]: http://semver.org
[5]: /posts/building-a-command-line-application-with-the-joomla-framework-part-4.html
