---
layout:      post
title:       ArtofUser 1.1.0 Released
description: ArtofUser Version 1.1, an advanced backend user manager for Joomla 1.5, is available for immediate and free download.  This version includes new features for adding user notes and blocking enhancements, invaluable for any Joomla site managing complex user dynamics like forums, social networks and intranets.
date:        2011-01-20 08:31:28
category:    joomla
image:
  thumb:     vendor/joomla.png
---
**ArtofUser** Version 1.1, an advanced backend user manager for Joomla 1.5, is available for immediate and free download.  This version includes new features for adding user notes and blocking enhancements, invaluable for any Joomla site managing complex user dynamics like forums, social networks and intranets.

For more information and download details see the [extension page for ArtofUser][0].

[![Screenshot](/images/software/artofuser/users_list2.jpg)][1]

New features/fixes in this version of the extension include the following:

* If user has never logged in, list displays "Never" instead of 0 unix time.
* Add support for showing blocked reason when someone tries to log in.
* Fixed low level XSS exploit in list user list view.
* Added core management permission to control access to how can use the extension.
* Fixed low level path disclosure security issue with list sorting variables.
* Added user notes feature.
* Added UI to add notes and blocked category when blocking a user.
* Fixed tracker issue \[\#23192\] New user email subject and body not translating.
* Fixed tracker issue \[\#23230\] Notice: Undefined property: stdClass::$level (Tim Plummer).
* Fixed tracker issue \[\#23225\] JSuccess\_N\_items\_deleted not translated.
* Added new configuration variables to allow new user emails to be sent without the password.
* Fixed save validation bugs in user and group models.
* Fixed bug in user parameters where could not select no value (ie, the system default).

[0]: index.php?Itemid=39
[1]: /images/software/artofuser/users_list2.jpg
