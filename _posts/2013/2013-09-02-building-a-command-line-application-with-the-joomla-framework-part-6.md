---
layout:      post
title:       Building a command line application with the Joomla Framework - Part 6 - Configuration
description: This tutorial provides a strategy for adding a configuration service provider to a Joomla Framework application.
date:        2013-09-02 16:32:05
category:    joomla-framework
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
## Adding a configuration service

In the five previous tutorials, I laid the foundations for a command line application built on the [Joomla Framework][0] and [Composer][1]. In this tutorial I'll look at adding a service provider to load configuration for the application.

The source code for this tutorial is available in under `v1.2` tag on [Github][2].

## The configuration file

Most applications will inevitably need some sort of default configuration, and while it could be overkill for this little application, I want to show you a strategy for loading configuration data. You will need it someday and this example is useful whether you are using a command line application, a web application or a RESTful web services application.

In my case, I'm going to be using a JSON formatted text file that is stored as `/etc/config.json`. Now, I never want to commit my configuration file because that potentially exposes sensitive information, so I'm going to commit a file named `config.dist.json` where "dist" stands for "distribution" (and, for the astute, you'll notice I've added `/etc/config.json` to the [`.gitignore`][3] file). In other words, it will be the example configuration I distribute but don't actually use. The intent will be that a system operations person will make a copy of the file and edit that directly.
    
    |- etc
    | \- config.dist.json

The name of the `/etc/` folder is borrowed from Unix-land and there is much mythology about what it means and standands for. A [backronym][4] I like is "Edit To Configure" because it matches what I want to achieve here.

The contents of the file looks like this:
    
    {
        "api" : {
            "username" : "your github username",
            "password" : "your github password",
            "url" : "https://enterprise-github-tld/api/v3"
        },
        "github" : {
            "user" : "a github user or org name",
            "repo" : "a github repo name"
        }
    }

Now, if you are familiar with the Github package, you'll know that you can configure it with a number of options including "api.username", "api.password" and "api.url". It's not hard to see that these will parse out of the JSON configuration file nicely. I don't have to provide these, but the Github API will only allow me 60 requests per hour anonymously (and I hit that limit testing my application very quickly) so I am going to want the ability to authenticate to boost that limit to thousands of requests per hour.

The second part of the configuration is for a default Github user and repository if I don't provide any clues through other command line options or switches (more on that in a future tutorial).

## The configuration service provider

The service provider pattern is also excellent for configuration data, so I'm going to create another provider in `/src/Tagaliser/Providers/ConfigServiceProvider.php`.

Here is the basic source for that file:
    
    namespace Tagaliser\Providers;
    
    use Joomla\DI\Container;
    use Joomla\DI\ServiceProviderInterface;
    use Joomla\Registry\Registry;
    
    class ConfigServiceProvider implements ServiceProviderInterface
    {
        public function register(Container $container)
        {
            $container->share('config', function(Container $c) {
    
                if (!defined('TAGALISER_CONFIG'))
                {
                    throw new \LogicException('Application configuration patt not defined.', 500);
                }
    
                $json = json_decode(file_get_contents(TAGALISER_CONFIG));
    
                if (null === $json)
                {
                    throw new \UnexpectedValueException('Configuration file could not be parsed.', 500);
                }
    
                $config = new Registry(json_decode(file_get_contents(TAGALISER_CONFIG)));
    
                return $config;
            }, true);
        }
    }

As you can see, it is similar to our Github service provide in structure; the difference is in what the closure returns.

Here I am requiring the application to define a PHP for where I can find the configuration file. That file is loaded and parsed and a few sanity checks are done along the way. The result is loaded into a [`Registry`][5] object.

Once again, this is set up as a shared and protected resource in the DI container.

## Adding the configuration path to the application

As we saw in the service provider code, we need the application to define the location of the configuration file. I've done this in the `/bin/tagaliser.php` like this:
    
    try
    {
        define('TAGALISER_CONFIG', realpath(__DIR__ . '/../etc/config.json'));
    
        $app = new Tagaliser\Application;
        $app->execute();
    }

## End of Part 6

In the next tutorial I'm going to explain how and why I added logging service provider.

[0]: http://github.com/joomla/joomla-framework
[1]: http://getcomposer.org
[2]: https://github.com/eddieajau/tagaliser/tree/v1.2 "Click here to see the source code for part 6 of building a command line application with the Joomla Framework."
[3]: https://github.com/eddieajau/tagaliser/blob/v1.2/.gitignore "Click here to look at the .gitignore file in version 1.2 of the code"
[4]: http://en.wikipedia.org/wiki/Backronym "Click here to see what Wikipedia has to say about Backrnyms."
[5]: http://joomla.github.io/joomla-framework/namespaces/Joomla.Registry.html "Click here to see the API documentation for the Joomla Framework's Registry package"
