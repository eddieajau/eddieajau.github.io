---
layout:      post
title:       Removing the Joomla Generator Tag
description: This article shows you how to remove the Joomla generator tag, or set it to another value. This improves the anonymity of your site.
date:        2009-05-15 09:07:37
category:    joomla
image:
  thumb:     vendor/joomla.png
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
A common request from Joomla web masters is the ability to remove the generator meta tag from the source output of the site.  This is usually for security reasons to make it less obvious that the site is running Joomla.  The generator value is really easy to modify and remove with one line of PHP code.

Fire up your favourite editor and load the `index.php` file of the default template on your site.  Most templates should have a block of PHP at the top of the file starting with `<?php` and closing with `?>`.  Find this block and just before the closing PHP brace, insert the following lines of code:

```php
    // Remove the generator meta tag
    $this->setGenerator(null);
    ?>
```

What we have done here is told the template (that's what `$this` is) to set the value of the meta generator tag (that's what `setGenerator` does) to nothing (that's what `null` means).  When you do this, refresh your web page and view the source of the output.  Scan down from the top of the file to find the meta generator tag.

```php
    <meta name="generator" content="" />
```

You can see it's obviously still there but the value is empty, giving you no clues as to what CMS is running the web site.  Nothing is probably the safest value, but you could set it to anything you like if you really wanted to.

There are several other files that could be loaded by Joomla in the template.  You will also need to do this to the `component.php` (that supports the Joomla Print View) and if you have a custom Error or Offline page, you will need to add the line of code to `error.php` and `offline.php` respectively.  You can find out more about these additional template files in the Template section of the [Art of Joomla Developer Reference][0].

This is just another example of how flexible the Joomla templating engine is and why it's a makes Joomla a great choice to power your web site ... anonymously.

[0]: http://www.theartofjoomla.com/reference.html
