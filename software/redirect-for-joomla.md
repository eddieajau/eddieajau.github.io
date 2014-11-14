---
layout:      post
title:       Redirect - Page Redirection for Joomla
description: Redirect is a component for Joomla that detects and logs 404 error pages and allows you to redirect hits on those pages to another page.
date:        2010-11-05 20:50:25
image:
  feature: abstract-7.jpg
  credit: dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
comments: false
reading_time: false
---
**DOWNLOAD VERSION 1.0.2 NOW • [GZIP Format][0] or [ZIP Format][1]**  
Last updated {{ page.date | date: "%B %d, %Y" }} ![Compatible with Joomla 1.5](/images/software/joomla/compat_15_native.png)

[Click here to be notified about updates][2] (login required)  

**Redirect** is a Joomla 1.5 port of the new Redirect component that comes with Joomla 1.6\.

Redirect allows you to detect when Joomla cannot find a page (typically called a 404 error) and then allows you to redirect those pages elsewhere to avoid the error.  This helps to avoid penalties search engines apply to your page ranks due to excessive errors. 

Redirect can be a valuable tool when you are reorganising the menu for your Joomla web site, or you are changing settings (like turning SEF on after going live) or for site migrations to Joomla when you need to refer old URL's to new ones.

[![Screenshot](/images/software/redirect/redirect_list_links_active.jpg)][5]

## Features

* Automatically detect and log when Joomla does not find a page (404 errors).
* Counts the number of times not-found pages are being hit.
* Bulk add a redirection link to existing error pages that have been logged.


## Requirements

* Joomla 1.5.19+
* PHP 5.2.4+

## Packing List

All extensions are automatically installed from the one package.

* The Redirect administrator component (com\_redirect).
* The Redirect system plugin.
* English language files.

## License and Support

No official support is provided.  However, usage difficulties can be reported on the [Art of Joomla project tracker][6].

If you find any this extension useful, please consider paying us forward (not paying us back) by supporting one of our nominated charities [Kiva.org][7] or [World Hope Australia][8] and help fight world poverty! Let us know if you do.

## Installation & Upgrading

Download the single extension package from the Art of Joomla project site.

Install the single package using the Joomla installer. Log into the Joomla 1.5 Administrator. Select _Extensions -\> Install/Unistall_ from the menu. Click _Browse_ and select the extension package you downloaded. Click _Upload & Install File_ (alternatively use the other installation methods available if desired).

To upgrade Redirect just download the latest version and install over the top of the old version.  Do not uninstall Redirect as you will loose all your captured link data.

## Turn on the Redirect System Plugin

In order for Redirect to start collecting information about pages that are not found, in the Joomla administrator go to _Extensions -\> Plugin Manager_. In the search filter type "Redirect" and click _Go_ or press enter/return.  You should see the plugin named "System - Redirect" in the filtered list.  If this is not already published, do so now.

The plugin will now start recording each time Joomla encounters a page that it cannot find.

## Manage Redirect Links

To access Redirect, select _Components -\> Redirect_ from the administrator menu bar.

[![Screenshot](/images/software/redirect/redirect_list_links_pending.jpg)][0]

The list shows you the page-not-found links that Joomla has encountered and the Redirect system plugin has logged. The default state of the list shows you all Pending links and it is sorted by the most recently updated date (most recent first).  These are links that have been logged but where no action has been taken.

The Source URL column is the list of links that have been collected. If you have SEF and mod\_rewrite turned on, there will typically be more links than if it is turned off.  The Destination URL column is the shows the link that will display if someone attempts to go to the respective Source URL.  The Link Referrer column is a guide to where the link has come from.  This value may or may not be available, and it may not be particularly reliable in all cases.

The Updated Date/Created Date column is the date the link was updated (if applicable) and the date the original link was captured, and the Hits column is the number of times it has been visited.

The Published State can be Pending (equivalent to unpublished), Published or Archived.

### Archiving Links

If your site in even moderately popular, you will quickly collect links that hackers use to compromise sites.  To reduce the clutter, select them and click the Archive icon in the toolbar.  They will still be active and redirect to the appropriate destination link.  You will eventually collect links that don't specifically relate to your site (like those from hackers fishing for vulnerabilities).  These types of links are good to archive.

### Adding Redirection Links

To edit a redirection link, click on the link in the "Source URL" column and you will see the Add Link screen.

[![Screenshot](/images/software/redirect/redirect_edit_link.jpg)][1]

Find the page on your site that should display when a browser tries to visit this link, and paste it into the "Destination URL" textbox.  Then select either "Active" or "Archived" for the published state.  As a suggestion, choose "Active" for real pages that have moved, and choose "Archived" other types of pages.

Click _Save_ in the toolbar when you are done.

When you return to the list, change the published state filter to "Active".  You should see your new link in the filtered list.

When creating custom redirect links, do not make the "Source URL" the same name as any that is used by Joomla. For example, do not use `http://example.com/media` as this will not be processed by Joomla at all.

[![Screenshot](/images/software/redirect/redirect_list_links_active.jpg)][2]


## Frequently Asked Questions

### Can Redirect improve the look of my site's URL's?

Redirect can only change the look of the URL's on your site from an external source.  It won't be able to improve the Search Engine Friendly (SEF) URL's that Joomla itself generates (for example to convert `http://example.com/1-category/2-article.html` to `http://example.com/category/article.html`).  To change the look of the URL's you will need to add each page to a Joomla menu (recommended), or use a third-party SEF extension (not recommended).

### I've installed Redirect and it's not logging 404's

There are a number reasons this could be happening.

Check that the plugin is enabled.  Go to the Plugin Manager in the administrator and filter the list on the "system" plugins.  If the Redirect plugin is not enabled, do so.  If you can't find it in the list then there may have been a problem with the installation of the extension.  Try reinstalling it.

If the plugin is enabled there could be a conflict with other plugins (for example, that provide custom 404 error pages).  Change the order of the Redirect plugin so that it triggers first.  To do this it must have the lowest ordering number (which can be negative) as lower numbers trigger before higher numbers.  Try trying the ordering to -1 or one less than the lowest existing ordering number.  Now try going to a known 404 error page and see if it starts logging.

If that doesn't work disable all custom plugins that you have installed (make a note of them so you know which ones to enabled again after you've finished testing).  Go to a known 404 error page and see if Redirect logs it.

If that still doesn't work it's time to consult and/or hire a Joomla expert to look over your site and they can determine if there is a unique problem with your site that is preventing Redirect from working properly.

### Redirect is capturing links from the Administrator. Is that a problem?

No, it's not a problem. Joomla has a broader definition of what constitutes a 404 error than you might expect and from time to time this will include administrator links.


[0]: http://joomlacode.org/gf/download/frsrelease/13167/57616/redirect.1.0.2.tar.gz
[1]: http://joomlacode.org/gf/download/frsrelease/13167/57617/redirect.1.0.2.zip
[2]: http://joomlacode.org/gf/?action=Monitor&section=frspackage&ref_id=5511&redirect_to=%2Fgf%2Fproject%2Ftheartofjoomla%2Ffrs%2F%3Faction%3DFrsReleaseBrowse%26amp%3Bfrs_package_id%3D5511&notify=1
[3]: http://extensions.joomla.org/extensions/site-management/url-redirection/14676 "If you like Redirect, please rate or review it on the JED."
[4]: http://people.joomla.org/groups/viewgroup/742-The+Art+of+Joomla.html
[5]: /images/software/redirect/redirect_list_links_active.jpg
[6]: http://joomlacode.org/gf/project/theartofjoomla/tracker/?action=TrackerItemBrowse&tracker_id=7320
[7]: http://www.kiva.org/team/joomla
[8]: http://worldhope.org.au
[9]: http://jxtended.com
