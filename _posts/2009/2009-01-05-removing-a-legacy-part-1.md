---
layout:      post
title:       Removing a Legacy - Part 1
description: Converting a Joomla 1.0 component to run in Joomla 1.5 natively without legacy mode (part 1). How to enable/disable legacy mode, security features and database handling.
date:        2009-01-05 21:38:00
category:    joomla
image:
  thumb:     vendor/joomla.png
---
Joomla 1.5 provides a "**Legacy Mode**" to allow most developers a way to get up-and-running easily. However, you really want to get off the dependence on Legacy Mode as soon as you can. The new Joomla framework in version 1.5 provides a far richer environment in which to build extensions.

This is part 1 of a series on converted your existing extensions to work completely off the new Joomla 1.5 framework.

This articles wouldn't be complete, though, without having a look at how to turn legacy mode on and off.

## Legacy Mode

The Legacy Mode is implemented in Joomla 1.5 by way of a Plugin (remember, Plugins are the new Mambots) in the System group.

In the Administrator select _Extensions -\> Plugin Manager_ from the menu. The fastest way to find it is simply to type "legacy" in the Filter box and click Go.

![Legacy mode in the Plugin Manager](/images/2007/plg_legacy.png)

By default the Legacy Mode Plugin will not be enabled. Click the red-and-white X to enabled it. You will see in the Toolbar a message stating that Joomla is now in Legacy Mode.

We actually have to turn Legacy Mode on to be able to install a Joomla 1.0 Extension. The installer now does a version check and if your Extension doesn't have a marker saying it's compatible with version 1.5, it will complain and tell you to turn Legacy Mode on.

I'm going to partially convert a real-life Component called Letterman (see the [Joomla Extension Directory Page][0] for more information). The steps I've taken so far are:

1. Enable the Legacy Mode Plugin so that I can install a 1.0 Component.
2. Download Letterman from the author's site, and then use the Joomla installer to install it.
3. Disable Legacy Mode
4. Go to the Letterman component.

I'm presented with a fairly uneventful white screen of death telling me "Direct Access to this location is not allowed.". The hunt begins.

## Change \_VALID\_MOS to \_JEXEC

So the first thing we find is that a few constants have changed name. This one happens to be a real show stopper because it's the one that is Joomla's main security defense against people trying to open PHP files directly.

It's easy to fix. Just use your editor to globally search and replace **\_VALID\_MOS** with **\_JEXEC** and all will be well (make sure though, you only do it in the Component you installed - don't accidentally replace the one in the Legacy Plugin). And don't forget (I did), sometimes the Administrator Component might reference some front-end Component files (like a .class.php file) so you'll have to sweep both front-end and back-end Component file trees.

## Change mosDBTable to JTable

What happened next: "**Fatal error**: Class 'mosDBTable' not found". This is another simple search and replace. The new class to use is called **JTable** but we also need to change the name of the class contructor to **\_\_construct**. For example:

```php
class mosLettermanSubscribers extends JTable {
	// lots of variables defined
	function __construct( &$database ) {
		$this->mosDBTable( '#__letterman_subscribers', 'subscriber_id', $database );
	}
}
```

We are still getting an error from the the $this-\>mosDBTable lines. That call needs to be change to reference the class's parent \_\_construct method like so:

```php
class mosLettermanSubscribers extends JTable {
	// lots of variables defined
	function __construct( &$database ) {
		parent::__construct( '#__letterman_subscribers', 'subscriber_id', $database );
	}
}
```

## Getting the Database Handler from the Factory

Phew. Still no joy.

> **Fatal error**:  Call to a member function setQuery() on a non-object

This one seems a bit strange at first glance. You might think "what's wrong with $database"? Fair question. The answer is it doesn't exist any more as a global variable. This error is caused way back up the chain where we make the new table object (the fancy way we say that is "when we instantiate the class").

To fix this one we have to hunt down each occurrence of:

```php
global $database;
```

And replace that with:

```php
$database = &JFactory::getDBO();
```

JFactory is a wondeful class in the new API. It give you access to a few handy variable without resorting to using globals. In this case it's useful for getting the default database connector.

That one takes a while. I found the easiest way to find them was to search for "global" using your IDE's find-in-files feature if it has one.

[0]: http://extensions.joomla.org/component/option,com_mtree/task,viewlink/link_id,174/Itemid,35/
