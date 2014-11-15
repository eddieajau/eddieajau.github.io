---
layout:      post
title:       Joomla development 204 - Adding a toolbar
description: This lesson introduces looks add adding a toolbar and introduces Joomla's text translation API.
date:        2011-01-05 20:05:17
category:    ["joomla-development","videos"]
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

<iframe allowfullscreen="allowfullscreen" frameborder="0" height="315" src="http://www.youtube.com/embed/-HzQwQO-iAA" width="560"></iframe>

This lesson introduces looks add adding a toolbar and introduces Joomla's text translation API.

Eclipse snippets used in this video can be **[downloaded here][0]**. Final source code is available on **[Github.com][1]**.

#### Adding the snippet

Welcome back. In our last lesson we created the basic parts that make an MVC component work. Now we are going to start fleshing it out to look a bit more like a real component by adding the page title in the toolbar. Let's jump into the view.html.php file in the hello view.

I've got a snippet here for a "Basic View with Toolbar" and I need to fill in a few values: the name of the component in proper case, the name of the component in upper case, and finally the name of the component folder. You can see I've added two methods to the class: a display method and an addToolbar method. Now, the JView class already has a display method - that's what gave us the result in the last lesson - so we are actually overriding the default method to allow us to add the toolbar support. You can see we are calling the addToolbar method and then we are calling the display method in the parent class - mainly because we are quite happy with the job it's doing and we don't want to reinvent the wheel.

I'm just going to jump down to the addToolbar method and comment out a few lines because it's a bit early for us to be using them. I want to comment out the line starting with $canDo and then the if-block at the end of the method. This leaves us with call to the JToolbarHelper class's title method. All we do for now is pass the title that we want to see on the page. But as you can see, it's a little different from before because this is the first time we've passed a string to Joomla's translation system. We do this using a class called JText.

#### Introduction to JText

JText is a static class and it has a number of useful methods. The method you will use the most is the underscore method. The reason we chose underscore is because PHP has a built-in translation system using a function called gettext, and PHP has an alias or shortcut to this function being a function called underscore. So in the Joomla API we decided to mirror that functionality. All we do is pass a key to the JText underscore method and the translation system does the rest. It will try to look up the key in an .INI files that Joomla has loaded. You should recall we've played a little with the .INI files in previous lessons. If the translation system does not find a matching key, it will simply display whatever text was passed to the method.

To avoid naming collisions with other extensions we generally have a naming convention for the language keys that is prefixed name of the extension. In this case we can see that we've used the folder name of the component as that prefix.

#### Add the addToolbar method to the view class

This method adds the title and the "Options" toolbar button. Also look at the title translation. For now, just comment out the access controls - we'll come back to that.

#### Untranslated result

Let's have a look at what we've got so far in the browser. When we fresh the page we can see that the toolbar area is now expanded and our page title is showing. We can also see that our language key has passed straight through the system and Joomla is just displaying it. It obviously hasn't found a match so let's fixed that up.

#### Add the language key and string

Let's jump back to the view.html.php file and copy the language key. As a rule, because the key needs to be uppercase in the .INI file, we also make sure language keys are uppercase in the code as well. I'm just going to copy that key and then open one the files we created in an early lesson, the en-GB.com\_hello.ini which is the main language file for the component.

It's currently empty so I use my "INI File Header" snippet to start the file off, and then I'll just paste my key into place. Now remember that we need to wrap that value in double quotes so that the file will parse without error.

We can save the language file and just back to the browser. Refresh the page and we can see that the translation system is picking up our value from the .INI file and it's starting to look a little more like a typical component.

That's it for this lesson. In the next lesson we'll set up the basic access controls for the component and add the Options button to the toolbar. So you back real soon.

[0]: http://eddify.me/categories/snippets.html
[1]: https://github.com/eddieajau/joomla-hello-world
