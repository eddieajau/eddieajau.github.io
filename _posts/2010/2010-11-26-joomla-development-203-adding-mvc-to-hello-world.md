---
layout:      post
title:       Joomla development 203 - Adding MVC to hello world
description: This lesson looks at converting our simple Hello World component into a Joomla MVC version.
date:        2010-11-26 20:59:31
category:    ["joomla-development","videos"]
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

<iframe allowfullscreen="allowfullscreen" frameborder="0" height="315" src="http://www.youtube.com/embed/jWXwC3uoeVI" width="560"></iframe>

This lesson looks at converting our simple Hello World component into a Joomla MVC version.

Eclipse snippets used in this video can be **[downloaded here][0]**. Final source code is available on **[Github.com][1]**.

#### Introduction

Welcome back. In the previous two lessons we created a basic component and got it running in Joomla, and we've had a look at the theory behind the Joomla MVC. It's now time to turn our simple component into an MVC component.

#### Add supporting files and folders

Let's do a little preparation before we start adding the code. The first thing we need to do is create what I call the master controller. This is a file in the root component folder and we give it the name "controller.php".

The next thing is to create a folder to hold all our models, so we add a "models" folder to the root component folder. In this folder we need to create our first model. I'm going to use the default naming convention just for this example and call it "hello.php". It's important to note here that Joomla usually expects there to be a model for each view.

Next I'm going to add a set of folders to support any views we have in our component. The base folder is called "views", then under views we add a folder for each view. In this case I'm going to go with the default convention again and call the view "hello". Under this folder I'm going to add a "tmpl" folder that will hold all the layouts for the view. Now, in the "views/hello" folder I'm going to add a file that will contain the view calls and this has a special naming convention. The name will be view, dot, the format of the output, dot php. So in this case it will be "view.html.php" because we want to display the HTML that will be placed in the layout. Now, under the "tmpl" folder we'll add the layout file and the standard convention for the file name is "default.php".

Once we've created all the files, we can grab one of our index.html files and add copies to all the new folders we've created.

#### Add a simple layout

Now, let's start fleshing out some code. I'm going to work backwards so I'm going to start in the layout default.php file. First I'll use a snippet to add the standard file header. Next I'm going to close the PHP brace and type in some text that I want to display. That's all we need to do in the layout.

#### Add a view that extends JView

Let's move to the view.html.php file. Again, I'll use the snippet to complete the file header. When that's in I'm going to use another snippet to given me a basic view class. I fill in the package and sub-package to suit, then I just need to add the name of the component, and the name of the view. In this case, both names are "hello".

Let's look at the result we have. First there is a function call to "jimport". We use the jimport function to load library classes and we give it a dot-notation path to follow to load the class, and this path marries with the folder and file hierarchy under the core "libraries" folder. Suffice to say, it loads the file that defines the JView class. Next we have a DocBlock for the view class and as I mentioned in the Introduction to this course, you should always always have a DocBlock for a PHP class. This DocBlock includes a brief description for the class and defines it's package and sub-package. The snippet you will be using will also have @since, which tells you the version that you added this class.

Now, the class name is important. It's structure has to be the name of the component, followed by the word View, followed by the name of the view. It sounds a bit silly in this particularly case because we are using all the default naming conventions to keep it simple, but this gives us a class name of HelloViewHello, and it extends the JView class. That's all we need at this stage for things to "just work".

#### Add a model that extends JModel

Let's move to the model hello.php file. Note this file name is the same as the name of the folder for the view which it supports. We add the snippet for the file header DocBlock as usual. Now I'm going to add a snippet that builds the basic model class. Just like for the view, there are two key pieces of information to construct the model class and those are the name of the component and the name of the model.

First we need to j-import the based model class from the libraries.

The name of the model is very similar to the view. It's the name of the component, followed by the word Model, followed by the name of the model. Again, HelloModelHello is a silly sounding class name but that's just because we are using default names. This model class extends the JModel class. And just like the view, that's all we need for the moment for things to "just work".

#### Add a master controller

So, we've added the view and the model - the last piece in the puzzle is to add the master controller. Let's move back to the controller.php file and I'll add the standard header for the file. I've got a snippet for the master controller and I just need to feed in the package, subpackage and the name of the component. This snippet looks really similar to the view and the model. We've used j-import to bring in the base controller class. Then the name of the master controller is simply the name of the component follow by the word Controller and this extends the library class called JController. Just like for the view and the model, this is all we need for the moment to produce a result.

#### Instantiate the controller

We have all the pieces of the puzzle now to make our MVC hello world - all we need to do is tell the component to use them. Let's move back to the master component file hello.php. We aren't going to need the echo line any more because we want the view and layout to do this for us. I've got a simple snippet for this file. All I need to define is the name of the component and we are just about there.

Ok, there's some interesting code here so let's take a short walk through it. The first block is an access check for whether the current user can access this component. When use PHP's chaining ability to get the user object via the JFactory getUser method, and then call the user authorise method. We pass this method two arguments. The first is the permission to test for and core.manage is the standard permission in Joomla 1.6 that controls access to a component. The second is the context for the permission and in this case is the name of the folder the component lives in. All this translates into is the current user allowed to core.manage the com\_hello component. If they aren't then we are going to return control to Joomla and raise a warning using Joomla's JError class.

Once we get passed access challenge, we need to use j-import again to bring in the base JController class. Then there are three simple steps. We instantiate the controller using JController's getInstance method. All we need to do is pass the name of the component to it and it will go and find the class we declared in controller.php.

Next we execute the task from the request. We do this by using a helper class called JRequest and using its getVar method. We just have to pass it the name of the request variable we are after. The execute method goes off and does all our MVC magic in all the other files we've just created. When it comes back, the last thing we need to do is fire the redirect method in the controller. We'll look at why we do this in another lesson, but for now just take it for granted that the controller will sometimes set another page for the browser to go to. 

#### Look at the results

With all that in place, we can turn back to our browser, and our Joomla site and access our Hello World component in the usual way. And there you go. The message we put in the layout a while back is now displaying nicely, all powered by the Joomla MVC.

It's still not quite looking like a normal Joomla component so in our next lesson we are going to look at how to add a toolbar to the page, specifically the view. See you back real soon. 

[0]: http://eddify.me/categories/snippets.html
[1]: https://github.com/eddieajau/joomla-hello-world
