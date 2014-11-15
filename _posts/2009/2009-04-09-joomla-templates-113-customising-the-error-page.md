---
layout:      post
title:       Joomla Templates 113 - Customising the Error Page
description: The Joomla error page, while functional, is not the prettiest page to look at and can be a bit of a shock to your site visitors if they accidentally stumble upon it.
date:        2009-04-09 10:47:22
category:    joomla-templates
image:
  thumb:     vendor/joomla.png
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
The Joomla error page, while functional, is not the prettiest page to look at and can be a bit of a shock to your site visitors if they accidentally stumble upon it.

![Screenshot](images/reference/joomla_error_page.png)

As discussed in a previous section, this default page comes from the core supplied System Template.  However, it is possible to supply your own version of the page tailored to site your site design.

## Creating a Custom Error Page

You will typically create at least two files to support a custom error page:

`/templates/your_template/error.php`  

`/templates/your_template/css/error.css`

If you do not provide your own `error.php`, Joomla will use the \[ugly\] one from the System Template.

The following listing shows basic elements of the error page around which you can apply your own styling or additional messages.
    
    <?php
    // no direct access
    defined('_JEXEC') or die('Restricted access');
    ?>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $this->language; ?>" lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">
    <head>
        <title><?php echo $this->title; ?></title>
        <link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/error.css" type="text/css" />
    </head>
    <body>
        <dl>
            <dt>
                <?php echo JText::_('Error_Code'); ?>
            </dt>
            <dt>
                <?php echo $this->error->getCode() ?>
            </dt>
            <dt>
                <?php echo JText::_('Error_Message'); ?>
            </dt>
            <dt>
                <?php echo $this->error->getMessage() ?>
            </dt>
        </dl>
        <p>
            <a href="<?php echo $this->baseurl; ?>" title="<?php echo JText::_('Go to the home page'); ?>">
                <?php echo JText::_('Home Page'); ?></a>
        </p>
        <p>
            <?php if ($this->debug) :
                echo $this->renderBacktrace();
            endif; ?>
        </p>
    </body>
    </html>

Some of this will look familar if you read over the section on the Master Template File.  That is because error page is actually template in it's own right, so it uses all the same conventions as you find in the `index.php` file though it is much lighter.  This page could display because of a user created error, for example a page was not found, or it could be generated because of a PHP error.  As a result of the latter, you don't want to actually do much work in this file.  It could trigger the error again and then there is the risk of your site spinning out into a endless loop, never to return.  We don't load any modules, nor include `jdoc:include` tags, nor try to do anything too fancy.

## The Error File Head

The head of the error file is really only concerned with setting the HTML document title manually (we haven't had to do that before) and loading a supporting stylesheet.
    
    <head>
        <title><?php echo $this->title; ?></title>
        <link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/error.css" type="text/css" />
    </head>

In the `title` tag you will see a new variable is called `title`.  The value has already been set they Joomla's error handling system. So we just need to echo it using PHP.  It is in the form of "Error: 123" where _123_ is the code of the error.

The next line loads the error stylesheet.

## The Error File Body

The error page has a property named `error` and this is actually a real Joomla error object.  The error object has two methods called `getCode` and `getMessage`.  Each error has a number code and a message attached to it.  We have used these two methods to display the error code and the error message in an HTML definition list.
    
    <dl>
            <dt>
                <?php echo JText::_('Error_Code'); ?>
            </dt>
            <dt>
                <?php echo $this->error->getCode() ?>
            </dt>
            <dt>
                <?php echo JText::_('Error_Message'); ?>
            </dt>
            <dt>
                <?php echo $this->error->getMessage() ?>
            </dt>
        </dl>

You can also see that we have introduced a new PHP statement.  `JText` is what we call a class in PHP and this is the class that handles the translation of text based on the languages installed on the site.  This class also has methods but because of the way that Joomla uses it, we don't call it's methods with the arrow operator (`->`) like we do with the object.  Instead we use a double-colon (`::`).  The method name is a bit unusual being just an underscore.  That's actually a valid character to use in a method name.  Several other classes, such as `JRoute` which you will come across in layout overrides, also have the underscore method.

`JText::_` takes a string of text it's first argument and passes that through the Joomla translation layer.  If your language files are set up to include this string, then it will be translated into the appropriate language that has been set in Administrator Global Configuration.  On a mono-lingual site you could just as easily have typed the text in without resorting to using the PHP translation methods and that's perfectly fine.  However, if you are supporting a multi-lingual site, you should use the translation system.  You will need to add extra language strings to the template language file to support this.

Next we provide a link for the visitor  to go back to the home page.
    
        <p>
            <a href="<?php echo $this->baseurl; ?>" title="<?php echo JText::_('Go to the home page'); ?>">
                <?php echo JText::_('Home Page'); ?></a>
        </p>

You can see we've used the baseurl template property like we did in index.php, and also used the translation methods for the text.

Lastly make an allowance to optionally provide developers some feedback.
    
        <p>
            <?php if ($this->debug) :
                echo $this->renderBacktrace();
            endif; ?>
        </p>

This is a little bit of PHP that look a little more complicated than usual, but it's not that hard to understand.  The error template also includes a `debug` property.  This will be set to true if debugging is turned on in Global Configuration.  You don't normally have it turned on for a production site, but a developer will turn it on to test other customisation to the site, or to assist with support calls.  All this block of code says is if debugging is turned on, then run the `renderBacktrace` method in the error template and display the results.  If debugging is not on, don't do anything.  The `renderBacktrace` method prints out a table of funny looking information that can sometimes assist in tracking down exactly what went wrong to cause the error (assuming that it was an error that was not supposed to occur).

Those are the basics for the error file.  You can of course wrap these basic elements in any structural markup that, at the very least, make this page look less intimidating to your site visitor.  Including images and styles to beautify this page is quite acceptable.
