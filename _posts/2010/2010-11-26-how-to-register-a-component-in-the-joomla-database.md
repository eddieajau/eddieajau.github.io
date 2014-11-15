---
layout:      post
title:       How to register a component in the Joomla database
description: Unlike modules and templates which can be &quot;dropped&quot; into place and Joomla will just find them, components need to be registered in the components table.  This is a pain to do so here a quick solution.  We just need to create three files, mostly copy-pasted from the code below.
date:        2010-11-26 17:14:49
category:    joomla-development
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

Unlike modules and templates which can be "dropped" into place and Joomla will just find them, components need to be registered in the components table.  This is a pain to do so here a quick solution.  We just need to create three files, mostly copy-pasted from the code below.

First create an tiny `index.html` file with the following code:
    
    <html><body></body></html>

Next, create an empty file called `example.php`.

Lastly, create a file called example.xml with the following code:
    
    <?xml version="1.0" encoding="utf-8"?>
    <install type="component" version="1.5.22" method="upgrade">
     <name>example</name>
     <author>Andrew Eddie</author>
     <creationDate>2010-11-26</creationDate>
     <copyright>Copyright 2010 New Life in IT Pty Ltd. All rights reserved.	</copyright>
     <license>GNU General Public License version 2 or later.</license>
     <authorEmail>support@theartofjoomla.com</authorEmail>
     <authorUrl>www.newlifeinit.com</authorUrl>
     <version>1.0</version>
     <description>Example description</description>
    
     <files>
      <filename>index.html</filename>
      <filename>example.php</filename>
     </files>
    
     <administration>
      <files>
       <filename>index.html</filename>
       <filename>example.php</filename>
      </files>
    
      <menu img="components/com_example/media/images/example_16x16.png"
       link="option=com_example">Example</menu>
      <submenu>
       <menu img="components/com_example/media/images/sd_16x16.png"
        link="option=com_example">Example</menu>
       <menu img="js/ThemeOffice/categories.png"
        link="option=com_categories&amp;section=com_example">Categories</menu>
      </submenu>
     </administration>
    </install>

That's your basic set of files for creating dual frontend and backend component with categories support.  To turn this into your own component, all you need to do is replace `com_example` with the name of the folder that you will use for your own component and change the names of the file to match you component.  For example, if you are going to create a component called "Weather" then your component folder might be `com_weather` and you'll use a `weather.php` and a `weather.xml` file.  Then just zip those three files up and install them.  It will install and register the component in your testing site for you to continue working.

### More things to do

If you don't need the categories support, or are managing your component's submenu manually, remove the `<submenu>` tag.

If you don't need a frontend component, remove the `<files>` tag after the `<description>` tag.

Change the value of the `img` attribute to match where you are putting the icon for your component.

If you are using source control (like Subversion) and you are working locally, once you have installed the basic extension, you can delete the folders and soft-link them back to you code repository files (not available on Windows platforms).
