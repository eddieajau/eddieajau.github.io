---
layout:      post
title:       Joomla development 217 - Backend Edit Form Introduction and Adding an Item Sub-Controller to a Joomla Component
description: This lesson introduces a new section for how to work with backend edit forms and shows you how to add the item sub-controller in Joomla 1.6.
date:        2011-05-29 21:14:51
category:    ["joomla-development","videos"]
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

<iframe allowfullscreen="allowfullscreen" frameborder="0" height="315" src="http://www.youtube.com/embed/apk7OeCcLLo" width="560"></iframe>

This lesson introduces a new section for how to work with backend edit forms and shows you how to add the item sub-controller.

Eclipse snippets used in this video can be **[downloaded here][0]**. Final source code is available on **[Github.com][1]**.

#### Introduction

Welcome back. I trust you've enjoyed the lessons so far. This is the start of a set of lessons to fill in one of the last major gaps in our component - and that's the ability to add and edit data. There are only a hand full of steps left. First, we'll add the sub-controller that drives the edit process. Then we'll add the model class that builds the edit form and processes loading of the data into that form, followed by saving the data. Then, we'll have a look at the XML file that actually defines all of the fields in the edit form. Lastly, we'll look at the view and layout that displays the form and then take the component for it's first real test drive.

#### Add the message.php sub-controller file

So without further adieu, let's create the item sub-controller. Under the /controllers/ folder, create a file called "message.php". This is going to be the sub-controller that handles the add, edit, save and cancel requests from the browser.  

#### Create the sub-controller class

Look under the "Backend Edit Pages" category in your snippets and look for the "Backend Item Subcontroller" snippet.

Fill in the package and subpackage as normal as well as the name of the component. The last field is the name of the view that this controller supports so type in "Message" in proper case. Insert the snippet and let's have a look.

Once again, this class follows a strict naming convention being the name of the component, followed by "Controller", followed by the name of the view, giving us "HelloControllerMessage". There is not a lot to this class because all of the functionality is automatically provided in the JControllerForm class from which it is derived. You would only extend this class if you needed to add custom access controls, like we do in com\_content, or change the behaviour of the page redirect, like we do in com\_modules.

So that's it. In the next lesson we'll add and explain the edit form model. See you back soon.

[0]: http://eddify.me/categories/snippets.html
[1]: https://github.com/eddieajau/joomla-hello-world
