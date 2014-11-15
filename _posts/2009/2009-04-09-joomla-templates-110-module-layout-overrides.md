---
layout:      post
title:       Joomla Templates 110 - Module Layout Overrides
description: Similar to components, under the main module directory (in the example, mod_latest_news) there is a /tmpl/ directory.  There is usually only one layout file but depending on who wrote the module, and how it is written, there could be more.
date:        2009-04-09 10:47:22
category:    joomla-templates
image:
  thumb:     vendor/joomla.png
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
Modules, like components, are set up in a particular directory structure.
    
    /modules
      /mod_latest_news
        /tmpl
          default.php        (the layout)
        helper.php           (a helper file containing data logic)
        mod_latest_news.php  (the main module file)
        mod_latest_news.xml  (the installation XML file)

Similar to components, under the main module directory (in the example, `mod_latest_news`) there is a `/tmpl/` directory.  There is usually only one layout file but depending on who wrote the module, and how it is written, there could be more.

As for components, the layout override for a module must be placed in particular way.  Using Beez as an example again, you will see the following structure:
    
    /templates
      /beez
        /html
          /mod_latest_news  (this directory matches the module directory name)
            default.php     (this file matches the layout file name)

The structure for module overrides is again quite simple: `/html/mod_module_name/layout_file_name.php`.

## Copying or Creating Layout Files

The rhuk\_milkyway template does not have any layout overrides for any modules.  If we want to override the default layout for Latest News module, we need to copy this file:

`/modules/mod_latest_news/default.php`

to this location, creating the approriate directories in the event they don't already exist:

`/``templates/rhuk_milkyway/html``/mod_latest_news/default.php`

You need to take a little care with overriding module layout because there are a number of different ways that modules can or have been designed so you need to treat each one individually.
