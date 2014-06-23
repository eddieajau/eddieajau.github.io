---
layout:      post
title:       Template Tip - Displaying the Current Year in Copyright Notices
description: The PHP date function can be used in a Joomla template file to easily keep the copyright year up to date.
date:        2009-03-10 20:00:00
category:    joomla
image:
  thumb:     vendor/joomla.png
---
If you are anything like me and maintain a few web sites, sometimes you forget to update the copyright year that you typically put in a footer module or embed in the template itself.  A tiny line of PHP code can fix this so you never have to worry about it again.

If you have your copyright notice in a "footer" module, you are going to have to take it out and embed it directly in main template file.

Open up the main template `index.php` file for your active template.  It will be something like:

`/templates/ja_purity/index.php`

All you need to do is add something similar to the following lines of code to your template (change HTML code and names as appropriate):

```php
<div id="footer">
	<jdoc:include type="modules" name="footer" style="raw" />
	<div id="copyright">
		Copyright &copy; 2005 - <?php echo date('Y');?> New Life in IT Pty Ltd
	</div>
</div>
```

The magic is all done by the  simple PHP statement `<?php echo date('Y');?>` which displays the 4-digit year based on the current server time (around New Year it might be slightly wrong for a day, but hey, it's close).  I've used this code in the footer of many templates (so now I don't have to worry about forgetting to change it).

For more information on what you can do with the PHP date function, see the PHP manual at [http://php.net/date][1].  You can also use it to display different variations of the current date and time.

[1]: http://php.net/date
