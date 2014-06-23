---
layout:      post
title:       Upgrading a Plugin to Joomla 1.6
description: Joomla 1.6 is approaching release and it's time for developers to start thinking about upgrading their components to be ready.  In fact, now is a great time to start.  Andrew Eddie walks you through how he upgraded a simple editor plugin with this instructional video for developers.
date:        2010-11-13 12:19:05
category:    joomla
image:
  thumb:     vendor/joomla.png
---
Joomla 1.6 is approaching release and it's time for developers to start thinking about upgrading their components to be ready.  In fact, now is a great time to start.  Andrew Eddie walks you through how he upgraded a simple editor plugin with this instructional video for developers.

<div style="text-align:center">
	<iframe frameborder="0" height="360" src="http://player.vimeo.com/video/16783171?portrait=0" width="640"></iframe></div>
<p style="text-align: center; ">
	<a href="http://vimeo.com/16783171">Joomla 1.6 Spotlight: Upgrading Plugins</a>&nbsp;on Vimeo.</p>
<p>

Note that while this video is about upgrading a simple plugin, the changes made to the XML manifest file and language files are also applicable for Joomla 1.6 components, modules and templates.

If you would like to discuss this video, please visit our group at [people.joomla.org][1].  If you are interested in translating the transcript below, please contact us.

## Video Transcript

### Introduction

I've just finished upgrading one of my plugins to be ready for Joomla 1.6 and I thought I'd share how I did it, hopefully getting you to the finish line with less trial-and-error than I had. The process is simple but there are a few steps involved. But before you start, always remember to turn Site Debug and Language Debu g on and increase the Error Reporting to Maximum in Global Configuration before you start.

### Branching

So, as you can see, I store my extension in Subversion on [Joomlacode.org][2]. The first thing I did was to copy my existing trunk to a new J1.6 branch. I know some people are going to try to do a single package that supports both versions, and if you want to do it that way that's fine with me, but my advice is to make your 1.5 and your 1.6 versions in separate trees. I personally that is better for you in the long term.

### Changes in the File Format

Let's have a look at the old plugin format. In 1.5 we typically have the main plugin PHP and XML files in the plugin group folder, and then if you have any other supporting files you'd keep those in a subfolder typically with the same name as the plugin.

If we look at the 1.6 branch, we can see that the plugin is now in it's own folder, having the same name as the plugin, in exactly the same way as we would do for a module. The main plugin PHP and XML files are now in this subfolder, rather than at the same level as we saw in the 1.5 version. You can also see I have a collection of other folders containing files that support the plugin. We'll look at those in more detail soon.

### PHP File Format

The code for your plugin should be done using a PHP class extended from JPlugin. If you are doing it this way already for 1.5, then there are no further changes you need to do except where event names have changed in 1.6, and there are a few of those. For more information on the event name changes, see the [Joomla documentation wiki][3].

### XML File Format

Now, unlike the PHP file, there are a number of important changes to make to the XML file for it to work properly in 1.6\.

The first change is easy. Just rename the root tag to <extension\>.

The second change I had to make was to add the new supporting folders to the <files\> tag. That was the second easy bit.

The third change is a bit more complicated. Let's have a look at the old XML file first. You can see for the plugin parameters we use a set of <params\> (plural) and <param\> (singular) tags. Most of you should be very familiar with those. If you are used to defining your own JParameter elements, you will also have been using the addpath attribute in the <params\> tag.

Now, let's turn to the 1.6 version of this file. You can see the XML structure is a little different but it's not too hard to follow and this structure also applies to components, modules and templates. The API for doing extension parameters has changed from using the JParameter class to using a new class called JForm which is much more powerful.

The first step to upgrade this area is to simply search for all the <param\> tags and rename them to <field\> tags. All of the JParameter elements have been ported across to JForm fields so there is generally no change to the argument lists.

The second step here is to rename the <params\> tags to <fieldset\> tags and with that you need to give the <fieldset\> tag a name attribute. In most case the name attribute will be either "basic" or "advanced" and this will mirror the two slider panes that were supported in 1.5\. However, in 1.6 you can add as many <fieldset\> tags as you want which will appear as additional sliders when you edit the plugin.

The third step is to wrap all the collection of <fieldset\> tags in a <fields\> tag that has a name attribute of params which is the real name of the database table field that the information will be stored in. As an aside, we no longer store parameters in INI format but have changed to JSON format. You don't have to worry about converting the database value as Joomla does that on the fly.

If you are using custom JParameter elements then you need to rename the addpath attribute to addfieldpath and a good place to put that is in the <fields\> tag. However, you will also need to convert your custom JParameter elements into JForm fields but we'll look at that another time.

Last of all, we wrap the <fields\> tag in a <config\> tag do delineate the JForm markup from the rest of the extension manifest.

At the end of the file, I've also added some new tags that are available in 1.6\. The <scriptfile\> tag allows you add a installer class with methods that can fire on installation, upgrade and removal as well as before and after the entire installation process. The <updateservers\> tag allows you to register an XML update file on your site that Joomla can look at and determine if it has the latest version of your extension. 

### Language File Format

Now, let's move on to language files. These can now be included, and I recommend to always do it this way, with the plugin package in folders that mirror the structure of the main Joomla language folders. In all cases, you will at least have language/en-GB. The naming convention for the files is the same but there is a new language file with the extension .sys.ini where you can include language strings that are needed during the installation process.

Looking at the files directly, they are very similar to the 1.5 versions. However, because we are using the native PHP INI parser, the format is much more strict. The language keys can only contain letters, numbers and underscores. Spaces and other punctuation characters will cause an error if they are present in the keys. The string values must be wrapped in double quotes. Now, there is a small problem if you need to include double quotes in the actual string itself. Unfortunately PHP 5.2 and 5.3 behave differently and we can't use a backslash to escape the double quote. To include a double quote within the string you must replace it with "\_QQ\_". What this does is actually breaks the string into two pieces and concatenates it with a PHP constant called \_QQ\_ which evaluates to a single double quote. If that looks really weird to you, well it is, but just trust me that it's the only way for it to work on multiple PHP versions reliably.

### Concluding Remarks

So, that's the quick tour and with all those changes, you can then package your plugin in a compressed form as you would for Joomla 1.5 and start distributing it. I hope this video will help guide you safely through your preparations to support Joomla 1.6 - because, seriously, it rocks to both use and develop for. Thanks for listening, good luck and safe coding.

[1]: http://people.joomla.org/groups/viewgroup/742-The+Art+of+Joomla.html
[2]: http://joomlacode.org/gf/project/theartofjoomla/scmsvn/
[3]: http://docs.joomla.org/What's_new_in_Joomla_1.6#Renamed_Events
