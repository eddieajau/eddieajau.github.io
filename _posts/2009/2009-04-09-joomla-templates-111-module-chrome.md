---
layout:      post
title:       Joomla Templates 111 - Module Chrome
description: Joomla 1.0 had a number of fixed styles that could display a list of modules in a particular position.  These where represented by numbers.
date:        2009-04-09 10:47:22
category:    joomla-templates
image:
  thumb:     vendor/joomla.png
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

Joomla 1.0 had a number of fixed styles that could display a list of modules in a particular position.  These where represented by numbers:

* 0 (the default) displayed modules in a vertical table
* 1 displayed them in a horizontal table
* -1 displayed the raw module output
* -2 displayed the modules in a XHTML compatible format with the title in a H3 tag.
* -3 displayed modules in a set of nested DIVs that allowed for rounded-corner techniques

It was a great system except for two things:

1. Nobody could remember which number was which, and
2. You couldn't expand on the styles.

In Joomla version 1.5, the numbers are still recognised, but more commonly the style is represented as a word.  The syntax for displaying a module position was also changed.  For example, this snippet displays each module in the _left_ position in the _xhtml_ style:
    
    <jdoc:include type="modules" name="left" style="xhtml" />

The built-in styles that are now available are:

* table (was 0 and is the default)
* horz (was 1)
* none (was -1)
* xhtml (was -2)
* rounded (was -3)
* outline (new - used to preview module positions by adding `tp=1` to the URL)

In the source code, these styles are actually referred to as _chrome_.  As covered in a previous section, the default chrome can actually be found in the system template provided in the default Joomla install:

`/templates/system/html/modules.php`

This file is maintained by the project so you should never modify it directly otherwise there is a risk that you will loose your changes if and when you upgrade your Joomla installation.

To create your own chrome, or module styles, all you need to do is create or edit `modules.php` under the templates `/html/` directory (this is the same directory we have been talking about for component and module layout overrides).

The rhuk\_milkyway template actually does provide some extra chrome as an example (it provides and new example style called _slider_).  This can be found in the following file:

`/templates/rhuk_milkyway/html/modules.php`

Creating your own chrome is really easy.  Let's look at ficticious example that displays the module in a Definition List (a set of DL's, DT's and DD's).

Just add the following function to the `/html/modules.php` file in your default template directory (create it if it does not exist):
    
    /*
     * Module chrome that wraps the module in a definition list
     */
    function modChrome_dlist($module, &$params, &$attribs)
    { ?>
    	<dl class="<?php echo $params->get('moduleclass_sfx'); ?>">
    	<?php if ($module->showtitle != 0) : ?>
    		<dt>
    			<?php echo $module->title; ?>
    		</dt>
    	<?php endif; ?>
    		<dd>
    			<?php echo $module->content; ?>
    		</dd>
    	</dl>
    	<?php
    }

We will be calling the style _dlist_, so the name of the function needs to be `modChrome_dlist`.

The function must take the three arguments as shown for the module object, the module parameters, and lastly the `$attribs` is an array of all the attributes in the jdoc XML tag.

There are three main properties in the module object to be concerned with:

* `showtitle` tells you whether to show the title of the module of not
* `title` is the title of the module
* `content` is the output of the module (from its layout)

This is a very simple case and you can of course design more complex styles, possibly using custom atrributes in the XML tag.
