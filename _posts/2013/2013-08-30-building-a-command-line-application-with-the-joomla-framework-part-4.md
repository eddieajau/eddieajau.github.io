---
layout:      post
title:       Building a command line application with the Joomla Framework - Part 4 - Service providers
description: This tutorial looks at how to create a service provider pattern for a Github connector from the Joomla Framework's DI package.
date:        2013-08-30 11:21:01
category:    joomla-framework
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
## The Service Provider pattern

In [part 3][0] we added Joomla Framework's DI and Github package to our stack via Composer. In this tutorial we'll look at how to add the Github connector as a service for the application to use when it needs it.

The source code for this tutorial is available in under `v1.1` tag on [Github][1].

## Replacing "JFactory" with a Dependancy Injection Container

If you are familiar with developer for the Joomla CMS, you will know that the `JFactory` class was a staple in any extensions. We'd use it to grab a database driver, a language driver and all sort of other pseudo-global variables. The trouble with using this type of pattern is that it's hard to test.

The popular alternative to using a glorified super-global like `JFactory` is to use a Dependency Injection Container. You can [read more about DI][2] in the documentation that comes with the DI package.

### Adding a Github Service Provider

So how do we make a dependency container thingy. Well, the DI package provides a pattern called the service provider. Here's the code for the Github service provider that I've created in `src/Tagaliser/Providers/GithubServiceProvider.php` (and [here is it on Github][3]).
    
    <?php
    namespace Tagaliser\Providers;
    
    use Joomla\DI\Container;
    use Joomla\DI\ServiceProviderInterface;
    use Joomla\Github\Github;
    
    class GithubServiceProvider implements ServiceProviderInterface
    {
        public function register(Container $container)
        {
            $container->share('github', function(Container $c) {
    
                $github = new Github;
    
                return $github;
            }, true);
        }
    }

I've decided to group all the service providers in the `src/Tagaliser/Providers` (because more will be added later). Consequently, we use the `Tagaliser\Providers` so that the autoloader knows where to find the class.

I'm implementing the [`ServiceProviderInterface`][4] that requires me to provide a `register` method that takes a [`Container`][5] object as its only argument.

The container is very similar to a [`Registry`][6] object by virtue of the fact is has `get` and `set` methods and the fact that it's used to store values, albeit closures. However, in this case I am using the `share` method because I only want the service provider to be run once and cache the value.

I need to given my service provider a name, so I've called it "github". This allows me to access it later using something similar to:
    
    $github = $container->get('github');

The second argument is a closure (an anonymous PHP function) which, like the `register` method itself, takes a `Container` object so that the closure has access to the DI container as well. This means that code for any dependency only ever runs if and when it is needed.

So, in this case, I'm just creating the default `Github` object and returning it (later I'll add configuration support).

The last argument in the `share` method is set to "true" because I want to make "github" read-only (protect it - compare this with the `protect` method that allows you to also "share" the container object).

### Registering the Service Provider

Now that I have a service provider for Github, I need to register it in the application class. To do this, I've added the following snippets of code to the `Application` class:
    
    class Application extends AbstractCliApplication
    {
        private $container;
    
        // <snip>
    
        protected function initialise()
        {
            // New DI stuff!
            $container = new Container;
    
            $container->registerServiceProvider(new Providers\GithubServiceProvider);
    
            $this->container = $container;
        }
    }

First, I've added a private property to the application class, `$container`, so that application can use it when it needs to or to inject it into other classes (like controllers and models).

Next, I've added an `initialise` method to the application class. This method is actually part of the [`AbstractApplication`][7] class and is present for developers to add their own, custom initialisation code. It is called [last in the original class constructor][8].

The code is pretty simple. I instantiate a new `Container` object and then I use the `registerServiceProvider` method to register my Github service provider.

## End of Part 4

That's the basics of service providers. In the next tutorial, I'll wire that up with some code that we can use to test the Github connector.

[0]: /posts/building-a-command-line-application-with-the-joomla-framework-part-3.html "Building a command line application with the Joomla Framework - Part 3 - Needs more salt"
[1]: https://github.com/eddieajau/tagaliser/tree/v1.1 "Click here to see the source code for part 4 of building a command line application with the Joomla Framework."
[2]: https://github.com/joomla/joomla-framework/blob/staging/src/Joomla/DI/docs/why-dependency-injection.md
[3]: https://github.com/eddieajau/tagaliser/blob/v1.1/src/Tagaliser/Providers/GithubServiceProvider.php
[4]: https://github.com/joomla/joomla-framework/blob/staging/src/Joomla/DI/ServiceProviderInterface.php
[5]: https://github.com/joomla/joomla-framework/blob/staging/src/Joomla/DI/Container.php
[6]: https://github.com/joomla/joomla-framework/blob/staging/src/Joomla/Registry/Registry.php
[7]: https://github.com/joomla/joomla-framework/blob/1.0-beta2/src/Joomla/Application/AbstractApplication.php#L164
[8]: https://github.com/joomla/joomla-framework/blob/1.0-beta2/src/Joomla/Application/AbstractApplication.php#L64
