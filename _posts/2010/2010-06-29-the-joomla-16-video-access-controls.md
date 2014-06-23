---
layout:      post
title:       The Joomla 1.6 Video - Access Controls
description: This Joomla 1.6 video looks at the new access controls (user groups and permissions) in Joomla 1.6 as presented by Andrew Eddie on 15 May 2010, a few days before the Beta 1 release.  This is part 2 of 3 in a series of talks on Joomla 1.6.
date:        2010-06-29 06:50:00
categories:  [joomla, videos]
image:
  thumb:     vendor/joomla.png
---
This video looks at the new access controls (user groups and permissions) in Joomla 1.6 as presented by Andrew Eddie on 15 May 2010, a few days before the Beta 1 release.  This is part 2 of 3 in a series of in-depth talks on Joomla 1.6\.

<p>
	<object height="360" width="640"><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="http://vimeo.com/moogaloop.swf?clip_id=12900266&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=0&amp;show_portrait=0&amp;color=00ADEF&amp;fullscreen=1" /><embed allowfullscreen="true" allowscriptaccess="always" height="360" src="http://vimeo.com/moogaloop.swf?clip_id=12900266&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=0&amp;show_portrait=0&amp;color=00ADEF&amp;fullscreen=1" type="application/x-shockwave-flash" width="640"></embed></object></p>
<p style="text-align: center; ">
	<a href="http://vimeo.com/12900266">Joomla 1.6 &mdash; Access Control</a></p>

Video length 58 minutes and available in 720p HD.

Thanks to [Andrew Smith][1] for video and post-production magic.

If you like this video post a message on my wall on [people.joomla.org][2].

Also see [part 1 on what's new in Joomla 1.6 for Administrators][3] and [part 3 on what's new in Joomla 1.6 for Developers][4].

[What's new in Joomla 1.6][5] on the official documentation wiki is a good reference to have open while watching this video.

## Bloopers

There is a pretty good blooper when I'm trying to "brick" the site by fouling up the global permissions (the joys of taping live).  What happened was that the "Admin" permission at the global level also allows you to login to the site, and combined with a caching issue, this prevented me from demonstrating this properly.  If you remove all login permissions and admin permissions from all users, you will effectively "brick" your site, hence the need for the root user setting in the configuration file.  Since this video was taken we have also added code to alert the users that they are using the root user setting in `configuration.php` and also gives them a quick link to revert the setting.

[0]: http://vimeo.com/12900266
[1]: http://www.vimeo.com/user1804497
[2]: http://people.joomla.org/my-page/andreweddie.html
[3]: http://www.theartofjoomla.com/home/38-talks/99-the-joomla-16-video-whats-new.html
[4]: http://www.theartofjoomla.com/home/38-talks/102-the-joomla-16-video-for-developers.html
[5]: http://docs.joomla.org/What's_new_in_Joomla_1.6
