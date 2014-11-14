---
layout:      post
title:       More on upgrading plugins to Joomla 1.6
description: There are a number of other modifications that are required concerning changes to event names that the extension developer needs to be aware of in order for plugins to work successfully in Joomla 1.6.
date:        2011-01-28 06:50:00
category:    joomla
image:
  thumb:     vendor/joomla.png
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
My **[previous video][0]** outlined some of the changes that are required to make a plugin install in Joomla 1.6\.  There are a number of other modifications that are required concerning changes to event names that the extension developer needs to be aware of in order for plugins to work successfully in Joomla 1.6\.

The **[converting old extension][1]** page has been updated with both the changes to event names in Joomla 1.6 and it also lists the new events that are now available.

Something to be aware of with content events is that a new argument has been added to specify a "context".  This context applies to the type of content that the plugin is receiving.  You can no longer assume that just a com\_content article is being passed to an before or after save event.  For example, in Joomla 1.5 we have:

```php
function onBeforeContentSave(&$article, $isNew)
{
	return true;
}
```

The equivalent for Joomla 1.6 is:

```php
public function onContentAfterSave($context, &$data, $isNew)
{
	return true;
}
```

The context is generally in the form of _component\_name.model\_name_, so for an article the context will be "com\_content.article".  For a weblink it will be "com\_weblinks.weblink" and so on for the other extensions.  For examples of where some of these events are called, you can look in the `JModelAdmin` class in the framework libraries.

The change in event name was required because the change in argument list would cause unpredictable errors if the plugins where used (accidentally or otherwise) in Joomla 1.6\.  But, because there is no collision between 1.5 and 1.6 event names, it is possible to make one plugin that will suit both versions with very little code duplication.

A number of new events are available, particularly for installing extensions and then saving their corresponding data (such as for modules and plugins).  Some new and import system events are also available:

* **onBeforeCompileHead** - this is an event that is triggered in `JDocumentRendererHead::fetchHead`.  It triggers just prior to when the document starts to compile the head tags (base, meta tags, scripts, links, etc). This can be used to manipulate head directives, for example, combining all css and js files into one cached file per page load.
* **onBeforeRender** - this is an event that is triggered in `JApplication::render` (including derived classes).  It triggers just prior to when the response is sent to the browser but after the onAfterDispatch event.

With the new user group features there are a number of new events that compliment user group manipulation.  These are:

* **onUserBeforeSaveGroup**
* **onUserAfterSaveGroup**
* **onUserBeforeDeleteGroup**
* **onUserAfterDeleteGroup**



Most of the plugin groups that ship with the core Joomla distribution have a benign "example" plugin that shows the use case and argument list for each event.

[0]: http://www.theartofjoomla.com/home/9-developer/112-upgrading-a-plugin-to-joomla-16.html
[1]: index.php?Itemid=21
