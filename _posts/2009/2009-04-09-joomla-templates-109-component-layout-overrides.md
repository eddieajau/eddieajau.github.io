---
layout:      post
title:       Joomla Templates 109 - Component Layout Overrides
description: To understand layout overrides we must first understand the file structure of a component.  While there are many parts to a component, all fulfilling different roles and responsibilities, we want to look just in the /views/ directory.  Here is the partial structure for two of the Articles component (com_content) views
date:        2009-04-09 10:47:22
category:    joomla-templates
image:
  thumb:     vendor/joomla.png
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
To understand layout overrides we must first understand the file structure of a component.  While there are many parts to a component, all fulfilling different roles and responsibilities, we want to look just in the `/views/` directory.  Here is the partial structure for two of the Articles component (com\_content) views:
    
    /components
      /com_content
        /views
          /articles
            /tmpl
              default.php (this is a layout)
              form.php	(this is a layout)
            view.html.php (this is the view that outputs the HTML)
            view.pdf.php  (this is the view that outputs the PDF)
          /category
            /tmpl
              blog.php	   (layout)
              blog_items.php (a sub-layout
              default.php	(layout)
            view.html.php	(HTML view)
            view.feed.php	(RSS feed)

What you see here is that under the `/views/` directory, each view is placed in a directory of its own.  The Articles component actually has three other views not shown: archive, frontpage and section.

## Output Types

Under the `/articles/` directory we have a number of files.  There is almost always a file called `view.html.php`.  This is what we call the view file, but there can be more than one depending on the type of output to produce.  It has a specific naming convention, `view.`_output\_type_`.php`, where the output type can be html, feed, pdf, raw or error (for more information see [JDocument][0] in the API reference and look in the directory `/libraries/joomla/document/`).  What this means is when we want html output for this particular view, the `view.html.php` file is used.  When we want the RSS output, the `view.feed.php` file is used.

The affect of these different output types is most apparent when the Global Configuration setting for **Search Engine Friendly URLs** is set to **Yes**, **Use Apache mod\_rewrite** is set to **Yes**, and **Add suffix to URLs** is also set to **Yes**.  When this is done, the site URLs will look something like this:

`http://domain/sports.html`  
`http://domain/sports.feed`  
`http://domain/sports/rowing.html`  
`http://domain/sports/rowing.pdf`

The exact URL will vary depending on how you set up your site but the point here is to show that `sports.html` will use the category view's `view.html.php` file to display the HTML output, and that `sports.feed` will display the RSS feed for the category using `view.feed.php`.  It should be noted that you cannot currently customise feed or PDF output types.  However, you can customise the html output type and this is where layouts come into play.

## Layouts

Under the view directory there is a `/tmpl/` directory in which the layout files reside.  Each PHP file in this directory represents a layout.  For example, `article/tmpl/default.php` is the default layout for an article whereas `article/tmpl/form.php` is the edit form for an article; `category/tmpl/default.php` is the default layout for a category whereas `category/tmpl/blog.php` displays the list of article differently.

The relationship between component views and layout is most plainly seen when adding a new menu item.  The next screenshot represents the typical display of the New Menu Item page.  Having clicked on Articles (which represents com\_content), the tree expands to show the list of views and each layout within the view.

![Screenshot](images/reference/menu_item_new.png)

You will notice that while there are extra files in some of the `/tmpl/` directories (like `pagebreak.php` in the article view), they are missing from the list.  This is due to instructions in the XML file for the layout (for example, `pagebreak.xml`) to hide the layout (or even the view) from the menu item list.  However, this is another broad topic which will be covered in another section.

Armed with all that knowledge of how all the parts relate to each other, you are ready to actually create the layout overrides.

## Copying or Creating Layout Files

Layout overrides only work within the active template and are located under the `/html/` directory in the template.  For example, the overrides for **rhuk\_milkyway** are located under `/templates/rhuk_milkyway/html/`, for the **JA Purity** template under `/templates/ja_purity/html/` and for **Beez** under `/templates/beez/html/`.

It is important to understand that if you create overrides in one template, they will not be available in other templates.  For example, rhuk\_milkyway has no component layout overrides at all.  When you use this template you are seeing the raw output from all components.  When you use the Beez template, almost every piece of component output is being controlled by the layout overrides in the template.  JA Purity is in between having overrides for some components and only some views of those components.

The layout overrides must be placed in particular way.  Using Beez as an example you will see the following structure:
    
    /templates
      /beez
    	/html
    	  /com_content	(this directory matches the component directory name)
    		/articles	 (this directory matches the view directory name)
    		  default.php (this file matches the layout file name)
    		  form.php

The structure for component overrides is quite simple: `/html/com_component_name/view_name/layout_file_name.php`.  Let's look at a few examples.

The rhuk\_milkyway template does not have any layout overrides for any components.  If we want to override the default layout for an article, first we need to copy this file:

`/components/com_content/views/article/tmpl/default.php`

to this location, creating the appropriate directories in the event they don't already exist:

`/``templates/rhuk_milkyway/html``/com_content/article/default.php`

If we wanted to override the blog layout in the category view, we would copy this file:

`/components/com_content/views/category/tmpl/blog.php`

to:

`/``templates/rhuk_milkyway/html``/com_content/category/blog.php`

Once the files are copied, you are free to customise these files as much or as little as required or desired.  You do not have to honour parameter settings if you don't want to.

## Overriding Sub-layouts

In some views you will see that some of the layouts have a group of files that start with the same name.  The category and frontpage views have examples of this.  The blog layout in the category view actually has three parts: the main layout file `blog.php` and two sub-layout files, `blog_item.php` and `blog_links.php`.  You can see where these sub-layouts are loaded in the `blog.php` file using the `loadTemplate` method, for example:
    
    echo $this->loadTemplate('item');
    // or
    echo $this->loadTemplate('links')

When loading sub-layouts, the view already knows what layout you are in, so you don't have to provide the prefix (that is, you load just `'item'`, not `'blog_item'`).

What is important to note here is that it is possible to override **just** a sub-layout without copying the whole set of files.  For example, if you were happy with the Joomla! default output for the blog layout, but just wanted to customise the item sub-layout, you could just copy:

`/components/com_content/views/category/tmpl/blog_item.php`

to:

`/``templates/rhuk_milkyway/html``/com_content/category/blog_item.php`

When Joomla! is parsing the view, it will automatically know to load `blog.php` from com\_content natively and `blog_item.php` from your template overrides.

[0]: http://api.joomla.org/Joomla-Framework/Document/JDocument.html
