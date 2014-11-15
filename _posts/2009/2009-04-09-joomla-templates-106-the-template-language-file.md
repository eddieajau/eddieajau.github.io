---
layout:      post
title:       Joomla Templates 106 - The Template Language File
description: A template could include language files to translate parameter labels and meta descriptions, or it could use static labels in the master index file.  Each of these cases requires a language file to be in a specific location with a specific naming convention.
date:        2009-04-09 10:47:22
category:    joomla-templates
image:
  thumb:     vendor/joomla.png
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
A template could include language files to translate parameter labels and meta descriptions, or it could use static labels in the master index file.  Each of these cases requires a language file to be in a specific location with a specific naming convention.


A language file used by the site template for translation of text in the template itself would be found at:


`/language/en-GB/en-GB.tpl_theartofjoomla.ini`


The convention of the file name and path is `/language/_(language_code)_/_(language_code)_.tpl__(template_name)_.ini`.  It is rare for a site template to require a language file.


A language file used by the either the administrator template for translation of text, or for translation of parameters and meta descriptions would be found at:


`/administrator/language/en-GB/en-GB.tpl_theartofjoomla.ini`


This file would usually be included is most site template packages to support translation of text in the Template Manager.


The files themselves are in INI format.  This is a simple format of `some_key=some_value`.  The key must be in upper case and contain only letter, numbers and underscores.  While Joomla 1.5 supports other characters, such as spaces and punctuation, future versions will comply strictly with the file specification and not allow them.


A typical language file might look similar to the follow the following:

    
    # Copyright (C) 2005 - 2013 New Life in IT Pty Ltd. All rights reserved.
    # License http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL, see LICENSE.php
    # Note : All ini files need to be saved as UTF-8 - No BOM
    COLOR_VARIATION_DESC="The colour variation for the site."
    COLOR_VARIATION_LABEL="Colour Variation"
    FLUID_WIDTH_DESC="An optional percent to support a fluid width template."
    FLUID_WIDTH_LABEL="Fluid Width"
    OPTION_BLACK="Black"
    OPTION_BLUE="Blue"
    OPTION_GREEN="Green"
    OPTION_ORANGE="Orange"
    OPTION_RED="Red"
    OPTION_WHITE="White"
    SHOW_SITE_NAME_DESC="Show the site name in the template."
    SHOW_SITE_NAME_LABEL="Show Site Name"
    THEARTOFJOOMLA="The Art of Joomla"
    THEARTOFJOOMLA_DESC="This is the template for the <a href="http://www.theartofjoomla.com">www.theartofjoomla.com</a>"
    




 


This example shows a number of labels and descriptions for the template parameters.  It is good practice to namespace language keys that are used in different places, even though they may be the same phrase.  For example, even though the same word may be used in the same way in English, other languages could use different words depending on the context.  It is also important to keep in mind the risk of "collisions".  This happens when you use the same language key as another system file.


The last two lines of the example show a translation of the template name, where the key is the folder name of the template (in upper case), and the template description.
