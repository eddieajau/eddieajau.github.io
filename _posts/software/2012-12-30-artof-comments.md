---
layout:      post
permalink:   /software/artof-comments.html
title:       Artof Comments - Disqus Support for Joomla 2.5/3.0
description: ArtofComments is a Joomla 2.5/3.0 plugin that provides Disqus comment support for Joomla articles. What sets ArtofComments apart is the tight integration with Joomla forms. Comments are enabled within the edit form for an article or category - no need to remember dozens of category or article id's.
date:        2012-12-30 00:00:00
modified:    2013-01-21 12:35:00
category:    software
image:
  thumb:     vendor/joomla.png
---
**DOWNLOAD VERSION 1.1 NOW &bull; [ZIP Format][0]** ![Compatible with Joomla 2.5](/images/software/joomla/compat_25.png) ![Compatible with Joomla 3.0](/images/software/joomla/compat_30.png)

**ArtofComments** is a Joomla 2.5/3.0 plugin that provides Disqus comment support for Joomla articles.

What sets ArtofComments apart is the tight integration with Joomla forms. Comments are enabled within the edit form for an article or category - no need to remember dozens of category or article id's.

[![Screenshot](/images/software/artofcomments/artofcomments_display.jpg)][1]

## Features

* Enable or disable comments for any category - right in the edit form.
* Enable or disable comments for single articles - right in the article edit form.
* Support Disqus developer mode to test comments on local testing sites.

## Requirements

* Joomla 2.5 or 3.0
* **PHP 5.3+**

## Packing List

All extensions are automatically installed from the one package.

* The ArtofComments content plugin.
* English language files.

## License and Support

This extension is free to download and use on any number of Joomla web sites. It is released as Open Source under the GNU General Public License and the MIT license.

The full source code can be found on [Github][2].

No official support is provided.  However, usage difficulties can be reported on the [ArtofComments issue tracker][3].

If you find any this extension useful, please consider paying us forward (not paying us back) by supporting one of our nominated charities [Kiva.org][4] or [World Hope Australia][5] and help fight world poverty! Let us know if you do.

## Installation & Upgrading

Download the single extension package from the Art of Joomla project site.

Install the single package using the Joomla installer. Log into the Joomla 2.5 or 3.0 Administrator. Select _Extensions -\> Install/Uninstall_ from the menu. Click _Browse_ and select the extension package you downloaded. Click _Upload & Install File_ (alternatively use the other installation methods available if desired).

To upgrade ArtofComments just download the latest version and install over the top of the old version.  Do not uninstall ArtofComments as you may loose plugin settings.

## Using ArtofComments

### Turn on the ArtofComments Content Plugin

In order for ArtofComments to connect to Disqus, in the Joomla Administrator go to _Extensions -\> Plugin Manager_. In the search filter type "ArtofComments" and click _Go_ or press enter/return.  You should see the plugin named "Content - ArtofComments" in the filtered list.

Click the name of the to edit the settings.

Enter the "shortname" you would have configured on the Disqus site.

Turn on the Developer Mode if you are testing a local copy of your site. Make sure this is turned off on a production site.

Enable the plugin and save.

### Enabling and Disabling Comments

When the ArtofComments plugin is enabled, there are two ways to enable, or disable, comments.

The first way is to edit an article category. Under the Basic Parameters you will see a new option called "Enable Comments". Change this setting to "Yes" to allow Disqus comments to be added to each article in the category.

[![Screenshot](/images/software/artofcomments/artofcomments_category.jpg)][6]

The second way is to edit a single article. Under the Article Options you will also see a new option called "Enable Comments". Change this setting to "Yes" to explicitly allow Disqus comments, or "No" to disallow them (even if comments are enabled in the category the article is in).

[![Screenshot](/images/software/artofcomments/artofcomments_article.jpg)][7]

[0]: http://www.theartofjoomla.com/downloads/artof-comments/artof-comments-1-1/artofcomments-1-1-zip.raw
[1]: /images/software/artofcomments/artofcomments_display.jpg
[2]: https://github.com/eddieajau/artof-comments/ "Github repository for ArtofComments"
[3]: https://github.com/eddieajau/artof-comments/issues
[4]: http://www.kiva.org/team/joomla
[5]: http://worldhope.org.au
[6]: /images/software/artofcomments/artofcomments_category.jpg
[7]: /images/software/artofcomments/artofcomments_article.jpg
