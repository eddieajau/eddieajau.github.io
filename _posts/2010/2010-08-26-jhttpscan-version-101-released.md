---
layout:      post
title:       jhttp_scan Version 1.0.1 released
description: Version 1.0.1 of jhttp_scan, a security tool for scanning Joomla sites, has now been released.  Thanks go to Brian Teeman and Alex Kempkens for their fixes and contributions to this version.
date:        2010-08-26 10:30:35
category:    joomla
image:
  thumb:     vendor/joomla.png
---
Version 1.0.1 of jhttp\_scan, a command-line security tool for scanning Joomla sites, has now been released.  Thanks go to Brian Teeman and Alex Kempkens for their fixes and contributions to this version.

For more information and download details see the [information page for jhttp\_scan][0].

Please note this is not an installable extension. It is a PHP file that should be run from the command line or terminal.

New features/fixes in this version of the extension include the following:

* Fixed issue \[\#21903\] jscan: Shorttag is missing : for h attribute (Alex Kempkens).
* Added new variants for acceptable output (Brian Teeman) to reduce the number of false negative results showing.
* Reassigned -h option for host to -u
* Reassigned -q option for help to -h
* Changed the default root and stub to the current working directory, not the location of the script.  You should now only have to specify the -u option if the tool is installed in the local Joomla directory.
* Added notes in the output to show what directory and what URL are being scanned.

[0]: http://www.theartofjoomla.com/index.php?Itemid=38
