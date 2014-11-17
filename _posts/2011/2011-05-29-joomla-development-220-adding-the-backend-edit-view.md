---
layout:      post
title:       Joomla development 220 - Adding the backend edit view
description: This lesson shows you how to add the backend edit view class and layout files to produce a typical edit item page in Joomla 1.6 and 2.5
date:        2011-05-29 21:35:40
category:    ["joomla-development","videos"]
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

<iframe allowfullscreen="allowfullscreen" frameborder="0" height="315" src="http://www.youtube.com/embed/c3yEep18gFI" width="560"></iframe>

This lesson shows you how to add the backend edit view class and layout files to produce a typical edit item page.

Eclipse snippets used in this video can be **[downloaded here][0]**. Final source code is available on **[Github.com][1]**.

#### Create the /views/message/tmpl/ folders

Welcome back and thanks for hanging in there. In this lesson we are going to build the view and the layout that supports the user interface for the form. As we've done in previous lessons, we need to create the view and the layout folder. For this case the name of the view is message so we create that folder.

#### Add the view.html.php file

Next we create the "view.html.php" file that will hold the view class.

#### Add the edit.php, edit\_params.php and edit\_metadata.php files

The layout for this view is called "edit.php", not "default.php". We do this just in case we want to use "default.php" to view the record like we'd view something in the frontend. While I'm here, I'm going to create two sub-layouts. Now, the name of a sub-layout starts with the name of the master layout, followed by an underscore, followed by the name of the sub-layout. One sub-layout is for the record's parameters and one for the record's metadata so you can see I've added the "edit\_params.php" and "edit\_metadata.php" files.

#### Create the view class

Let's move back to the "view.html.php" file. Add the PHP header in the normal way and scroll down your snippets and find the one called "Backend Edit Item View". Bring up the form and fill in the "package", "sub-package" and "name" variables like we've done before. The "view" variable is for the name of the view so type in "Message" in proper case. The last variable is for the name of the controller for the item, so type in "message" all in lower case, then insert the snippet.

Let's take a look at what we've got. The name of the view class, once again follows a convention, being the name of the component, followed by "View", followed by the name of the view. This type of view typically has three protected data variables. The "$item" variable holds the object that relates to the item that we are editing. The "$form" variable holds the JForm object that will help us render form elements on the page. The "$state" variable we've seen before, and this holds the state of the model for this view.

If we slide down a bit we can see that there is a display method and we are assigning the variables with JView's special get method just like we did in the list view. Then we check for errors, add the toolbar and then invoke the parent display method.

Down a bit further we've got the method to add the toolbar to the edit page. The first line we see is a call to the "setVar" method in the JRequest class. What this is doing is setting, by hand, a variable in the request called "hidemainmenu". You should be aware that the drop down menu in the Administrator is actually a module, and this module looks for the "hidemainmenu" variable in the request. If it finds it, it disables the drop down menu. There are a few more administrator modules that also look for this variable. Because we are in the component, and the modules are only parsed by the template after the component has executed all its code, we can inject this variable into the request using the JRequest::setVar method and it will be as if that variable was included in the URL.

Next we initialise a few variables: the user object, whether this is a new record or not, whether the record is checked out (but not by me), and lastly we get the permissions for the component like we did for the list view's toolbar.

We then call the JToolbarHelper's title method to set the title, which tests if we are viewing, adding or editing the record. Note that if the record is checked out, we can still view the page, which is a new feature in Joomla 1.6, but you won't be able to save any changes.

Next we do some tests to see which toolbar buttons we can display. If the record is not checked out, and the user has the "core.edit" permission, we add the "apply", "save" and "save-to-new" buttons.

But, if this is an existing record, and the user has the "core.create" permission we add the "save-to-copy" button.

Lastly, we add a cancel button but if we are editing an existing record, we change the label from "cancel" to "close".

#### Create the main edit.php layout

That's it for the view class so move into the "edit.php" layout file and add the PHP file header in the normal way. Look in the snippets list for the "Backend Item Edit Layout" and bring up the form. We've only got three options in this snippet: the name of the component, "hello" in lower case; the name of the view, "message" in lower case; and the component option "com\_hello". Insert the snippet and let's see what we have.

First, you can see we are using the JHtml class to load three core behaviours, one for displaying tooltips, which is used by the edit form, one for validating the HTML form and finally one to keep the page alive while we are on the edit page.

Next, there is a block of javascript to handle what happens when we want to save the edit page. This is a little different from previous versions of Joomla because we are starting to use some framework architecture in the javascript now. What we are doing is attaching a "submitbutton" behaviour to the master Joomla javascript object. We are grabbing the form object by its id and then we are checking if the task is trying to cancel the edit, or, if not, we are using a form validation object to check the form. If we are cancelling or closing the page, or the form validation passed, we add any code that is required for the WYSIWYG area to save, then we call "Joomla.submitform", passing the task and the form, which will literally submit the form back to the server.

If the form is not valid, I've included some custom javascript code to scan for and count the invalid fields, and then display a message to the user. This is useful because sometimes invalid fields can be hidden behind a slider panel and not immediately obvious to the user.

We then move down and open the HTML form tag. This has an action attribute with a routed URL back to this page, including the id of the record. The method must be "post" and the name "adminForm" which is case sensitive. The id attribute of the form tag must be unique and then we give it a class of "form-validate". This tells the validation behaviour that we loaded, using the JHtml helper, to validate this form. The actual validation rules are controlled by the XML file for the form that we looked at in the last lesson.

Ok, I apologise in advance but I need to cut back to an older copy of the video at this point. The bulk of the layout now is structural HTML markup but using the JForm API to add the form elements. We start with a div and fieldset tag given standard Administrator styling, then open an unordered list tag for the main fields. Each list item will show the form field's label and input area and you can see we do this by accessing the form variable that we injected into the view, and the "getLabel" and "getInput" methods. We simply need to pass the name of the field that we want to display to each of those methods.

Before we display the body field, which is a WYSIWYG editor, we close the list. Then we display the label, a clearing div and then the WYSIWYG field. This all forms the left-hand column of the page covering 60% of the width.

We then open another div column for the right-hand side of the page. You can see we are using another JHtml helper to start a slider pane, then we are using a method called "loadTemplate". Remember those two sub-layout files we created? Well, the "ladTemplate" method is how they are included in this layout. We don't need to include the "edit\_" prefix, just the last part of the name.

Finally, and just before we close the HTML form tag, we add a hidden input for the task that the toolbar will use, and then we use another JHtml helper to add the form token that helps make sure that it's you that is submitting the form, not some remote hacker. 

#### Create the edit\_params.php sub-layout

That's it for the main layout file, so let's move on to see what's in these sub-layout files. Open the "edit\_params.php" file and add the file header in the normal way. Look for the snippet called "Backend Item Edit Params Sublayout". This one drops straight into the file.

Ok, this looks a bit complicated but let's work through each bit. First, we get an array of all the fieldsets in the "params" field. Remember in the XML we defined two sets - a basic fieldset and an advanced fieldset. Then we go into a foreach loop to cycle through each fieldset. To start the fieldset off, we make a call to a JHtml helper to start the slider panel. Then we do a check to see if the description was defined in the XML. If it was, we print that in a paragraph tag. Remember we need to escape any variables where we don't want or expect HTML within the variable.

Next we open an HTML fieldset tag, not to be confused with our JForm fieldsets, and then open an unordered list tag. Another foreach loop is used to cycle through each field of the fieldset. The collection of fields is retrieved using JForm's getFieldSet method given the name of the fieldset. Finally we print the field's label and input markup in the list item. Notice that because we are using an actual form field object, we can use the label and input properties of the object directly. Close up all the tags and loops and this block of code will display a tidy set of slider panels for each of the fieldsets we defined in the XML file.

#### Create the edit\_metadata.php sub-layout

The second sub-layout is to display some record metadata so open the "edit\_metadata.php" file and then add the header in the normal way. Find the snippet called "Backend Item Edit Metadata Sublayout" and bring up the form. We just need to fill in the component option for this one and insert the snippet.

This file should look a little less daunting. We start, again, with the JHtml helper opening another slider panel, and I've just upper-cased the language string while I'm there.

Next we open another HTML fieldset to hold all the meta information, then another unordered list. The first two fields are for the meta description and the meta keywords. The next two fields are for the created time and the modified time. You can see we do a check on the integer value of the individual time variable. If it's not zero, it's probably a real date so we then print the label and input field. Remember from the XML file that these two fields will be read only, so you won't be able to modify them.

The view and it's layout are now prepared. In the next lesson we'll explore how our component looks and play with adding data. See you back soon.

[0]: http://eddify.me/categories/snippets.html
[1]: https://github.com/eddieajau/joomla-hello-world
