---
layout:      post
title:       Joomla plugin overview
description: Joomla! plugins serve a variety of purposes.  As modules enhance the presentation of the final output of the Web site, plugins enhance the data and can also provide additional, installable functionality.
date:        2009-02-17 12:35:46
category:    joomla-development
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

Joomla! plugins serve a variety of purposes.  As modules enhance the presentation of the final output of the Web site, plugins enhance the data and can also provide additional, installable functionality.

This tutorial looks at the general principles used to design and build a plugin.

## Plugin Types

While the number of possible types of plugins is almost limitless, there are a number of core plugin types that are used by Joomla!.  These core types are grouped into directories under `/plugins/`.  They are:

* authentication
* content
* editors
* editors-xtd
* search
* system
* user
* xmlrpc

**Authentication** plugins allow you to authenticate (to allow you to login) against different sources.  By default you will authenticate against the Joomla! user database when you try to login.  However, there are other methods available such as by OpenID, by a Google account, LDAP, and many others.  Wherever a source has a public API, you can write an authentication plugin to verify the login credentials against this source.  For example, you could write a plugin to authenticate against Twitter accounts because they have a public API.

**Content** plugins modify and add features to displayed content.  For example, content plugins can cloak email address or can convert URL's into SEF format.  Content plugins can also look for markers in content and replace them with other text or HTML.  For example, the Load Module plugin will take {\*loadmodule banner1\*} (you would remove the \*'s in practice.  They are included to actually prevent the plugin from working in this article), load all the modules in the banner1 position and replace the marker with that output.

**Editor** plugins allow you to add new content editors (usually WYSIYWG).

**Editor-XTD** (extended) plugins allow you to add additional buttons to the editors.  For example, the _Image_, _Pagebreak_ and _Read more_ buttons below the default editor are actually plugins.

**Search** plugins allow you to search different content from different components.  For example, search plugins for Articles, Contacts and Weblinks are already provided in Joomla!.

**System** plugins allow you to perform actions at various points in the execution of the PHP code that runs a Joomla! Web site.

**User** plugins allow you to perform actions at different times with respect to users.  Such times include logging in and out and also saving a user.  User plugins are typically user to "bridge" between web applications (such as creating a Joomla! to phpBB bridge).

**XML-RPC** plugins allow you to provide additional XML-RPC web services for your site.  When your Web site exposes web services, it gives you the ability to interact remotely, possibly from a desktop application.  Web services are a fairly advanced topic and will not be covered in much detail here.

## The Basic Files

While a plugin can have any number of files, there are two you need as a minimum and there are specific naming conventions you must follow.  Before we look at the files, we must decide what sort of plugin we are going to create.  It must either fall under one of the built-in types (authentication, content, editors, editors-xtd, search, system, user or xmlrpc) or your can create your own type by adding a new folder under `/plugins/`.  So, files for an authentication plugin will be saved under `/plugins/authentication/`, files for a system plugin will be saved under `/plugins/system/`, and so on.

Let's look at an example creating the basic skeleton for a system plugin called "Test".  There is no restriction on the file name for the plugin (although we recommend sticking with alpha-numeric characters and underscores only), but once you decide on the file name, it will set the naming convention for other parts of the plugin.

For this plugin you will need to create a PHP file, `test.php`, which is the file actually loaded by Joomla! and an XML file, `text.xm`l, which contains meta and installation information for the plugin as well as the definition of the plugin parameters.

#### test.php

The skeleton `test.php` has the following source:
    
    <?php
    // no direct access
    defined( '_JEXEC' ) or die( 'Restricted access' );
    
    jimport( 'joomla.plugin.plugin' );
    
    /**
     * Example system plugin
     */
    class plgSystemTest extends JPlugin
    {
    	/**
    	 * Constructor
    	 *
    	 * For php4 compatibility we must not use the __constructor as a constructor for plugins
    	 * because func_get_args ( void ) returns a copy of all passed arguments NOT references.
    	 * This causes problems with cross-referencing necessary for the observer design pattern.
    	 *
    	 * @access	protected
    	 * @param	object	$subject The object to observe
    	 * @param 	array   $config  An array that holds the plugin configuration
    	 * @since	1.0
    	 */
    	function plgSystemTest( &$subject, $config )
    	{
    		parent::__construct( $subject, $config );
    
    		// Do some extra initialisation in this constructor if required
    	}
    
    	/**
    	 * Do something onAfterInitialise 
    	 */
    	function onAfterInitialise()
    	{
    		// Perform some action
    	}
    }

Let's look at this file in detail.  Please note that the usual Docblock (the comment block you normally see at the top of most PHP files) has been omitted for clarity.

The file starts with the normal check for `defined( '_JEXEC' )` which ensures that the file will fail to execute if access directly via the URL.  This is a very important security feature and the line must be placed before any other executable PHP in the file (it's fine to go after all the initial comment though).  The importance of having this check your PHP files cannot be overemphasised.

Next we use the `jimport` function to load the library file with the definition of the `JPlugin` class.

You will notice that a plugin is simply a class derived from `JPlugin` (this differs from previous versions of Joomla!).  The naming convention of this class is very important.  The formula for this name is:

`plg + Proper case name of the plugin directory + Proper case name of the plugin file without the extension.`

Proper case simply means that we capitalise the first letter of the name.  When we join them altogether it's then referred to as "Camel Case".  The case is not that important as PHP classes are not case-sensitive but it's the convention Joomla! uses and generally makes the code a little more readable.

For our test system plugin, the formula gives us a class name of:

`plg + **S**ystem + **T**est = plgSystemTest`

Let's move on to the methods in the class.

The first method, which is called the constructor, is completely optional.  You only require this is you want to do some work when the plugin is actually loaded by Joomla!.  This happens with a call to the helper method `JPluginHelper::importPlugin( _<plugin_type>_ )`.  This means that you even if the plugin is never triggered, for whatever reason, you still have an opportunity to execute code if you need to in the constructor.

In PHP 4 the name of the constructor method is the same as the name of the class.  If you were designing only for PHP 5 you could replace this with the name of `__constructor` instead.

The remaining methods will take on the name of "events" that are trigger throughout the execution of the Joomla! code.  In the example, we know there is an event called `onAfterInitialise` which is the first event called after the Joomla! application sets itself up for work.  For more information on when some events are triggered, see the [API Execution Order][0] page on the [Documentation Wiki][1].

The naming rule here is simple: the name of the method must be the same as the event on which you want it triggered.  The Joomla! Framework will auto-register all the methods in the class for you.

That's the basics of the plugin PHP file.  It's location, name and methods will depend on what you want to use the plugin for.  One thing to note about system plugins is that they are not limited to handling just system events.  Because the system plugins are always loaded on each run of the Joomla! PHP, you can include any triggered event in a system plugin.

The events triggered in Joomla! are:

#### Authentication

* onAuthenticate

#### Content

* onPrepareContent
* onAfterDisplayTitle
* onBeforeDisplayContent
* onBeforeContentSave (new in 1.5.4)
* onAfterContentSave (new in 1.5.4)

#### Editors

* onInit
* onGetContent
* onSetContent
* onSave
* onDisplay
* onGetInsertMethod

#### Editors XTD (Extended)

* onDisplay

#### Search

* onSearch
* onSearchAreas

#### System

* onAfterInitialise
* onAfterRoute
* onAfterDispatch
* onAfterRender

#### User

* onLoginUser
* onLoginFailure
* onLogoutUser
* onLogoutFailure
* onBeforeStoreUser
* onAfterStoreUser
* onBeforeDeleteUser
* onAfterDeleteUser

#### XML-RPC

* onGetWebServices

[0]: http://docs.joomla.org/API_Execution_Order
[1]: http://docs.joomla.org/Category:Development
