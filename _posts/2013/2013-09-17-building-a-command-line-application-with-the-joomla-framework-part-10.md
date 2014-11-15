---
layout:      post
title:       Building a command line application with the Joomla Framework - Part 10 - Adding a model
description: This tutorial looks at how to add a model to an example command line application built on the Joomla Framework.
date:        2013-09-17 17:22:21
category:    joomla-framework
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
## A model for the application

In [Part 9][0], I looked at extending the Joomla Framework's Github package. In this tutorial I'm going to look at a model for the command line application that will do the most of the data gathering "work" the application is supposed to do.

The source code for this tutorial is available in under `v1.2` tag on [Github][1].

## The model file.

The task of this application is simple - make a few calls to the Github.com developer API and return some data. Through an utter lack of imagination, I've created [`/src/Tagaliser/Model.php`][2] to hold the model class. If you have more than one model, you might consider grouping them into a sub-folder.

The following code shows the outline of the class:
    
    namespace Tagaliser;
    
    use Joomla\Github\Github;
    use Joomla\Registry\Registry;
    use Psr\Log\LoggerAwareInterface;
    use Psr\Log\LoggerInterface;
    use Joomla\Model\AbstractModel;
    
    class Model extends AbstractModel implements LoggerAwareInterface
    {
        private $github;
    
        private $logger;
    
        private $tags;
    
        public function __construct(Github $github, Registry $state)
        {
            // ...
        }
    
        /**
         * Get the changelog.
         *
         * The format of the return value is as follows:
         *
         * array(
         *   'tag name' => array(
         *     'tag' => (object) array(
         *       'tag' => 'Tag name',
         *       'date' => 'Date tag created'
         *     ),
         *     'pulls' => array(
         *       'Tag name' => (object) array(
         *         'url' => 'Link to pull request.',
         *         'number' => 'Pull request number.',
         *         'title' => 'Pull request title.',
         *         'merged_at' => 'Date pull request was merged.',
         *         'user_login' => 'The user that created the pull request.',
         *         'user_url' => 'A link to the user profile page that merged the pull request.',
         *       )
         *     )
         *   )
         * )
         *
         * @return  array  An associative array keyed on the tag name.
         *                 Each element is an array with the keys 'tag' and 'pulls'.
         *
         * @since   1.2
         */
        public function getChangelog()
        {
            // ...
        }
    
        public function setLogger(LoggerInterface $logger)
        {
            // ...
        }
    
        private function getPulls($page)
        {
            // ...
        }
    
        private function getTag($date)
        {
            // ...
        }
    
        private function getTags($page)
        {
            // ...
        }
    }

I don't want to go into depth about the inner workings of connecting to Github and so on, but let me make some observations about how the class is designed.

### Extends and implements

The Joomla Framework has a basic model class called [`\Joomla\Model\AbstractModel`][3] that implements the state handling that I am going to use (as required by [`\Joomla\Model\ModelInterface`][4]).

I'm also implementing [`\Psr\Log\LoggerAwareInterface`][5] which requires me to define a `setLogger` method. The logger is going to be used to record the progress of the application as it runs.

### Private properties

There are a number of properties that the model is going to use and I've made them all private. The reason I have done this is because I have no intention of ever extending this class, and if a developer ever wanted to do it, I don't want them messing with those properties without me knowing about it. Changing a property from `private` to `protected` is backward compatible and easy to do if someone asks (or complains). The reverse is not so easy, particularly if you find developers hacking the properties in ways that you never intended.

### Overridden constructor

I've overridden the constructor into order to inject a Github object. This is another form of dependency injection and it's an important technique to master. When I come to write unit tests for this model, it will be really easy for me to "mock" the Github connector which allows me to isolate the code that I'm testing.
    
        public function __construct(Github $github, Registry $state)

As a matter of practice, I always include the new constructor arguments before those of the parent class. In doing so, I can maintain any default behaviour the parent class may have.

In addition, when I know a class is going to require a particular type of object, I declare the objects explicitly. The alternative would have been to inject the dependency injection container but my current reading on the subject seems to frown upon that at the model level.

### Well documented public API

I've excluded code comments in the snippet except for the `getChangelog` method. This is just to show you how important it is to document public API's. Remember, your future self may as well be another developer because after a month, you'll have forgotten what this class was supposed to do even though you wrote it. Additionally, you might leave your place of work and so your replacement who has never seen your code needs to have some clue about what you intended it to do.

This method returns a complex object so I've gone to a lot of trouble to document it accurately. This avoids me having to dig through the code, or do `var_dump`'s to work out what is going on. Any contextual help system in an IDE will also be able to pick this up making it easier to you and others to implement the code.

### Private methods

I've chosen to make any non-pubic methods `private` for the same reasons as for the properties. If the time comes when this code gets added to a core library and other developers want to use it, I can address making the methods `protected` at that time. For now, it's just more convenient to make them `private` and not worry about it.

### Using the logger

Let's have a look at part of the `getPulls` method:
    
        private function getPulls($page)
        {
            $this->logger->info(sprintf('Getting pulls page #%02d.', $page));
            $this->logger->info(str_pad('', 40, '-'));
    
            // ...
    
            $this->logger->info(sprintf('Got %s merged pulls.', count($pulls)));
        }

Here you can see I'm using the `logger` object to trace some parts of the execution flow. It's a nice way to approach the problem of getting some output without the model really knowing it is sending messages to STDOUT (it would be terribly back form to `echo` messages in the model, even if this _is_ a command line application). It's also neater than adding an internal API to collect the messages in a private array in the model. Just send the message to the logger and let it worry about what to do with it.

Once again, when considering unit tests, it will be easy to inject a "mock logger" so I can focus on just testing the code in the method. The mock could do nothing, or it could contain enough structure to know that it has been called a predetermined number of times.

### Using model state

If you take another look at the `getPulls` method, you can see it's also working with the model state.
    
        private function getPulls($page)
        {
            // ...
    
            $user = $this->state->get('user');
            $repo = $this->state->get('repo');
    
            // ...
        }

The model state is sort of like dependency injection for variables. I could have passed the user and repository name in the method arguments but because they are constant, I decided to make them an internally global setting for the model.


If you wanted to override these values using the method call, you could do something like this if the method arguments take precedence:
    
        private function getPulls($page, $user = null, $repo = null)
        {
            // ...
    
            $user = $user ? $user : $this->state->get('user');
            $repo = $repo ? $repo : $this->state->get('repo');
    
            // ...
        }

## End of Part 10

The rest of the model is just working out how to pull back pages of data from github.com and you can peruse that solution at your leisure. In the next tutorial I'm going to show how I wired all the work up to produce the final result - a changelog based on pull requests and tags in a repository.

[0]: /posts/building-a-command-line-application-with-the-joomla-framework-part-9.html "Extending the Joomla Framework's Github package."
[1]: https://github.com/eddieajau/tagaliser/tree/v1.2 "Click here to see the source code for part 10 of building a command line application with the Joomla Framework."
[2]: https://github.com/eddieajau/tagaliser/blob/v1.2/src/Tagaliser/Model.php
[3]: https://github.com/joomla/joomla-framework/blob/staging/src/Joomla/Model/AbstractModel.php
[4]: https://github.com/joomla/joomla-framework/blob/staging/src/Joomla/Model/ModelInterface.php
[5]: https://github.com/php-fig/log/blob/master/Psr/Log/LoggerAwareInterface.php
