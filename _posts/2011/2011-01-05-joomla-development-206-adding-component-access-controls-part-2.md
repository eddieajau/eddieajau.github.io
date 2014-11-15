---
layout:      post
title:       Joomla development 206 - Adding Component Access Controls - Part 2
description: The video shows you how to add access controls to a Joomla 2.5 or Joomla 3 component.
date:        2011-01-05 20:13:23
category:    ["joomla-development","videos"]
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

<iframe allowfullscreen="allowfullscreen" frameborder="0" height="315" src="http://www.youtube.com/embed/uVBtp3tlKPw" width="560"></iframe>

This lesson implements the necessary code to set permissions in a Joomla component.

Eclipse snippets used in this video can be **[downloaded here][0]**. Final source code is available on **[Github.com][1]**.

#### Introduction

Welcome back to part 2 of this subject on component access controls and thanks for hanging in there with the theory. What we will be doing in this lesson is adding a component helper to compute the permissions for the component and adding configuration and access control support files.

#### Uncomment the access controls in addToolbar

We need go back to view.html.php in the hello view and revisit the addToolbar method. Remember we commented out a few lines in this method a while back, well it's time to uncomment them and put them to work.

The first line is calling a helper method that we are going to create soon to put some data into a variable called $canDo. This will be a simple JObject and for each of the access control permissions that the component is likely to check it has tested whether the current user is allowed to perform those actions.

The next block we uncomment is testing the core.admin permission to see if we should display the component options toolbar button to the user. The JToolbarHelper class has a preconfigured method for this called preferences and we simply need to pass the name of the component folder to this static method.

#### Override the controller display method

We can save the view file and then move to the controller.php file because we are going to override it's display method to include the component helper. I have a snippet for this called "Basic Controller Display Override" and in the snipper form I just need to add in the lowercase name of the component. Once that is added we can see that we are using require\_once to load a particular file. For our convenience, Joomla defines a constant called JPATH\_COMPONENT with the full path to the component folder as a shortcut. So we can very easily ask PHP to include a new file called /helpers/hello.php relative to the component folder. That's all we really need to add to the display method, so the next few lines of code simply allows the parent display method to take over.

#### Add the component helper

Now, we need to create the helper file so I'm going to create a helpers folder to put it in, and then I'll create a file called hello.php in that folder. While I'm there, I'll copy an index.html file from another folder into the new one.

Now, opening up that new hello.php file, I'll set up the normal file header as we've done before and then what I'll do is add a snippet called "Basic Component Helper". This has a number of fairly familiar values to fill out. When that's inserted we can see that a HelloHelper class has been added and this contains a public static getActions method that you'll remember we are calling from the view's addToolbar class. Let's work through what's in this method.

You can see we are grabbing the user object in the normal way and we are also preparing a result object that uses Joomla base JObject class. The JObject class is a very useful base class because includes a special get and set method that allows you to pass defaults in the event that a class property does not exist or has not been set. Next we have an array of all the permissions that we want to check for the component. As I said in the last lesson, the only two mandatory permissions you should support are core.manage and core.admin. You only need to include the others if your component really needs them.

Then we loop through each permission call the user objects authorise method to see if they are allowed to perform the action, and then we return the result.

At this point, we can go back to the browser because we now have something new to see. When we refresh, we can see that we have a new Options button in the toolbar.

#### Add the config.xml file

To make this button work we need to add a couple of new files. The first is config.xml which goes in the root of the component folder and this is an XML file that defines sets of fields for data that we want to store against the component. It's read by the core Config component to give you a simple interface for storing configuration data. I have a basic snippet for this file called "Basic config.xml" and I just need to fill in the name of the component folder. Let's have a good look at this file because the structure is important.

The file begins with the normal XML prologue as the first line, and then on the second line I've included a comment with a Subversion Id tag that is useful if you are storing your code in a repository. After that we open the XML with a "config" tag. Within the "config" tag we can define any number of fieldsets which will display as tabs in the modal popup window. Each fieldset should be given a unique name attribute and a label attribute. The description attribute is optional. In this case we can use a core language key for the label and description.

Now, within each fieldset you can define any number of fields by using field tags. If you are familiar with Joomla 1.5, these are very similar to the old params tags that were used in that version. At this stage we are only interested in access control settings so we give this field tag a name and type attribute of "rules". There is a core language string we can use for the label. I don't think class is used for this field but let's make it inputbox and see what happens. We need a filter attribute set to "rules", a component attribute set to "com\_hello" and a section attribute set to "component". This field will then give us a similar looking tab to the permissions tab in Global Configuration, and we'll see that in a few minutes. After the field tag we just close the fieldset and config tags to give us a nice, well-formed XML file.

#### Add the access.xml file

Now, the rules field needs us to define which permissions that we need for the component so we need a second XML file to define those. This one is named access.xml and like config.xml, it also goes in the root of the component folder. I have a snippet for this file called "Basic access.xml" and I just need to fill in the name of the component folder. Let's have a look at the markup in this file.

After the prologue we open the XML with an access tag and we give that a component attribute and provide the folder name of the component. Next we open up a section tag and give it a name attribute with a value of component. There can also be other section tags that relate to permissions for categories and also articles but we will look at them another time.

Within the section tag we add a number of action tags for each permission that relates to the component. The action tag has a name attribute being the name of the permission, as well as title and description attributes. You can see that for all of the core permissions that there are stock language keys that you can use for the title and description. Once we have all the action tags we need, we close off the section and access tags.

#### Look at the results

So, with all those files saved we can return to the browser and have a look at where we are up to. When you click on the Options button in the toolbar, you get a modal popup for setting the configuration data. You can see that we have one tab and that relates to our fieldset tag in the config.xml file.

The rule field is displaying allowing you to set permissions against all of the user groups that will apply for this component.

We can see that the title of the popup needs translating so we just select and copy that text, then move back to our en-GB.com\_hello.ini file, paste in the key and then give it a suitable value. If we return to the browser and close the popup, then open it again, we can see that the window title is now translated.

That really concludes our journey to create a basic MVC component that also supports the new Joomla access controls in version 1.6\. This is a good place to just break and consolidate what you've learned about controllers, models, views and text translation. From this point on, we will start looking at data and how to manipulate it in Joomla's administrator. 

[0]: http://eddify.me/categories/snippets.html
[1]: https://github.com/eddieajau/joomla-hello-world
