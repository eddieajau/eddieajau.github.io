---
layout:      post
title:       Joomla development 209 - Adding the Table Class
description: This lessons looks at how you add the database table class that supporting loading and storing records in your Joomla component.
date:        2011-02-16 13:30:10
category:    ["joomla-development","videos"]
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

<iframe allowfullscreen="allowfullscreen" frameborder="0" height="315" src="http://www.youtube.com/embed/4JWaOQjxOZc" width="560"></iframe>

This lessons looks at how you add the database table class that supporting loading and storing records in your component.

Eclipse snippets used in this video can be **[downloaded here][0]**. Final source code is available on **[Github.com][1]**.

#### Add the /tables/ folder

Welcome back. I'm happy to announce that, in this lesson, we are back in the PHP. Get your workspace ready and let's make some table classes. This is where we really start turning our "Hello World" component into something useful.

First of all, we need to create a new folder for any table classes that the component is going to use. We call the folder "tables" and we put it directly under the component folder.

#### Add the message.php file

Next we are going to add a file to connect with our messages table that we created in the last lesson. Remember when we looked at the MVC the files and classes had related names? Well it's the same for tables. Generally we name a table in the plural form, in our case that was "jos\_hello\_messages". However, for the table class, we generally use the singular form because we only ever use the class on one record at a time. So the file is going to be called "message.php". Because we've added a new folder, we'll just grab an existing index.html file and copy it in.

#### Create the table class that extends JTable

Now, let's go into the file and create the PHP header as we've done in other lessons. Once you've done that, find the snippet for the "Basic Table Class" and we'll have a look at the form. So, for a basic table we add the package and subpackage for the Docblock as normal. Then we add the component name in proper case, "Hello" with a capital H. The table should be the same as the file name in proper case but without the ".php". That will then give us a class name of "HelloTableMessage".

Finally we need to give the class the actual name of the database table that the data comes from. We just need to fill in the name of the table without the "jos\_" database prefix. There's also an opportunity for you to change the name of the primary key of the table if it's different from "id".

Insert that snippet and we'll have a look at what we've got.

#### Define the table and primary key name in the constructor

If you are familiar with Joomla 1.5, the first thing you will notice is that there are no field variables defined as properties anymore. In Joomla 1.6, the parent JTable class looks them up for you. So instead of spending lots of time typing them out, we can jump straight into the constructor.

The constructor simply calls the parent class constructor, but, in doing so, it defines the name of the database table and the name of the primary key of the table. Do you notice something funny about the table name? It starts with a "\#\_\_" string. That's actually a shortcut that Joomla replaces with the database prefix defined in your Joomla configuration file. You don't have to worry about including that manually every time you use a table class or build a query.

#### Override the bind method to convert the params array to a JSON string

Slide down to the bind method. The bind method is used to load data from a form into the JTable class, usually so that we can save it to the database.

We are overriding this method to account for the "params" field. Usually the data for the "params" field comes from a web form in an array. If it does, we need to convert that to JSON format. If it is an array, we load it into a class called JRegistry and then convert that value into a string. PHP 5 has some pretty funky magic methods for converting classes to string, and for JRegistry, when you convert it to a string it assumes you want that string in JSON format.

After we've done that, we pass the incoming data back to the parent method to suck it in the class properties.

#### Override the check method to ensure the data is in the correct format to store

Now just move down to the check method. This method is usually called after you've called bind, but before you save the data to the database. It checks that the incoming data is ok to be saved. In our case here, we are adding some code to ensure that the user has supplied a title.

Override the store method to add the creation and modification information

Finally, slide down to the store method. This is the method that either inserts a new record into the database, or updates and existing one. What we want to do in this method, before we hand off to the parent, is one of two things. If this is a new record, we want to set the user id for who is creating it and set the time, but if it's an existing record, we want to set the user id for who is modifying it and the time.

Both the current user id and the time are constant so we can find those first. Let's look at how we get the date first.

Joomla has a date handling class called JDate. We could create a new JDate object if we wanted to, but a better way is to use a factory method to get it. JFactory, as we've seen in previous lessons, is a class you will use a lot to get other system objects, and one of its methods is called getDate. Note that JFactory is not an object, so you call all its methods statically using the "::" operator. By calling the getDate method, the timezone is automatically set for you and it also handles non-gregorian calendars that might be set for a specific language. JDate has a method for returning a date in MySQL format, so, we use chaining to get the date, in MySQL format, all in one operation.

One thing to note here is that the date returned will be in universal time, or UTC or also called GMT. We almost always store dates in UTC so that people looking at data in different timezone will see the correct local time.

Next, how do we get the user id? Well, as we've seen before, JFactory also has a getUser method which will return an object representing the current, logged in user. The object is actually an instance of the JUser class and this has properties about the user we can access using its "get" method. The property we want to get is the "id" so we just pass that field name to the "get" method.

Next, we do a simple check for whether this is a new record and an existing record. If it's is new record we set the created time and user id with the variables we've already assigned. If it's an existing record then we update the modified time and user id.

Finally, we let the parent "store" method handle the actual database calls required for saving the record.

That's all we need to do to get our data saving at the most basic level and that concludes this block of lessons. We will now move into creating the list and edit form views that allow the user to interact with the data. See you back soon. 

[0]: http://eddify.me/categories/snippets.html
[1]: https://github.com/eddieajau/joomla-hello-world
