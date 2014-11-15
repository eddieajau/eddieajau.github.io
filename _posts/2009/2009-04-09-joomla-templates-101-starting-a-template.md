---
layout:      post
title:       Joomla Templates 101 - Starting a Template
description: This article looks at the basic files and folders required in a Joomla 1.5 template.
date:        2009-04-09 10:47:22
category:    joomla-templates
image:
  thumb:     vendor/joomla.png
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
If the eyes are the windows to the soul, then the Joomla template is the window to the web.  It is the vehicle by which output is arranged and displayed as a visitor browses your site.  The template is made up of three different types of output:

1. The dynamic output of the component that is defined in the URL.
2. The dynamic output of the modules that are grouped into positions.
3. The static output of the structural elements of the template which frame the output of the modules and the component.

This section looks at the fundamental principles upon which the Joomla template is based.

## File Structure

While the arrangement of CSS and image files may change from designer to designer, there are a number of fundamental and mandatory elements to the Joomla template.  Most templates will follow a file structure similar to the following arrangement.
    
    |- templates/
      `- training/
        |- css/
        |- html/
        |- images/
        |- component.php
        |- index.html
        |- index.php
        |- params.ini (Joomla 1.5 only)
        |- template_thumbnail.png
        `- templateDetails.xml

The `/css/` folder will typically hold all of the stylesheets required for the template design.  This could be a single file or dozens depending on the style of the designer.  While some graphics packages like to divide the stylesheets up into many file, for performance reasons the best arrangement is to have just one CSS file included with each page load.

The `/html/` folder holds all of the layout override files for components, modules, module chrome and pagination links.

The `/images/` folder will hold all of the image files required for the graphical parts of the template.

The `/media/` folder holds any supporting images, CSS stylesheets or Javascript files that might be required by the component.

The `component.php` file is a simplified version of the master template file that is included for printer-friendly style pages.  It usually strips out most module positions encasing the component.  Unfortunately this file is generally neglected by many template developers and is poorly styled.

The index`.php` is the master template file that gets included by Joomla.

The `params.ini` file is only found in a Joomla 1.5 template. It holds any template parameters that have been defined in the XML details file. Joomla 2 and 3 store the template parameters in the database.

The `template_thumbnail.png` file is a reduced size image of the actual template.  It is typically around 200 pixels wide by 150 pixels high.  It will display as you hover over the names of the template in the Administrator's Template Manager.

The `templateDetails.xml` file holds the meta information about the template like author information, but also the available positions in the template as well as any parameter definitions.  The template will not display in the Administrator's Template Manager unless this XML file is present and contains a minimum of an `install` and `name` tag.

As a matter of habit, whenever you create a new folder you should create an `index.html` file to prevent visitors snooping around your web site folders.
