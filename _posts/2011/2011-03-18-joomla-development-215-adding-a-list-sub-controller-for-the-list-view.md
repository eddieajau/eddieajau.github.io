---
layout:      post
title:       Joomla development 215 - Adding a List Sub-Controller for the List View of the Joomla Component
description: This lesson looks at the sub-controller that is required for list operations like publish and trash to work correctly.
date:        2011-03-18 14:08:35
category:    ["joomla-development","videos"]
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

<iframe allowfullscreen="allowfullscreen" frameborder="0" height="315" src="http://www.youtube.com/embed/6rl5CZPG9TE" width="560"></iframe>

This lesson looks at the sub-controller that is required for list operations like publish and trash to work correctly based on the JControllerAdmin class.

Eclipse snippets used in this video can be **[downloaded here][0]**. Final source code is available on **[Github.com][1]**.

#### Introduction

Welcome back. This lesson introduces a new concept in our component design. We've already seen what the display controller does. While we could throw every other task into that controller, over time I've found it better to separate tasks the pertain to particular views or function into their own sub-controllers. This is not particularly hard and Joomla's JController class already knows how to access sub-controllers using the dot-notation in the task request variable. We saw that when we set up the toolbar for the list view.

#### Adding the controllers folder and messages sub-controller file

The sub-controllers work the same way as the display controller, but we group them in a folder called "controllers" placed under the root component folder. We'll just create that and then we'll create a new file called "messages.php" because this is the sub-controller that will be used to process tasks on selected records from the "messages" view. Remember to grab an index.html file and copy it into the new folder.

#### Adding the sub-controller class for a list view

We've already added the normal docblock so go down and find the snippet called "Backend list subcontroller" and bring up the input form. Fill in the package and subpackage for the class, then the name of the component, "Hello" in proper case and the name of the view it relates to, "Messages", in proper case. Next we add the model that the controller will be using and this will be the "Message" model. Note the singular form this time. We use the "Message" model because that is the model that has all the support for changing state, saving, ordering and so on. We'll actually create that model in the next module of lessons that deal with the backend edit form.

Insert that snippet and you should have a "wow, is that all" moment. Well, yes it is and that's because we are extending from a class called JControllerAdmin which does a lot of the heavy lifting for us.

You can see we've used the jimport function to load the JControllerAdmin class from the Joomla framework, and like all our other classes, this sub-controller has a special name format. It's the name of the component, "Hello", followed by the word "Controller", followed by the name of the sub-controller, "Messages".

The only method we need to override is a method called getModel in the JControllerAdmin class to specifically load the model that JControllerAdmin is expecting.

I just need to update the shot to reflect changes in the snippet. There we go. You can see we are passing the name of the model, "Message" in the argument list, and also the class prefix for our components, and that we are just passing those values to the parent. But notice a third argument. This is the configuration array that is passed to the model and we are passing it a specific configuration option called "ignore\_request". Remember when we were looking at the populateState method in the model? Well, that's called because we assume that, more often than not, models will get some data from the request. However, when using this sub-controller, we don't want the model to look at the request, we want the sub-controller to have complete control over any of the model state. To do that, we pass the configuration option "ignore\_request" with a value of true . That's really the only tricky bit in this whole class. Keep this in the back of your mind when you are working with models and they seem to behaving strangely - it could be because you forgot to ignore input from the request. 

#### End of part 6

That just about wraps up our list view. The next lesson looks at some final touches to lock down the security of those ordering columns which can present a minor security hazard. See you back soon.

[0]: http://eddify.me/categories/snippets.html
[1]: https://github.com/eddieajau/joomla-hello-world
