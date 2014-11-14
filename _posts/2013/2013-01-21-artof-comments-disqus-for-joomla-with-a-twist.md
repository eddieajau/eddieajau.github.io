---
layout:      post
title:       Artof Comments - Disqus for Joomla, with a twist
description: It's been a while but I've produce a new extension called Artof Comments for Joomla 2.5/3 and you can download it from http://www.theartofjoomla.com/extensions/artof-comments.html. This is a Disqus plugin for articles, but with a difference. You manage the enabling of comments directly in the category and article edit forms.
date:        2013-01-21 07:50:40
category:    joomla
image:
  thumb:     vendor/joomla.png
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

It's been a while but I've produce a new extension called **Artof Comments** for Joomla 2.5/3 and you can download it from [http://www.theartofjoomla.com/extensions/artof-comments.html][0]. This is a Disqus plugin for articles, but with a difference. You manage the enabling of comments directly in the category and article edit forms.

I did look at the other commenting plugins that were available first - why bother reinventing the wheel if you don't have to. But I really wanted something that could integrate with the edit form parameters. Nobody was doing that and they all used a variation on the theme of adding a list of article or possibly category id's in a field in the plugin parameters. This is such a shame because I deliberately built a lot of power into the JForm class to be able to manipulate those forms - and it is so, so easy to add new parameters.

So, out of necessity, Artof Comments was born. It is quite simple at the moment but I've had to restrict it to Joomla Articles for the time being for technical reasons (that's code for "I am still trying to work out the best way to tell what view the plugin is being trigger from"). However, the plugin can potentially be expanded to any type of content that using the JForm system for its edit forms. Unfortunately, most extensions developers don't do this yet and it will be the reason why I cannot support extensions like K2\.

At this stage I don't have a lot of plans for future development, only because I haven't thought of them yet, but here are a few ideas:

* Adding the comment count to category list views and the article view.
* Adding a module for latest comments.
* Adding support for other JForm supported content as the need arises.

I'll also be writing a few blogs and technical tutorials about how and why Artof Comments has been built and packaged to help other developers take advantage of some of the cool, but apparently not so well known, features of Joomla 2.5 and 3\.

[0]: http://www.theartofjoomla.com/extensions/artof-comments.html
