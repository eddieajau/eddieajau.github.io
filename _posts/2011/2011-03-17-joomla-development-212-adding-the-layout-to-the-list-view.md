---
layout:      post
title:       Joomla development 212 - Adding the Layout to the List View of the Joomla Component
description: This lesson shows how to add the layout to the list view that will display a paginated list of records in the Joomla component.
date:        2011-03-17 17:27:43
category:    ["joomla-development","videos"]
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

<iframe allowfullscreen="allowfullscreen" frameborder="0" height="315" src="http://www.youtube.com/embed/zLxXb3hkCgA" width="560"></iframe>

This lesson shows you how to add the layout to the list view that will display a paginated list of records.

#### Adding the list layout

Welcome back. In the last lesson we left you in the browser, so jump back to your editor and find and open the default.php file in the views/messages/tmpl folder. Add the file header in the normal way and then look for the snippet called "Backend list layout".

Now, there's not many variables in this one. We just need to type in the option for the component, that's the name of the component folder "com\_hello". Then we type in the name of the list view, in our case "messages", and then the view for the single record or item. In our case that will be just "message". All these variables are in lowercase. When you've filled them all out, insert the snippet and let's walk through the layout.

First of all, we initialise a few shortcuts to variables that are used frequently. We get the user object as we've seen before, and also the order column and direction. Remember in the view class, we had a protect property called state that we assigned a value to. Well, this is where and how we start using that information, simply by accessing those properties directly via the $this variable.

Just a quick note - the video is a little out of date because the ordering variable should be treated with the view escape method to protect against malicious injection attacks. The snippet has been updated to reflect this and I'll explain what escaping does soon.

Now, the rest of the code is more or less self-explanatory because we are using HTML to frame the display of data. But, in between the HTML, we break into and out of the view API and that's where I really want to focus in this lesson.

#### Starting the list form

The FORM tag is nothing special, but we have used Joomla's router to process the form action. We do this by calling a static method of the JRoute class called underscore (\_). Joomla's API tends to use underscore frequently to represent commonly used utility methods. While there is no SEF support for URL's in the backend, yet, it's a way to future-proof your code in the event that it one day becomes supported. We'll dig deeper into the component router when we look at frontend components.

#### The list table header

The form wraps a TABLE that we'll be using to display the list of records, and we begin with the THEAD section. The first column is a checkbox that we use to toggle the selection state of the checkboxes assigned to each row of the table. As you can see, this element has an onclick event to make this happen.

Next, is the start of the main column headings and the first heading is for the title of the record. Now, here's where we introduce some API to help us get clickable headings to change the sorting column of the list. For this, we introduce a new class called JHtml, and this is a helper class that does many things related to HTML output. It too, has an underscore method to access the most commonly used functionality. The JHtml class has a lot of helpers and these are all grouped in separate files. We access individual functions in these helpers by using a dot notation in the first argument. So, you can see we are using a helper method called "grid.sort" and this means there is helper file called grid.php and there is a class in that file that has a method called "sort". The remainder of the arguments are then passed to that method. Notice also, that we need to echo the result of the helper. This is designed so that you can use these helpers to build a string and then output that string in any manner you desire - that could be to the browser, or it could be to a file.

For "grid.sort", we pass four arguments: the language key for the heading; the ordering field that this column represents; the active direction of the list ordering; and finally the active column used to order the list.

Moving on, you can see we then duplicate this header cell for all the other columns, adding the published state and category columns. Take note of the language keys used. You can, of course, use component specific keys, but Joomla 1.6 provides many common language elements for you to use.

When we come to the ordering column, you can see we have the sort heading but there is a second element. This relates to the familiar save button that saves custom ordering values in the list.

Moving on, we have headings for the view access level, the name of the record creator, the date the record was created, and the language the record was created for.

Finally, we've added a column for the record ID. I like to include that to assist with debugging and support even though some would argue you should hide that sort of information from the user. It's up to you but I've found it very helpful over the years.

#### The list table footer

It always seems odd to treat the table footer next, but that's the way HTML prefers so that's what we do. You'll recall the view class has a pagination property and the object assigned to this has a very useful method for displaying the pagination links on the page. We just call the getListFooter method, and Joomla's framework does the rest.

#### The list table body

Finally we get to the list body where most of the data processing actually occurs.

We break into PHP and start the foreach loop that will display each of our records in a table row, and it's no surprise it's using the data from the view property called "items". This is an array and we put the index of the array item into a variable called $i. We'll use that a few times.

Next we make a few shortcuts to ordering state and permissions. We do them here mainly so that the HTML code below is a bit cleaner and more easily maintained. Once again, we are using the user object's authorise method to test permissions on individual records. However, unlike before, you can see the second argument is changing depending on the permission. This argument is what's called the "asset name" and this relates to an entry in a new Joomla 1.6 database table called "jos\_assets". I'll explain assets another time, but for now I'll just say that when we want to create a record, we check against the component category. When we want to edit a record, we check against the record itself or the category that it's in. When we are looking at whether a person can check in or out, we check that against the "com\_checkin" component. Finally, when checking if we can change the published state, we check against the record asset or the category it's in.

Just a note - while the code shows the record as the asset for the edit and edit state permission checks, I've changed the snippet to reflect the more generic case using just the category. We'll look at assets in more detail another time.

After that we need to assemble the row cells of the table to match our column headings.

The first column is the check box for the row, and again you can see we are using another JHtml grid helper to do this.

The next column does a bit of work displaying the title with an edit link, providing permissions allow for it. If the record is checked out, then the checked-out icon will display but still let you view the record. This subtle change was made to allow online support people to follow users into edit forms so they can diagnose problems more easily. We then display the alias field of the record as well as the note if present. Now, here's where we see the escape method in the JView class being used again. Basically wherever we have user supplied data that we don't trust, we should escape the output. The Joomla input filtering is good, but not infallible. The escape method runs the text through either the PHP htmlspecialchars or htmlentities function. Basically we use this wherever we are not expecting to display raw HTML, such as you would for the body text of content.

Then next cell uses a helper to show the published state icon.

The next cell displays the name of the category the record is in. Note again, we escape the output because we do not expect, nor want, HTML in the category title.

The next cell shows the order up and down arrows and the ordering reset box but only if the user has permission to edit the state of records. You can see that the pagination object has some helper methods for displaying the icons. Because we are using categories, we can only order up and down within records in the same category - that's why we are testing the category id of the current records against the category id of the next record in the list. If the user does not have permission to edit the state of the record, we just echo the value of the ordering field.

The next cell displays the title of the viewing access level, and the cell after that displays the name of the author of the record.

Then next cell is using a JHtml date helper to display the formatted date.

The next cell shows the language the content has been prepared for. If the the value of the language field is a "\*" character it applies to all languages, otherwise we display the actual language title.

Finally, the last cell is the record id and because we know that should be an integer, we cast it before echoing to the browser. 

#### Closing the list table form

At the end of the file, we close the HTML form. We need to include an explicit but empty "task" field for the use of the toolbar and clickable icons in the list. The "boxchecked" field is also used by the toolbar to check whether anything in the list has been selected. The list ordering and direction fields are also added to the form. Finally, we use a JHtml form helper to add the security token to the page. This is used to prevent an attack vector called CSRF.

#### Previewing the final result

Jump back to the browser and refresh the page. Although it doesn't look like it, we've made significant progress. You can see the table header and footer displaying but it's rather empty because there is no data in the table yet. However, the title is still fairly ugly and this is because we haven't defined a language key in the language file for the title.

#### Adding the language string to the language file

Jump back to your editor and into the view.html.php class. Find the line that has the call to JToolbarHelper::title and highlight the language string. Change it into uppercase and copy it. Now find and open the en-GB.com\_hello.ini file in the component's language folder. Paste the language key in and then assign it a suitable value that reflects the name of the page the user will be looking at.

#### End of part 3

Save the language file and jump back to the browser and refresh one more time. The title of the page now looks great. But, before we dive into actually creating a new records, we'll spend a few lessons adding more structure to the view. In the next lesson we'll add some filtering options for search text and several drop-down list. See you back real soon.
