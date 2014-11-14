---
layout:      page
title:       jhttp_scan
description: jscan_http is a security tool for Joomla web sites that allows you to check for possible attack vectors by directly loading php files in the browser.
date:        2010-03-04 11:29:02
image:
  feature: abstract-7.jpg
  credit: dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
comments: false
reading_time: false
---
**[DOWNLOAD VERSION 1.0.1][0]**  
Last updated {{ page.date | date: "%B %d, %Y" }}

jscan\_http is a command line utility that scans the directory of a Joomla site for PHP files and tries to access them directly via the web server.  Ideally no output should be received from directly accessing any PHP file, with the exception of index.php, index2.php (etc) which should display regular HTML output.  Some files will return warning text, such as "Restricted Access", and these will be ignored and considered safe. Any unexpected output will be logged to the console.

This tool is ideal for developers of Joomla component, modules, plugins and templates to ensure that their files correctly prevent direct access (by specifying the exact path to the file in the URL).

> Please note this is not an installable, Joomla extension. It is a PHP file that should be run from the command line or terminal.

## Requirements

* PHP 5.3

## License and Support

This tool is free to download and use.  It is released as Open Source under the GNU General Public License.

No official support is provided.  However, usage difficulties can be reported on the [Art of Joomla project tracker][3].

## Documentation

### Installation

Copy this file into the root of your Joomla web site (or another directory and use the -d option to specify the directory to scan).

### Usage

```sh
./jscan_http [options]
```

### Options

* -a "string1|string2"

Additional responses that are allowed when a file is directly accessed.

* -b directory

The base directory of the web server (eg, /usr/local/www).  Defaults to the current working directory.

* -d directory

An alternative directory to scan (current working directory assumed as default).

* -u uri

The host or domain (defaults to "http://localhost").

* -n number

Sets a limit on the number of files to scan.

* -h

See help text.

* -v

Show the results for all files parsed, not just those that fail.

* -x "regex"

A regular expression for file paths to exclude.

### Examples

To scan the current Joomla site installed in a subfolder of localhost and jscan\_http is installed in the base folder of the Joomla site:

    > ./jscan_http.php -u "http://localhost/Joomla/1.5.20"

To scan the 1.6 trunk remotely on localhost.

    > ./jscan_http.php -b /Users/foobar/htdocs -d /Users/foobar/htdocs/Joomla/trunk -x "/tests/"
    500 * /administrator/components/com_config/controllers/component.php >>> Internal Server Error
    500 * /administrator/components/com_search/helpers/site.php          >>> Internal Server Error
      0 * /administrator/index.php                                       >>> <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML
      0 * /cache/1a451b73e35d52dc26d333836b2beca0.php                    >>> Access Denied
      0 * /cache/testing/7381142b500f394ef8fd06bd43749a9f.php            >>> Access Denied
      0 * /index.php                                                     >>> <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML
      0 * /installation/index.php                                        >>> <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML

This example shows that several files need to be investigated.  The 500 return codes files are likely missing `defined('_JEXEC') or die;` code at the top of the file.  The output from the `index.php` files is expected.

## Acknowledgments

Thanks to [Toowoomba Regional Council][4] for sponsoring the development of this tool.

If you find any this extension useful, please consider paying us forward (not paying us back) by supporting one of our nominated charities [Kiva.org][5] or [World Hope Australia][6] and help fight world poverty! Let us know if you do.

[0]: http://joomlacode.org/gf/download/frsrelease/12781/54788/jscan_http.1.0.1.zip
[3]: http://joomlacode.org/gf/project/theartofjoomla/tracker/?action=TrackerItemBrowse&tracker_id=7320
[4]: http://www.toowoombarc.qld.gov.au
[5]: http://www.kiva.org/team/joomla
[6]: http://worldhope.org.au
