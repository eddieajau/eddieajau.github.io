---
layout:      post
title:       Joomla development 218 - Adding the backend item model
description: This lesson shows you how to add the backend item model and explains it's function in Joomla 1.6 and 2.5.
date:        2011-05-29 21:20:51
category:    ["joomla-development","videos"]
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

<iframe allowfullscreen="allowfullscreen" frameborder="0" height="315" src="http://www.youtube.com/embed/LAroPZWLxY8" width="560"></iframe>

This lesson shows you how to add the backend item model and explains it's function.

Eclipse snippets used in this video can be **[downloaded here][0]**. Final source code is available on **[Github.com][1]**.

#### Create the item model file

Welcome back. The backbone for our edit form is the model, and we need to provide one for the item we are going to create or edit. Under the /models/ folder create a new file called "message.php". Just like for the list view, the sub-controller, model and, as we'll see later, the view all have the same file and/or folder names.

#### Adding the model class

Now, look for the snippet called "Backend Item Model" and bring it up. Once again, fill in the package, subpackage and component name as we've done many times before. Next we type in "Message", in proper case, for the name of the model. This is used in the class name which follows the same naming rules as the list model. The next variable is the name of the database table we use to store the data. We don't include the database prefix so just type in "hello\_messages". When you've done that, insert the snippet.

You can see we have a class named "HelloModelMessage" and it is extended from the JModelAdmin class. The JModelAdmin class has a lot of built in support for the edit form but we need to include a few methods by hand in this version of the framework.

#### The getForm method

The first method is the getForm method and this gets an instance of the form object based on the new JForm class added in Joomla 1.6\. You might override this method if you want to manipulate the form in any way. For example, an article edit form will turn various fields on and off depending on the access controls available to the user. This is an abstract method so we must include it, but it's so standard that future versions of Joomla may include it in JModelAdmin.

#### The getItem method and date handling

The next method is an override for JModelAdmin's getItem method. You can see we are invoking the parent class's getItem method and, if that returns a result, we want to manipulate the data. What we are doing here is converting some of the date fields from universal time into the user's local time. To do this we are going to need to user's timezone offset.

In Joomla 1.5 the timezone offset was a number representing the hours either side of universal time. In Joomla 1.6+ the timezone offset is stored as a string representing the time zone region you are in. This is stored in Joomla's configuration file. To access this value we can use the getCfg method in the application object, which we get by a call to JFactory's getApplication method. We then pass that value into the constructor for PHP's DateTimeZone object and we store that to use soon.

The first date field we want to adjust is the "created\_time" field. This won't have a value if this is a new item, so we check if the integer value of the date is non-zero. Just as an aside, this is probably not the safest way to check if the date has been set because not all databases use a set of zero's for no date. It's probably better to check against a value we called the "null date" in the database. I'll give you an update in the notes when Joomla starts supporting other database engines where this shortcut won't work.

If the field has a value we are going to load that into a class called JDate which is derived from PHP's DateTime class. Next, we use JDate's setTimezone method to set the timezone we previously assigned in the $tz variable. This is going to convert the date from universal time that came from the database into the user's local time. Lastly, we overwrite the "created\_time" field with the adjusted date using JDate's toMySQL method, and passing an argument of true which means we want the value in local time. Again, this snippet will need to be slightly modified when Joomla starts to natively support other database engines.

If the "created\_time" field doesn't have a value, we just set it to null.

We do the same for the "modified\_time" field and then pass the result back to the calling method.

#### The getReorderConditions method

The next method is getReorderConditions and this is only required if we are supporting categories, which we eventually want to do. All this does is ensure that items are reordered within their categories. If you don't support categories in your components, you can safely remove this method.

#### The getTable method

The next method is getTable and this is just a proxy to get the correct table for this model to use. It's job is mainly to set the correct prefix for the table class.

#### The loadFormData method

The next method is loadFormData and this does a few interesting things to load the data that the form is supposed to use. First, it has a look in the application state for a variable, in our case, named "com\_hello.edit.message.data". Now, if that variable is empty, we load the data for the item from the database.

So, if we look at creating a new item, on the first pass through all the data will be empty so we'll get a blank form. If we try to save the data, and for some reason it does not validate, all the data we submitted is stored in the application state variable. So, when the page redirects back to the edit form, expecting us to fix up the bad value, we can populate the form with the data we previously submitted, rather than just showing a new blank form.

Similarly, when we edit an existing record, if we trip a validation rule the form will be returned with all our changes intact so we can fix just the bad value.

You can extend this method further, and it's worth looking at com\_content's article model to see how it uses this method to automatically set the category id for new articles.

#### The prepareTable method

Last of all we have a prepareTable method. This is a method that is called just before JModelAdmin saves the data, and gives you an opportunity to manipulate any of the submitted data before that happens.

With the data we've got in this component, the first thing we do is make sure the alias field is URL safe. If the alias hasn't been provided, we'll take the title of the message.

Next there is a check for a new item, and all we are doing here is setting the ordering past the last item in the category.

Finally there is a large block of code that makes sure the metakey field is formatted and sanitised. Ideally, this could be done as a filter associated with the JForm library but the code was a late inclusion in Joomla 1.6 - you always need to include something to improve on in the next version :)

Well, that's it for the model class. There are a lot of other methods you can override but I've shown you the basics just to get us started. In the next lesson we'll switch gears and look at the XML file that defines our JForm based edit form. See you back soon. 

[0]: http://eddify.me/categories/snippets.html
[1]: https://github.com/eddieajau/joomla-hello-world
