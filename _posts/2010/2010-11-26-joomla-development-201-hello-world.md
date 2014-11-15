---
layout:      post
title:       Joomla development 201 - Hello world
description: This lesson shows you how to begin a component in Joomla using the Discover feature in the Extension Manager.
date:        2010-11-26 20:50:24
category:    ["joomla-development","videos"]
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

<iframe allowfullscreen="allowfullscreen" frameborder="0" height="315" src="http://www.youtube.com/embed/AezLm8fTIAQ" width="560"></iframe>

This lesson shows you how to begin a component in Joomla using the Discover feature in the Extension Manager.

Eclipse snippets used in this video can be **[downloaded here][0]**. Final source code is available on **[Github.com][1]**.

#### Introduction

Welcome back. In this lesson we are going to create a simple Hello World component for the Joomla backend. While simple, this lesson gives you the basic starting point for any Joomla component. From Joomla 1.6 on, you are always going to need to start with a backend component if for no other reason than to allow site administrators to configure options and permissions for the component. But even if you don't have options or permissions, it's still a good idea. I've built some frontend-only components in the past and it actually increased my support because users didn't think it had installed - it wasn't appearing in the backend components menu. So when the next version rolled around, I put in a dummy about page for the backend and my support calls went away. It's funny what people get used to.

#### Creating the base folder

Ok, let's get this show on the road. I've imported my Joomla site into Eclipse and I'm ready to create my component. We'll be starting in the administrator/components folder. The first thing you need to do is create the base component folder. The name of this folder is important because part of it will carrying through all of the work we are going to do in future lessons. I'm going to call this component "Hello", so my base folder is simply a "com\_" prefix plus "hello" all in lowercase. This "com\_hello" folder will hold all the files that we need to run the component. This should familiar because it's also used in the option variable in the URL.

#### Create the component dispatcher file

So we have our base folder, but Joomla needs a file to call to be able to actually run the component. This is the main component file and it's a PHP file given the same name as the component - in this case it will be hello.php. It's easy to remember because it's just the name of the folder without the "com\_" prefix. This is the file that Joomla will load when we put "option=com\_hello" in the URL.

#### Create the component installation XML file

The second file we will create is the installation manifest or XML file. This is the file the extensions installer uses to install files and data. We need this now because in a few steps we are going to get Joomla to automatically find this new component and it will need this file to work. The name of this XML file is simply "hello.xml".

#### Create and index.html file

Next I'm going to create a blank "index.html" file and I'm just going to type in the bare minimum HTML markup. You could also copy this file from anywhere else in the system. We place an empty "index.html" file in each folder just to prevent a web user from browsing to these folders and listing the contents.

#### Fill in the hello.php file

Let's go back to "hello.php" which you'll remember is the first file that Joomla loads.

The first things we always need to do with a PHP is include the header DocBlock and a special line of code for security. I've got a snippet for this and we just need to fill in a few variables. For the Package I use the name of the component or the name that I call a bundle of extensions if I package say a component with a few modules. For the Subpackage I simply use the name of the component folder.

The Package or Subpackage should be all one word with no spaces. There are tools like phpDocumentor or Doxygen which use these markers to segregate API documentation they automatically generate from the code.

You should also include your personal copyright statement in the header and the license should always be the GPL version 2 or later to make it fully compatible with the Joomla source code.

In this snippet you'll also see an extremely important line and that is the "defined \_JEXEC or die" line. \_JEXEC is a constant that is defined in the main "index.php" file for either the frontend or backend applications. In each file that Joomla calls we add this check as a security measure to ensure that Joomla, and only Joomla is accessing this file. This prevents users from directly accessing this file by typing in the full path in the URL of a web browser. If this line is not present, there is a risk that sensitive information can be exposed or worse, if a security flaw is present in the file a user could take advantage of this if they have direct access to this file. It's also a good idea not to provide any message in the die statement. The less information we give to people snooping around file system the better.

#### Fill in the hello.xml file

Ok, next we are going to fill in the XML manifest and there is a useful snippet for that. I just need to fill in the name of the component and the date. The rest of the values I've already added defaults and if you are using these snippets you can change these to whatever values you desire.

So let's have a look at this file. The first line is called the XML prologue and this line is a standard in any XML file, it's not unique to Joomla code. Your encoding must be UTF-8\.

The next line is an XML comment which hold an ID marker for when you use a code repository like Subversion. We'll cover that topic another time.

From line 3 we start the proper markup for the manifest. We open the XML with a tag called extension and we must include attributes for the type of extension, the minimum version of Joomla on which it can run and a method attribute. In this case we need the type to be "component", we need the version to be "1.6.0" and the method to be "upgrade".

There are a number of other tags which I will explain in detail when we looking at packaging the component. For now we just need to make sure the name tag contains the name of the folder of the component as does the menu tag in the administration section. We upper case these two values, as well as the component description as a visual aid to remind us that we will add a language string for them to allow for future translation. Why I am doing this now is because it will give us some nice results during the discover process and help set up the entry for the Administrator menu nicely. 

#### Create the sys language file

So let's move to creating the basic language files for the component. In version of Joomla prior to 1.6 we needed to have the language file in the main Joomla language folders. From 1.6 we can include a local language folder that Joomla will automatically pick up and I recommend using this feature. There are two advantages. One is simply that all the files for the component are in the one place and not scattered around the Joomla tree. Two, and more importantly, is when you include multiple languages locally, they are not removed when a core language pack it deleted from the site. A user can uninstall a language and then reinstall it again later, and your local language files will be unaffected in your component .

The base language, or language code, of Joomla is en-GB so we always need to provide that language file. First create a new folder in the component called language/en-GB. Next we create a file a file where the name is made up of the language code, dot, then the component folder name, then given the file type of .ini. This is the language file that will be automatically loaded when Joomla runs the component. We also need a second language file that is loaded by the Administrator menu to translate the name of the component. This file is basically the same name except we give it a file type of .sys.ini.

When we've created these files , we can copy that index.html file we created earlier and drop it into the new folders that we made.

Let's move to the .sys.ini file. First, I'll quickly add a snippet for the header of the file. For now we'll add what we call two language keys. The first is the name of the component folder that ties back to the name tag and the menu tag in the XML manifest. The key must be typed in upper case and then the value assigned to the key must be enclosed in double-quotes. This is more stringent in Joomla 1.6 because we are using the native PHP ini parser which has much better performance than the method we use in previous versions of Joomla. The value, of course, can be anything you want and for our case the title for our component will be "Hello World".

The next key we want to include is the description of the component which also comes from the XML manifest. We just need to add that and give ourselves a meaningful description. 

#### Discover the extension to register it in the database

Ok, so all of our basic preparation is done and now what we want to do is add the component to the Administrator menu so that we can get to it easier. This was a bit of an ordeal is previous version of Joomla but it is quite a simple process in Joomla 1.6\. We need to go to the Extension Manager and click on the Discover link in the sub-menu. Then all we need to do is click the Discover button in the toolbar. Joomla should detect your new extension and you should be able to see that the name of the component has been translated with the work we did with the language files. All we need to do now if check the box next to the extension name and then click the Install button in the toolbar. With those simple clicks, the extensions has been installed into the system and you can also see the component description translation coming through as well.

#### Completing hello world

If we move to the Administrator menu now you can see that our Hello World component is now listed under Components and we can have a look at it. Not terribly interesting but no errors is always a good sign. Let's make this a little more interesting and jump that to the main hello.php file that we made earlier. For now, let's just put in a statement to echo "Hello World" to the browser, we'll jump back to the browser and refresh the page.

And there you go. We've built our first component for Joomla, let Joomla discover it automatically, and proven that it works. It's still early days but these few steps make up the foundation for any component that you will build in the future. In the next lesson I'm going to go through some of the theory behind Joomla's model, view, controller architecture and then after that we'll do an MVC version of Hello World. Have a bit of play to make sure that your component is working so far, and then we'll see you back real soon.


[0]: http://eddify.me/categories/snippets.html
[1]: https://github.com/eddieajau/joomla-hello-world
