---
layout:      post
title:       Layout Override Tutorial to Add Edit Links to Joomla Weblinks
description: Unbeknownst to many, Joomla actually has includes a feature to add and edit weblinks from the frontend. Fortunately, using Joomla's layout override system, those links are not hard to add.
date:        2010-07-29 14:27:10
category:    joomla
image:
  thumb:     vendor/joomla.png
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
Unbeknownst to many, Joomla actually has includes a feature to add and edit weblinks from the frontend.  However, it is seldom used because the core layouts do not include "add" or "edit" links in the layouts.  Fortunately, using Joomla's layout override system, those links are not hard to add.  This tutorial shows you how to add and edit link to the weblinks listed in a category view and also add a link to submit a weblink.

Adding the edit and submit links for a weblink on the frontend is quite easy and we only have to customise one file.  We do this by creating a layout override of the items list in the category view.  Here are the steps.

Find the following file where you installed Joomla:

`/components/com_weblinks/views/category/default_items.php`

Now copy this file to the following location, creating the folders that don't exist as necessary (and replacing `default_template` with the name of the template folder that is used for your site):

`/templates/default_template/html/com_weblinks/category/default_items.php`

Now, we just need to add three sections of code.  Firstly, at the top of the file, add the following snippet after the first line (which is included in the snippet for reference):

```php
<?php defined('_JEXEC') or die('Restricted access'); ?>
<?php
// Code to support edit links for weblinks

// Get the user object.
$user = JFactory::getUser();

// Check if user is allowed to add/edit based on articles permissinos.
$canAdd		= $user->authorize('com_content', 'add', 'content', 'all');
$canEdit	= $user->authorize('com_content', 'edit', 'content', 'all');
?>
```

The snippet shown above simply determines whether or not the current user is allowed to edit add or edit weblinks based on the same rules that are used for editing frontend articles.

Next, scan down the file till you find `echo $item->link` and add the following code after it:

```php
<?php echo $item->link; ?>
<?php // Code to add the edit link for the weblink. ?>
<?php if ($canEdit) : ?>
<a href="<?php echo JRoute::_('index.php?option=com_weblinks&controller=weblink&task=edit&id='.(int) $item->id);?>">
	[<?php echo JText::_('EDIT'); ?>]</a>
<?php endif; ?>
```

This snippet will add an edit link after the title of the weblink providing the user has permission.

Lastly, add the following snippet to the end of the file:

```php
<?php // Code to add a link to submit a weblink. ?>
<?php if ($canAdd) : ?>
<a href="<?php echo JRoute::_('index.php?option=com_weblinks&controller=weblink&task=edit&id=0');?>">
	[<?php echo JText::_('SUBMIT A WEB LINK'); ?>]</a>
<?php endif; ?>
```

This snippet adds a "Submit a Web Link" link to the bottom of the category view layout.

That's it except for a couple of gotcha's.

### Caveats

There is a bug that may show errors when you try to edit the web link.  If you get these, find the following file:

`/components/com_content/views/article/view.html.php`

On lines 99 and 101 change `$item` to `$menu` so that those lines look like this:

```php
if($menu->query['view'] != 'weblink')
{
	switch ($menu->query['view'])
```

The other caveat is that the Weblinks component will not let Registered users edit or submit weblinks.  The user will need to be in the Author, Editor or Publisher group or be in an backend user group.
