---
layout:      post
title:       Joomla development 219 - Adding the backend XML form
description: This lesson shows you how to add the backend XML form that will specify the item edit page in Joomla 1.6 and 2.5.
date:        2011-05-29 21:29:55
category:    ["joomla-development","videos"]
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

<iframe allowfullscreen="allowfullscreen" frameborder="0" height="315" src="http://www.youtube.com/embed/sYd7A9Nf_SI" width="560"></iframe>

This lesson shows you how to add the backend XML form that will specify the item edit page.

Eclipse snippets used in this video can be **[downloaded here][0]**. Final source code is available on **[Github.com][1]**.

#### Adding the XML form folder and file

Welcome back. In our last lesson we just completed the model class that will support our edit page. The JForm class that powers the edit page will need an XML file to describe the types of fields the edit page will be displaying. By default, JForm will look for these XML files in a folder called "forms" under that component's "models" folder. So let's create that and move onto creating the XML file. This file will, by convention, have the same name as the model so we call it "message.xml". Copy your "index.html" files into the new folders, as we've done in previous lessons.

Now, have a look in the snippets list for "Backend Item XML Form" and insert that. This snippet has two variables, one for the option of the component in upper case, and one for the lower case name of the edit view. Insert the snippet and let's take a look.

#### Overview of XML form fields

Now, we had a very brief look at some JForm XML in an earlier lesson when we looked at the component configuration options. As usual, we start the XML file with the XML prologue. The next line is an XML comment that's used if you are storing your code in Subversion or maybe CVS. If you are using a distributed version control system (DVCS) like Git or Mercurial, you can remove this line.

So, we start the XML off with a wrapping "form" tag and then open a "fieldset" tag with no attributes. This fieldset will hold most of the fields for the database table. Let's step through them.

The first "field" element is for the id field from our table. Most of the fields follow a convention that is similar to "input" tags used in HTML forms. Each field has a mandatory "name" attribute and this normally corresponds to the name of the database field - so, for this field the name is "id". Each field has a type, and this generally marries with the type of HTML form element you want to display. The default is "text" and this is what we've chosen for the "id" field. This will render as a typical HTML input tag with a type attribute of text.

The next two attributes are for the label and description. The "label" attribute will be the label associated with the HTML form element, and the "description" will be the tip that displays when you hover over the label.

You can give a field an optional default value that would be used when creating a new item. For the "id" field we set this to zero, but you could leave this out if you want.

A field can also be given a class, and this will correspond to the class attribute in the HTML form element. The Joomla Administrator stylesheet has a style for readonly fields so that's what we use for the "id" field - we don't want users changing that.

Lastly we have attributes that you would see in a normal HTML input tag such as the "size" and also "readonly" is set to "true". Much of this markup is very similar to the old JParameter fields that you might be familiar with from Joomla 1.5\. In contrast, JForm not only helps display a form but also process the submitted data. Setting the "readonly" attribute to true will mean that when the form is processed, the value for the "id" field will actually be stripped from the data by the JForm API.

Let's move on to the next field. This is for the "category\_id" and the type attribute is "category". This is a special type of field that builds a select list of categories for the component. You can find all the built-in types by looking at the "libraries/joomla/form/fields" folder. This field has a few new attributes to look at. The "extension" attribute defines which set of categories we are using wanting to use. If we didn't supply it we'd get all the categories for every component - well, actually, it probably defaults to "com\_content". The point is, you need to specify the extension from which to list the categories.

There's also an option provided in this field. Because this field is based on a select list, in addition to the list options it gets from the database, it can also prepend any options you include by hand. Now, if you are using categories for access control, you will not want to include a "No Category" option. If you don't need access control, having a "No category" option is fine - it's up to you whether you keep it or not.

The next field is for the "title". It's similar to the "id" field except we've given it a wider size and you can also see that an attribute called "required" is set to true. By doing this, the edit page will include the necessary javascript to validate this form field on the fly, and it won't let you submit the form until you type something in. Similarly, when you submit the form, the JForm API will automatically check that "title" is populated in the request without you having to supply your own code.

You can also see by now that there are a lot of standard language strings for common fields like the "id", the "title" and categories. Please use them to your advantage.

The next field is for the "alias" and it's very similar to the "title" field expect that it's not explicitly required. This is done so that we can leave it empty and have the component model generate it for us - we saw the code for that in the last lesson.

Moving on, the next field is for the "body" and this is an "editor" type. This will give you a WYSIWYG editor. The "editor" type also has a filter attribute. In our case this is set to "safehtml" which will allow most safe HTML tags through. If you left this out, all HTML would be stripped from the content of the field, which is not terribly useful for a WYSIWYG editor. You could also use "raw" if you didn't want any filtering to occur. The other attribute is "buttons" and we set that to "true" so that the editor buttons display.

Next is the "note" field which is another standard text field.

Next is the "published" field which is given the type of "list". This will give us a regular HTML select tag with the options defined in the field tag. You can see we've used the "default" attribute to define which option is selected. You can also see that we've set the filter to "intval". When the form processes the submitted data, we want it to convert this field to an integer. The filter attribute accepts regular PHP functions which is handy to use in this case. It's always important to think about the type of data you want coming into the database from the request.

The next field is for the "ordering" and it's another standard text type field.

The next field is the "access" field which is given a type of "accesslevel". This will give us a list of the viewing access levels that are defined in the user manager.

The next field is for the "language" and we give this the type of "contentlanguage". This will look up the content languages defined in the language manager. Note that the content languages are different from the installed language packs. You can define any number of content languages even if you don't install them as language packs. The default case is "\*" and this represents all languages, and you can see we include that as an option in the list and it will show up as the first option in the list.

The next two fields are for "metadesc" and "metakey" and these are textarea fields so we give them the additional attributes of "rows" and "cols" to control the size of the textarea.

The next three fields are for "checked\_out", "checked\_out\_time" and "created\_user\_id". We've added them with the type of "hidden" and a "filter" value called "unset". This means that when the form is processes, if these values are set in the incoming request, they will be stripped from the data.

We've included the "created\_time" field so that we can actually display the value but, like the previous fields, we unset the value because we don't want the user to be able to modify it.

Finally we treat the "modified\_user\_id" and "modified\_time" fields in the same way as "created\_user\_id" and "created\_time" respectively. 

#### Handling complex data - the "params" field

There's only one field left to handle and that's the "params" field and this is handled simply, but differently. What we need to do is close the "fieldset" tag we opened near the beginning of the file. Now, the "params" field is a complex field, it's actually a set of fields within a field except that we only want to store one value in the database. To do this we open a "fields" tag and give it a name attribute that is the name of the field all the data is going to be stored in - in our case, that's "params".

Next, we open a "fieldset" for each set of parameters, or options, that we want to store. You can have as many fieldsets as you want and each one is rendered as a slider panel in the Administrator template. You should give each fieldset a name and a label.

Then, in each fieldset, you just include the fields you want for the options you need to provide for this type of record. You can see we've included a basic option to show the title of the record, and an advanced option to select an alternative component layout for the record. When the form is submitted, all the options in the fieldsets are processed into a single JSON encoded string that is stored in the "params" field in the database.

And that's about it. All we need to do now is make the view and we should be able to see our edit form, and we'll do that in the next lesson. See you back soon.

[0]: http://eddify.me/categories/snippets.html
[1]: https://github.com/eddieajau/joomla-hello-world
