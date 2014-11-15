---
layout:      post
title:       Why Joomla query variables disappear when routed
description: Empty query variables will not be included in a routed link.
date:        2009-04-01 04:33:45
category:    joomla-development
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

Empty query variables will not be included in a routed link.  Take the following example:
    
    <a href="<?php echo JRoute::_("&foo=bar&limitstart=");?>">
        <?php echo JText::_('Start');?></a>

This link will actually exclude the empty `limitstart` variable from the link.  The resulting link will look similar to:

`index.php?foo=bar`

whereas you might have expected it to look like:

`index.php?foo=bar&limitstart=`

Another reason the variable may disappear unexpectedly is if the variable is manually `unset` (removed) in the component router.
