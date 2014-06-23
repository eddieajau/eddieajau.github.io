---
layout:      post
title:       Template Tip - Hiding Modules when a User Logs In
description: A tutorial that shows you how to hide a Joomla module position after a user logs in.
date:        2009-02-25 20:00:00
category:    joomla
image:
  thumb:     vendor/joomla.png
---
Joomla is pretty good at hiding things from the public, and then exposing them once the user logs in.  However, what happens when you want to hide a module position, for example, when the user logs in.  I had this problem with The Art of Joomla site.  I put in a "Subscribe" module for people to sign up for my developer documentation but once they registered I didn't want it annoying them.  Well, it turns out that it's only a few lines of code in the main template file to hide it.

To hide a module position all we have to do is work out if the user is logged in.  The Joomla Framework API (that's just a fancy name for some of the code that runs the Joomla web site) has a way of getting the user information.  All we need to do is check if the User ID is not zero and then we will know if they are logged in.  Let's see how this is done.

Open up the main template `index.php` file for your active template.  It will be something like:

` /templates/ja_purity/index.php`

You should already be familar for how Joomla displays a module position (with one of those `<jdoc: ... />` tags).  Find the module position that you want to hide and then wrap it in the following code:

```php
<?php
// Get the user object
$user = &JFactory::getUser();
// Now work out the User ID
$userId = $user->get('id');
// Now hide the module if user is logged in
if ($userId == 0) :
  // Now we break out of the PHP tags and display the JDOC tag to include the module
?>
<jdoc:include type="modules" name="public-right" style="xhtml" />
<?php endif; ?>
```

You will probably want to create a special module position.  In this case I've called it "public-right" to indicate it will display in the right column, but only for the public user.  When you log into your site, you should find that any modules in the "public-right" position will disappear.  In our case, when you log in, the "Subscribe" button in the top-right of [The Art of Joomla Developer Reference][0] page will disappear.

This is a very simple technique but it can have a profound effect on the "feel" of your web site.

[0]: reference.html
