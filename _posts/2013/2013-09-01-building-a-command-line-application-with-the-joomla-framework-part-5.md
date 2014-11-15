---
layout:      post
title:       Building a command line application with the Joomla Framework - Part 5 - It works again
description: This tutorial shows how we test the Github service provider and connector in our command line application built on the Joomla Framework.
date:        2013-09-01 16:03:49
category:    joomla-framework
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
## Testing the Github Connector

In [part 4][0] we set up a service provider for a Github connector in our command line application using the Joomla Framework's DI package stack. In this tutorial we'll look at how to wire it up and test that it all works.

The source code for this tutorial is available in under `v1.1` tag on [Github][1].

Here's a small test just to make sure everything is working as we expect. I'm modifying the `doExecute` method in the `Application` class to pull the Github connector out of the DI container.
    
    class Application extends AbstractCliApplication
    {
        // ... <snip />
    
        public function doExecute()
        {
            // Check if help is needed.
            if ($this->input->get('h') || $this->input->get('help'))
            {
                $this->help();
    
                return;
            }
    
            /* @var $github \Joomla\Github\Github */
            $github  = $this->container->get('github');
    
            $this->out('Repositories:');
    
            foreach ($github->repositories->getListOrg('joomla') as $repository)
            {
                $this->out('* ' . $repository->name);
            }
        }
    
        // ... <snip />
    }

As I mentioned last list, using the DI container is a lot like using a `Registry`. Most times we will use the `get` method in the container to retrieve our named service provider. Now, remember the service provider used the `share` method so the first time we call it, it will execute the code in the closure and then cache the object. Any subsequent call will just pull the object out of cache.

Okay, I've gotten `$github` from the DI container and am just listing the repositories under the "joomla" organisation using the API from the Github package (you can look that up [here][2]). Running the application again, I get the following output:
    
    $ php -f bin/tagaliser.php
    Repositories:
    * joomla-platform
    * joomla-platform-examples
    * joomla-cms
    * coding-standards
    * joomla-geshi
    * jissues
    * jdoc-examples
    * joomla-framework
    * joomla-framework-application
    * joomla-framework-archive
    * joomla-framework-client
    * joomla-framework-crypt
    * joomla-framework-data
    * joomla-framework-database
    * joomla-framework-date
    * joomla-framework-filesystem
    * joomla-framework-filter
    * joomla-framework-form
    * joomla-framework-github
    * joomla-framework-google
    * joomla-framework-controller
    * joomla-framework-http
    * joomla-framework-image
    * joomla-framework-input
    * joomla-framework-keychain
    * joomla-framework-language
    * joomla-framework-log
    * joomla-framework-model
    * joomla-framework-oauth2
    * joomla-framework-profiler

That's awesome because it means my service provider code is working, and I've used the Github connector properly.

## End of Part 5

We've come a long way with not a lot of code. I've shown you how to make a basic application. It's time to get into the meat and potatoes of reaching our goal of being able to build a changelog from repository tags. Over the coming tutorials we'll be looking at things like configuration files, logging, and overriding or adding custom classes to existing Joomla Framework packages.

[0]: /posts/building-a-command-line-application-with-the-joomla-framework-part-4.html "Building a command line application with the Joomla Framework - Part 4 - The Service Provider Pattern"
[1]: https://github.com/eddieajau/tagaliser/tree/v1.1 "Click here to see the source code for part 5 of building a command line application with the Joomla Framework."
[2]: http://joomla.github.io/joomla-framework/namespaces/Joomla.html
