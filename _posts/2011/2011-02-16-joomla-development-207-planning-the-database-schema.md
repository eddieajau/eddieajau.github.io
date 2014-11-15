---
layout:      post
title:       Joomla development 207 - Planning the Database Schema
description: This lesson covers planning the database needs for a Joomla component.
date:        2011-02-16 13:18:01
category:    ["joomla-development","videos"]
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

<iframe allowfullscreen="allowfullscreen" frameborder="0" height="315" src="http://www.youtube.com/embed/bR2yFr-zaL8" width="560"></iframe>

This lesson outlines the planning the database needs for a component.

Eclipse snippets used in this video can be **[downloaded here][0]**. Final source code is available on **[Github.com][1]**.

#### Goals for your project

Welcome back. The next group of lessons is all about setting up our database and it's always good to take a little time to plan this out before rushing into the code. Our "Hello World" component is nice but it doesn't do anything. So, let's expand it to manage a list of welcome message that you might show on your site. We will want to support putting messages in categories, and also support saying hello in multiple languages. Of course, we'll want to include the usual published, ordering and view access level features. We'll want to support search engine friendly URL's and page meta data. We'll want the normal check in and check out handling and finally we'll want to support recording which user created and modified messages and when they did that.

#### Plan the database fields

Ok, let's go over the fields names that we should use to support all that data as there are a number of standard field names that plug right into the Joomla framework.

We usually give the primary key the name "id" and we use that to reference the record when retrieving the data.

I mentioned we are going to support categories, so we want a foreign key to the categories table called "category\_id"

We'll have a title for the message so we'll give that the name "title". Among other things this is usually used in the backend lists as the link to edit a record. A companion to the title is the "alias" field and that's used in the search engine friendly URL's.

The main message text will be contained in a field called "body", and in Joomla 1.6 we started to add a private "note" field for content maintainers to add simple notes to a record.

Next is a block of standard Joomla fields. "Published" stores the published, unpublished or trashed state of the record. "Ordering" holds an integer for fixed list ordering. "Access" is a foreign key to the view levels table that controls who can view content. "Language" is a string that can hold a specific language code. "Params" is used to store optional settings for the record. And the last fields in this block are "metadesc" and "metakey" and these will hold the meta description and keywords for the record that will be used by the web page.

The final block of fields stores editing information about the record. "Checked\_out" is a field that holds a user id for the person that is currently editing the record, and "checked\_out\_time" holds the time when they started editing. "Created\_user\_id" is the user id for the person that created this record and "created\_time" holds the time when they did that. Likewise, "modified\_user\_id" and "modified\_time" are the fields holding the user id and time for who last modified the record.

#### Examining the foreign keys to the core schema

That's a list of the fields we are going to use in the database table. I mentioned a few foreign keys so let's have a look at those visually. So, there's a master table for a message. The first foreign key is "category\_id" and this maps to the "id" field of Joomla's master "jos\_categories" table. Note that when we use the "jos\_categories" table, the "extension" field is used to set our categories aside from other extensions, such as for banners or articles.

Next we have the language field and the value of this can either be a "\*" character, meaning that the record is used for all languages, or is can be a seven-character ISO code for a specific language and this is stored in the "lang\_code" field in the "jos\_languages" table.

Finally, our "checked\_out", "created\_user\_id" and "modified\_user\_id" fields all relate to the "id" field in the "jos\_users" table.

That set the basic stage for almost any content based extension you are going to write. In the next lesson we'll actually create the database fields in our MySQL editor and explain the variable type of each field in detail. See you back real soon.

[0]: http://eddify.me/categories/snippets.html
[1]: https://github.com/eddieajau/joomla-hello-world
