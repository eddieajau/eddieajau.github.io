---
layout:      page
title:       Advanced Administrator Menu for Joomla
description: Advanced Administrator Menu for Joomla 1.5 allows you to group your components into new sub-menus.
date:        2009-05-16 11:37:33
image:
  feature: abstract-7.jpg
  credit: dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
comments: false
reading_time: false
---
**[DOWNLOAD VERSION 1.0.1][0]**  
Last updated {{ page.date | date: "%B %d, %Y" }} ![Compatible with Joomla 1.5](/images/software/joomla/compat_15_native.png)

Also read the [reviews for Advanced Administrator Menu][1] on the Joomla Extensions Directory.  

**Advanced Administrator Menu** is a simple utility extension for the Joomla Administrator.  Most web sites have dozens of extensions installed and this can lead to the Component menu in the Administrator being very long and cumbersome.  Advanced Administrator Menu allows you to tag components so that they can be logically grouped into their own sub-menus.  Often it one takes one extra menu to make managing components a more pleasant experience.

![Screenshot](/images/software/aamenu/aamenu_list.jpg)

## Features

![Screenshot](/images/software/aamenu/aamenu_new_menu.jpg)

* Create as many extra menus as your screen resolution will allow.
* Optionally tag any of the components to display them in the new menus.
* Tagged components will not be shown in the Components menu giving you the ability to balance the length of menus.  Group extensions by function or vendor as you see fit.
* Customise the order of the components in the new menus.

## Requirements

* Joomla 1.5.7+
* **PHP 5.2+**

## Packing List

All extensions are automatically installed from the one package.

* The Advanced Administrator Menu component (com\_aamenu) to tag your components.
* The Advanced Administrator Menu (mod\_aamenu) module which replaces your default Joomla Administrator menu.

Previous versions are available at [The Art of Joomla project on joomlacode.org][4].

## License and Support

No official support is provided.  However, usage difficulties can be reported on the [Art of Joomla project tracker][5].

If you find any this extension useful, please consider paying us forward (not paying us back) by supporting one of our nominated charities [Kiva.org][6] or [World Hope Australia][7] and help fight world poverty! Let us know if you do.

## History

Advanced Administrator Menu was commissioned by Toowoomba Regional Council to assist web masters with the management of sites with a great many extensions installed (before which was an impossibly long Components menu in the Administrator).  The first public version was released in May 2009\. We are grateful to Toowoomba Regional Council for allowing us to share this extension for free with you.

## Installation

Download the single extension package from the Art of Joomla project site (coming soon).

Install the single package using the Joomla installer.  Log into the Joomla 1.5 Administrator.  Select _Extensions -\> Install/Unistall_ from the menu.  Click _Browse_ and select the extension package you downloaded.  Click _Upload & Install File_ (alternatively use the other installation methods available if desired).

![Screenshot](/images/software/aamenu/aamenu_installed.jpg)

When complete, the list of installed extensions will display.

## Configuring the New Module

You must replace the existing Admnistrator menu module with the Advanced Administrator module.

Select _Extensions -\> Module Manager_ from the Administrator Menubar.  Click _Administrator_ in the Linkbar so that you looking at the Administator modules.  Change the value in the _Position_ drop-down list to _menu_.  This will only display the Administator modules in the _menu_ position.

![Screenshot](/images/software/aamenu/aamenu_modules_before.jpg)

In the _Enabled_ column, and in this order, click the green tick for the Admin Menu module (we need to disable it).  When your screen refreshes, the Menubar along the top will disappear (don't worry, this is supposed to happen). Then click the red X for the Advanced Administrator Module (we need to enable it).  The Module Manager should now look like the following screenshot:

![screenshot](/images/software/aamenu/aamenu_modules_after.jpg)

The Menubar should not look any different (this is a good sign).

If you experience problems with new Advanced Administrator Menu, just reverse the process.  Disable the Advanced Administrator Menu module and enabled the Admin Menu module.  **Do not remove the Admin Menu module from the Module Manager**.  Just leave it disabled.

If you need to uninstalled the Advanced Administrator Menu module and component, **you also need to swap the modules back before you uninstall**.

## Configuring Tags

Once you have installed the package, and the required changes in the Module Manager, it's time to configure the component so that we can create new menus.  Select _Components -\> Advanced Administrator Menu_ from the Menubar.  Now click _Options_ in the Toolbar.

![Screenshot](/images/software/aamenu/aamenu_options.jpg)

You will see a popup window.  In the Tags field, place the name of the new menu on each line.  You can add as many as you like.  The new menus will only display once the components have been tagged.  Click the _Save_ button and **then refresh the page** so that the new tags will be made available.

Your tags could be based on a vendor, for example components from JXtended, or they could be based on function, for example you could collect all your utility components (such as JoomPack) under the one menu.

## Assigned Components to New Menus

Once you have configured the tags in the Options panel, you are able to start creating your new menus.

![Screenshot](/images/software/aamenu/aamenu_list.jpg)

![Screenshot](/images/software/aamenu/aamenu_select_tag.jpg) In the Tag column of the list of components, simply select the desired tag from the drop-down list.  Do this for each component in the list.  You may also adjust the value in the _Ordering_ column.  When you are satisfied with the tags and ordering, click _Save Changes_ in the Toolbar.

![screenshot](/images/software/aamenu/aamenu_new_menu.jpg) When the page refreshes you should see new menus between the existing _Components_ and _Extensions_ items in the Menubar.

Any components that appear in the new menus are removed from the under the _Components_ item in the Menubar.  In this way you can balance the length of this and your new menus to suit your needs.

You can create as many new menus as you like.  It is limited only by the available screen width with which you are used to working.

## Trouble Shooting

It is possible for your Administrator Menu to disappear if you accidentally uninstall the extension without swapping the modules back (remember that - if you uninstall, you need to re-enable the old Menu Module).

If this happens, just type `index.php?option=com_modules` into the URL bar of your browser (after the `/administrator/`) and you will be able to adjust your modules.

You do not need to uninstall this extension to upgrade.  Simply re-install the package for the new version and Joomla will overwrite the old files.

If you encounter an other problems during installation or usage, please discuss at [The Art of Joomla Google Group][7].

## Translations

Translating the Advanced Administrator Menu module is very easy.  Simply copy the following file (adjusting for path for the desired language):

`/administrator/language/de-DE/de-DE.mod_menu.ini`

to:

`/administrator/language/de-DE/de-DE.mod_aamenu.ini`

[0]: http://joomlacode.org/gf/download/frsrelease/10391/40527/taoj_aamenu.1.0.1.tar.gz
[1]: http://extensions.joomla.org/extensions/administration/admin-interface/8517/details "If you like Advanced Administrator Menu, please rate or review it on the JED."
[2]: http://people.joomla.org/groups/viewgroup/742-The+Art+of+Joomla.html
[3]: /images/software/aamenu/aamenu_list.jpg
[4]: http://joomlacode.org/gf/project/theartofjoomla/frs/?action=FrsReleaseBrowse&frs_package_id=4572 "Previous version of the Advanced Administrator Menu for Joomla."
[5]: http://joomlacode.org/gf/project/theartofjoomla/tracker/?action=TrackerItemBrowse&tracker_id=7320
[6]: http://www.kiva.org/team/joomla
[7]: http://worldhope.org.au
