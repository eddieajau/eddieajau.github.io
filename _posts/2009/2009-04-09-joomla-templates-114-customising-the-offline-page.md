---
layout:      post
title:       Joomla Templates 114 - Customising the Offline Page
description: Joomla allows a site to be taken offline with a setting in the Administrator Global Configuration panel.  When this happens, frontend access is no longer permitted and a special offline page is displayed.  By default, the source for this page comes from the core supplied System Template.  However, Joomla allows you to provide your own offline page.  To do this you need to create a file called offline.php in your template folder.  Like index.php, component.php and error.php, this is a fully fledged template file in which you can use PHP and jdoc:include statements.
date:        2009-04-09 10:47:22
category:    joomla-templates
image:
  thumb:     vendor/joomla.png
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
Joomla allows a site to be taken offline with a setting in the Administrator Global Configuration panel.  When this happens, frontend access is no longer permitted and a special offline page is displayed.  By default, the source for this page comes from the core supplied System Template.  However, Joomla allows you to provide your own offline page.  To do this you need to create a file called offline.php in your template folder.  Like `index.php`, `component.php` and `error.php`, this is a fully fledged template file in which you can use PHP and jdoc:include statements.

Custom offline pages should ideally conform to a style that compliments the active web site.  Keeping the structural layout similar and including any prominent headers can allow this page to feel less imposing.

## Creating a Custom Offline Page

The easiest way to provide your own offline page is to copy the following files:

`/templates/system/offline.php`  

`/templates/system/css/offline.css  

	` `/templates/system/css/offline_rtl.css`` `

to:

`/templates/your_template/offline.php`  

`/templates/your_template/css/offline.css  

	` `/templates/your_template/css/offline_rtl.css`` `

This gives you a working base with which to customise the file.

### Creating the Page from Scratch

If you want to start your own offline page from scratch, the minimum you require is the following listing:
    
    <?php
    // no direct access
    defined( '_JEXEC' ) or die( 'Restricted access' );
    
    // Get the Joomla Application object
    $app = &JFactory::getApplication();
    ?>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $this->language; ?>" lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">
    <head>
        <jdoc:include type="head" />
        <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/system/css/system.css" type="text/css" />
        <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/css/offline.css" type="text/css" />
        <?php if($this->direction == 'rtl') : ?>
            <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/css/offline_rtl.css" type="text/css" />
        <?php endif; ?>
    </head>
    <body>
        <jdoc:include type="message" />
        <h1>
            <?php echo $app->getCfg('sitename'); ?>
        </h1>
        <p>
            <?php echo $app->getCfg('offline_message'); ?>
        </p>
    
        <form action="index.php" method="post">
            <fieldset>
                <p>
                    <label for="username"><?php echo JText::_('Username') ?></label>
                    <br />
                    <input name="username" id="username" type="text" class="inputbox" alt="<?php echo JText::_('Username') ?>" size="18" />
                </p>
                <p>
                    <label for="passwd"><?php echo JText::_('Password') ?></label>
                    <br />
                    <input type="password" name="passwd" class="inputbox" size="18" alt="<?php echo JText::_('Password') ?>" id="passwd" />
                </p>
                <input type="submit" name="Submit" class="button" value="<?php echo JText::_('LOGIN') ?>" />
            </fieldset>
            <input type="hidden" name="option" value="com_user" />
            <input type="hidden" name="task" value="login" />
            <input type="hidden" name="return" value="<?php echo base64_encode(JURI::base()) ?>" />
            <?php echo JHTML::_( 'form.token' ); ?>
        </form>
    </body>
    </html>

Most of this file should be familar to you now.  The `head` includes the System Template `system.css` to support any messages that might be generated (such as for a failed login attempt).  Naturally, you can apply any additional HTML code or styling that you require to suite the needs of your own web site.

### Accessing Configuration Settings

The body contains some new information that we have not covered in the template chapter yet.  A new variable, `$app`, has been introduced.  You will notice that is was defined near the top of the listing with:
    
    // Get the Joomla Application object
    $app = &JFactory::getApplication();

`JFactory` is a class that is part of the Joomla Framework and it allows us to get an object that contains a lot of information about the Joomla web site that is being loaded.  You might also be familar with a variable called `$mainframe`.  This is the same thing but the way it has been shown here is forward compatible with Joomla version 1.6\.  The name of the settings for the Site Name and the Offline Message are _sitename_ and _offline\_message_ respectively.

The application object has many methods but on of them, `getCfg`, allows you to access the settings in the Joomla configuration file (which are also the settings you see in the Administrator Global Configuration page).
    
        <jdoc:include type="message" />
        <h1>
            <?php echo $app->getCfg('sitename'); ?>
        </h1>
        <p>
            <?php echo $app->getCfg('offline_message'); ?>
        </p>

We pass those setting names to the `getCfg` method and use PHP's echo statement to display them on the page.  You will also notice the `jdoc:include` tag to include an system messages.

### The Login Form

The default offline page includes a login form that allows an administrator user to log in and test any changes being made while the site is offline.
    
        <form action="index.php" method="post">
            <fieldset>
                <p>
                    <label for="username"><?php echo JText::_('Username') ?></label>
                    <br />
                    <input name="username" id="username" type="text" class="inputbox" alt="<?php echo JText::_('Username') ?>" size="18" />
                </p>
                <p>
                    <label for="passwd"><?php echo JText::_('Password') ?></label>
                    <br />
                    <input type="password" name="passwd" class="inputbox" size="18" alt="<?php echo JText::_('Password') ?>" id="passwd" />
                </p>
                <input type="submit" name="Submit" class="button" value="<?php echo JText::_('LOGIN') ?>" />
            </fieldset>
            <input type="hidden" name="option" value="com_user" />
            <input type="hidden" name="task" value="login" />
            <input type="hidden" name="return" value="<?php echo base64_encode(JURI::base()) ?>" />
            <?php echo JHtml::_('form.token'); ?>
        </form>

The form must use the _post_ method and include input fields named _username_ and _passwd_.  The form is processed by the User Component under the _login_ task, so the hidden fields in the form reflect this.

The hidden input field named _return_ hold a special value that allows you to return to the page you were on.  It's optional to provide this for the offline page.  The only use it would have is if you land on a specific page that is not the home page, find the site is offline and want to log in (assuming to have administrator access to do so).

If you are distributing commercial templates, it is advisable to include this form.  If you are implementing a custom offline page for your own site, then including this form is optional.  For example, if testing is done on a staging site prior to upload, there is probably little need for in-situ testing of the offline site.  The decision is really up to the web master of the site as to whether it is necessary.

Before the form closes is a very important line.
    
            <?php echo JHtml::_('form.token'); ?>

This line inserts an additional hidden field used to prevent a certain type of malicous attack on your site (called CSRF - we cover this in other parts of this Reference).  If you do not include this line, your site will stop and display an _Invalid Token_ message and an Administrator will not be able to log in.
