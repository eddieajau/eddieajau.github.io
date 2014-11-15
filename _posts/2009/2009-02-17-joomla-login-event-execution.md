---
layout:      post
title:       Joomla login event execution
description: This article traces the execution path when a user logs into the Joomla Content Management System.
date:        2009-02-16 10:08:00
category:    joomla-development
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

This execution trace begins with at the User Component Controller method for login, `UserController::login` (called within the application dispatch method)

* Call to `JApplication::login($credentials, $options)` where `$credentials` is a named array holding `username` and `password`, and `$option` is a named array of additional parameters: `remember`, `silent`.
  * Get instance of `JAuthentication`
  * Call to `JAuthentication::authenticate($credentials, $options)` and response assigned to a variable
    * Load all authentication plugins
    * Create a new `JAuthenticationResponse` object
    * Loop through each authentication plugin
      * Check if required class exists
      * Call the onAuthenticate method passing credentials array, options array and response reference
  * If response is a SUCCESS
    * Import user plugins
    * Trigger onLoginUser passing the response and the options to plugins.  Returns an array of booleans.
    * If false is not in the returned array, check if remember option is set and then return true
  * Trigger `onLoginFailure` passing the response
  * If `silent` option is set, return false; otherwise return a warning
