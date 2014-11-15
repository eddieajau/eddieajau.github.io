---
layout:      post
title:       Joomla development 211 - Adding the Model to the List View of the Joomla Component
description: This lesson continues looking at building a list view for a component in the administrator, adding the model that is required to retrieve the data from the database.
date:        2011-03-17 17:19:52
category:    ["joomla-development","videos"]
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

<iframe allowfullscreen="allowfullscreen" frameborder="0" height="315" src="http://www.youtube.com/embed/jyKcpsLFJ8E" width="560"></iframe>

This lesson continues looking at building a list view for a component in the administrator, adding the model class that is required to retrieve the data from the database. It looks in detail that the JModelList class and its populateState and getListQuery methods.

#### Create the list view

Welcome back. We finished up last time having just added the toolbar for the list view, so let's see if there's anything to see in the browser. Swap over and you'll remember we were left with an error that told us the view was missing. Refresh the browser and you'll see we get a new error. Whenever you see that "Call to a member function get() on a non-object", at this stage, it's almost always because you've forgotten to add the model, or the class name of the model is mistyped. In our case, it's simply missing. So let's add that.

#### Adding the list model that extends JModelList

Jump back to your editor and find the models folder. Remember from an earlier lesson I explained the naming convention for models. The basic rule is there's a model for each view with matching name. So create a file called "messages.php" and this will hold the model for the list view.

Add the header as usual and then find the snippet called "Basic List Model". When the snippet form opens, fill in the package and subpackage as usual. Next, type in the name of the component, "Hello", in proper case, then type in the name of the model. Remember, the model name matches the view name so we type in "Messages" in proper case.

After that is a variable for the default sort field for the list. This can be any field in the primary or joined tables but in our case "a.title" is appropriate. Next, we add the name of the primary database table for the list, without the database prefix, "hello\_messages". That's all we need to fill in so insert that snippet and let's have a look at what it generated.

First off, we need to include the JModelList class. This is a class that is extended from JModel and includes lots of really useful API to support working with lists of data.

Slide down the the class definition. You should be getting used to Joomla's naming convention by now. The list class is made up of the component name, plus "Model", plus the name of the model which is also the name of the view. That gives us a class name of "HelloModelMessages" and the class extends from JModelList.

#### Customising the populateState method

Slide down to the populateState method where we really begin looking at the new stuff that Joomla 1.6 gives us. The populateState method is a very special method. It's a way of very elegantly getting information from the request within the model itself. The JModelList class is already aware of several request variables that are important to lists, such as the ordering column, the ordering direction, the length of the listing page and the listing page you are on. So, all we need to do is call the parent populateState method that's in JModelList and pass it the specific information about our list which is the name of the default ordering column and the default ordering direction. Note that the snippet you have will look slightly different to fix some PHP strict issues that came up after this video was shot. We'll look at more things to do in the populateState method in the next lesson.

#### Customising the getListQuery method using JDatabaseQuery

Slide down to the geListQuery method. This is the method that actually builds the query to retrieve the data that we'll be displaying in the list, so we'll spend a bit of time unpacking it. The important thing to note about this method is that it's job is simply to prepare a database query. Getting the data itself is automatically handled by other methods in the JModelList class, like the getItems method that we touched on in the last lesson when we looked at the view class.

First, we need to initialise some variables we are doing to use. The first is the database connector class which we typically just call $db. The model is already aware of the database connector that Joomla is using and we can get that by calling the getDbo method. The database object gives us access to be able to set queries and execute queries, load result sets in many different formats, check for database errors and much more.

The next variable to initialise is the query builder object into the $query variable. You might be used to building queries by hand using SQL syntax and then passing that to the database object's setQuery method. You can still do that in Joomla 1.6, but a better way is to use the database query builder class called JDatabaseQuery. The easiest way to get one of these object is by calling the database connector's getQuery method, passing a value of true in the argument list. This returns a new database query object. If you omitted the true argument, then the call to getQuery would return the current query that the database connector is storing.

Now, $query has a number of methods that closely mimic SQL syntax and the first one we come across is the select method. This method allows you to add a list of fields for the SELECT part of the query. You can see that we've added a bit of flexibility in setting the SELECT statement. Remember, we talked about getState when looking at the view class? The way the getState method works is if the variable name has been defined, it will return that, otherwise it will return whatever you've supplied in the second argument. Well, here we've used it to check if the developer has set a custom SELECT statement in the state variable called "list.select". If they haven't, then we use a default list covering many of the fields that we will want to display or use in the list view. One thing to avoid when crafting queries is the temptation to use SELECT \*. It's always better to have a think about the fields you actually need if for no other reason than to conserve memory. Remember, many content tables have one or more free text fields and in a list view these are quite unnecessary to retrieve and will consume a lot of memory.

Moving on, our next call is to the from method and this obviously helps us create the FROM clause in the SQL statement. As a rule, I nearly always alias my tables so we get around having to deal with ambiguous field names. That's what the "AS a" bit is for.

Ok, move down to the next few lines and we'll see where the real power of the query builder class comes into play. In the messages database table there is a language field and we want to display the title of that language, not the language code. To do that we need to create a join over the core joomla languages table. The beauty of $query is that we can add to the different clauses in the SQL statement in any order we like. So, you'll see here that we are calling the select method again. That's quite ok with the query builder as it just adds it to the list of things in the SELECT clause, and will automatically handle any extra commas so you don't have to worry about including them.

So, we're grabbing the language from the language table, and we need to specify the join. We have a couple of methods we can use here. Those are join, innerJoin, outerJoin, leftJoin and rightJoin. In the code I've used the generic join method where I specify the join type as the first argument, and then the table and join condition as I would for any normal query.

Next, I do another join to get the name of a user that has the record checked out, if applicable. What you can start to see is how $query can be used to assemble queries programmatically in the order that make sense to you, rather than the order that is necessarily required in SQL.

Next, is a join over the access level to get the text version of the viewing access level for the record.

Next, we do a join over the categories table to get the title of the category that the record has been assigned to. We'll cover category support in future lessons.

Finally, we do a second join over the users table to get the name of the author of the content. Note that in each of these joins we've used a different alias for the table name.

The last thing we do is set up the ordering clause and this takes a little bit of mucking around because we want to support the save-order functions in the list. So, we grab the list ordering and order direction from the state variables in the model. Because we support categories, ordering only makes sense in sets of records in the same category. So, if the field we want to order the list by is either the ordering field itself, or the category title, then we are going to manually prefix the ordering column with the category title fields. After that, and also for any other case, we build and pass an ORDER BY clause to the order method in $query. You'll see here that $db is doing some work. It's performing an SQL escape on the ordering clause just in case there are any malicious characters in the ordering field. The risk of this will be low and we'll see how to defend against query injection of the user supplied ordering fields in another lesson.

Finally, there is a commented line that you can use from time to time to echo the query to the browser for debugging purposes.  

#### End of part 2

That's a good start for the getListQuery method so let's jump back to the browser. Refresh and you'll see we've finally conquered our errors and the page is displaying nicely, but there's still not much to see. What are we missing? We've got the view; we've got the model and we've got the view pulling data from the model. What's missing is the layout to display the output and we'll add that in the next lesson. See you back soon.
