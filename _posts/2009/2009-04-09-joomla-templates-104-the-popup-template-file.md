---
layout:      post
title:       Joomla Templates 104 - The Popup Template File (component.php)
description: Joomla allows for a template to display via the index.php file, but it also allows for a reduced version via a file named component.php that resides in the template folder.  This file is used most commonly when the Print View button or link is clicked.  A popup window is displayed which just shows the output of the component with minimal embellishment.
date:        2009-04-09 10:47:22
category:    joomla-templates
image:
  thumb:     vendor/joomla.png
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
Joomla allows for a template to display via the `index.php` file, but it also allows for a reduced version via a file named `component.php` that resides in the template folder.  This file is used most commonly when the Print View button or link is clicked.  A popup window is displayed which just shows the output of the component with minimal embellishment.

While there are some fantastic examples of finely crafted Joomla templates around the world (just have a look at the [Community Showcase][0]), this file, over all others, is the most neglected by both inexperienced and veteran designers alike.  It's very easy to find out how good the designer has been.  Just add `?tmpl=component` to the URL.  Let's have a look at an example of a site that belongs to a friend of mine.

[http://www.joomlatutorials.com][1]

![Screenshot](images/reference/joomla_tutorials_normal_style.png)

Now let's have a look at the popup version of the template (I took a screenshot just in case he fixes it without me knowing).

[http://www.joomlatutorials.com/?tmpl=component][2]

![Screenshot](images/reference/joomla_tutorials_component_style.png)

Oh dear.  What happened to all the lovely styling?  If you forget to include the `component.php` file, Joomla has a fall back and uses the file from the System Template.  But it's got a problem.  It tries to load a stylesheet for the active template in `/css/template.css`.  Unfortunately there is no guarantee that this file actually exists.  To remedy this, the template designer should make certain that they include their own `component.php` that takes into account all of the appropriate styling for their template.

## Creating the Popup Template File

The irony is that creating the file is really the easiest part.  Just copy the following file:

`/templates/system/component.php`

to:

`/templates/your_template/component.php`

Now all you have to do is find this line in that file:
    
    <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/css/template.css" type="text/css" />

and then adjust the name of the stylesheet to include.  To fix the previous site all that would need to be done is replace `template.css` with `template_css.css`.  Alternatively, you could include a slightly different stylesheet that provides provides a more pleasing result in the popup window.  You could even add a print version of the stylesheet because this is the most appropriate page to actually print from.

You should always include the System Messages as we outlines when looking at the `index.php` master file.  It could also be a good idea to include the _debug_ module position the was covered as well but no other modules should be included.

While this reference is not about the artistic design, my personal opinion is that designers should draw some attention to making this page look nice.  Give the popup page an appropriate border to move the text away from the hard edge of the browser window.  Use a fluid width or a fixed width that is suitable for printing on your standard paper size. You will probably need to include a limited amount of structural markup but remove large headers and unless advertising banners are going to be relevant on a printed copy, I would tend to remove, or least reduce those as well.

I cannot overemphasise how important it is to check that the print or popup version of your site is in keeping with the full view of your site.  Sadly many don't.

[0]: http://community.joomla.org/showcase/ "A showcase of Joomla web sites from around the world"
[1]: http://www.joomlatutorials.com/
[2]: http://www.joomlatutorials.com/?tmpl=component
