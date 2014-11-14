---
layout:      post
title:       Layout Override Tutorial - Daily blogs
description: This is a tutorial about how to create a layout override in Joomla to group articles together that are created on the same day.
date:        2009-01-07 09:42:47
category:    joomla
image:
  thumb:     vendor/joomla.png
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
[![](images/articles/2009/daily_blog_example.png)][0]This Joomla layout override tutorial shows you how to modify the blog style views for articles to show the "day" date above all the articles posted in the same day.  After that, each article on the same day will just display the time they were posted as shown in the screenshot from [www.optionsizzle.com][0].

The steps are easy to follow or you can just download the files via the link at the end of the tutorial.

We are going to do our layout override example on the "category" view in com\_content - that's the component that controls the way all your articles display on your site.  We don't want to modify the original files because we risk loosing our changes each time we upgrade the Joomla source files.  So what we do is copy the original blog layout file to a layout override folder in the default template you are using for your Joomla site, as follows:

Copy: `/components/com_content/views/category/tmpl/blog_item.php`

to: `/templates/rhuk_milkyway/html/com_content/category/blog_item.php`

Open the new blog layout override file, `blog_item.php`, in your favourite editor and change the top of the layout override file to the following:

```php
<?php // no direct access
defined('_JEXEC') or die('Restricted access');

// Set up some variables
$fDate = JHTML::_('date', $this->item->created, '%B %d, %Y');

// Remember which dates we have used
if (!isset($this->usedDates)) :
	$this->usedDates = array();
endif;

// Have we already shown it?
$showDate = !isset($this->usedDates[$fDate]);

// Now set that we've used it
$this->usedDates[$fDate] = true;
?>
```

What we are doing in this block is storing a new, formatted "day" date in the variable `$fDate`.  You can change the way for date looks by changing the third argument.  See the PHP Manual for [strftime][1] for other things you can add to the formatted date (you want to concentrate on the table with all the letters with a %-sign in front of them - it's a bit weird but just go with it).

Next we are setting up an internal view variable called `userDates` to track the dates that we have displayed.  After that we work out if we are to show the date and put that in a variable called `$showDate`.

To start putting this together, find `<table>` tag a few lines down.  If we are displaying the date, we will be adding a new row to the table, as follows:

```php
<table class="contentpaneopen<?php echo $this->item->params->get( 'pageclass_sfx' ); ?>">
<?php if ($showDate) :?>
<tr>
	<td colspan="99">
		<h3><?php echo $fDate; ?></h3>
	</td>
</tr>
<?php endif; ?>
```

That will display the "day" date above the first article in the "day".

Lastly we want to change the article date that is displayed to only show the time.  Go down one hundred or so lines in the override file and find this line:

```php
<?php echo JHTML::_('date', $this->item->created, JText::_('DATE_FORMAT_LC2')); ?>
```

You need to change it to this:

```php
<?php echo JHTML::_('date', $this->item->created, '%H:%M %Z'); ?>
```

That's the basics.  You can adjust any of the code in the layout override outlined above to suit your own requirements or your own template.  Most templates won't be displayed with in a table (generally considered bad form nowadays) so you won't have to worry about putting the "day" date in a table row.  Place it in a `div` or whatever other tag you are happy with.  Likewise, change the `h3` tag to whatever suits.

The Joomla "section" and "frontpage" views can also be altered in a similar fashion with separate layout override files.  For best results you would use a single column display.  It might look at bit weird in two or more columns.  I've zipped all the Joomla layout override files for easy [download][2].  To install them, unzip the files into the `/html/` folder in your default Joomla template.  Remember to backup any files and folders that already exist (just in case).

For more information on Joomla layout overrides, see my [tutorial here][3].

[0]: http://www.optionsizzle.com
[1]: http://au.php.net/strftime
[2]: http://joomlacode.org/gf/download/frsrelease/9289/34940/daily_blog_layouts_for_com_content.zip
[3]: http://docs.joomla.org/Understanding_Output_Overrides
