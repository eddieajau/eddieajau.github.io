---
layout:      post
title:       "The Joomla Contact Form, Gmail, and Reply-To Problems"
description: "Some of you may be sending your typical \"Contact Us\" form on your Joomla site to a Gmail or a Google Apps email address. If you are, and you are using Joomla 2.5 or Joomla 3 you might have noticed a problem - when you reply to the email the address that comes up is your email."
date:        2013-02-04 21:29:00
category:    joomla
image:
  thumb:     vendor/joomla.png
---

Some of you may be sending your typical &quot;Contact Us&quot; form on your Joomla site to a Gmail or a Google Apps email address. If you are, and you are using Joomla 2.5 or Joomla 3, you might have noticed a problem - when you reply to the email the address that comes up is your own email, not the email of the sender.


This is somewhat inconvenient because you have to cut and paste the sender&#39;s email from within the message. As it turns out this is neither a bug in Joomla, nor a bug in Gmail. In order to reduce the possibility of the incoming email being flagged as spam, Joomla puts your email in the &quot;From&quot; header (because the email <em>is</em>
actually from <em>your</em> site) and it puts the sender&#39;s email and name in the &quot;Reply To&quot; header. The header, in part, will look something like this:

```
To: youremail@gmail.com
Subject: I need help please!
Date: Thu, 31 Jan 2013 23:41:47 -0600
From: The Site Name <youremail@gmail.com>
Reply-To: iNeedHelp@example.com
```

Your email and the site name are set in the Global Configuration of Joomla&#39;s administrator. The &quot;Reply-To&quot; address comes from the email that the sender typed into the the contact form on your site.

Now, the problem is that when the &quot;From&quot; email (your email) is the same as the any registered reply address for your email account (which will almost certainly include your email), Gmail ignores the &#39;Reply-To&quot; address. When you click the &quot;Reply&quot; button in the Gmail interface you will end up sending the email to yourself (<code>youremail@gmail.com</code>) instead of the sender&#39;s email (<code>iNeedHelp@example.com</code>).</p>

This is incredibly frustrating, but there is a solution. All you have to do is change the &quot;From&quot; email slightly and the &quot;Reply-To&quot; address will be used.</p>

As it happens, Gmail allows you to append a suffix to the email name starting with a plus, for example&nbsp;<code>youremail+joomla@gmail.com</code>. All we need to do is make sure the Contact form is sending this email in the &quot;From&quot; header. We do this by changing a setting in Global Configuration. Follow these steps:</p>

1. Log into the adminstrator of you site.
2. Go into the Globla Configuration panel.
3. Click on the &quot;Server&quot; tab.
4. Under &quot;Mail Settings&quot;, add the &quot;plus suffix&quot;&nbsp;to the email in the&nbsp;&quot;From
email&quot; field.
5. Save the Global Configuration.

Now, test the contact form out using any old email address. When the email is sent to you, your should find that you are able to reply to the sender&#39;s email instead of your own.</p>

For more information about about the &quot;plus&quot; feature in Gmail email addresses, have a read of the&nbsp;<a href="http://gmailblog.blogspot.com.au/2008/03/2-hidden-ways-to-get-more-from-your.html" target="_blank">2 hidden ways to get more from your Gmail address</a> blog post. This is a really interesting feature because it allows you to have one, central email point for any number of sites, but separate them using a &quot;plus suffix&quot; (for example, I use &quot;+www&quot; for this site and &quot;+learn&quot; for the Learn the Art of Joomla site, but both go to the same email account). There are also numerous filtering opportunities as mentioned in the article.</p>

