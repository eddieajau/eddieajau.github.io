---
layout:      post
title:       Joomla Development 102 - Development Tools
description: In this session I'm going to cover some of the software you need to run Joomla and give you some suggestion about development tools. 
date:        2010-11-25 20:25:15
category:    ["joomla-development","videos"]
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

<iframe allowfullscreen="allowfullscreen" frameborder="0" height="315" src="http://www.youtube.com/embed/dH6QX8dhQsE" width="560"></iframe>

Welcome back. In this session I'm going to cover some of the software you need to run Joomla and give you some suggestion about development tools. 

#### Local web server

First off you need a web server, and Apache is by far the most popular but you might also use IIS in a Microsoft environment.  

#### PHP

The second key piece is PHP, and this integrates tightly with your web server. You'll need at least version 5.2.4 to run Joomla 1.6\. PHP also comes with downloadable help files and I find the chm file quite useful to refer to from time to time. 

#### MySQL

The last key piece of software is the MySQL database and you are going to need version 5.0.4 or later.

#### Bundles

Fortunately for most platforms there are bundled packages available such as XAMPP for Windows, Linux and the Mac and this makes setting up your server environment much easier. I personally use MAMP for the Mac to run my Joomla instance.

#### Database editor

With all that in place, next you need a database administrator. phpMyAdmin is a popular web-based choice. MySQL itself offers a suite of tools for several platforms. For the Mac I use Sequel Pro as it's a bit more stable than the tools MySQL provides.

#### File/folder difference tool

An optional but useful tool is a a program that can show the differences between files and folders. Popular choices here include DeltaWalker and WinMerge.

#### Browser

Of course you are going to need a browser and nowadays Firefox, Safari or Chrome are good choices and each includes a valuable suite of developer addons.

#### Integrated development environment (IDE)

And finally we get to the heavy lifting which will be done by your IDE or Integrated Development Environment. Popular choices here are Zend Studio, NetBeans, and my personal favourite is Eclipse with phpEclipse or you can use PDT as well.

#### Using snippets in eclipse

While we are on the topic of Eclipse, I want to show you something. Most IDE's have some sort of code snippet support. When we get into the main lessons, I'm going to be using these heavily, so I'm going to show you how to create one so you know how it works.

Before we start copying code, we need to add the Snippets View to Eclipse. We do this by looking under Window in the menubar, then selecting Show View. We search for snippets and then click OK. The view will appear somewhere on the screen - I usually have it docked next to the class outline view but you can put it wherever it suits you.

The next steps are to highlight a block of code, then we right-click in the snippets area and select "Customize". I've already got a category started but if this is your first time, you'll need to add one. Next click the New button and pick New Item. Eclipse will give you a blank template to fill in.

Change the Name to something descriptive. This is the name that will appear in the snippets list. Give the snippet a description if you want - this will appear as you hover over the snippet names in the list. Then just paste your code in the Template Pattern area.

You could stop here but Eclipse gives you the ability to add custom variables to the snippet. What I'm going to do is make one for the component name that appears twice in this block of code. I just need to click the New button to create the variable. I'll give it a better name and I'll give it a description. With that, I find it's better to be very descriptive because after a while you end up with a lot of snippets, with a lot of variables probably doing vastly different things. You can also give the variable a default value if you want.

Next just position your cursor where you want the variable to be inserted, then click Insert Variable Placeholder, and then click the name of the variable. Repeat as many times as you need to. Click OK when you are done.

Now, let's clear away the code we had in the file and use the snippet to do the same thing. You'll see the new snippet is now in the list of snippets. We just need to double click on it to have it inserted. If there were no variables in the snippet, the code will just appear in the file. In our case we've got a variable so it's giving us a form to fill out. Just type in the value of the variable and then click the Insert button. Your snippet should appear in the file with the variable placeholders replaced with the value you typed in.

Pretty cool huh? Our next lesson is about coding styles. I know it's not the most interesting topic in the world but it is one of the most important so don't skip it - I \*will\* know if you have. See you soon.

Eclipse snippets used in other videos can be **[downloaded here][0]**.

[0]: /categories/snippets.html
