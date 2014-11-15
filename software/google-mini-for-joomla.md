---
layout:      page
title:       Artof Google Mini - Seamless search integration with Joomla 1.5
description: Artof Google Mini is a component to allow seamless integration with a Google Mini server and your Joomla 1.5 web site.
date:        2010-11-23 10:00:00
image:
  feature: abstract-7.jpg
  credit: dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
comments: false
reading_time: false
---
**DOWNLOAD VERSION 1.0.0 NOW**
Joomla 1.5 --- [GZIP Format][0] or [ZIP Format][1]  
Last updated {{ page.date | date: "%B %d, %Y" }} ![Compatible with Joomla 1.5](/images/software/joomla/compat_15_native.png)

[Click here to be notified about updates][2] (login required)  

**Artof Google Mini** is a component to allow seamless integration with a [Google Mini][4] appliance and your Joomla 1.5 web site without needing to resort to unimpressive iframe wrappers.

Artof Google Mini polls your appliance directly and displays the results within the Joomla page so you can maintain a consistent user experience for both your content and search.

![Screenshot](/images/software/artofgm/results.jpg)

## Features

* Seamless integration with Joomla (no messy iframes):
  * supports Joomla pagination and list limit;
  * aware of filtered Google searches;
  * advanced search form option;
  * component and menu page configuration options to toggle the display of various result elements.
* Back search test and debug interface

## Requirements

* A [Google Mini search appliance][4] ([documentation][5])
* Joomla 1.5.20+
* PHP 5.2.4+

## Packing List

All extensions are automatically installed from the one package.

* The Artof Google Mini administrator component (com\_artofgm).
* The Artof Google Mini frontend component (com\_artofgm).
* The Artof Google Mini frontend search module (mod\_artofgm\_search).
* English language files.

## License and Support

No official support is provided.  However, usage difficulties can be reported on the [Art of Joomla project tracker][6].

## Acknowledgments

Thanks to [Toowoomba Regional Council][7] for sponsoring the development of this tool.

## Installation

Extensions in Joomla are installed using the Joomla Administrator.  For more general information of installing extensions, see:

* [http://docs.joomla.org/Installing\_an\_extension](http://docs.joomla.org/Installing_an_extension)

### Before You Start

Before installing, upgrading or uninstalling any extensions, please make a full backup of your site's files and data. Refer to your hosting service for how to do this.

If possible, it is good practice to make changes to extensions on a test copy of your site prior to making changes on your live site.

The installation, upgrade or uninstall processes in Joomla do not have built-in roll-back support. **It is your responsibility** to ensure you can recover from any failure caused by changes to your site.

### Installing for the First Time

Download the extension package (links are provided on the main extension page). This package contains all of the extensions required for Artof Google Mini, including components, modules and language files. They are all installed in the one operation.

Install the package file in the normal way. 

Select _Extensions -\> Install/Uninstall_ from the main menu.

Click browse and find the installation package. Click _Upload File & Install_.

When the installation process is finished, a list of all the extensions that were installed will be displayed.

### Upgrading Artof Google Mini

Upgrading this extension to the latest maintenance release is simple. Download the new package from this site when it is released.

Install the package again as if you were installing it for the first time. **Do not uninstall Artof Google Mini** as this will delete all your data.

### Uninstalling Artof Google Mini

To uninstall this extension, you only need to uninstall the Artof Google Mini component. This will automatically uninstall the other modules that were originially installed in one simple step.

PLEASE NOTE: **All your data will be deleted when you uninstall Artof Google Mini.**

If you want to keep your data for future use, you must back it up. Refer to your hosting service for ways to backup your data.  However, data collected on your Google Mini appliance is not affected by removal of this extension.

### Questions About Installing and Upgrading

#### Joomla says the installation succeeded but there was an error installing module or plugin language files.

If you have removed the frontend default language folder (`/language/en-GB/`), this extension will not install.

## Component Configuration

When you first install Artof Google Mini, you will need to configure the location of the Google Mini appliance before you can do anything else.  You will see a message asking you to configure the component options.

[![Screenshot](/images/software/artofgm/new_admin.jpg)](/images/software/artofgm/new_admin.jpg)

Click _Options_ in the toolbar.

[![Screenshot](/images/software/artofgm/admin_options.jpg)](/images/software/artofgm/admin_options.jpg)

The following configuration options are available:

* Server URL - This is the URL or address of the Google Mini appliance.  Consult your system administrator for the appropriate value.
* Connection Method - You can connect with the appliance using several methods. Usually the "fopen" option will suffice.

### Page Options

* Use Stylesheet Provided - The component comes with a sample stylesheet that you can optionally. You can turn this off and add styles directly to your template stylesheets.

### Basic Search Form Options

* Show Advanced Search - Optionally show a link to the alternative advanced search layout.
* Show Limit Selector - Optionally show the page limit select list that is typically displayed on list pages in Joomla.

### Advanced Search Form Options

* Show Language Filter - Optionally show the language selection filter (only needed if your appliance is indexing multi-lingual content).
* Show File Type Filter - Optionally show the file type filter.
* Show Occurence Filter - Optionally show the filter that allows you to control where the search words occur (page title, etc).
* Show Domain Filter - Optionally show the filter that allows you to restrict results by domain.
* Show Links Filter - Optionally show the filter that allows you to find links pointing to a page.
* Show Sort Options - Optionally show the sort options by relevance or date.

### Search Results Options

* Show Snippet - Optionally show the snippet text in the search results.
* Truncate URL - Optionally truncate the URL to the character length specified.  Leave blank to show the full URL.
* Truncate URL Suffix - If the URL is truncated, you can specify the text to append to the URL (eg, "...").
* Show Cached Size - Optionally show the cached size of the content.
* Show Crawl Date - Optionally show the crawl date (if available).

### Proxy Server Details

* Use Proxy Server - Optionally use a proxy server to communicate with the Google Mini appliance.
* Host - The host address of the proxy server.
* Post - The port the proxy server uses.
* User Name - The user name used to connect with to proxy server.
* Password - The password used to connect to the proxy server. 

### Administrator Search Testing

Artof Google Mini allows you to test searches from the Joomla Administrator using many search options that the search API allows.

[![Screenshot](/images/software/artofgm/admin_search.jpg)](/images/software/artofgm/admin_search.jpg)

For detailed information on the meaning of the various search terms and filters, consult the Google Mini documentation ([suggested link](http://code.google.com/apis/searchappliance/documentation/46/xml_reference.html)).

When you search, you will get some search metrics from the returned results:

[![Screenshot](/images/software/artofgm/admin_metrics.jpg)](/images/software/artofgm/admin_metrics.jpg)

search results:

[![Screenshot](/images/software/artofgm/admin_results.jpg)](/images/software/artofgm/admin_results.jpg)

and the full XML response from the Google Mini appliance:

[![Screenshot](/images/software/artofgm/admin_response.jpg)](/images/software/artofgm/admin_response.jpg)

Once you have configured the server options, and confirmed that you can connect to and get search results from the server, the next step is to add the search page the frontend menu.

## Adding a Search Page to the Menu

Go to the Joomla menu manager and click _New_ in the toolbar.  Select the "Artof Google Mini" component from the list, then the "Basic Search Form".

[![Screenshot](/images/software/artofgm/menu_page.jpg)](/images/software/artofgm/menu_page.jpg)

You are given the ability to override many of the component defaults.  For more information on what these options mean, see the Administration page for Artof Google Mini.

### Basic Search Form

The basic search form will give you a text box for the search words, the page limit selector and a link to the advanced search (unless you have optionally turned the display of either of those off).

[![Screenshot](/images/software/artofgm/site_basic_search.jpg)](/images/software/artofgm/site_basic_search.jpg)

When you enter text in the search box, you will get a list of matching results.  The Artof Google Mini is aware of spelling suggestions and duplicate filtering.

[![Screenshot](/images/software/artofgm/site_results.jpg)](/images/software/artofgm/site_results.jpg)

### Advanced Search Form

The Advanced Search link allows the visitor to build an advanced search using a form, rather than remembering the search notations.

[![Screenshot](/images/software/artofgm/site_advanced_search.jpg)](/images/software/artofgm/site_advanced_search.jpg)

### Customisation

This page may be customised using the Joomla layout override system.  You need to be able to create new files and edit them on your web hosting site using FTP or other tools that are available to you (contact your web host if you need more information).

All file paths are relative to the directory in which Joomla is installed.  When looking a files you need to create, it is assumed that you will create the necessary folders if they don't already exist in each case.  The directory `default_template` refers to the template that is set as the default for your site.  Please replace this name with the actual name of the template directory.

To create the layout override for this page, find the files:

`/components/com_artofgm/views/artofgm/tmpl/default.php`
`/components/com_artofgm/views/artofgm/tmpl/default_results.php`
`/components/com_artofgm/views/artofgm/tmpl/advanced.php`

Copy the files you wish to customise to (respectively):

`/templates/default_template/html/com_artofgm/artofgm/default.php`
`/templates/default_template/html/com_artofgm/artofgm/default_results.php`
`/templates/default_template/html/com_artofgm/artofgm/advanced.php`

Make the desired adjustments to the source code to the new file you created and then save it.  Your changes should be reflected when you refresh the appropriate page. 

Please note that you only need to copy the files that you need to change.  For example, if you only want to format the list of search results, you only need to copy the `default_results.php` file.

Be aware that while the layout overrides are not touched when you upgrade this extension, changes to the master versions may occur which add or change functionality.

## Search Module

A search module is provided that simply displays a search text box and optionally a label and submit button.  

### Module Options

The module has the following options available:

* **Label Position** - The label can be positioned above, below, to the left or to the right of the search box, or not displayed at all.
* **Label Text** - You can type your own text for the label, or a default value will be provided for you.
* **Search Box Size** - The number of characters wide to made the search box.
* **Button Position** - The button can be positioned above, below, to the left or to the right of the search box, or not displayed at all.
* **Button Text** - You can type your own text for the button, or a default value will be provided for you.
* **Auto Hide** - Optionally hide the module when showing the Artof Google Mini component.
* **Module Class Suffix** - If specified, the module class suffix will be applied to the end of the normal class name to allow for more styling control.
* **Caching** - Set whether the content of the module should be cached or not.
* **Cache Time** - The period of time, in minutes before the module cache should be refreshed.

### Customization

This page may be customized using the Joomla layout override system.  You need to be able to create new files and edit them on your web hosting site using FTP or other tools that are available to you (contact your web host if you need more information).

All file paths are relative to the directory in which Joomla is installed.  When looking a files you need to create, it is assumed that you will create the necessary folders if they don't already exist in each case.  The directory `default_template` refers to the template that is set as the default for your site.  Please replace this name with the actual name of the template directory.

To create the layout override for this page, find the file:

`/modules/mod_artofgm_search/tmpl/default.php`

Copy this to:

`/templates/default_template/html/mod_artofgm_search/default.php`

Make the desired adjustments to the source code to the new file you created and then save it.  Your changes should be reflected when you refresh the appropriate page.

[0]: http://joomlacode.org/gf/download/frsrelease/13242/58173/artofgm.1.0.0.tar.gz
[1]: http://joomlacode.org/gf/download/frsrelease/13242/58174/artofgm.1.0.0.zip
[2]: http://joomlacode.org/gf/?action=Monitor&section=frspackage&ref_id=5533&redirect_to=%2Fgf%2Fproject%2Ftheartofjoomla%2Ffrs%2F%3Faction%3DFrsReleaseBrowse%26amp%3Bfrs_package_id%3D5533&notify=1
[3]: http://people.joomla.org/groups/viewgroup/742-The+Art+of+Joomla.html
[4]: http://www.google.com/enterprise/search/mini.html
[5]: http://code.google.com/apis/searchappliance/documentation/50/index.html "Documentation for the Google Mini search appliance"
[6]: http://joomlacode.org/gf/project/theartofjoomla/tracker/?action=TrackerItemBrowse&tracker_id=7320
[7]: http://www.toowoombarc.qld.gov.au/
