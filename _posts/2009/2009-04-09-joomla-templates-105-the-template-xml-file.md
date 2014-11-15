---
layout:      post
title:       Joomla Templates 105 - The Template XML File
description: Each template requires an XML meta file named templateDetails.xml.  This file contains descriptive information about the template, the files used to install the template and optionally the module positions that are defined and template parameters.
date:        2009-04-09 10:47:22
category:    joomla-templates
image:
  thumb:     vendor/joomla.png
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
Each template requires an XML meta file named `templateDetails.xml`.  This file contains descriptive information about the template, the files used to install the template and optionally the module positions that are defined and template parameters.

## The XML File Structure

The following shows the basic structure of an XML meta file for a template.
    
    <?xml version="1.0" encoding="utf-8"?>
    <!DOCTYPE install PUBLIC "-//Joomla! 1.5//DTD template 1.0//EN" "http://www.joomla.org/xml/dtd/1.5/template-install.dtd">
    <install version="1.5" type="template">
      <!-- Define the template name and descriptive information -->
      <!-- Define the files and folders in the template package -->
      <!-- Define the module positions available in the template -->
      <!-- Define the language files for the template -->
      <!-- Define template parameters -->
    </install>

The first line is given a fancy name: the XML prologue.  It's just a line that is always required in any XML file.  The important thing to remember with the prologue is that _version_ is set to `1.0` (this is the version of XML that is to be used as set by the XML standards body, not the version of Joomla) and the _encoding _is set to `uft-8`. You will need to use an editor which will also allow you to save the file with a particular character encoding.

The next line decsribes the DOCTYPE.  This is an optional line that points to a DTD file that defines the rules by which the XML can be written.  You editor may support being able to validate your template file against the DTD.

The XML language is very similar to HTML but more strict about the formatting.  In fact, if you know the rules for coding XHTML web pages, then you already know how to write XML.

The template XML file contain one root tag named install.  The install tag take two arguments: the version of Joomla that is required for this template and the type of extension.  Although we know this is a template, the Joomla universal installer does not know what type of extension it is installing until it looks in the XML file.

## Template Name and Description

The first major block in the meta file describes the name of the template and descriptive details about the author.
    
        <name>theartofjoomla</name>
        <creationDate>1 Jan 2009</creationDate>
        <author>Andrew Eddie</author>
        <authorEmail>andrew.eddie@example.com</authorEmail>
        <authorUrl>http://www.theartofjoomla.com</authorUrl>
        <copyright>Copyright (C) 2005 - 2013 New Life in IT Pty Ltd. All rights reserved.</copyright>
        <license>GNU General Public License</license>
        <version>3.1</version>
        <description><![CDATA[TAOJ_Tempalte_Desc]]></description>

Of this block of XML code, only the name tag is mandatory, but you should include all of the othe tags for completeness.  Please note that all tags are case-sensitive.

The `name` tag must include the exact name of the folder that the template is to be install under `/templates/`.  In the case shown, the template will be installed in:

`/templates/theartofjoomla/`

You can alter the way the name appears in the Template Manager (for example, you might want a more readable "The Art of Joomla" phrase to display in the list) by adding an entry to the template language file as follows:
    
    THEARTOFJOOMLA="The Art of Joomla"
    
The `creationDate` tag holds the date you want to nominate for creating or releasing the template.  It is not altered when the template is installed (that is, Joomla does not change this to the date it installed or created the template in your web site).

The `author` tag is the name of the author of the template, typically your real name or your company name.

The `authorEmail` is a contact email.  This is useful for users who like your template to get in contact with you.

The `authorUrl` is the web site that you want to point users to if they want more information about the template.  For a template club, this could point directly to the support page for actual template edition.

The `copyright` tag describes the copyright information for the template.

The `license` tag decsribes the license under which the template is released.  Please note that Joomla templates can be dually licensed.  The PHP code must be licensed under the GNU General Public License in order for it to be compatible with the Joomla application (and allow you to list on the various joomla.org family of web sites).  However, stylistics elements including images, stylesheets and some javascript can be released under a different license, including one that restricts usage of the template on a per-site basis.

The version tag is your version reference for the template.

The description tag allows you to include descriptive text about the template.  You can type this in directly if you desire:
    
        <description>The template to be used on The Art of Joomla web site</description>

If you want to include an ampersand or angled bracket, just like in XHTML, you need to use the special codes like this:
    
        <description>Light &amp; clean template for the web &lt;site&gt;.</description>

Or, you can include some HTML markup if you wrap the contents is a CDATA marker:
    
        <description><![CDATA[An <strong>amazing</strong> template]]></description>

Finally, you can use a truncated language string as shown in the original example block.  It is good practice to wrap it in the CDATA directive just incase you want to add HTML code.  You can then add the following line to your template's language file:
    
    TAOJ_TEMPLATE_DESC="This is template for <a href="http://www.theartofjoomla">The Art of Joomla</a>."

As shown above, you could include links to additional support information in the template description if desired.

## Files and Folders

If you are packaging a template for distribution then you need to include a manifest of the files that are included in the package so that the Joomla installer knows which files and folders to copy.  We do this by including a single `files` tag under which we include multiple `folder` and `file` tags for each folder and file that is used by the template respectively.
    
        <files>
            <folder>css</folder>
            <folder>html</folder>
            <folder>images</folder>
            <file>component.php</file>
            <file>index.php</file>
            <file>templateDetails.xml</file>
            <file>template_thumbnail.png</file>
        </files>

In Joomla 1.0 and Mambo templates you needed to include all files, including their relative folder paths, by using `filename` tags.  Joomla 1.5 only requires you to nominate the top level files.  The new `folder` tag allows the contents of entire folders to be copied over without the need of creating an individual entry for every file.

## Module Positions

Not all template have the same module positions depending on the purpose of the template or the prefered style of the designer.  The XML meta file can include a block of the module positions that are used exclusively by the template.  It is started with a single `positions` tag, then each module position is nominated individually within a `position` tag.
    
        <positions>
            <position>breadcrumb</position>
            <position>left</position>
            <position>right</position>
            <position>top</position>
            <position>user1</position>
            <position>user2</position>
            <position>user3</position>
            <position>user4</position>
            <position>footer</position>
            <position>debug</position>
            <position>syndicate</position>
        </positions>

These positions are used by the Module Manager.  When you edit or create a new module, all the installed templates are scanned by the Module Manager.  If positions are defined in any of the template XML meta files, these are all collected and shown in the _Position_ select list.  If you are running your Joomla site in Legacy Mode, you will also see all of the preset module positions that were available in Joomla 1.0 (_user1_, _user2_, etc).

## Language File

A language file is required if you want to display translated information in the Administrator Template Manager.  This could include the template name that is display in the Template Manager list, the template description and/or the labels and tooltip descriptions.  The required block is started with a single `languages` tag, then each language file is nominated individually within a `language` tag as follows:
    
        <languages>
            <language tag="en-GB">en-GB/en-GB.tpl_theartofjoomla.ini</language>
        </languages>

and the file would be located at:

`/administrator/language/en-GB/en-GB.tpl_theartofjoomla.ini`

You can provide any addition translations for the template by adding addition language files (for example, `fr-FR/fr-FR.tpl_theartofjoomla.ini `for French) and additional `language` tags under the `languages` tag.

## Template Parameters

Parameters can be optionally added to your template to allow for additional customisation options that don't require the user to manually edit any of the template files.  The parameters are able to be modified by the user in the Template Manager when the user edits a template.  The available parameters are defined in the XML meta file starting with a single `params` tag followed by one or more `param` tags, one for each custom parameter.
    
        <params>
            <param
                name="color_variation"
                type="list"
                default="white"
                label="Color_Variation_Label"
                description="Color_Variation_Desc">
                <option value="blue">Option_Blue</option>
                <option value="red">Option_Red</option>
                <option value="green">Option_Green</option>
                <option value="orange">Option_Orange</option>
                <option value="black">Option_Black</option>
                <option value="white">Option_White</option>
            </param>
    
            <param
                name="show_site_name"
                type="radio"
                default="0"
                label="Show_Site_Name_Label"
                description="Show_Site_Name_Desc">
                <option value="0">No</option>
                <option value="1">Yes</option>
            </param>
    
            <param
                name="fluid_width"
                type="text"
                default="700"
                label="Fluid_Width_Label"
                description="Fluid_Width_Desc" />
        </params>

The labels, descriptions and options are shown in language file format (note that they should not contain any spaces to be forward compatible with Joomla 1.6).  For reference, the language file might include the following:
    
    COLOR_VARIATION_DESC=The colour variation for the site.
    COLOR_VARIATION_LABEL=Colour Variation
    FLUID_WIDTH_DESC=An optional percent to support a fluid width template.
    FLUID_WIDTH_LABEL=Fluid Width
    OPTION_BLACK=Black
    OPTION_BLUE=Blue
    OPTION_GREEN=Green
    OPTION_ORANGE=Orange
    OPTION_RED=Red
    OPTION_WHITE=White
    SHOW_SITE_NAME_DESC=Show the site name in the template.
    SHOW_SITE_NAME_LABEL=Show Site Name

The example shows three very common types of parameters: the select list, the radio list and a text field.  Each `param` tag will have a `name`, a `type`, a `default`, a `label` and should include a `description` attribute.

The `name` attribute is a unique name you provide that you will use in your template master file to retrive the saved value.  For example:
    
    <body class="<?php echo $this->params->get('color_variation');?>">

The `type` decsribes what sort of field will display when you edit the template parameters.  There are many types already built into Joomla but you can also define your own if you have programming experience.

The `default` attribute is the value that will be shown as the value when the user first edits the parameters.  It can be empty if no default value is required.

The `label` attribute is the text label that will display beside the field when you edit the template parameters.

The `description` attribute will show as a tooltip when you hover over the label.

For more information on parameters, see the section under the Joomla Framework.

## Administrator Templates

The XML meta file for an administrator template except that the `install` tag must include `client="administrator"` so that the Joomla installer knows that it is to be installed in the `/administrator/templates/` folder.
    
    <?xml version="1.0" encoding="utf-8"?>
    <!DOCTYPE install PUBLIC "-//Joomla! 1.5//DTD template 1.0//EN" "http://www.joomla.org/xml/dtd/1.5/template-install.dtd">
    <install type="template" version="1.5.0" client="administrator">
        <name>Khepri</name>
        <!-- Other required code -->
    </install>
