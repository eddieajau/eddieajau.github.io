---
layout:      post
title:       Why query variables with ampersands are truncated
description: This tutorial outlines why URL variables are truncated if they contain a URL encoded ampersand character.
date:        2011-01-28 10:00:00
category:    joomla-development
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

The query variables in a URL (a GET request) are made up of, as you know, variable-name=value pairs and delimited with an ampersand character (&).  For example:

`index.php?option=com_content&view=article&id=3`

We have three variables named "option", "view" and "id" and these has values of "com\_content", "article" and "id" respectively.

Now, if by change the value of the variable needs to contain an & character, you can encode it like this:

`index.php?place=Bar+%26+Grill`

The value of "place" should be interpreted as "Bar & Grill" where the + signs are mapped to spaces and %26 is the encoded value of the & character.

Joomla's JUri class is used to process the request URL and its variables, but for the URL shown above, JUri will assign a value of just "Bar" to the variable named "place".  Why is this so?

The issue lies in the fact that site hackers can leverage URL encoded characters to try to circumvent Joomla's built-in security handling.  The JUri class actually decodes the URL up to ten times (after which it just dies) until it feels it has what it considers to be the "real" value.  Unfortunately this affects our non-malicious case above.  Note that this does not affect values in a form that you POST, but what are our options when using a form with GET?

If the values are coming from a select list, then a possible workaround is to base64 encode the variables that go into the form that will be submitted. For example:
    
    <select name="place">
    <option value="<?php base64_encode($value); ?>"><?php echo $this->escape($value); ?></option>

That's actually an interesting line of code because we are encoding the value and the output for different reasons (one for when the form is submitted and the other to avoid cross-site scripting attacks). 

Then when you processes the form, all you need to do is something like:
    
    <?php
    $place = base64_decode(JRequest::getVar('place', null, 'get', 'base64));

If you are passing a free-text field in a form using GET, and you want to allow people to use an & in that free text, the only solution is actually to change the form to use POST.

This tutorial is applicable for Joomla 1.5 and 1.6\.
