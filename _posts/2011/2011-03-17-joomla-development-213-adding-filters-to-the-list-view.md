---
layout:      post
title:       Joomla development 213 - Adding Filters to the List View of the Joomla Component
description: This lesson looks at how to add a search box to search for records in the list, and also how to add select filters for the view access level, the published state, the category and the content language.
date:        2011-03-17 17:30:30
category:    ["joomla-development","videos"]
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

<iframe allowfullscreen="allowfullscreen" frameborder="0" height="315" src="http://www.youtube.com/embed/JfBTZdxMl-E" width="560">

This lesson looks at how to add a search box to search for records in the list, and also how to add select filters for the view access level, the published state, the category and the content language.

Eclipse snippets used in this video can be **[downloaded here][0]**. Final source code is available on **[Github.com][1]**.

#### Adding filters to the layout

Welcome back. In our last lesson we'd just completed the foundation work for the list view. However, anyone who has worked on a Joomla site knows how much data can be added in a relatively short period of time, and finding that data again can become a problem. Paging though the list is not practical, so we need to add some filtering to make this a lot easier.

The first thing we'll do is add a text search box and a few drop-down select lists to the view. Jump back to your editor and if you aren't there already, open up the deafult.php file in the views/messages/tmpl folder.

Position your cursor under the form tag and then look for the snippet called "Backend list layout search filter" and double-click. This snippet has no variables so it will drop the code straight in. Let's have a look at it.

The snippet includes a fieldset with a number of div's representing different filtering elements. All the HTML id and classes are set blend with the defined 1.6 administrator template styles. 

#### The search text filter

The first div is our search filter. This is made of four different elements: the label for the text field, the text field where you type in your search text, a submit button and a button to clear the search result. All this looks pretty standard, but the main thing to note is the way we display the previous search text in the value attribute of the input tag.

Just a quick note - the snippet will include code to escape the search text which was included after this video was shot.

#### The select list filters

The next div contains all the select lists that filter on a particular field. The first filter is for the viewing access level. We what are doing here, and pretty much repeating for all the other cases, is opening a select tag with a particular name, in this case "filter\_access", and the onchange attribute means that when the user selects a different value from the list, the form will submit automatically. The next line provides a list option for the neutral or unselected condition and there are a number of standard language keys that you can use this option. Next we have a call to a JHtml select helper that will assemble the list of options in the list and also pick the selected list option for us. The first argument (after "select.options") is an array of PHP object that represent the list option. The second and third arguments define the names of the properties in those objects that correspond to the value and the text parts for the option tag. The last argument is the selected state of the list and you can see we are getting that from the model state. We'll have a look at how it gets in there shortly.

With all these drop-down lists, it's important to understand where the the data for the options come from. Because the view access levels are something that's very common, there's a JHtml helper, "access.assetgroups", that will give us a list of the viewing access level titles and their corresponding id values.

Moving on to the next drop-down list, this is for the published state. It's in a very similar format and we use the "jgrid.publishedOptions" helper to get the options, and the selected value is held in the "filter.published" variable in the model state.

Next is the filter for a single category. We are using the JHtml "category.options" helper to get the options for the list, and you'll note this also takes an argument so we get the categories just for this component. The selected value is held in the model state variable called "filter.category\_id".

Finally, we have a filter for the language field. The data for this list comes from the "contentlanguage.existing" JHtml helper and the extra two arguments, both true, relate to showing all language and translating the "All" string in the list respectively. The selected value is stored in the "filter.language" variable.

#### End of part 4

That's all we need to include so jump back to the browser and refresh the page. You'll see everything appears nice and neat but if you try changing any of the list, or submitting search text, it won't work. We need to do some work in the model to allow us to hold the state of these filters and also make the query refine the results in the list. We'll do that in the next lesson. See you back soon.

[0]: http://eddify.me/categories/snippets.html
[1]: https://github.com/eddieajau/joomla-hello-world
