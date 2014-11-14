---
layout:      post
title:       Removing a Legacy - Part 2
description: Converting a Joomla 1.0 component to run in Joomla 1.5 natively without legacy mode (part 2). Using JRequest, component parameters, setting database limits, sanitise database queries, joomla paths, configuration variables, and the current user.
date:        2009-01-05 21:40:47
category:    joomla
image:
  thumb:     vendor/joomla.png
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

Welcome to Part 2 of my series on converting an existing component to work natively in Joomla version 1.5 without using legacy mode. Last time we looked at Legacy Mode, fixing the constant that prevents direct access to files and solved some database problems. We also had a quick look at what to do down the track with translations. So let's continue and find out what our next error is.

## Component Parameters

Our next error comes when letter man is trying to use the mosComponent class to get the component parameters. You don't actually see this much in 1.0 components because many developer's haven't realised the facility exists. But 1.5 gives you some neat API for accessing it.

LetterMan has these lines in letterman.class.php:

```php
$component = new mosComponent( $database );
$component->load( $letterman_id );
$GLOBALS['lm_params'] = $lm_params = new mosParameters( $component->params );
```

We have a class called JComponentHelper that we can use to quickly get at the params field of the component. This block can be replaced with something like this:

```php
jimport( 'joomla.application.component.helper' );
$lm_params = JComponentHelper::getParams( 'com_letterman' );
$GLOBALS['lm_params'] = $lm_params;
```

Although it's legal PHP syntax, I don't tend to like putting lines of code where you have something = something else = something else again. It tends to look cluttered, but that's just me. Whatever your preference, you can see I've used a method called getParams and passed it the folder name of the component.

Further down in the code LetterMan saves the parameters again so I will run into problems there -- but I'm going to show you an easier way to handle component configuration in another part of this series so we'll ignore that for now.

The getParams method returns us a JParameter object (which incidentally replaces the mosParameter object in 1.0).

## Database Limits

I've scanned down a few lines and noticed something else that we need to change that stems from the Mambo days (why do I mention Mambo, well that's a long story but the short version is that all of the Mambo Developers left Mambo and became Joomla, leaving Mambo to find new management). I've noticed a query that ends with:

```sql
LIMIT 0, 1
```

We don't write queries with the limit statements in them anymore. The database setQuery method takes some extra arguments apart from the sql clause itself. Let's have a look at the function arguments:

```php
function setQuery( $sql, $offset = 0, $limit = 0, $prefix='#__' )
```

So we need to take the LIMIT out of the query and call setQuery with these arguments instead, for example:

```php
$database->setQuery( $sql, 0, 1 );
```

This was done to allow for new database connectors to be designed in the future (like for Oracle, etc). You generally don't want to mess with the last argument. While this isn't technically a 1.0 to 1.5 upgrade issue, it is good practice to set your queries up this way.

## Database Query Sanitisation

While we are on the database I'll show you a few things you must get into the habit of doing. In queries you must quote string and cast numbers to reduce the risk of having script kiddies inject malicious code through request variables. Here's a good example:

```php
$sql = "SELECT subscriber_name
FROM #__letterman_subscribers
WHERE subscriber_email='$email'";
```

To be fair LetterMan has previously used addslashes on the variable $email, but a neater way to do this is via the database Quote method. So I'm going to change this query to look like this in the code:

```php
$sql = 'SELECT subscriber_name' .
	' FROM #__letterman_subscribers' .
	' WHERE subscriber_email=' . $database->Quote( $email );
$database->setQuery( $sql );
```

This way I've still got the raw value of $email to use for other things (like sending emails). The Quote method can also be extended for different database engines, so for that same reason that we handle the limits differently, you should be into this habit as well because not all engines use the same quotes for quoting.

A second example is where we have values we know to be integers - we should always cast them (even if they've come out of the database - just in case). So using this query as an example:

```php
$sql = "SELECT id
FROM #__users, #__letterman_subscribers
WHERE user_id=id AND user_id='".$my->id."'";
I would change this to:
$sql = 'SELECT id' .
	' FROM #__users, #__letterman_subscribers' .
	' WHERE user_id=id AND user_id=' . (int) $my->id;
```

Actually I'd also change this to use a JOIN statement but that is a topic for another time. I'll also go into how to harden queries once we at least have the component working.

## Database loadObject

We are very quickly going to run into trouble caused by a change in the way the database method loadObject is handled. In 1.0 we passed an object as an argument. In 1.5 it returns an object. The change is simple but profound in effect:

```php
// 1.0 way
$database->loadObject( $result );

// 1.5 way
$result = $database->loadObject();
```

## Absolute Path and Live Site

The next problem is not so obvious. In 1.5 we no longer have the global configuration variable called $mosConfig\_absolute\_path. Instead we have a number of contants that take it's place.

```
JPATH_SITE           The path of the site - equivalent to $mosConfig_absolute_path
JPATH_ADMINISTRATOR  The path of the administrator
JPATH_COMPONENT      The path of the component you are working in
```

There are a number of other constants (have a look in any of the /includes/defines.php files) but these are the main ones you might use on a regular basis.

For the most part the exercise here is to search for $mosConfig\_absolute\_path and replace with JPATH\_SITE. However, here is a common example of where you would use JPATH\_COMPONENT:

```php
// require_once( $mosConfig_absolute_path .
//    '/administrator/components/com_letterman/includes/contentRenderer.class.php' );
require_once( JPATH_COMPONENT.DS.'includes'.DS.'contentRenderer.class.php' );
```

While we are on paths, 1.5 also includes a shortcut constant for the PHP DIRECTORY\_SEPARATOR constant, simply called DS. It's a good idea to use DS when building a file system path, for example:

```php
// change
$path = JPATH_SITE . '/mambots/' . $folder . '/' . $element . '.php';

// into
$path = JPATH_SITE.DS.'mambots'.DS.$folder.DS.$element.'.php';
```

Another change is that $mosConfig\_live\_site is also gone. It's been replaced with a call to JURI::base(). The search and replace is a little tricky here but the quickest way to get it going is to delete all your global $mosConfig\_live\_site references and add the following line:

```php
// global $mosConfig_live_site; // delete these lines
// add in the following
$mosConfig_live_site = JURI::base( true );
```

Using JURI::base without any argument will give you the full path with a slash added.

## Other Configuration Variables

If you have been in the practice of using:

```php
$mainframe->getCfg( 'list_limit', 10 );
```

to retrieve other global configuration values, then you will probably not have any more problems in this area. However, if you still use things like:

```php
global $mosConfig_list_limit;
```

then you have a few options available to you. One is to change all these instances to something like:

```php
global $mainframe;
$listLimit = $mainframe->getCfg( 'list_limit', 10 );
```

Alternatively you can use the JFactory class to get a copy of the configuration object like this:

```php
$config = JFactory::getConfig();
$listLimit = $config->get( 'config.list_limit' );
```

## Information About the Current User

I haven't quite hit the error for this one yet, but it is coming so we might as well get to it while we are in a search-and-replace mood. In 1.0 we had a global variable called $my that contained information about the logged in user. That variable is gone in 1.5 but we replace it with a call to a factory method getUser like this:

```php
// the old way
// global $my;

// the new way
$user = &JFactory::getUser();
```

This method returns an object (actually a JObject). You can access it's properties like this:

```php
$id = $user->id;
$access = $user->aid;
$groupId = $user->gid;
$name = $user->name;
```

Or like this:

```php
$id = $user->get( 'id' );
$access = $user->get( 'aid' );
$groupId = $user->get( 'gid' );
$name = $user->get( 'name', 'no name supplied' );
```

This second way is handy if you want to pass a default value.

## mosGetParam and JRequest

One of the functions you should have used the most (probably only rivalled by database methods) was mosGetParam. The function of mosGetParam has been rolled and expanded in a class called JRequest.

JRequest is both a way to access request information but more importantly is your front line of defence against malicious input from would-by attackers of your site. This is the last topic we will look at in this part of the series but we will spend a bit of time examining your arsenal.

The JRequest class is found in the Joomla libraries folder as part of the environment API (/libraries/joomla/environment/request.php). It's worth having a good look at this class as it's 500 or so lines pack a serious punch. The following 'get' methods will be of interest to any developer. Unless you specify otherwise with additional argument, the getter's will clean most variables though Joomla's input filter class. The default action of this class is to strip out any HTML tags and other sneaky stuff that attacker's sometime try. They will also correct the PHP slashes setting so that the variables you get have slashes removed (unless of course a slash was actually passed in the request).

Also, most of the getters (except 'get' itself) take at least three arguments: the name of the request variable, a default value to return if it is not specified, and the request method to look in (for example, get or post, etc).

Anyway, enough of the introductions, let's get into the methods:

### get

JRequest::get allows you to access clean versions of the PHP request variables. For example:

```php
$post = JRequest::get( 'post' );
```

returns in $post a clean version of $\_POST, including any arrays in the request. Without any argument, this method will request a clean version of $\_REQUEST.

### getBool

Ensures that the result is cast to a boolean value, for example:

```php
$showPrint = JRequest::getBool( 'print' );
```

### getCmd

Ensures that the result contains only A-Z, 0-9, \_ (underscore), . (dot) or -- (dash). Case is ignored. For example:

```php
// URL says &task=Abcdef#123.
$task = JRequest::getCmd( 'task' );
// $task = Abcdef123.
```

### getFloat

Ensures that the result is cast to a float value.

### getInt

Ensures that the result is cast to an integer value. This is particularly useful for id's that may be passed in the request, for example:

```php
$userId = JRequest::getInt( 'user_id', 0, 'post' );
```

### getVar

This is the general method used to grab a request variable. It takes a fourth argument which is the type of variable to cast the result to. All the other getSomething methods are actually an alias for this one. Here are some examples of how you might use it:

```php
// get the array variable cid from the request
$cid = JRequest::getVar( 'cid', array(), 'post', 'array' );
// just get a string from the request
$name = Jrequest::getVar( 'name', 'no name supplied' );
// get the value of a cookie
$returning = Jrequest::getVar( 'mycookie', '', 'cookie' );
```

### getWord

Ensures that the result contains only A-Z, or \_ (underscore). Case is ignored. For example:

```php
// URL says &task=A_bcdef#123.
$task = JRequest::getWord( 'task' );
// $task = A_bcdef
```

So with that knowledge under our belt, we can return to our component for what will be a fairly involved conversion in terms of time. Each case of mosGetParam will need to be looked at individually. Here are just a few cases of what I had to do. In each case I've commented out the original code and my new code in underneath:

```php
// $cid = mosGetParam( $_POST, 'cid', array(0) );
// $task = mosGetParam( $_REQUEST, 'task' );
// $no_html = mosGetParam( $_REQUEST, 'no_html' );
$cid  = JRequest::getVar( 'cid', array(0), 'post', 'array' );
$task = JRequest::getWord( 'task' );
$no_html = JRequest::getBool( 'no_html' );
// $mails_per_pageload  = intval( mosGetParam( $_POST, "mails_per_pageload", 100 ));
$mails_per_pageload  = JRequest::getInt( 'mails_per_pageload', 100, 'post' );
```

That concludes part 2 of my series on converting an existing component to work with 1.5\. Look out for the next part in an upcoming issue when we finally get past our errors and the white-screen-of-death.
