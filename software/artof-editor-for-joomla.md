---
layout:      post
title:       Artof Editor - A CKEditor Plugin for Joomla 1.5, 2.5 and 3.0
description: Artof Editor is a plugin extension for Joomla that provides the WYSIWYG CKEditor in text edit area.
date:        2010-08-13 20:52:04
category:    joomla
image:
  feature: abstract-7.jpg
  credit: dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
comments: false
reading_time: false
---
**DOWNLOAD VERSION 1.0.6 NOW**
Last updated {{ page.date | date: "%B %d, %Y" }} ![Compatible with Joomla 2.5](/images/software/joomla/compat_25.png) ![Compatible with Joomla 3.0](/images/software/joomla/compat_30.png) ![Compatible with Joomla 1.5](/images/software/joomla/compat_15_native.png)
Joomla 2.5/3.0 --- [ZIP Format][0]
Joomla 1.5 --- [ZIP Format][1]

**Artof Editor** is a plugin extension for Joomla that provides support for the WYSIWYG [CKEditor][4] in text edit area.

CKEditor is a text editor to be used inside Joomla articles. It's a WYSIWYG editor, which means that the text being edited on it looks as similar as possible to the results users have when publishing it. It brings to the web common editing features found on desktop editing applications like Microsoft Word and OpenOffice.

## Features

* **CKEditor 3.6.2**

For more information see the [end-user features page][5] on the CKEditor site.

In addition, this plugin exhibits the follow features of interest to developers for training purposes:

* A custom parameter element to support the loading of local language files (see `/plugins/editors/ckeditor/elements/dummy.php`).
* A custom parameter element to add help text within the parameters area of the plugin (see`/plugins/editors/ckeditor/elements/help.php`).

## Requirements

* Joomla 1.5, 2.5 or 3
* PHP 5.2+

This extensions requires a **low** working knowledge of Joomla to configure and use to its maximum potential.  Please familiarise youself with all instructions first.

## Packing List

All extensions are automatically installed from the one package.

* The CKEditor editor plugin with CKEditor 3

## License and Support

The CKEditor plugin is **free to download** (no registration required) and use on any number of Joomla web sites. It is released as Open Source under the GNU General Public License.

The full source code can be found on [Github][6].

**No documentation is available**.  Please see the [CKEditor.com][4] site for end-user features and instructions.

No official support is provided.  However, usage difficulties can be reported on the [Art of Joomla issue tracker][7].

Improvement suggestions are welcome. Commissioned feature improvements can be negotiated.

If you find any this extension useful, please consider paying us forward (not paying us back) by supporting one of our nominated charities [Kiva.org][8] or [World Hope Australia][9] and help fight world poverty! Let us know if you do.

## Installing and Upgrading

Download the extension package using the link above.

Log into the Joomla Administrator.

Select _Extensions -\> Install/Unistall_ from the menubar.

Click _Browse_ and select the extension package from where you downloaded it onto your computer.

Click _Upload & Install File_ (alternatively use the other installation methods available if desired).

Before upgrading it is always good practice to backup your web site files and database. It is also a good idea to test the upgrade on a copy of your web site.

To upgrade to a new version of the extension just repeat the steps above with the new package when it becomes available.  **You do not need to uninstall the extension first.** Just install the new version over the top of the existing one.

## Plugin Settings

The Artof Editor extension installs as a plugin in the "editors" group.  It has a number of settings that you can customise.

**Language**

CKEditor comes with a number of languages and you can select from one of these. Please note that these language files may not be complete and are maintained by the CKEditor developers, not us.

**Backend Toolbar**

You are allowed to choose the editor toolbar to use for users logged into the backend administrator.

CKEditor has two built-in toolbars named "Full" and "Basic".  You also have the ability to define and extra two custom toolbars (explained below).

**Frontend Toolbar**

You are allowed to choose the editor toolbar to use for users logged into the frontend site the same as for the Backend Toolbar.

**Custom Toolbar 1**

**Custom Toolbar 2**

You can define your two of your own custom toolbars.  For more information see the [CKEditor Developers Guide](http://docs.cksource.com/CKEditor_3.x/Developers_Guide/Toolbar) or you can use the suggestions below.

**Skin**

You can choose one of three skins that come with the CKeditor.

**Background Colour**

If you are using the Kama skin, you can define the HTML code for the background colour.

### Custom Toolbars

Suggestion for Custom Toolbar 1

```
['Source'], ['Cut','Copy','Paste','PasteText','PasteFromWord','-','Print', 'SpellChecker', 'Scayt'],
	['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
	'/',
	['Bold','Italic','Underline','Strike','-','Subscript','Superscript'],
	['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
	['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
	['Link','Unlink','Anchor'],
	['Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak'],
	'/',
	['Styles','Format','Font','FontSize'],
	['TextColor','BGColor'],
	['Maximize', 'ShowBlocks','-','About']
```

Suggestion for Custom Toolbar 2

```
['Source'], ['Cut','Copy','PasteText','PasteFromWord','-','Print', 'SpellChecker', 'Scayt'],
 ['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
 '/',
['Bold','Italic','Underline','Strike','-','Subscript','Superscript'],
 ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
 ['Link','Unlink','Anchor'],
 ['Image','Table','SpecialChar','PageBreak'], ['Format']
```

## Tips

To edit hyperlinks and images, just double-click on them in the editor area.

## Known Issues

There is an odd bug in some browsers where if you type text, then insert a _Read More_ or _Page Break_, you will not be able to add text after the HR that is inserted into the text area.  To work around this, always ensure that you insert a _Read More_ or _Page Break_ between paragraphs, not at the very end of the text.

Also, the editor does not fill the text area box fully sometimes when you first open an article.  Just click in the WYSIWYG area and it should automatically expand.

[0]: http://www.theartofjoomla.com/downloads/artof-editor/artof-editor-1-0-6/plgeditorsartofeditor-1-0-6-zip.raw
[1]: http://www.theartofjoomla.com/downloads/artof-editor/artof-editor-1-0-6/artofeditor-j15-1-0-6-zip.raw
[4]: http://ckeditor.com
[5]: http://ckeditor.com/end-user-features
[6]: https://github.com/eddieajau/artof-editor/ "Github repository for Artof Comments"
[7]: https://github.com/eddieajau/artof-editor/issues
[8]: http://www.kiva.org/team/joomla
[9]: http://worldhope.org.au
