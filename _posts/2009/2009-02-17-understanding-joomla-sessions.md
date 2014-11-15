---
layout:      post
title:       Understanding Joomla sessions
description: The session lifetime is controlled by the lifetime configuration variable that is set in configuration.php.
date:        2009-02-17 12:25:49
category:    joomla-development
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

The session lifetime is controlled by the lifetime configuration variable that is set in configuration.php.  The value is the number of minutes you want sessions to remain alive when a visitor is using the website.

`var $lifetime = 15;`

The default is 15 minutes.

The session is purged with a call to JTableSession::purge($seconds) and this takes an argument of a number of seconds.  This will delete all rows from the jos\_session table where the time field is older than the current time less the value of the second passed to the method.  This happens when the JApplication creates the session object.  Jfactory::\_createSession is actually responsible for setting the session lifetime based on the the configuration setting.

There is no way to programmatically alter the session lifetime as the session is created prior to calling the first system plugins via the onAfterInitialise event.

The remember login feature is controlled by the Remember System plugin.  This plugin, if enabled, will be triggered by the onAfterInitialise event.  The plugin looks for a cookie named JLOGIN\_REMEMBER (hashed) and this stored encrypted username and password information.  If found, the plugin will invoked `JApplication::login` and pass the stored details.  If the login fails, the cookie will be erased.

Note that when the Remember plugin successfully restores the login, the previous session that the user was working in has been deleted (it was cleared before onAfterInitialise was called).  Any user state previously set in the session will be lost.  If your extension relies on preserving session state you need to keep in mind how this will be affected by the Remember plugin.

### Notes

There are security implications to having long session times, particularly for Administrator users.  Leaving a site open with a long session time does expose the user to CSRF attacks if they browsing in other browser tabs.  However, on a local development server, long session times can be useful when building sites and/or extensions.
