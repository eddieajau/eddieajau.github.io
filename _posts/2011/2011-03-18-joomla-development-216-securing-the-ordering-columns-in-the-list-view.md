---
layout:      post
title:       Joomla development 216 - Securing the Ordering Columns in the List View of the Joomla Component
description: In this lesson, we'll add some custom configuration to the list model's constructor to permit ordering of the results within a white list of values.
date:        2011-03-18 14:11:47
category:    ["joomla-development","videos"]
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

<iframe allowfullscreen="allowfullscreen" frameborder="0" height="315" src="http://www.youtube.com/embed/vSU7Atxb4zg" width="560"></iframe>

This lesson looks at adding some custom configuration to the list model's constructor to permit ordering of the results within a white list of values using the filter\_fields option in JModelList.

Eclipse snippets used in this video can be **[downloaded here][0]**. Final source code is available on **[Github.com][1]**.

#### Introduction

Welcome back. I mentioned earlier that while we could click all the column headings to order the results in the lists, only the default ordering works at this stage. This is a security feature because it's possible to inject junk into the ordering column values that, at best, causes an error or, at worse poses a real security threat. To counter this, we add a custom constructor method to the list model that defines a white list of permitted ordering fields.

#### Adding the custom constructor to the model

In your editor find the /models/messages.php file, open it up and position your cursor before the first method in the class. Then find the snippet called "Backend List Model Constructor" and bring up the form. The variables here are just to get the name of the class right for the @return docblock tag so we enter the name of the component, "Hello" in proper case and the name of the model, "Messages" in proper case. Insert the snippet, clean up the line breaks at the end and let's see what we've got.

Ok, so JModelList's constructor, like JModel, takes a configuration array and one of the configuration settings JModelList is aware of is called "filter\_fields". In our constructor override you can see we are checking if this setting has been defined. If it isn't we are going to set a default value for it.

The value of this setting is merely a white list of field names that are permitted for usage in queries. So, you can see we've got quite a few of the standard fields names. We've also added some variants of those names that are query specific, just in case someone else using this model wants to use them. That's really all there is. When you click on one of the list headings, it sets the ordering column for the list in the request. We know that the populateState method in the model will pick this value up from the request and when it does, it checks it against this white list. If the requested ordering column is not in the white list, it reverts, safely, to the default ordering.

When implementing your own components, you can of course tune this list based on the fields available in your data tables.

#### End of part 7 and conclusion

That's it for this lesson and, barring unforeseen additions, the last lesson in this block for setting up the backend list view. I hope it's been informative and you are starting to get a good understanding of how the Joomla MVC works. But, no list is complete without data so in the next block of lessons we'll be creating the edit form so we can add and change data in our component. See you back soon.

[0]: http://eddify.me/categories/snippets.html
[1]: https://github.com/eddieajau/joomla-hello-world
