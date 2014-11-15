---
layout:      post
title:       Handling errors in Joomla plugins
description: The JDispatcher::trigger method will return an array of results from the all of the plugins executed for a particular event.
date:        2009-02-17 12:29:03
category:    joomla-development
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

The `JDispatcher::trigger` method will return an array of results from the all of the plugins executed for a particular event.  In general plugins return a boolean state so it's easy to scan the result array for a value of false.  However, this doesn't provide any useful information that you can return to the user about what might have caused a failure.

Here are two techniques you can use to collect the error messages from plugins that you write.

## Return Exceptions

Rather than a boolean, you could return a JException object.  The advantage is that you are able to collect error messages with lots of information about what could have happened.  The disadvantage is that you have to search the result array for the Jexception objects.
    
    $dispatcher = &JDispatcher::getInstance();
    $results = $dispatcher->trigger('onSaveMyContent');
    $hasError = false;
    foreach ($results as &$result) {
        if (is_a($result, 'JException')) {
            // Do something
            JError::raiseWarning($result->getCode(), $result->getMessage());
            $hasError = true;
        }
    }
    if ($hasError) {
        return false;
    }

As you can see, you have to deal with multiple errors manually.

## Set the JDispatcher Error State

This technique is much more elegant.  It works on the fact that JDispatcher is derived from JObject which has built-in error log.  We can store multiple errors in the error log of the dispatcher itself, and then examine it after the plugins have been triggered.  The error state is easily detected by searching for a false result in the results array.
    
    $dispatcher = &JDispatcher::getInstance();
    $results = $dispatcher->trigger('onSaveMyContent');
    if (in_array(false, $results)) {
        $this->setError($dispatcher->getErrors());
        return false;
    }
