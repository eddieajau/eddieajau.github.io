---
layout:      post
title:       Loading Joomla Modules from Layout Overrides
description: Joomla layout overrides can be used to load either a module position or a single module in your content.
date:        2009-01-18 15:03:20
category:    joomla
image:
  thumb:     vendor/joomla.png
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
Layout overrides are a powerful feature in Joomla 1.5 but they can be used for much more than creating semantic, accessible markup, or for moving content fields around the page.  Since we have access to the rest of the Joomla Framework API in our layouts, we have the option of pulling in either individual modules, or a whole module position.  This can be used for any number of purposes such as for advertising banners or displaying modules only in articles where you've given up on trying to get them to show on the correct page all of the time.  In the content component, you can do this on an Article layout, but you could also do it for the Frontpage layout (have modules loaded between articles), or the Section or Category layouts just to make them a bit more interesting.

## Loading a Module Position

The simplest case is to include the modules in a position.  This could be a regular position but you would usually create a special module position just for the layout (or set of layouts) you are overriding.  Here is the code you would place in your layout override.

```php
<?php
	$document	= &JFactory::getDocument();
	$renderer	= $document->loadRenderer('modules');
	$options	= array('style' => 'xhtml');
	$position	= 'article-banners';
```
```php
	echo $renderer->render($position, $options, null);
?>
```

What we are doing here is loading the document, loading the "modules" renderer from from the document, setting the module "style" (raw, xhtml, etc) and then outputing the desired module position.

Loading a position is very convenient because you can use the Joomla administrator to set all your module parameters.

## Loading a Single Module

Loading a single module requires a little more thought because you have to define all of the parameters by hand.  If you don't, you are at the mercy of whatever the developer has set in the module.  The code we use to load a single module is like this:

```php
<?php
	$document	= &JFactory::getDocument();
	$renderer	= $document->loadRenderer('module');
	$options	= array('style' => 'raw');
```
```php
	$module		= JModuleHelper::getModule('mod_comments_comments');
	$module->params	= "heading=2\nlimit=10";
	echo $renderer->render($module, $options);
?>
```

Again we are getting the document but this time we load the "module" render.  We set the style in the same way as for loading a module position.  Now what we do is use the `JModuleHelper` to load the actual module by its name (the directory name of the module or the name).  This returns a module object.  We then set the params property of the module in "ini" format, separating each parameter with the newline character "\\n".
