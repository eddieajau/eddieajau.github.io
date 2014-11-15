---
layout:      post
title:       Joomla development 210 - Adding a List View to the Hello World Joomla Component
description: This lesson shows you how to add a typical data list view to the backend a Joomla component.
date:        2011-03-17 17:15:33
category:    ["joomla-development","videos"]
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

<iframe allowfullscreen="allowfullscreen" frameborder="0" height="315" src="http://www.youtube.com/embed/U33_P_JQ2g4" width="560">

This lesson shows you how to add a typical data list view to the backend a Joomla component.

#### Introduction

In our previous lessons we laid the foundations for an MVC component, and have set up the database for our data. It's time to start looking at how to manipulate that data, but before we can actually enter the data, we need list it. To do that we are going to need a new view to list our messages.

#### Override the default view in the master controller

Jump into the master controller file. While we already have a view called "hello", I don't really want that to display when a user first comes to the component. I want the list of messages to display. To do that, we can tell the controller which view is the default. Position your cursor above the "display" method and then look for a snippet called "Controller Set Default View". In this snippet you can add the name of the view you want to be the default. In our case, I'm going to be building a view called "messages" (plural) to list all the hello messages in this component. Type that in and add the snippet. Save the file and move to the browser. 

#### Look at the browser error

I'm actually going to navigate you through some errors so that when you see them in the future, you'll have a clue as to what they mean and how to fix them. Go to the hello world component and have a look at what happens. Joomla has thrown a 500 error, which usually means some major problem has occurred. The error says:

`View not found [name, type, prefix] messages, html, helloView`

What this error means is that Joomla was expecting to find the messages view, and a class of HelloViewMessages. If you see that in future, it can mean that a view folder is misnamed, a view file is misnamed, or the class in the view file is misnamed. Obviously it didn't find the view because we haven't created it yet - so let's do that.

#### Add the /views/messages/ and /tmpl/ folders

Jump back to your editor and create, under the views folder, a "messages" folder, then a "tmpl" folder.

#### Add the view.html.php and default.php files

Now, under the messages folder we want to create the view class file, so create a file named view.html.php. Then under the tmpl folder we want to create the layout for the view, so create a file called default.php. When you've done that, copy and paste an index.html file into the new folders you just created.

#### Create the list view class

Move back into the view.html.php file. Create the PHP file header as we've done before. When you've added that, find the snippet called "Backend List View". Fill out the package and the subpackage in the normal way. Some of the variables we've come across before. For the "name", type in the proper case name of the component, without the com\_ prefix. For the "view", type in the name of the view, in our case, "messages". The "controller\_item" and "controller\_list" are variables that help tell the MVC which page to return to after a particular operation. For example, when you save and close an edit form, it returns to a list, whereas if you just save an edit form, it will return to the same page. For our case, type in "message", that's the singular form, for the "controller\_item" and "messages", that's the plural form, for the "controller\_list". Finally, for the "option" variable, type in the name of the component folder, including the "com\_" prefix.

#### Explaining the list view class

Let's have a look at what this class does. First we use the jimport function to include the JView class from which this view class is extended.

Next, we declare several protected class properties that will be used by the list. The "items" property will hold an array of the records that will be displayed in the list. The "pagination" property will hold an object that helps us display pagination links. The "state" property will hold an object that holds what we call the state of the model. We'll look at what how that is used soon.

Now scroll down a bit and you'll see we have a custom display method. Remember back when I was explaining about MVC, and said how the view would get data from the model? Well, this is where it happens. The purpose of this display method is to collect all the information from the model, and then display the output. We do this using a very special "get" method in the view. Let me explain what this does.

By the time Joomla gets the view, the component controller will have already loaded the model and pushed it into the view class. The "get" method for a class based on JObject usually looks for a class property, but JView's version of the get method is special. The first example shows that we are passing the string "Items" to get. If the view finds that there is a method in the model called "getItems", it will execute that method and return the result. If it doesn't find a method in the model, then it will look for a property called "Items" in the view class. Now, I know there actually is a getItems method in the model, so this call is going to assign the result into the items property in the view class.

Likewise, the view is asking the model if there is a getPagination method, and a getState method and to assign the results to the pagination and state properties respectively.

#### Raising an error

Next, there are a few lines of code that check if any errors have been registered in the model. The model has a method called getErrors so we get the result just like we did above, and check if it's empty. If it's not, we assume that something really bad has happened and raise an error. To do this, we use an object called JError. This has a number of methods that you will come to use over time, like raiseNotice or raiseWarning, but the one we use here is raiseError because we want to halt execution and throw a full error page. I'm sure you've seen them before. The 500 code is used to signify that some sort of system error has occurred. It's always a good idea to return after you raise a hard error like that, because there is a chance that a plugin may be modifying how the raiseError method behaves.

Alternatively, you could use exceptions but how to use them effectively is a topic for another day.

#### Adding the toolbar to the view

So, we are error free and the next thing we do in a view for the administrator is set up the toolbar. We've already been introduced to the addToolbar method in a previous lesson, but this one is doing a bit more work.

The first thing it does is initialise some variables. It gets the model state and you'll remember the $canDo variable is getting a list of the component permissions available to this user.

Next we add a title to the view using the JToolbarHelper title method as we did in the "hello" view. Now it's time to add the main buttons for the list view which usually include add, edit, publish, unpublish, archive, delete, trash and preferences. To display them, we need to test the component permissions.

The first button is the add button, and to display we test the "core.create" permission and use the addNew method in the toolbar helper. The first argument is the task for the controller, and the second argument is the language string that will show under the button in the toolbar. Notice that the task has a dot notation. We'll look at this in more detail in another lesson, but it means that we want that task to be executed in a sub-controller, not the master component controller. So, for a task like "message.add", it means that the component will look for a sub-controller called "message", and then try to execute the task called "add" in that sub-controller.

Most of the remaining buttons follow a similar principle. For the "edit" button we are testing the "core.edit" permission and clicking it will set the task to "message.edit".

The publish, unpublish and archive buttons can be handled in one block by testing the "core.edit.state" permission but the task is set to reflect the required action. Notice that the sub-controller here is not "message". This time is uses "messages". The reason for this is to split actions that happen to a list of records from actions that happen to a single records. For example, you only edit one record at a time, so we use an item sub-controller named in the singular form. Publishing can happen on a list of records so we set the task with what we call a list sub-controller named in the plural form.

Next we have a block for the "trash" and "delete" (also called "empty trash") buttons. You can see that we are testing the "core.delete" permission to show the "delete" button and the "core.edit.state" permission to show the "trash" button. But, you can also see another check against something called "filter.published".

There are two things to note here. The first is that the user interface tries to make it easy to put records in the trash, but difficult to delete records permanently in order to avoid unfortunate accidents. We only allow the "delete" button to show, when the list is filtered on the "trashed" setting. This is where the model state comes in. When we get to the model, we'll see that it will be aware of several filters, one being the state of the "published" database table field. The state object is derived from the JObject class , so our old friend the get method is available and we just need to test whether the list filter for the published state is set to -2\. If it is, and the user has permission, then we show the "delete" button.

Finally we test the "core.admin" permission to see if the component options button is to be shown. 

#### End of part 1

We've covered a fair bit of ground, but we only part of the way. In the next lesson we'll add the model. See you back real soon.
