---
layout:      post
title:       Making Modal Popup Links in Joomla
description: Popup images are a very popular part of web-sites today. You see them used particularly in galleries but more and more within articles in general. Joomla gives you the ability to add popup images very easily.
date:        2013-01-28 07:46:11
category:    joomla
image:
  thumb:     vendor/joomla.png
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

Popup images are a very popular part of web-sites today. You see them used particularly in galleries but more and more within articles in general. Joomla gives you the ability to add popup images very easily.


The first thing to do is place the following line of code in your template `index.php` file:

```php
<?php JHTML::_( 'behavior.modal' ); ?>
```

This should be placed near the top before the html parts of your template start (just after the `defined('_JEXEC') or die;` line will be fine). That's all you need from the programming point of view.

Then just put a link in your content like this:

```html
<a class="modal" href="images/stories/big_picture.jpg">
	<img src="images/stories/thumb_picture.jpg" border="0" alt="A picture" /></a>
```

The important bit is the `class="modal"`.

That's pretty easy! You only have to remember three things.

1. Put your thumb size image in a link.
2. Point the link href to your full sized image.
3. Include a class of modal in the link tag.

Rather than using a thumbnail, you can use the full size image but scale it down in the image tag. The advantage is that your popup will display very quickly. The disadvantage is that the page will take longer to finish loading.

### How it Works

The modal behaviour is a JavaScript routine that searches through all the output of the page and searches for any link that has the modal class. It then attaches a behaviour to the link that creates the popup window to the image referred to in the link. This technique is called applying "unobtrusive javascript". The huge advantage of this is it degrades well if JavaScript is not present. By this we mean, if you browser does not support JavaScript (unusual these days, but still possible) you still have valid HTML markup that a user can use. The user will still see the thumbnail picture and this will link to the larger image. Whether it's too big for their screen is another matter -- but at least they can still see the information.
