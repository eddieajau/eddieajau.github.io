---
layout:      post
title:       Building a command line application with the Joomla Framework - Part 7 - More service providers
description: This Joomla Framework tutorial looks at how a service provider can use another service provider via the dependency injection container.
date:        2013-09-04 08:39:17
category:    joomla-framework
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
## Using services providers within service providers

In the [Part 6][0], I looked at how to make a simple configuration service provider. In this tutorial I'm going to look at how to use that configuration data in another service provider.

The source code for this tutorial is available in under `v1.2` tag on [Github][1].

## Registering command line input in the DI container

I want to allow the Github connector to be configured either from the command line, or from the configuration file. I could possibly make these adjustments in the application, but a better place is right in the Github service provider.

However, to do this, I need to give the DI container access to command line input. So, in the application's `initialise` method, I'm adding "input" to the container directly.
    
        protected function initialise()
        {
            // New DI stuff!
            $container = new Container;
            $input = $this->input;
    
            $container->share('input', function (Container $c) use ($input) {
                return $input;
            }, true);
    
            $container->registerServiceProvider(new Providers\ConfigServiceProvider);
            $container->registerServiceProvider(new Providers\GithubServiceProvider);
            $container->registerServiceProvider(new Providers\LoggerServiceProvider);
    
            $this->container = $container;
        }

Now, I'm using the `$input` variable as a proxy because in PHP 5.3, `$this` does not evaluate correctly in a closure. In PHP 5.4 I could use somthing like this:
    
            $container->share('input', function (Container $c) {
                return $this->input;
            }, true);

Either way, we can access the command line input anywhere the DI container is available.

## Using configuration in the Github service provider

Having added the command line input to the DI container, I can now access that in the Github service provider as follows:
    
    class GithubServiceProvider implements ServiceProviderInterface
    {
        public function register(Container $container)
        {
            $container->share('github', function(Container $c) {
    
                /* @var $config Registry */
                $config = $c->get('config');
    
                /* @var $input Joomla\Input\Input */
                $input = $c->get('input');
    
                $options = new Registry;
                $options->set('headers.Accept', 'application/vnd.github.html+json');
                $options->set('api.username', $input->get('username', $config->get('api.username')));
                $options->set('api.password', $input->get('password', $config->get('api.password')));
                $options->set('api.url', $config->get('api.url'));
    
                $github = new Github($options);
    
                return $github;
            }, true);
        }
    }

Here you can see the beauty of the DI container - everything in the container is lazy loaded and the code for, for example, configuration code is only invoked when it is first needed. One thing to watch, however, is that you don't set up circular references where you have two service providers calling each other.

Let's have a look at one of the options I'm giving to the Github object.
    
    $options->set('api.username', $input->get('username', $config->get('api.username')));

What I am doing here is setting the option to log into Github when making an API request. I'm checking if there is a command line option called "username". If it is available, I'll use that, but if not I'm going to default to checking in the configuration. The order is important because I want the command line to override any default configuration, like this:
    
    $ php -f bin/tagaliser -- --username=octocat

The password is treated the same way and if one is using an enterprise Github instance, it can be set that in the configuration file (though, it would be perfectly ok to allow this to be changed from the command line if that suited your use case).

## End of Part 7

In the next tutorial I'm going to explain how I added a logging service provider to the command line application.

[0]: /posts/building-a-command-line-application-with-the-joomla-framework-part-6.html "Adding a configuration service provider"
[1]: https://github.com/eddieajau/tagaliser/tree/v1.2 "Click here to see the source code for part 6 of building a command line application with the Joomla Framework."
