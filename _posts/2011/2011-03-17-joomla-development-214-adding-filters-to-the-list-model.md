---
layout:      post
title:       Joomla development 214 - Adding Filters to the List Model of the Joomla Component
description: In this lesson we add the filter support to the list model.
date:        2011-03-17 17:33:38
category:    ["joomla-development","videos"]
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

<iframe allowfullscreen="allowfullscreen" frameborder="0" height="315" src="http://www.youtube.com/embed/fCZo_wYbbEM" width="560"></iframe>

This lesson looks add adding filter support to the list model by expanding the populateState and getListQuery methods as well as adding a custom getStoreId method to the list class.

Eclipse snippets used in this video can be **[downloaded here][0]**. Final source code is available on **[Github.com][1]**.

#### Adding the search filters to populateState in the model

Welcome back. We left you in the last lesson looking at the filtering UI but we still need to hook those into the model. So, jump back into your editor and find and open the /models/messages.php file. Find the populateState method that we looked at in a previous lesson and position your cursor at the start of its code. Then find the snippet called "Backend list model search filters (state)" and insert it. Once again this snippet is straight code and let's have a look at what we've got.

First, we've initialised a variable called $app and this is going to hold the Joomla application object. The application object is the thing that actually runs the Joomla CMS and pulls together the component and the template to make our web page. There's a JFactory method called getApplication that we use to get this object.

Now, why do we need that? Well, Joomla has this neat feature of being able to remember the state of a particular variable in the request and there's a very useful utility method in the JApplication class called, and it's a bit of a mouthful, getUserStateFromRequest. This has a number of arguments and also optional filters for data sanitisation.

The first value we are wanting to get is the search text string from the request. We do this by invoking the getUserStateFromRequest method and passing it at least two arguments. The first is the context by which we want the Joomla application to remember this variable. We need the context so that we don't get the same search text appearing on all of the similar list for all the other components installed on the site, so we need to identify this search text uniquely for this page. Fortunately for us, JModelList is aware of it's own context and, not surprisingly, this is available in a protected variable called "context" and for our case the value would be "com\_hello.messages". All we need to do is add a string that uniquely identifies this variable, and we've used ".filter.search". All that gives us, is a name by which we can set and get a variable between page loads.

The second argument is the name of the request variable, and you'll notice it's the same name we used for the search text input field. So, what does this all do? Well, Joomla looks for "filter\_search" in the request. If it finds it, it returns that value but also remembers that value. If it doesn't find "filter\_search" in the request then it looks to see if it's been previously set, and if it has, it will return that value. This is how Joomla can remember what list page you were on and the state of search boxes and drop down filters when you go away from a list page and then come back again in the same session.

After we've got the value, we inject it into the model's state by using JModel's setState method. We just pass that method the name of the state variable, "filter.search", and the value we want to assign to it.

The rest of the code is very similar. For the viewing access filter, we are looking for "filter\_access" in the request and we've also added two more arguments. The third argument is the default value to use in the event that no value has been supplied and no previous value has been remembered. The fourth argument is the casting filter for the return value. In this case we want the value to be cast as an integer. When we have the value, we set it in the "filter.access" model state variable.

Next, is the published filter, looking for "filter\_published" in the request and setting "filter.published" in the model state.

Next, is the category filter, looking for "filter\_category\_id" in the request and setting "filter.category\_id" in the model state.

And last is the language filter, looking for "filter\_language" in the request and setting "filter.language" in the model state. 

#### Adding the search filters to getListQuery in the model

Now, we need to change the query to adjust for the new state we've set in the model. Slide down to the getListQuery method and position your cursor just before where the ordering is handled. Look for the snippet called "Backend list model search filters (query)" and insert it. Let's have a look at what this does.

The first filter is for the search text, and we are going to do a couple of things here. First we'll get the search string from the model state and put it into a variable called $search. If the variable is empty, we'll ignore it. If it's not empty, we want to set up a search. However, I want to set up a special case for searching for a record by its id. So, I'm testing if the first segment of the string is "id:". If it is, I'm going to add a where condition to the query equivalent to where the id equals that part of the string after the "id:" prefix. Notice that I'm casting this to an integer. You always need to be mindful of user input and always sanitise it in an appropriate format. The golden rule is "never trust user input".

Moving on, if we don't find that prefix, we set up a general search of the title and alias fields. The previous case showed you how to sanitised an integer. This next part shows you how to sanitised a free text string correctly when evaluating with a LIKE keyword in the where clause. Any string we put into a query must be properly escaped and quoted.

There are two methods in the database class that do that for us: "quote" and "getEscaped". The getEscaped method ensures that any characters are properly escaped. This either stops errors from being generated by the query, but more importantly is one of the ways to help prevent malicious SQL injection attacks. The quote method runs the string through getEscaped and then wraps the strings in legals quotes based on the database engine. In MySQL's case, that would be single quotes. Most of the time you'll just use the quote method.

We are going to use the LIKE keyword to search for any records where the title or alias is like the search text. To do that we add the "%" wildcard to either side of the string. This basically says look for any record where the search text occurs anywhere in the title or the alias fields. If, for example, you omitted the first "%" character, that would look for results that start with the search text.

However, MySQL also allows for another wildcard character, the underscore, which matches a single character. We generally don't want to allow this so we need to use a second argument in the getEscaped method set to true, which means that it will escape any wildcards in the search text, such as the percent (%) character and the underscore (\_). The end result is a line of code with a getEscaped method nested in a quote method. If you want to allow percent or underscore in the search text, then just use the quote method but remember, while this may be ok in the backend where you might trust users, always do the double sanitisation as shown on the frontend otherwise your site will be subject to a very nasty denial of service (DOS) attack.

The next block of code is simply adding another where condition if the access filter is set. Note that we expect the value to be in integer so we cast the value accordingly. It's also worth noting that when calling the where method in the JDatabaseQuery class multiple times, all those conditions are glued together with AND keywords.

The next block looks at the published filter. This is another conditional block depending on the value of the filter. If the filter is numeric, we just add a where condition to test for that. However, if the value is exactly equal to an empty string we want to show records where the published field is 0 or 1\. This occurs when the published filter is not selected and gives the effect of hiding any archived or trashed records from day-to-day viewing. You can obviously tune that "default" condition to whatever suits you or your users best but I think showing just published and unpublished records works well.

The next block looks at filtering on the category id. Again, we are testing to see if the value of the filter we got from the model state is either numeric or an array. If it's numeric, we add a simple condition to the query where the category\_id field is equal to that specific value. If the value is an array, we need to do a few things. First, we need to sanitise the array to ensure we only have integers. The most effective way to do this is by using the JArrayHelper class and a method in that class called toInteger. That will convert all the elements of the array into integers so that we can safely add them to the query. Next, we use PHP's implode function to convert the array into a string of comma separated integers. Finally, we add the condition to the query, enclosing our list of numbers in round brackets.

The last filter looks at the language filter. If that is set we add another condition and notice that we only use the quote method this time. Because we aren't using the LIKE keyword in the query, there is no need for the special treatment like we used for the search text. 

#### Adding the getStoreId method

We are almost there. The last thing we need to do is extend a method in the JModelList class called getStoreId. This method is already silently working for you to handle the list pagination, but we need to adjust it for the new filters we've added.

Scroll down to the end of the class and then look for the snippet named "Backend list model getStoreId". This snippet has one variable for the "since" docblock tag so if you are happy with that, just insert it. This method is used to build cache keys for this list. To uniquely identify the key, we need to add some markers for the search filters. The method takes a string and you can see we've just added a delimiter and then the state of the search, access, published, category and language filters. We then just hand that string off to the parent method for further processing.

#### End of part 5

Well, that's it for adding the filters to the list. There's not much to see yet because we have no data, but you could try changing a few of the filters and check that they hold state when you browse away from that page and then come back again. In the next lesson we will add one of the final pieces to the list view, and that is the list sub-controller which allows some of the clickable list icons, like the published state, to work. Thanks for hanging in there and see you back real soon.

[0]: http://eddify.me/categories/snippets.html
[1]: https://github.com/eddieajau/joomla-hello-world
