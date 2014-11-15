---
layout:      post
title:       Joomla Templates 102 - The Master Template File (index.php)
description: The master template file, index.php, is the file that is loaded by Joomla and controls all subsequent output.  Any Site or Administrator template there are a number of common elements.
date:        2009-04-09 10:47:22
category:    joomla-templates
image:
  thumb:     vendor/joomla.png
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
The master template file, `index.php`, is the file that is loaded by Joomla and controls all subsequent output.  Any Site or Administrator template there are a number of common elements.

1. The head, including a Joomla API directive to include additional head tags.
2. The body of the HTML page with the desired structural and cosmetic markup.
3. A place for the component output to display.
4. One or more places for modules to display.
5. A directive that will display system messages, notices and warnings.

## A Basic Template

The following code shows an example of the basic markup that would be included in the template master file.  Obviously in real life there would be many structural containers and associated styles, but these have been removed for the sake of clarity.
    
    <?php
    /**
     * @copyright    Copyright (C) 2005 - 2013 New Life in IT Pty Ltd. All rights reserved.
     * @license      GNU General Public License Version 2 or later.
     * @author       Andrew Eddie, <andrew.eddie@example.com>
     */
    
    // No direct access
    defined('_JEXEC') or die();
    ?>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $this->language; ?>" lang="<?php echo $this->language; ?>" >
    <head>
        <jdoc:include type="head" />
        <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/system/css/system.css" type="text/css" />
        <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/system/css/general.css" type="text/css" />
        <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template;?>/css/template.css" type="text/css" />
        <?php if ($this->direction == 'rtl') : ?>
            <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/css/template_rtl.css" type="text/css" />
        <?php endif; ?>
    </head>
    <body>
        <div style="width:20%;float:left;">
            <jdoc:include type="modules" name="left" />
        </div>
        <div style="width:79%;float:right">
            <jdoc:include type="message" />
            <jdoc:include type="component" />
        </div>
    
        <jdoc:include type="modules" name="debug" />
    </body>
    </html>

## Starting the File

The master template file is a PHP file.  That means that the PHP parser on the web server will read this in a particular way looking for code that is wrapped in special markers.  A block of PHP code starts with the `<?php` marker and ends with the `?>` marker.  What happens between those markers must be valid code otherwise PHP will throw notices, warnings or event fatal errors.  On the other hand, sometimes you get a white-screen-of-death if a PHP error occurs but your web server is set not to display them.  For more information about how to see errors, read the section on Preparing Your Joomla Environment.

Some templates can contain a lot of PHP code but in our case we have only the basics.  The first bit where all the lines start with stars is called a Docblock.  It's just a PHP comment.  As long as it starts with `/**` and ends with `*/`, anything in between will be ignored by the PHP parser.  There is also a single line version for a comment which you can see after the Docblock and that starts with `//` (a double forward slash).  Anything included after that will be ignored by the PHP parser as well until it hits the end of the line.

We've included a copyright statement, the license for the code in the PHP file, and an email address for the author.  You could include any other information you like such as your web site or other support information.  The license for this file must always be the GNU General Public License otherwise it will not be compatible with the source code of Joomla itself.  We'll talk a little more about licensing and templates in later section.

Next there is a very, very important line of PHP that protects your file from wouldbe hackers.
    
    defined('_JEXEC') or die();

All this line does is looks for a marker set in Joomla.  If it doesn't find it, then there is a good chance someone is trying to open this file directly in their browser and that is something we want to prevent.  If they do, the `die` statement quite literally kills the PHP parser and sends a brief message to the visitor.  If we don't do that then any number of horrible things could be done to your site depending on the code in the template.  Suffice to say, always ensure that when you design, or even install a template, all the PHP files in the template have that line of code.  For completeness, each PHP statement will end in a semi-colon.

## HTML Structure

After the inital block of PHP, the file overall turns into a regular HTML document with the DOCTYPE directive, HTML, HEAD and BODY tag.

Discussing the DOCTYPE is beyond the scope of this reference.  There is plenty of information around that describes this but we do recommend you lean towards an XHTML standard.

Next you'll notice we are using some PHP to set the `lang` attributes of the HTML tag.
    
    <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $this->language; ?>" lang="<?php echo $this->language; ?>" >

Variables in PHP start with a `$` sign, so the `$this` is a variable, specifically it is what we call an object.  An object can have properties and that is what the arrow (`->`) operator is doing.  So what we have here is an object called `$this` and we want to do something with the value of the `language` property.  In the template master file, $this can be thought of as "the template".  In other words, "the template" has a property called "language".  We want to print out the value of this property.  In PHP we use a command called `echo`.  When Joomla includes this file, the line will be parsed into something that looks similar to the following:
    
    <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-gb" lang="en-gb" >

Obviously that actual value of the language property will depend on other settings in Joomla, but you should get the idea behind how the PHP markup turns into "text".  There are obviously a great many more things you can do with PHP markup and we will look at these in more detail as we explore this file.

Like all good HTML documents we then have a single HEAD and BODY block just like any normal web page.  We will look at how those are constructed separately.

## The HEAD Tag

The HEAD tag is an interesting place because Joomla can do a lot of the hard work that you would traditionally code by hand.  Let's recap what this section of the code looks like:
    
    <head>
        <jdoc:include type="head" />
        <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/system/css/system.css" type="text/css" />
        <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/system/css/general.css" type="text/css" />
        <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template;?>/css/template.css" type="text/css" />
        <?php if ($this->direction == 'rtl') : ?>
            <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/css/template_rtl.css" type="text/css" />
        <?php endif; ?>
    </head>

We can see that we are printing out more PHP properties from the template in places, and there are some new PHP statements but the main feature is the introduction of what we call `jdoc:include` tags.
    
        <jdoc:include type="head" />

This is a special directive that tells Joomla to insert all of the code that either the system, component or plugins have signalled need to go in the head of the document.  It must include a `type` attribute and in this case the value of that attribute must be "head". It will inject the following elements in order:

1. A base tag is written where the href is the base path of the page being loaded.
2. Any system specified standard or http-equiv `meta` tags are written.
3. The `meta` description is written.
4. The `meta` generator is written.
5. The `title` tag is written.
6. Any system specified `link` tags are written but exclduing stylesheets.
7. All stylesheet `link` tags are written.
8. Any system specified `style` tags are written.
9. Any system specified `script` tags are written that link to files.
10. Any system specified `script` tags are written that are not specifically linking to files.
11. Any other custom code is written that could have been added by a component, module or plugin developer.

Following this line we have added the `system.css` and `general.css` stylesheets from the System Template.  This picks up CSS styles for pagination buttons, tooltips, image captions and system messages.
    
        <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/system/css/system.css" type="text/css" />
        <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/system/css/general.css" type="text/css" />

You can see that another PHP property of the template is being to in the `href` value called `baseurl`.  This is the URL that you would go to to get to the home page of your site.  It's important to include this in cases where SEF support is turned on (which would be the normal case) or if the Joomla site is in a subfolder relative to the top level domain (which could happen in test or development environments).

Next we include the master CSS file for the template.
    
        <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template;?>/css/template.css" type="text/css" />

The name template.css is recognised by the Administrator Template Manager and you will be able to edit this file from the backend.  However, you don't have to use that name and you can also include as many CSS files are you so desire.  However, less files means less requests to the web server which can make load times just that little bit faster.  Many web authoring sweets do slice up the CSS files into various structural and presentation file that make them easier to maintain.  It is probably worth looking at concatenating them all into a single exta file, and that one file is included in the template.  Compacting (usually by removing a lot of unnecessary white-space) that single file is also a good idea to reduce load time.

We observe in this line another template property called `template`.  This is simply the name of the folder in which the template files reside.

The last part is dealing with supporting right-to-left (RTL) languages such as Arabic.
    
        <?php if ($this->direction == 'rtl') : ?>
            <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/css/template_rtl.css" type="text/css" />
        <?php endif; ?>

There are a few things happening here.  Firstly we've introduced what we call a conditional statement.  All that means is we want to test some value by some condition, and if that condition is met we want something to happen.  If it is not met, we don't want "the something" to happen.  Do to this we start our PHP statement in the normal way and write an `if` statement, with the condition to test in round backets, then followed by a colon and close the PHP statement.
    
        <?php if (_the condition to test_) : ?>

Sometimes you will see an if statement using curly brackets instead of the colon and the endif.  That's perfectly fine to use as well and developers will use this format in the actually source code of a component, but for templates (and also layouts) the other form is prefered because it looks a little less scary to people who are not as familiar with PHP are the hard-code developers.

Getting back to the test, we can see that the template also has a `direction` property.  This is set by the language that has been set in Joomla.  We want to test if the direction is "equal to" the value 'rtl'.  There are a couple of things to note here.  When testing for "equal to" we must use a double-equals sign, `==`.  If we only used a single-equals sign then we would be telling PHP to actually "set" the direction property to some value instead of "compare" it.  It is a very common trap to accidentally a single instead of the double-equals, like this:
    
        // This is the WRONG way
        <?php if ($variable = '1234') : ?>

If the language is written right-to-left, the the value of direction will be "rtl".  Strings must be enclosed in quotes.  They can be either single or double-quotes but use single quotes where possible as a matter of habit.  If the condition is "true", that is, direction is actually set to "rtl" then we have written the code to include the `template_rtl.css` stylesheet.  This file includes any additional or override classes we need to support presenting the web site in a right-to-left-friendly way.

Finally, we close with the PHP `endif` statement.

## The BODY Tag

The role of the body tag is to frame the dynamic elements in structural markup, and either use jdoc tags or call template methods to inject that dynamic content into the page.  Revising the example code:
    
    <body>
        <div style="width:20%;float:left;">
            <jdoc:include type="modules" name="left" style="xhtml" />
        </div>
        <div style="width:79%;float:right">
            <jdoc:include type="message" />
            <jdoc:include type="component" />
        </div>
    
        <jdoc:include type="modules" name="debug" />
    </body>

This example shows just enough structural markup to demonstrate how we frame the modules and the component output.  In practice, you would use classes for the styles but they are included here explicitly for clarity.

### Including Modules in a Position

Virtually every template will have a need to include modules assigned to a particular position via the Administrator Module Manager.  To do this, we use another `jdoc:include` tag with a type of _modules_.  This type must be provided with a name argument, the value of which is the module position you want to include.  The _modules_ type also takes an optional argument for style.  The value of style is the chrome that is to be used for the module (see the section on the System Template for a detailed explanation of the default types of chrome available).
    
            <jdoc:include type="modules" name="left" style="xhtml" />

Thus, our example is saying to include all of the modules in the _left_ position using the _xhtml_ style (or chrome).

Our other example includes a position called _debug_.
    
        <jdoc:include type="modules" name="debug" />

This tag is includes the modules in the position called _debug_.  This position is special because it is used by the System Debug Plugin that you can enable from the Administrator Plugin Manager.  You should our of habit always include this in your templates as the last statement before you close the `html` tag (with the exception of scripts - you should put them last of all after the debug modules).

### Including System Messages

System messages are funny things because they are not immediately visible.  An easy way to see a system message is to login to either the Site or Administrator, edit an article and then save it.  A message with a coloured background will generally appear.  If it doesn't, it usually means the designer has forgotten to put it in (probably because they didn't appreciate the significance of it).
    
            <jdoc:include type="message" />

This should be included in every template and a good place for it is just before the place you include the component output.  The system messages are wrapped in a definition list (a `dl` tag).  You can implement the styles your self or, as done in the example, just include the `system.css` stylesheet from the System template.

### Including the Component Output

The component output is very easy to include.
    
            <jdoc:include type="component" />

This tag literally takes the output of the component and replaces itself.  As shown in the example, it is a good idea to include the system messages in the same structural container but final styling is really up to you and artistic the needs of the web site.

## Advanced Topics

### Including a Single Module

This example is not shown, but it is also possible to include a single module.  This is typically done by include the module name in the `name` attribute as set in the Adminstrator Module Manager.
    
            <jdoc:include type="module" name="My Latest News" style="xhtml" />

This will look up the module by the name _My Latest News_ and display it in the _xhtml_ style (or chrome).  All the parameters for the module will be taken by the settings from the Module Manager.

It is also possible to include a module by it's file system name and include the parameters as additional attributes in the tag but it must be noted that not all module developers nor, in fact, the Joomla supplied modules support this.
    
            <jdoc:include type="module" name="mod_latestnews" style="xhtml" limit="5" />

You will have to look in the XML meta file for the module to see what parameters are available and include the appropriate ones.

### Testing Whether Modules Exist in a Position

Sometimes there is no easy way to have structural markup collapse neatly if no modules happen to be defined in a position, so we have some PHP template methods (you might also hear them referred to as functions) that can help us determine if, and also how many modules are in a given positions.  The method is called `countModules` and we use it like this:
    
    <?php if ($this->countModules('right')) : ?>
        <div class="right-container">   
            <jdoc:include type="modules" name="right" style="xhtml" />
        </div>
    <?php endif; ?>

We call the template method by passing the name of the position, in this case we are interested in the _right_ position, and testing it with a PHP `if` statement.  This method actually returns the number of modules in the position.  In our case any non-zero number will yield a _true_ result but you could have cases where it is important to your site that you know how many modules are available.  Essentially what we have said is if there are any modules in the right position, then include the modules in that position, using the _xhtml_ style, and wrap them all in some sort of containing `div` tag.

Now, it is also possible to pass a conditional statement to the countModules method.  We could test for various combinations of multiple positions by separating them with _and_ or _or_.
    
    <?php if ($this->countModules('left OR right') : ?>

This condition is testing if there are any modules in either the left or right positions.
    
    <?php if ($this->countModules('left AND right') : ?>

This condition is testing if there are any modules in either the left or right positions.
    
    <?php if ($this->countModules('left AND (right OR right2)') : ?>

This condition is testing if there are any modules in either the left and either the right or right2 positions.  Note the brackets because comparisons with `and` are handled before `or`.
    
    <?php if (!$this->countModules('right')) : ?>

By adding a exclamation mark (sometimes called a _bang_) in front of the method call, we can invert the test.  Our previous example are testing for when the returned value is true, but when we prefix the exclamation mark, we are testing for when the condition is _not true_ (in otherwords, the inverse of _true_, which is _false_).  Thus the example test for where ther are _not_ any modules in the right position.

Lastly we can provide a way of displaying code if the condition is true (or not true as the case may be), but fall back to some other code if the condition fails.  In PHP, the if statement also supports an `else` keyword (think along of the lines of _if_ something is _true_ do this, or _else_, do something different).
    
    <?php if ($this->countModules('right')) : ?>
        <div class="right-container">   
            <jdoc:include type="modules" name="right" style="xhtml" />
        </div>
    <?php else : ?>
       <div class="empty-right-container></div>
    <?php endif; ?>

The `else` keyword is followed by a colon and wrapped in the PHP braces.

### Testing Whether the Active Menu Item has Children

If there is a case where you want to selectively display code when the active menu item does or does not have children.  We can do this by using the `countMenuChildren` method.  This method takes no arguments.
    
    <?php if ($this->countMenuChildren()) : ?>
        <div>   
            <jdoc:include type="modules" name="submenu" style="xhtml" />
        </div>
    <?php else : ?>
       <div class="empty-container></div>
    <?php endif; ?>

This would typically be used to set up split-menu techniques.

## Summary of Template Tags, Properties and Methods

### `jdoc` tags

<jdoc:include type="component" /\> | Insert the output of the nominated component.
<jdoc:include type="head" /\> | Insert the page meta data, title, links, stylesheets, styles and scripts that other extensions, or the Joomla application has defined.
<jdoc:include type="message" /\> | Insert any system messages.
<jdoc:include type="module" name="Module Name" /\> | Insert a single module.
<jdoc:include type="modules" name="position" /\> | Insert all the modules in a position.

### Properties available in the template master file

$this-\>base | The base URL of the page.
$this-\>baseurl | The base URL of the page.
$this-\>description | The description for the document.
$this-\>language | The language code.
$this-\>link | The full URL of the page.
$this-\>params | Advanced topic. The template parameters.
$this-\>title | The title of the document.
$this-\>template | The name of the template folder.

### Methods available in the template master file

$this-\>loadTemplate('sub\_template\_name') | The title of the document
$this-\>countModules('postion') | Count the number of modules in the specified position or condition.
$this-\>countMenuChildren() | Count the number of child menu items for the active page.
$this-\>addCustomTag() | Advanced topic. Allows you to add a custom tag to the Joomla head include.
$this-\>addFavicon() | Advanced topic. Allows you to specify a fav icon for the web site and show it in the Joomla head include.
$this-\>addHeadLink() | Advanced topic. Allows you to add link tags to the Joomla head include.
$this-\>getBuffer() | Advanced topic.
