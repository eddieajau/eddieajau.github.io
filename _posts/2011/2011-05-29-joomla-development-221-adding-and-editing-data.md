---
layout:      post
title:       Joomla development 221 - Adding and editing data
description: This lesson explores the result of adding edit capabilities to the component in Joomla 1.6 and 2.5.
date:        2011-05-29 21:40:33
category:    ["joomla-development","videos"]
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

<iframe allowfullscreen="allowfullscreen" frameborder="0" height="315" src="http://www.youtube.com/embed/ls7OAdk_nJ0" width="560"></iframe>

This lesson explores the result of adding edit capabilities to the component.

Eclipse snippets used in this video can be **[downloaded here][0]**. Final source code is available on **[Github.com][1]**.

#### Adding a new record

Welcome back. This is an exciting lesson because we actually get to see the fruit of all our hard labour. Make your way back to the Hello component in the browser and click on the "New" button in the toolbar. And there we have it - our edit page built from our XML form and our three layout files. But, it's not perfect yet.

#### Adding edit form language strings

We really need to tidy up some language string. So, jump back to your editor and open up the "en-GB/language" folder, then open the "en-GB.com\_hello.ini" file. Position your cursor at the end of the file and then look for a snippet called "Backend Item Edit INI Strings". This snippet has two variables: the name of the component in upper case, for us that's "HELLO" and the singular name of the record in proper case, and for us that's "Message". Insert the snippet and you'll see it's added a heap of language strings for fields and labels and other things.

#### Adding data into the form

Jump back to your browser and refresh the page. That's looks much better.

You should be able to see the structure that we set up in the layout with the two columns, the main data on the left and the options and metadata on the right. On the right you can see the two slider panels that came from the form XML file, one for basic and one for advanced option and also the third metadata panel.

#### Modifying existing records

If you click the "Save & Close" icon in the toolbar, the component will return to the list view and you'll see the record in the list. We can click on it to edit it, and when that page comes up let's have a look at the metadata panel on the right. You'll see that the created date is now displaying - remember we added the code to selectively show that in the metadata sub-layout.

If we click the "Save" icon in the toolbar, we'll come back to the same edit page and this time you'll see the modified date is now showing.

#### Working with publishing in the lists and system messages

Now, let's go back to the list view and click the "New" icon again to create another new record. Just give that record some sort of title, different from our first example and you can put something in the body field if you want to. Then click on the "Save & Close" button in the toolbar and we'll be returned to the list view.

Ok, we are going to put that list sub-controller to work that we created quite a while ago. Click on the icon in the "Published" column that corresponds to the first record. The page will return with a raw language key in the system message. We'll have to add that in.

Jump back to your editor and make sure the main language file is open and position your cursor at the end of the file. Then look for the snippet called "Backed List Published INI Strings" and bring up the form. There are three variables to add in here. First, type the name of the component in upper case, for us that's "HELLO". Then type the name of the singular form of the record in proper case, for us that's a "Message" record. And finally add the plural form of the record in proper case, that being "Messages" for us.

Insert the snippet and you can see quite a few language strings that are a variation on a theme. The first block is three key-value pairs for a particular action. The reason we have three is because we use a slightly different message depending on whether we have processed no records, just one record or more than one record. The Joomla translation JText class has a method called "plural" that can handle these cases. The default case is the full plural form. The no-records case is handled by the "\_0" suffix and the single record case is handled by the "\_1" suffix. You can even write your own handler to cater for the many different ways different languages handle pluralisation.

Save that file and jump back to the browser. Now, click on the publishing icon of that first record again and see what happens to the system message. The message is now "1 Message unpublished" - perfect. Select all the records and then click the "Publish" icon in the toolbar. Now the system message reads "2 Messages published". We have perfect pluralisation depending on the number of records that were processed.

Well, that concludes our journey to build a backend component that provides you with a list view and an edit form for the data. I hope you've enjoyed this part of the course, but don't go too far, there's more to come. See you back then.

[0]: http://eddify.me/categories/snippets.html
[1]: https://github.com/eddieajau/joomla-hello-world
