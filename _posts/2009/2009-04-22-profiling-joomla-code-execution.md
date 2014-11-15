---
layout:      post
title:       Profiling Joomla code execution
description: The Joomla Framework provides you a simple utility class called `JProfiler` to profile the time that it takes to do certain tasks or reach various milestones as your extension runs.
date:        2009-04-22 05:28:28
category:    joomla-development
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

The Joomla Framework provides you a simple utility class called `JProfiler` to profile the time that it takes to do certain tasks or reach various milestones as your extension runs.

The `JProfiler` class is found in `/libraries/error/profiler.php` and you include the class via the following code:
    
    jimport('joomla.error.profiler');

To use the profiler we create an instance.  There is a global instance of the profiler that can be used anywhere.
    
    jimport('joomla.error.profiler');
    $profiler = JProfiler::getInstance();

Note that if you use this, it could already have been used by plugins or other extensions.  You can create a local instance for testing an individual plugin, component or module by passing a label to the method like this:
    
    jimport('joomla.error.profiler');
    $profiler = JProfiler::getInstance('Notes');

The profiler class will record the time that it was created.  To mark milestones in the execution in your code, you can use the mark method, passing it a label to describe where it happened.
    
    jimport('joomla.error.profiler');
    $profiler = JProfiler::getInstance('Notes');
    
    $profiler->mark('Start');
    // Execute some code
    $profiler->mark('Finish');

You can mark any number of times but it is always a good idea to mark the start and the finish even if you have intermediate steps.

When you have finished, you can output the results using the `getBuffer` method.  This returns an array of the marks you have made.
    
    // Execute previous code
    $profiler->mark('Finish');
    $buffer = $profile->getBuffer();
    echo implode('<br />', $buffer);

The output could look something like the following:
    
    Notes Start: 0.015 seconds, 0.96 MB
    Notes Finished 1.813 seconds, 6.24 MB

You can see each line is qualified by the label you used when you created the profiler object, and then the label you used for the mark.  Following that is the time difference from when the profiler object was created down to the millisecond level.  Lastly is the amount of memory that is being usage by PHP.
