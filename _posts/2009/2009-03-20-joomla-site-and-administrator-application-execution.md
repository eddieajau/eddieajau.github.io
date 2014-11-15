---
layout:      post
title:       Joomla site and administrator application execution
description: This post outlines key points in the execution of the Joomla! script including, but not limited to, key files that are includes, key methods that are called, trigger, and so on.
date:        2009-03-20 00:33:09
category:    joomla-development
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

This post outlines key points in the execution of the Joomla! 1.5 script including, but not limited to, key files that are includes, key methods that are called, trigger, and so on.

## Initialisation

* Load once: `defines.php`
* Load once: `framework.php`
  * Modify configuration options for magic quotes and Zend compatibility
  * Check for `configuration.php`. Redirect to installation if present or halt.
  * Load once: `import.php`
  * Load once: `configuration.php`
  * Set error reporting
  * Load PHP compatibility functions and classes
  * Initialise profiler (if debug on)
  * Import `joomla.application.menu`
  * Import `joomla.user.user`
  * Import `joomla.environment.uri`
  * Import `joomla.html.html`
  * Import `joomla.utilities.utility`
  * Import `joomla.event.event`
  * Import `joomla.event.dispatcher`
  * Import `joomla.language.language`
  * Import `joomla.utilities.string`
* Profile mark: `afterLoad`
* Set global `$mainframe`. Call to `JFactory::getApplication('site')`
  * Create and return instance. Call to `JApplication::getInstance`
* Initialise the application. Call to `JSite::initialise`
  * Load base language files
  * Call to `parent::initialise`
    * First call to `JFactory::getUser` (initialises user)
      * Import `joomla.user.user`
      * Create session. Call to `JFactory::getSession`
    * Set editor based on user preference if available
* Import the system plugins. Call to `JPluginHelper::importPlugin('system')`
* Profile mark: afterInitialise
* Trigger events: `**onAfterInitialise**`

## Routing and Authorisation

* Route the URI: Call to `JSite::route`
* Call to `JSite::authorize`
  * Check current menu item access level. Redirect if not logged in. Halt if logged in and not authorised.
* Profile mark: `afterRoute`
* Trigger events: `**onAfterRoute**`

### Dispatching

The application now dispatches the component based on information in the request.

* Get the `option` from the request
* Dispatch the component (based on the option variable): Call to `JSite::dispatch`
  * Determine the document type
    * If an `html` document:
      * Set the document meta keywords from the configuration.php file
      * Include the joomla.javascript.js if the user is logged in
      * If routing in SEF mode, set the base URI as the current URI
    * If a `feed`:
      * Set the base URI as the current URI
  * Set the document title from the page parameters
  * Set the document description from the page parameters
  * Render the component calling `JComponentHelper::renderComponent`
    * If the component name (option) is empty, throw a 404 error
    * Set the application variable `scope` to the name of the component (store the previous value)
    * Set the JPATH\_COMPONENT, JPATH\_COMPONENT\_SITE and JPATH\_COMPONENT\_ADMINISTRATOR contants
    * If the component is not enabled throw a 404 error
    * Load the 1.0 legacy layer if legacy mode is enabled
    * Get the task variable from the request
    * Load the component language file
    * Start output buffering
    * Load the component dispatcher file
      * Note: after dispatching the task, **the component controller may redirect here**.  No plugin events are triggered after this point in the case of a redirect.
    * End and capture the ouput buffer
    * Load the toolbar file if found (note that toolbar files are deprecated)
    * Revert the application scope to the previous value
  * Set the contents of the document buffer
* Profile mark: `afterDispatch`
* Trigger events: `**onAfterDispatch**`

## Rendering

* Render the page: Call to `JSite::render`
* Profile mark: `afterRender`
* Trigger events: `**onAfterRender**`
* Echo output: Call to `JResponse::toString` with option for compressed output
