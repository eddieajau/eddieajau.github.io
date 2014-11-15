---
layout:      post
title:       Joomla Templates 103 - The System Template
description: Joomla ships with a system template that contains many default elements used by the Joomla application.  This is a template in its own right, having all the required elements to make it operate (albeit with poor aesthetic value and lacking the display of modules).  However, the template lacks the XML meta file so cannot be selected from the Administrator Template Manager.  That said, this template should never be removed either the frontend or backend template folders as parts of it are generally called upon by other core and third-party templates.
date:        2009-04-09 10:47:22
category:    joomla-templates
image:
  thumb:     vendor/joomla.png
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
Joomla ships with a system template that contains many default elements used by the Joomla application.  This is a template in its own right, having all the required elements to make it operate (albeit with poor aesthetic value and lacking the display of modules).  However, the template lacks the XML meta file so cannot be selected from the Administrator Template Manager.  That said, this template should never be removed either the frontend or backend template folders as parts of it are generally called upon by other core and third-party templates.

## File and Folder Structure

The file structure is as follows:
    
    |- templates/
      `- system/
        |- css/
        | |- editor.css
        | |- error.css
        | |- general.css
        | |- index.html
        | |- offline_rtl.css
        | |- offline.css
        | |- system.css
        | `- toolbar.css
        |- html/
        | |- index.html
        | `- modules.php
        |- images/
        | |- calendar.png
        | |- index.html
        | |- j_button2_blank.png
        | |- j_button2_image.png
        | |- j_button2_left.png
        | |- j_button2_pagebreak.png
        | |- j_button2_readmore.png
        | |- notice-alert.png
        | |- notice-download.png
        | |- notice-note.png
        | `- selector-arrow.png
        |- component.php
        |- error.php
        |- index.html
        |- index.php
        `- offline.php

We'll spend some time looking at what each of these files does and how it fits into the operation of the template.

## Stylesheets

There are a number of stylesheets that can be used by the designer rather leaving you to concentrate on the most interesting design aspects of the template.  The purpose of these stylesheets is as follows.

### The Editor Stylesheet

The `editor.css` stylesheet file is generally loaded with any WYSIWYG editor that has been installed.  It will also be loaded in the Preview window when you are editting an article in the Administrator.  Some Editor Plugins have an option to optionally include this file.  This file controls the styling within the rich-text area of the WYSIWYG editor.

To override the styling based on the actual template styles, you can create your our file in the following location:

`/templates/template_name/css/editor.css`

This only has effect when placed in the site template but has the advantage of seeing the content in more realistic styles.  There is no effect if the file existing in the administrator template.

### The Error Stylesheet

The `error.css` stylesheet file is only loaded by the `error.php` file (see below) in the system template.

### The General Stylesheet

The `general.css` stylesheet file contains default styles for several elements including, but not limited to, the following:

* Form validation markers
* Pagination buttons
* Extended edtiro plugins buttons
* Tooltips
* Image captions
* Calendar image

Many third-party templates will include this template via the following code:
    
    <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/system/css/general.css" type="text/css" />

### The Offline Stylesheets

The `offline.css` stylesheet file is only loaded by the offline`.php` file (see below) in the system template.

### The System Stylesheet

The `system.css` stylesheet file contains default styles for several elements including, but not limited to, the following:

* Openid
* Unpublished articles (seen when logged in)
* System error, warning and notice messages (using definition lists)
* Debug information

Many third-party templates will include this template via the following code:
    
    <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/system/css/system.css" type="text/css" />

### The Toolbar Stylesheet

The toolbar`.css` stylesheet file is only used in Legacy Mode to support the old way of contructing the Administrator Toolbar.

## HTML Overrides

The system template provide only one override and that is to establish the base module chrome that is available for you to use.

`/templates/system/html/modules.php`

In the previous version of Joomla, and Mambo before it, this is analogous to the module "style" (the old -1 and -2 numbers).  The module chrome is defined in the `modules.php` file.  Each type of module chrome is defined by a function prefixed with `modChrome_`.  The last part of the function name is the called the module style.  There are six default styles supplied in the system template.

### The Horz Style

The `style="horz"` chrome is equivalent to the old +1 style in Joomla 1.0 and Mambo.  This wraps the module in a double-nested table.  The outer table has no class.  The inner table uses the same code as the "Table" style (see below).  This style is not recommended for new production sites.  It is included for legacy compatibility with older style templates only.  Use the `style="xhtml"` style instead.

### The None Style

The `style="none"` chrome is equivalent to the old -1 style in Joomla 1.0 and Mambo.  This just outputs the contents of each module in turn without an intermediate HTML code.  The module title is not displayed with this style, only the content of the module.

### The Outline Style

The `style="none"` chrome is new in Joomla 1.5\.  When the `tp=1` variable is added to the web site URL, this style is used to highlight the module positions available in the template.  This style would not be used in a production site.

### The Rounded Style

The `style="none"` chrome is equivalent to the old -3 style in Joomla 1.0 and Mambo.  This wraps each module in a four-deep nested DIV to enable styling that creates rounded corner (or similar) effects.
    
    <div class="module(suffix)">
      <div>
        <div>
          <div>
            <h3>Title (optional)</h3>
            Module Content
          </div>
        </div>
      </div>
    </div>

The optional class suffix is definable in the module parameters.  The module title, wrapped in an H3 tag, is optional and set in the Module Manager.

### The Table Style

The `style="table"` chrome is equivalent to the old 0 or default style in Joomla 1.0 and Mambo.
    
    <table cellpadding="0" cellspacing="0" class="moduletable(suffix)">
      <tr>
        <th valign="top">
          Title (optional)
        </th>
      </tr>
      <tr>
        <td>
          Module Content
        </td>
      </tr>
    </table>

The optional class suffix is definable in the module parameters.  The module title is optional and set in the Module Manager.  This style is generally not recommended for modern web sites.    It is included for legacy compatibility with older style templates only.   Use the `style="xhtml"` style instead.

### The XHTML Style

The `style="xhtml"` chrome is equivalent to the old -2 style in Joomla 1.0 and Mambo.
    
    <div class="moduletable(suffix)">
      <h3>Title (optional)</h3>
      Module Content
    </div>

The optional class suffix is definable in the module parameters.  The module title display is optional and set in the Module Manager.  Note that if the module contents is empty, nothing at all will display (not even the title if it is set to display).  This is the style that is recommended for general module display.

## Images

### calendar.png

This image is used in the `general.css` stylesheet (see `a img.calendar`) and also invoked directly by calling `JHtml::calendar` but this does not allow you to override the image.

### j\_button2\_\*.png

The images, `j_button2_blank.png`, `j_button2_image.png`, `j_button2_left.png`, `j_button2_pagebreak.png` and `j_button2_readmore.png` are used in the `general.css` stylesheet (see the `a.button2-left` styles).  You can override these images by including your own styles as defined in `general.css`.

### notice-\*.png

The images `notice-alert.png`, `notice-download.png` and `notice-note.png` are in styles pertaining to the system error, warning and notice messages (see the `#system-message` identitiers).  The related styles are provided in the default administrator's `general.css` stylesheet, in `rhuk_milkyway`'s `template.css` stylesheet and in the system template's `system.css` stylesheet.  The easiest way to support styling of these messages is to simply include this stylesheet in your own template as follows:
    
    <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/system/css/system.css" type="text/css" />

### selector-arrow.png

This image is used to form the "arrow" above a tooltip box (see the `.tool-title` style).

## PHP Files

The PHP files in the system template

### The Component File

The `component.php` file sets up a very basic page to display any system messages and the output of the component.

### The Error File

The `error.php` file is included when Joomla raises a hard error (caused by the developer calling `JError::raiseError` in the code).  Typical examples would be 404 Not Found errors, Not Authorised errors or database errors (when Debug Site is set to Yes in the Global Configuration settings in the Administrator).

This file relies on the `error.css` file found in the `/css/` folder.

### The Master Index File

The `index.php` file is just a proxy for the `component.php` file.

### The Offline File

The `offline.php` file is included when _Site Offline_ is set to _Yes_ in the Global Configuration settings in the Administrator.
