---
layout:      post
title:       Building a command line application with the Joomla Framework - Part 2 - Why it works
description: Part 2 of how to build a command line application with the Joomla Framework looking at why the basic application works.
date:        2013-08-26 10:06:34
category:    joomla-framework
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
## Why it works!

In [part 1][0] we looked at how to wire up a simple command line application using the Joomla Framework and Composer. But we didn't really explain why it worked, so that's what will be covered in this tutorial. We'll look at how to bootstrap the application and the main application class itself.

The source code for this tutorial is available on [Github][1].

## The Application

Our application is found in `src/Tagaliser/Application.php`. Let's have a look at the basic structure (with DocBlocks removed for clarity):
    
    <?php
    namespace Tagaliser;
    
    use Joomla\Application\AbstractCliApplication;
    
    class Application extends AbstractCliApplication
    {
        const VERSION = '1.0';
    
        // <snip>
    }

### Namespacing

So you can see we start off by defining a namespace. In PHP 5.3 and above, all classes live in a namespace. If we don't declare a namespace, PHP will assume it live in the global namespace just like all the other core PHP classes. It is important that it is first line of executable PHP in the file.

For your own applications, it's advisable to choose a name unique to your project. I've chosen the name of the project itself which is a common practice.

### The Application class

We want to use the `AbstractCliApplication` from the Joomla Framework to build the main application class. Now, because we are using namespaces we need to tell PHP where to find the class. This is important because we are also using an autoloader (an autoloader removes the need to `require` the class files directly).

We could have used the fully qualified class name (FQCN), that is `\Joomla\Application\AbstractCliApplication`, but we've added a `use` statement that tells PHP that wherever you see the `AbstractCliApplication` class being used, substitute it for `\Joomla\Application\AbstractCliApplication`. It seems rather obvious in this case, but when you start using primitive classes like `Registry` it helps keep the code nice and clean.

The `AbstractCliApplication` automatically handles command line options that the user would have typed when running the script. It also has some useful utility methods for handling standard input (if required) and standard output.

Notice that the naming convention for an abstract class is to prefix the class name with "Abstract". This makes it clear what the expectations are for a class, particularly for people that are not yet familiar with a framework. It also help distinguish between other non-concrete class language constructs like interfaces and traits.

### Application version
    
    class Application extends AbstractCliApplication
    {
        const VERSION = '1.0';
    
        // <snip>
    }

There a any number of ways to version an application, but a strategy I use is to add a class constant. Constants are immutable which means a developer can't change them in the code (accidentally or otherwise).

### The doExecute Method

The `doExecute` method is an abstract method that we have to define in our concrete application class.

    
        public function doExecute()
        {
            // Check if help is needed.
            if ($this->input->get('h') || $this->input->get('help'))
            {
                $this->help();
    
                return;
            }
    
            $this->out('It works!');
        }
    }

This is a fairly simple example just to show that the script will execute without error. The `out` method provides a way for use to send output to standard output (STDOUT). You can use it to print out any sort of message as your script executes.

We are also doing a check and this is for a command line argument to display the help message. We get command line arguments via the `input` property that is available in the abstract application class. This is a `\Joomla\Input\Input` object and it has a `get` method we can use to check a command line argument.

The `$this->input->get('h')` code is looking for a `-h` flag on the command line. This is a boolean condition - it's either there or it's not. This is usually referred to as the _short form_ of a command line argument.

The `$this->input->get('help')` code is looking for a `--help` option. This is the _long form_ of a command line argument and it can actually take a value. For example, if you used the following on command line:
    
    $ php -f tagaliser -- --help=now

then `$this->input->get('help')` would return the value "now".

In our case, if either the flag or option is set, we invoke the help method.

### The help method

The method method is provided as a way to help users (and to remind your future self) determine what the script is supposed to do.

        protected function help()
        {
            $this->out('Tagaliser ' . self::VERSION);
            $this->out();
            $this->out('Usage:     php -f tagaliser.php -- [switches]');
            $this->out('           tagaliser [switches]');
            $this->out();
            $this->out('Switches:  -h | --help    Prints this usage information.');
            $this->out();
            $this->out('Examples:  tagaliser -h');
            $this->out();
        }

It's simply an exercise in sending text to standard output, but you can see we've inserted the version number from the class constant.

## Running the application

Given that we have an application class, we need a way to run it. Let's look at the `bin/tagaliser.php` file.
    
    // Max out error reporting.
    error_reporting(-1);
    ini_set('display_errors', 1);
    
    // Bootstrap the Joomla Framework.
    require realpath(__DIR__ . '/../vendor/autoload.php');
    
    try
    {
        $app = new Tagaliser\Application;
        $app->execute();
    }
    catch (Exception $e)
    {
        // An exception has been caught, just echo the message.
        fwrite(STDOUT, $e->getMessage() . "\n");
        exit($e->getCode());
    }

The first lines set our error reporting to the maximum possible value including "strict mode" checks. While not advisable to include in production code, they are essential during development to debug your code.

Next is the key-stone of the whole application. We need to load the `vendor/autoload.php` file and this is what makes all the class auto-loading from the `src` and `vendor` work.

Next we are going to wrap the execution of the application in a global try-catch block to catch any unhandled exceptions. If there is an exception, we just write the exception message to standard output and exit with the exception code.

To actually "run" the application, we instantiate the `Tagaliser\Application` class and then execute it.

And that's it. What's more is that almost any type of application you build using the Joomla Framework, whether a web site or web services application, will follow a similar, simple formula.

## End of Part 2

So now we know why the basic application works. In the next tutorial, we'll look at adding Github support as a Service Provider using a Dependency Injection container (that was a mouthful wasn't it - but it's a very cool new toy we have in the Joomla Framework).

[0]: /posts/building-a-command-line-application-with-the-joomla-framework-part-1.html "Building a command line application with the Joomla Framework - Part 1 - It works!"
[1]: https://github.com/eddieajau/tagaliser/tree/v1.0 "Click here to see the source code for part 1 of building a command line application with the Joomla Framework."
