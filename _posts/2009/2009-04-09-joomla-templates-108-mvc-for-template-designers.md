---
layout:      post
title:       Joomla Templates 108 - MVC for Template Designers
description: MVC can be a scary acronym for the uninitiated.  It stands for Model-View-Controller and the concepts behind MVC are responsible for the extra flexibility that is now afforded to the designer.  While parts of the theory can be rather involved and complicated, the only part that the designer need worry about is the V for View.  This is the part that is concerned with output.
date:        2009-04-09 10:47:22
category:    joomla-templates
image:
  thumb:     vendor/joomla.png
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
MVC can be a scary acronym for the uninitiated.  It stands for Model-View-Controller and the concepts behind MVC are responsible for the extra flexibility that is now afforded to the designer.  While parts of the theory can be rather involved and complicated, the only part that the designer need worry about is the **V** for **View**.  This is the part that is concerned with output.

Different extensions display output in different ways.

Components, as you would already know, are fairly complex and have the ability to display different information in different ways.  For example, the Articles Component (com\_content) is able to display a single article, or articles in a category, or categories in a section.  Each of the ways of representing the different types of data (an article, or a category, or a section) is called a _view_ (this comes from our MVC terminology).  Most components will have many views.  However, the view doesn't actually display the output.  This is left up to what we call a _layout_ and it is possible for a view to have a variety of layouts.

The main thing to remember here is that components can have multiple views, and each view can have one or more layouts.  Each view assembles a fixed set of information, but each layout can display that information in different ways.  For example, the Category view in the Articles component assembles a number of articles.  These articles could be displayed in a list or in a table (and probably other ways as well).  So this view may have a _list_ layout and a _table_ layout to choose from.

Modules, on the other hand, are very simple.  They generally display one thing one way.  Modules don't really have views but they do support a layout.  Some developers might even support a choice of layouts through module parameters.

## Template versus Layout

It is very important to distinguish between the role of template and the role of layouts.  The template sets up a structural framework for the page of the Web site.  Within this framework are positions for modules and a component to display.  What actually gets displayed is governed by the module layout, or the combination of view and layout in the case of the component.

The following image shows the structural layout of a typical Joomla! template (rhuk\_milkyway, the default for 1.5).  The module positions are displayed by adding tp=1 to the URL (eg, `index.php?tp=1`).  You can clearly see where the module output is contained within the overall template, as well as the main component output starting in the lower-centre region.  However, what is actually output in those regions, is controlled by the layouts.

![Screenshot](images/reference/frontpage_tp1.png)

## Ancillary Customisation

While not strictly related to the MVC, there are two other important areas to consider when looking at customising the output of Joomla!.

In addition to layouts, modules have what we call _chrome_.  Chrome is the style with which a module is to display.  Most developers, designers and probably some end-users will be familiar with the different built-in styles for modules (raw, xhtml, etc).  It is also possible to define your own chrome styles for modules depending on the designer result.  For example, you could design a chrome to display all the modules in a particular position in a fancy javascript collapsing blind arrangement.

In the screenshot above, you can just make out the names of some of the built-in module chrome used (**rounded**, **none** and **xhtml**).

The second area has to do with controlling the pagination controls when viewing lists of data.
