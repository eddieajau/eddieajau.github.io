---
layout:      post
title:       Joomla development 208 - Creating the Database Table
description: This lesson looks at creating a database table to store records (Hello messages). Looks at standard data fields like title, alias and body, checkin and checkout support, created and modified dates, and params.
date:        2011-02-16 13:23:56
category:    ["joomla-development","videos"]
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

<iframe allowfullscreen="allowfullscreen" frameborder="0" height="315" src="http://www.youtube.com/embed/twT3q7dyVpI" width="560"></iframe>

This lesson looks at creating a database table to store records (Hello messages). Looks at standard data fields like title, alias and body, checkin and checkout support, created and modified dates, and params.

Eclipse snippets used in this video can be **[downloaded here][0]**. Final source code is available on **[Github.com][1]**.

#### Create a database table

Welcome back. In our last lesson we planned out the fields that we are going to be using in our database table and in this lesson we are going to build the table using a MySQL editor. In my case, I'm using a desktop application called Sequel Pro for the Mac but there are many others to choose from, including the old browser based favourite phpMyAdmin.

So let's create the empty table for a start. I'm going to name it "jos\_hello\_messages". As a rule, I try to namespace the tables I use for different components with the component name to help avoid naming collisions with other extensions. In order to support the international community we must always select UTF-8 as the table encoding.

#### Adding fields

Now, my editor has given me an "id" field for free but it's not exactly how I want it. I'm going to make the field unsigned because we can never have a negative primary key. I'll set the default to to zero because it's an integer field, and then in the extra column, I'm going to select auto-increment. This means that when you add new records to the database, it will automatically assign the next number as the id for the new record. Now, as I save that, and because I've set this field to auto-increment, it's going to ask me if I want to make this field the primary key, and yes, I want to do that. When the field saves you'll notice that "Allow Null" unchecks.

So, let's go ahead and start adding all the other fields.

"Category\_id" is an INT and we'll give it a width of 11\. Note that for integers the width does not control the number of bytes, it's actually the column width used when you are printing out a table from the command line in MySQL. We'll give it a default value of zero and we also want this field to be unsigned, because remember it's a foreign key to the categories table.

Next we'll add the "title" field and I'm going to make this a VARCHAR with a width of 100 - that means I can have a title up to 100 characters long. A VARCHAR is a very efficient field because it only takes up enough disk space to store the actual length of text up to the maximum width. So if the title is 12 characters long, the database will only store 12 characters on disk. However, when it comes to reading that field from the database PHP will actually allocate the maximum memory to hold the field. Not only that, but it will be more than 100 bytes because our table is encoded using UTF-8 so each single character actually take up 3 bytes. In other words, 100 letters will take up 300 bytes in memory - still fairly trivial in the grand scheme of things. I'll set the default to no string since a we don't want it to be a NULL value. By the way, if you allow nulls, it actually take an extra byte to store the null state so it's a good idea to not allow null unless you particular need it.

With that slight diversion, let's get back on track. The next field is the "alias" field and I generally make this exactly the same as whatever I made the title field to be.

The next field is the body text and this will be an interesting one. A VARCHAR can, in MySQL 5, store up to about 20 kilobytes of data. That's a lot, but I think for a field that will have a WYSIWYG editor it's a bit risky. I could use a TEXT field and that would bump me up to 65 kilobtyes, but I've seen some long messages in my time, so I'm going to use a MEDIUMTEXT field which will give me a very comfortable 16 megabytes of clearance. That should be plenty of room.

The next field is the "note" field and I'm just going to make that a simple VARCHAR with a width of 255 characters. You could bump this up a bit if you wanted to give more space for a note, say 1,024 characters, but it's up to you. Just remember that the maximum memory that a field can take up is 65 kilobtyes. However, that excludes blob and text fields.

Ok, now we get into some of the standard fields.

"Published" will be a SIGNED INT with a default of zero. It must be signed because Joomla uses the value of -2 to indicate a record has been put in the trash. If you wanted to save a bit of memory and disk space you could make this field a TINYINT and that would give you a range of plus or minus 127 which would be adequate for most circumstances.

"Ordering" is also an INT. I usually make it signed just in case Joomla ever supports both negative and positive ordering.

"Access" I've made an UNSIGNED SMALLINT and that will give me a range up to 65,000 view levels - if a site has more than that I think the site is in real trouble and needs to be rethought. I did not opt for a TINYINT because that would only give me up to 256 access levels. That's a pretty unusual site but it's not impossible either.

Next is the "language" field and I make that a CHAR field with a width of 7 characters, because that's the length of the ISO code.

Next is the "metadesc" field and I'm going to make that a wide VARCHAR with 512 characters. Then for the "metakey" field I'm going to use a VARCHAR but with only 255 characters. You can vary the lengths of these fields in practice to suit the needs of either you project or your users.

Moving on, next is the "checked\_out" fields and that will be an UNSIGNED INT with a default of zero. Following that will be the "checked\_out\_time" field and this will be a DATETIME field and we set the default to the MySQL null date which is year, month, day, hour, minute, seconds all as zeros. The next two pairs of fields for the created user and time, and the modified user and time are exactly the same as the "checked\_out" pair of fields.

And that's it. If I jump over to another tab in the editor, I can have a quick look at the TABLE CREATE statement. We'll need that later when we get to the point of packaging our extension. For now though, take a break and when we come back, we'll look at the JTable class we need to create that allows Joomla to load and save our data. See you back soon.

#### Errata

There's always something you forget isn't there. I forgot to add the "params" field. This field holds options for the record in JSON format. Now, there's a few thoughts about what the field type should be. At the moment, I've made it a VARCHAR with 1024 characters. I don't expect to hold a lot of options so I've made is quite small. If you are supporting a large number of options, you might consider increasing that to maybe five or six thousand characters. If you are storing TEXTAREA options, like custom messages, it's probably better to look at one of the TEXT field types. Your TEXT type will give you room for 65 thousand bytes - but because of UTF-8 encoding, that only gives you about 21 thousand characters. If you need more than that, a MEDIUMTEXT type will give you 16 million bytes, or around 5.5 million characters.

The decision on the type of field comes down to how much control you have over the options. In this simple case, we have a lot of control so I'm choosing a modest allowance for the data in this field. However, in Joomla 1.6, it's possible for another developer to extend the options with plugins. If you think your content is likely to be extended, then it is probably safer to go with a the TEXT or MEDIUMTEXT type rather than using a wide VARCHAR. 

[0]: http://eddify.me/categories/snippets.html
[1]: https://github.com/eddieajau/joomla-hello-world
