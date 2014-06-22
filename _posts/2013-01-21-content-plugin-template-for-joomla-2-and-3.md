---
layout:      post
title:       Content Plugin Template for Joomla 2.5/3
description: This is an example template that can be used for a content plugin PHP file, containing all the standard Joomla event handlers related to the content group. 
date:        2013-01-21 14:44:31
categories:  [snippets, joomla]
image:
  thumb:     vendor/joomla.png
---
This is an example template that can be used for a content plugin PHP file, containing all the standard Joomla event handlers related to the content group. The file would be saved to the following location, where "pluginName" would be replaced with the name of the content plugin.

```
|- ...
|- plugins
|  `- content
|     `- contentPlugin
|        |- contentPlugin.php
|        `- contentPlugin.xml
|- ...
```

This snippet includes stubs for the following event handlers:

* onContentAfterDelete
* onContentAfterDisplay
* onContentAfterSave
* onContentPrepare
* onContentPrepareForm
* onCategoryChangeState
* onContentBeforeSave
* onContentChangeState

These handlers could also be used in a system plugin if required.

**[Download][0]** this snippet.

{% gist eddieajau/fa52d1779b13f04d6324 %}

[0]: https://gist.github.com/fa52d1779b13f04d6324/download
