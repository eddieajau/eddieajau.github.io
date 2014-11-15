---
layout:      post
title:       Joomla Templates 112 - Pagination Link Overrides
description: The final override we will look at is the pagination override.  This override can control the display of items-per-page and the pagination links that are used with lists of information, as shown in the following screenshot.
date:        2009-04-09 10:47:22
category:    joomla-templates
image:
  thumb:     vendor/joomla.png
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
The final override we will look at is the pagination override.  This override can control the display of items-per-page and the pagination links that are used with lists of information, as shown in the following screenshot.

![Screenshot](images/reference/pagination_links.png)

The rhuk\_milkyway template provides a well commented example for this override.  The file is found here:

`/templates/rhuk_milkyway/html/pagination.php`

When the pagination list is required, Joomla will look for this file in the default templates.  If it is found it will be loaded and the display functions it contains will be used.

There are four functions that can be used:

`pagination_list_footer`

This function is responsible for showing the select list for the number of items to display per page.

`pagination_list_render`

This function is responsible for showing the list of page number links as well at the Start, End, Previous and Next links.

`pagination_item_active`

This function displays the links to other page numbers other than the _current_ page.

`pagination_item_active`

This function displays the current page number, usually not hyperlinked.
