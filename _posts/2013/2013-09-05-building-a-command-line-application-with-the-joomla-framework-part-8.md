---
layout:      post
title:       Building a command line application with the Joomla Framework - Part 8 - Logging
description: This Joomla Framework tutorial looks at how to add a logging service provider to a command line application using Monolog.
date:        2013-09-05 09:02:42
category:    joomla-framework
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
## Adding a logging service provider using Monolog

In the [Part 7][0], I looked at how the Github service provider could access configuration and command line input parameters using the DI container. In this tutorial I'm going to look at how I added a logging service provider.

The source code for this tutorial is available in under `v1.2` tag on [Github][1].

## Adding Monolog to composer.json

Okay, let me explain what I'm trying to do here. My application has an `out` method that allows me to send a message to standard output. That's all well and good, but what do I do for other areas of the code. I don't want to be passing the application around just to echo some text. So I thought to myself, why not use a logger and just "log" to standard output. Yeah, that could work.

Apart from that, logging is usually an important part of any application for numerous purposes covering anything from debugging to system performance evaluation. The Joomla Framework does include a [`Log`][2] package that was ported from the Joomla Platform, but, to be perfectly honest, there is a better option.

[Monolog][3] is a very popular and feature rich logging framework and it's one of those cases where it's so good and well supported, I don't think the Joomla Framework needs to bother supporting its own logging package anymore.

Monolog is available on [Packagist][4] so we can install it with Composer. It follows the [PSR-3][5] logging standard (so it is interchangeable with any other PSR-3 logging package if you stick to the PSR-3 interfaces).

To get the code, I've simply added the Monolog package to my `composer.json` file and run update.
    
        "monolog/monolog" : "1.6.*"

## Adding the logging service provider

With the Monolog code download, it's a simple exercise to run up another service provider.
    
    namespace Tagaliser\Providers;
    
    use Joomla\DI\Container;
    use Joomla\DI\ServiceProviderInterface;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;
    
    class LoggerServiceProvider implements ServiceProviderInterface
    {
        public function register(Container $container)
        {
            $container->share('logger', function(Container $c) {
    
                $logger = new Logger('Tagaliser');
    
                $logger->pushHandler(new StreamHandler('php://stdout'));
    
                return $logger;
            }, true);
        }
    }

As you can see I've chosen a very basic handler - send all logging to standard output. You could really go to town with respect to logging, sending different types of log levels (warnings, errors, etc) to different places (files or databases). You could also add configuration variables to the application that let you configure the logging service to a more granular level.

# Registering the logging service provider

Finally, I need to register the logging service provider in the applications `initialise` method as follows:
    
    $container->registerServiceProvider(new Providers\LoggerServiceProvider);

## End of Part 8

In the next tutorial I'm going to look at how I can extend the Github package API, but in a way that could be easily contributed back to the Joomla Framework.

[0]: /posts/building-a-command-line-application-with-the-joomla-framework-part-7.html "Calling a service provider from within a service provider using the DI container."
[1]: https://github.com/eddieajau/tagaliser/tree/v1.2 "Click here to see the source code for part 8 of building a command line application with the Joomla Framework."
[2]: https://github.com/joomla/joomla-framework-log
[3]: https://github.com/Seldaek/monolog
[4]: https://packagist.org/packages/monolog/monolog
[5]: https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-3-logger-interface.md
