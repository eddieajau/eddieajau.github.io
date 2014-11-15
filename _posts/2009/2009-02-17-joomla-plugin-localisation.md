---
layout:      post
title:       Joomla plugin localisation
description: Joomla plugins don't automatically include localisation support.
date:        2009-02-17 12:32:29
category:    joomla-development
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

The language file to localise the administrator management must be located with the administrator language files.

The language file to localise the any site content must be located with the site language files.

Plugins do not load the language files by default.
    
    $lang = &JFactory::getLanguage();
    $lang->load('plg_content_pagebreak');
