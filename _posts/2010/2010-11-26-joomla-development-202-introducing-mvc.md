---
layout:      post
title:       Joomla development 202 - Introducing MVC
description: This lesson introduces the concepts of the Model-View-Controller paradigm and how it relates to the Joomla Framework API.
date:        2010-11-26 20:53:27
category:    ["joomla-development","videos"]
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

<iframe allowfullscreen="allowfullscreen" frameborder="0" height="315" src="http://www.youtube.com/embed/zA_oHUSYG3g" width="560"></iframe>

This lesson introduces the concepts of the Model-View-Controller paradigm and how it relates to the Joomla Framework API.

Eclipse snippets used in this video can be **[downloaded here][0]**. Final source code is available on **[Github.com][1]**.

#### Introduction

Welcome back. In this lesson we will quickly go over what MVC means in the Joomla environment.

#### The controller, model and view

The first piece we will look at is the Controller. The controller's job is to deal with tasks that are being requested by the client or the system. The base API class we use for a controller is called JController.

The next piece we have is the Model. The model's job is to know all about the data that we'll be using. The base API class we use for models is called JModel. Models don't know anything about displaying the information, just how to get it, or set it as the case may be. When designing your models it's important that the information you return can be used generically by anything that wants to use it.

The last piece we have is the View and the view is concerned with displaying output, usually in a HTML format but it could also be an XML feed or even a file to download. The base API class we use for views is called JView. The main point to note with views is they process the data they are given, or ask for, and they can return that information to the user in multiple ways.

#### Showing the workflow of a typical task

So how do all these pieces work together. Let's look at a typical example for a how a component displays some output. Each component has a master controller, and the component will ask the controller to execute a task. The controller will then create a model to get the data, and a view to display the output, and the controller will connect the model to the view. The controller then asks the view to display the data. Since the view doesn't know how to get data information, it asks the model for it. The model will then query some data source and then return the data to the view. Once the view has that information, it calls a "layout" to display it, and then Joomla handles the rest of the work to grab the output and put it into the template.

#### Showing the workflow of a typical action task (live save)

Let's have a look at another example for a task that doesn't have output, like when you are saving an article. In this case the component could be using a master controller, or it could be using a specific sub-controller (and we'll look at what sub-controllers in future lesson). The controller creates the appropriate model and then calls an appropriate method in the model, which in this case would be a method to save the data. Then model will then do the thing it is supposed to do, in this case saving the data that was passed to it. When the model is finished, the controller is probably redirect you to a new page.

#### Conclusion

Those two examples cover pretty much all the cases you'll come across during normal component development. In the next lesson we'll see how we can rework our simple "Hello World" example to use the Joomla MVC. See you back real soon.

[0]: http://eddify.me/categories/snippets.html
[1]: https://github.com/eddieajau/joomla-hello-world
