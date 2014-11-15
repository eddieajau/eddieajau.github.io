---
layout:      post
title:       Logging to files in Joomla
description: Joomla provides a utility class for logging information to files called `JLog`.
date:        2009-02-19 01:27:55
category:    joomla-development
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

Joomla provides a utility class for logging information to files called `JLog`.  This class provides a means to create files in [common log format][0] for any number of purposes such as:

* Recording debug information
* Logging AJAX calls to help find problems
* Logging things that a web site visitor is doing

The JLog class is found in `/libraries/error/log.php` and you include the class via the following code:
    
    jimport('joomla.error.log');

While logging errors is certainly a very common practice (hence it is found in the error sub-package), you are not limited to just logging error information.

## Using JLog Directly

You will generally not create a new JLog instance.  Rather you would use the getInstance method to instantiate an instance of the log for a given file and options for the log.
    
    jimport('joomla.error.log');
    $log = &JLog::getInstance();

By default this will create a log file in your Joomla temp directory (refer to the `$tmp_path` variable in `configuration.php`) called `error.php`.  The file has a `.php` extension as a safety measure to prevent direct access to the file's contents.  To further increase privacy, you should consider changing the Joomla temp directory to a location outside of the web root.

### Changing the Name of the Log File

In actual practice, it's advisable to create your own log file including a namespace as shown:
    
    jimport('joomla.error.log');
    $log = &JLog::getInstance('com_notes.log.php');

By default this gives you a basic log file with the following columns:

* date
* time
* level
* c-ip (the user IP address)
* status
* comment

The date, time and c-ip columns are automatically populated if you don't provide them.  The level, status and comment columns can be used at your discretion.  The level is generally geared toward some sort of warning or error level.  The status would generally indicate some sort of pass or fail status (probably a 0 or 1 value or even a possible something like an [HTTP status code][1]).  You can either either or none.  At the simplest level you would just log the comment and let the class defaults handle the rest, as shown by using the `addEntry` method:
    
    jimport('joomla.error.log');
    $log = &JLog::getInstance('com_notes.log.php');
    
    // Just adding a comment
    $log->addEntry(array('comment' => 'This is the comment');
    
    // Adding the comment and the status code
    $log->addEntry(array('comment' => 'Funny error occurred', 'status' => 500);

You can see that we pass a named array to addEntry where each element of the array maps to a column in the log file.  If you don't provide an expected column, the log will just insert a dash.  If you provide more columns than the class knows about, they will just be ignored.

### Changing the Format of the Log File

You can easily change the format of the log file (the columns that are available) to suit the information you are logging.  We can do this in two ways.  The first is to pass the format in an options array.
    
    jimport('joomla.error.log');
    $options = array(
        'format' => "{DATE}\t{TIME}\t{USER_ID}\t{COMMENT}";
    );
    
    $log = &JLog::getInstance('com_notes.log.php', $options);
    $user = &JFactory::getUser();
    $userId = $user->get('id');
    $log->addEntry(array('user_id' => $userId, 'comment' => 'This is the comment');

So what we have done here is create a named array in the `$options` variable. The array has a "format" element.  The format is just a string of the desired uppercase column names, each wrapped with curly braces and separated by a tab character.  Note this string is enclosed in double quotes so that `\t` is recognised as a tab (not a backslash and the letter t).

We could also use the setOptions method , like this:
    
    jimport('joomla.error.log');
    $options = array(
        'format' => "{DATE}\t{TIME}\t{USER_ID}\t{COMMENT}";
    );
    
    $log = &JLog::getInstance('com_notes.log.php');
    $log->setOptions($options);
    $user = &JFactory::getUser();
    $userId = $user->get('id');
    $log->addEntry(array('user_id' => $userId, 'comment' => 'This is the comment');

Either method is acceptable.  If you are using this in an extension you only have to set the format once per log file.  In a component, you could have the dispatcher initialise, but not actually use, the log file as shown in the examples above.  Then, deep in the execution of the component, you could call on an instance of the log object, like this:
    
    // Anywhere, deep inside the component
    $log = &JLog::getInstance('com_notes.log.php');
    $log->addEntry(array('user_id' => 0, 'comment' => 'I need to draw this to your attention');

This works so long as you keep the log file name constant.  For that matter, you might like to define the log file name as a constant, like this:
    
    // This is the code in the dispatcher file (components/notes.php)
    // Define the file name as a PHP constant
    define('NOTES_ERROR_LOG', 'com_notes.log.php');
    
    // Include the library dependancies
    jimport('joomla.error.log');
    $options = array(
        'format' => "{DATE}\t{TIME}\t{USER_ID}\t{COMMENT}";
    );
    // Create the instance of the log file in case we use it later
    $log = &JLog::getInstance(NOTES_ERROR_LOG, $options);
    // Then, deep in the heart of the component
    $log = &JLog::getInstance(NOTES_ERROR_LOG);
    $user = &JFactory::getUser();
    $userId = $user->get('id');
    $log->addEntry(array('user_id' => $userId, 'comment' => 'This is the comment');

Defining the file name as a constant means you don't have to remember the full name throughout the code, and if you need to change it, you can do it in one location.

You can, of course, create multiple log files for a single extension.  There is no limit to the number you can create and you might use different logs to collect different information.  Alternatively, you could log the same information but create a log file for each day.  To do this, we just have to include the date in the file name, like this:
    
    // Define the file name as a PHP constant
    define('NOTES_ERROR_LOG', 'com_notes.log.'.date('Y_m_d')'.php');

This is a good technique if you are trying to pick up intermittent errors and your report came in on a particular day.  It saves you trawling through a very long log file.  You can also discard logs after a particular date if it suits.

### Changing the File Location of the Log File

The `JLog::getInstance` method takes one more argument.  You can optionally set the path of the log file is you want to store it in a particular location on your server.  If you are using this argument for an extension you are distributing, then you should set it up as a configuration option because it is possible that the path will not exist on all servers (not to mention the path differences between Window and Linux based operating systems, etc).

To specify a hard path, you instantiate the log like this:

    // Create the instance of the log file in case we use it later
    $log = &JLog::getInstance(NOTES_ERROR_LOG, $options, '/tmp/notes');

## Setting up Helpers for JLog

Using `JLog` directly is ok, but it can be a bit of a pain.  To make life a bit easier we can create a helper class that does all of the hard work setting up the log but gives us a very simple API to use within our extension.  A helper class might look something like this:
    
    /**
     * Helper class for logging
     * @package    Notes
     * @subpackage com_notes
     */
    class NotesHelperLog
    {
        /**
         * Simple log
         * @param string $comment  The comment to log
         * @param int $userId      An optional user ID
         */
        function simpleLog($comment, $userId = 0)
        {
            // Include the library dependancies
            jimport('joomla.error.log');
            $options = array(
                'format' => "{DATE}\t{TIME}\t{USER_ID}\t{COMMENT}";
            );
            // Create the instance of the log file in case we use it later
            $log = &JLog::getInstance(NOTES_ERROR_LOG, $options);
            $log->addEntry(array('comment' => $comment, 'user_id' => $userId));
        }
    }

Now, all we need to do is load that file in our dispatcher, and the deep inside our component all we would do is make a static call to the `simpleLog` method, like this:
    
    NotesHelperLog::simpleLog('This is my story, this is my song');

We can optionally add the user ID if it is appropriate.  The main lesson here is that we can create one method to serve multple purposes.

[0]: http://httpd.apache.org/docs/1.3/logs.html#common
[1]: http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
