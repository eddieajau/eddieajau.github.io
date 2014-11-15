---
layout:      post
title:       Artof User - Extended User Manager
description: Artof User is a component for Joomla 1.5 that extra features to manage your web site users.
date:        2011-01-19 10:00:00
image:
  feature: abstract-7.jpg
  credit: dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
comments: false
reading_time: false
---
**DOWNLOAD VERSION 1.1.1 NOW**
Joomla 1.5 --- [GZIP Format][0] or [ZIP Format][1]  
Last updated {{ page.date | date: "%B %d, %Y" }} ![Compatible with Joomla 1.5](/images/software/joomla/compat_15_native.png)

[Click here to be notified about updates][2] (login required)  

**Artof User** is a component for Joomla 1.5 with extra features to manage your web site users.

It allows you to manage your users more easily by providing extra features in the user list such as filtering by activation and by registration time.  You can add notes to users and also put blocked users into categories.

It also allows you to create new custom user groups just like in Joomla 1.6 and put users into one or more of those groups. 

Integrates with [Kunena][5] 1.6.1 and Joomla's Mass Mail component.

[![Screenshot](/images/software/artofuser/users_list.jpg)](/images/software/artofuser/users_list.jpg)

## Features

* Enhanced user list:
  * Filter by activated and pending activation;
  * Filter by enabled and disabled (blocked) users;
  * Filter by time users registered (today, last 7 days, last month, last year and more);
  * Filter by custom user groups;
  * Displays registration date;
  * Enable and disable multiple selected users at once;
  * Manually activate users pending activation.

* Add custom user groups to organise your users better.
* Add notes against users.
* Put user notes into categories.
* Put blocked users into categories.
* Have a custom message display when a block user tries to login (based on the category they are in).
* Optionally turn off sending the password with new user emails.

## Requirements

* Joomla 1.5.15+
* PHP 5.2.4+

## Packing List

All extensions are automatically installed from the one package.

* The Artof User administrator component (com\_artofuser).
* The Artof User user plugin.
* English and French (partial) language files.

## License and Support

No official support is provided.  However, usage difficulties can be reported on the [Art of Joomla project tracker][7].

If you find any this extension useful, please consider paying us forward (not paying us back) by supporting one of our nominated charities [Kiva.org][8] or [World Hope Australia][9] and help fight world poverty! Let us know if you do.

## Acknowledgments

Thanks to [Toowoomba Regional Council][10] and [Open Source Matters](http://opensourcematters.org) for sponsoring the development of this tool.

## Installation

Extensions in Joomla are installed using the Joomla Administrator.  For more general information of installing extensions, see:

* [http://docs.joomla.org/Installing\_an\_extension](http://docs.joomla.org/Installing_an_extension)

### Before You Start

Before installing, upgrading or uninstalling any extensions, please make a full backup of your site's files and data. Refer to your hosting service for how to do this.

If possible, it is good practice to make changes to extensions on a test copy of your site prior to making changes on your live site.

The installation, upgrade or uninstall processes in Joomla do not have built-in roll-back support. **It is your responsibility** to ensure you can recover from any failure caused by changes to your site.

### Installing for the First Time

Download the extension package (links are provided on the main extension page). This package contains all of the extensions required for **Artof User**, including components, modules and language files. They are all installed in the one operation.

Install the package file in the normal way. 

Select _Extensions -\> Install/Uninstall_ from the main menu.

Click browse and find the installation package. Click _Upload File & Install_.

When the installation process is finished, a list of all the extensions that were installed will be displayed.

### Upgrading Artof User

Upgrading this extension to the latest maintenance release is simple. Download the new package from this site when it is released.

Install the package again as if you were installing it for the first time. **Do not uninstall Artof User** as this will delete all your data (core Joomla user data will not be touched but you will loose any user notes and blocking data).

### Uninstalling Artof User

To uninstall this extension, you only need to uninstall the Artof Content component. This will automatically uninstall the other modules that were originially installed in one simple step.

PLEASE NOTE: **All your custom note and blocking data will be deleted when you uninstall Artof Content.**

If you want to keep your data for future use, you must back it up. Refer to your hosting service for ways to backup your data.

### Questions About Installing and Upgrading

#### Joomla says the installation succeeded but there was an error installing module or plugin language files.

If you have removed the frontend default language folder (`/language/en-GB/`), this extension will not install.

## Component Configuration Options

To access the Artof User component configuration options, click the Options button in the toolbar. 

[![Screenshot](/images/software/artofuser/config.jpg)](/images/software/artofuser/config.jpg)

You may wish to configure any of the following options before you start using the Artof User component:

* **Email password**: This option allows you to turn off sending the password in the email to a new user.
* **Require block category**: If this option is turned on, when you block/disable a user, you will be presented with a screen to put the user in a "blocked" category.
* **Require block note**: If this option is turned on, when you block/disable a user, you will be presented with a screen to add a note against the user.
* **Component access**: Select the user groups that you want to access this component (Super Administrators always get access).
* **Edit notes**: Select the user groups that you want to be allowed to edit notes (Super Administrators are always allowed).
* **Delete notes**: Select the user groups that you want to be allowed to delete notes (Super Administrators are always allowed).

## Manage Users List

Select Users from the submenu to see the list of users.  This list is similar to the core Joomla User Manager but has some extended features.

[![Screenshot](/images/software/artofuser/users_list.jpg)](/images/software/artofuser/users_list.jpg)

### Groups

The groups column will show the primary Joomla group that the user is in.  Under this it will show the total number of groups that the user has been assigned to (if you have assigned the user to any custom user groups).  You can only assign the user to one of the core Joomla user groups.

### Activating Users

If a user has not activated their account, you can click on the icon in the Activated column to manually activate their account.  Alternatively you can select a number of users from the list and click Activate in the toolbar.

### Filters

In addition to the normal Joomla User Manager filters, you may also filter the user list on the activated state and a period in during or after which the user registered.

### Notes and Blocked Users

The users list shows a number of icons related to user notes.

[![Screenshot](/images/software/artofuser/users_list2.jpg)](/images/software/artofuser/users_list2.jpg)

The user list will always display the _Add Note_ icon (the note icon with a green plus sign on the right).  Clicking this icon will allow you to add a note to the user in that row of the list.

If the user has notes against them, two icon icons will display to the left of the _Add Note_ icon.  The blue funnel icon to the left allows you a convenient way to go to the notes list while filtering on just that user.  If you click the _View Notes_ icon in the middle, a popup window will show all the notes entered against that user.

[![Screenshot](/images/software/artofuser/user_notes_list.jpg)](/images/software/artofuser/user_notes_list.jpg)

If the user is blocked/disabled and you have assigned a blocked category to the user, when you hover over the icon in the "Enabled" column, it will also show you the blocked category the user has been assigned to.

## Edit User Screen

Click on the name of the user in the Manage Users list and you will see the Edit User screen.

[![Screenshot](/images/software/artofuser/edit_user.jpg)](/images/software/artofuser/edit_user.jpg)

This screen gives you all the features of the native Joomla 1.5 user manager except that you are able to assign the user to additional groups.  The "Primary User Group" is the one that Joomla 1.5 will recognise for regular user permissions.  Other components, such as Mass Mail, will recognise the additional user groups.

![Screenshot](/images/software/artofuser/edit_user_blocked.jpg)While in the user edit screen, ff you set "Blocked User" to "Yes", the option to put the user in a blocked category will appear.  If you change the setting to "No", the category list will be hidden.  You can set blocked categories from the submenu bar or from the Administrator menu.  Blocked categories are entered in the same way as you would enter categories for Joomla articles, weblinks, etc.

## User Groups

Clicking on the _User Groups_ link will give you a list of the Joomla 1.5 user groups.

[![Screenshot](/images/software/artofuser/groups_list.jpg)](/images/software/artofuser/groups_list.jpg)

You cannot change any of the core user groups that come with Joomla 1.5, but you are able to add your own new user groups.

## User Notes

To view all the notes entered against all users, select "Notes" from the submenu bar or from the Adminstrator menubar.

[![Screenshot](/images/software/artofuser/notes_list.jpg)](/images/software/artofuser/notes_list.jpg)

This list shows the name of the user (click on this to edit existing notes), the note subject (optional), the category the note belongs to (optional), a review date (optional) and the database record id of the note.  If an image has been selected for a category, this will also show in the list next to the category title.  Note that you should select small images for the categories as there is no size limit place on the image.  Images for categories should be added to `/images/stories/` via the Joomla Media Manager.

You can filter this list on one of the note categories or on the published or trashed state of the notes.  You can also perform a free text search in the user name or note subject, or filter the notes on a specific user using the format `uid:123` where 123 should be replaced with the user's database id.  The easiest way to filter notes by a single user is to go to the main user list and click the funnel icon adjacent to the user's name.

To add new notes, click the "New" button in the toolbar, or, from the main users list, click the _Add Note_ icon in the list adjacent to the user's name.

When you want to remove notes, select the checkbox in the list and click the "Trash" button in the toolbar.  To permanently delete the note from the database you first need to filter the state of the list on "Trashed", and then select the "Delete"  button in the toolbar.

## Edit Notes

Click on the user's name in the notes list to edit that user note.

[![Screenshot](/images/software/artofuser/add_user_note.jpg)](/images/software/artofuser/add_user_note.jpg)

This screen allows you to set the following fields:

* **Subject**: Optionally add a subject for the note.
* **User**: Click the "Change User" button and a popup list of all users will appear.  Select the name of the user you want to add the note against. User filtering to help you find the user you want.
* **Category**: Optionally assign the note to a category.  You can configure these categories using the "Notes Categories" link in the submenu bar.
* **Review time**: Optionally select a date to remind you when to review the notes for this user.
* **Note**: Add the body of the note in this editor field.

When you are done, click "Save" in the toolbar to save the note and go back to the notes list, or click "Apply" to save your progress and return to the editing the note.

## Note Categories

To maintain the notes categories, click on the "Note Categories" link in the submenu bar.  Unfortunately we can't maintain the full submenu when viewing the categories list.  To get back to the Artof User component, use the submenu links in the main Administrator menu.

[![Screenshot](/images/software/artofuser/note_categories_list.jpg)](/images/software/artofuser/note_categories_list.jpg)

This categories list is used in exactly the same way as you would use categories for Joomla articles and weblinks.

## Blocked Categories

To maintain the blocked categories, click on the "Block Categories" link in the submenu bar.  Unfortunately we can't maintain the full submenu when viewing the categories list.  To get back to the Artof User component, use the submenu links in the main Administrator menu.

[![Screenshot](/images/software/artofuser/blocked_categories_list.jpg)](/images/software/artofuser/blocked_categories_list.jpg)

This categories list is used in exactly the same way as you would use categories for Joomla articles and weblinks.

## Artof User user plugin

The Artof User user plugin allows you to display a message when a blocked user tries to log in.  The message is the description text of the block category that you have assigned the user to.

The plugin is not enabled when you first install Artof User.  To enable this plugin, select _Extensions_ -\> _Plugin Manager_ from the Administrator menubar.  In the type filter list, select "user".  Click the red icon in the "Enabled" column for the plugin with the name of "User - Artof User".

There are no parameter options for this plugin.


[0]: http://joomlacode.org/gf/download/frsrelease/13987/60660/artofuser.1.1.1.tar.gz
[1]: http://joomlacode.org/gf/download/frsrelease/13987/60661/artofuser.1.1.1.zip
[2]: http://joomlacode.org/gf/?action=Monitor&section=frspackage&ref_id=5121&redirect_to=%2Fgf%2Fproject%2Ftheartofjoomla%2Ffrs%2F%3Faction%3DFrsReleaseBrowse%26amp%3Bfrs_package_id%3D5121&notify=1
[3]: http://extensions.joomla.org/extensions/clients-a-communities/user-management/14383 "If you like Artof User, please rate or review it on the JED."
[4]: http://people.joomla.org/groups/viewgroup/742-The+Art+of+Joomla.html
[5]: http://www.kunena.com "Kunena forum for Joomla!"
[7]: http://joomlacode.org/gf/project/theartofjoomla/tracker/?action=TrackerItemBrowse&tracker_id=7320
[8]: http://www.kiva.org/team/joomla
[9]: http://worldhope.org.au
[10]: http://www.toowoombarc.qld.gov.au/
