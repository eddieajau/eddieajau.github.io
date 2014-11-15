---
layout:      post
title:       Sending emails in Joomla
description: Sending mail is a common requirement for components and plugins in Joomla.  There are two ways to send mails.
date:        2009-02-23 00:00:00
category:    joomla-development
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

Sending mail is a common requirement for components and plugins in Joomla.  There are two ways to send mails.  The first way using a utility helper method.  The second way is using Joomla mail API, based on PHPMailer, to provide more control over the message that will be sent.  We will also cover the mail filtering methods.

## Using JUtility::sendMail

By far the easiest way to send an email is to use the [`JUtility::sendMail`][0] helper method.  The [`JUtility`][1] class is loaded in the default framework so there is no additional `jimport` to call upon.

The most common usage is with the minimum required inputs:
    
    $result = JUtility::sendMail($from, $fromName, $recipient, $subject, $body);

The arguments are:

* `$from` - the email address that will appear in the "from" field
* `$fromName` - the name that will appear with the "from" email address
* `$recipient` - the email address that you are sending to
* `$subject` - the subject of the email
* `$body` - the actual message for the email

The recipient can be a string, a single email address, or it can be an array of addresses.  All other arguments are strings.

Here is a very simple example to send a mail to someone else from the current user:
    
    // Use getApplication instead of
    // global $mainframe;
    $app = &JFactory::getApplication();
    
    // Grab the site name
    $siteName = $app->getCfg('sitename');
    
    // Grab the current user details 
    $user = &JFactory::getUser();
    $from = $user->get('email');
    $fromName = $user->get('name');
    
    // Prepare the message
    $recipient = 'somemail@foo.bar';
    $subject = JText::sprintf('A message from %s', $sitename);
    $body = JText::_('Your password is too silly, please change it');
    
    // Now we send it
    $result = JUtility::sendMail($from, $fromName, $recipient, $subject, $body);
    if (JError::isError($result)) {
        // Some sort of error occurred
        // To peak at the error we could do
        // echo $result->getMessage();
    } 

If the mail function failed for any reason, the utility method will return a `[JException][2]` object.  The method has already throw a [`raiseNotice`][3], so there generally there is no further need for intervention.  Providing your template has the following statement:

`<jdoc:include type="message" />`

then the notice will appear when the page next refreshes.

There are a number of addition, but optional, arguments that can be added to the method.  In order after `$body`, these are:

* `$mode` - the default mode is plain text.  A value of 1 will send the mail as HTML.
* `$cc` - a single CC (Carbon Copy) email address or an array of email addresses.
* `$bcc` - a single BCC (Blind Carbon Copy) email address or an array of email addresses.
* `$attachment` - the local file path to an attachment or an array of file paths.
* `$replyTo` - a Reply-to email address or an array of email addresses.
* `$replyToName` - a Name to associated with the Reply-to email, or an array of names.

The `$replyto` and `$replytoname`, if arrays, must have the same number of elements, and they must line up.  That is, the first element of the `$replytoname` array must match with the first element of the `$replyto` array.

Here is an example using a few additional arguments.
    
    // Get the Application object (so we can get some configuration variables)
    $app = &JFactory::getApplication();
    
    // Get the site name
    $siteName = $app->getCfg( 'sitename' );
    
    // Get the current user details 
    $user = &JFactory::getUser();
    $from = $user->get( 'email' );
    $fromName = $user->get( 'name' );
    
    // Send a HTML message
    $mode = 1;
    
    // No additional addresses or attachments
    $cc = null;
    $bcc = null;
    $attachment = null;
    
    // Set up the reply-to
    // Look in configuration first, otherwise grab the first Super Admin
    $replyTo = $app->getCfg( 'mailfrom' );
    $replyToName = $app->getCfg( 'fromname' );
    
    if ($replyTo == '' && $replyToName == '') {
        // This is the correct way to find a Super Admin
        $acl = &JFactory::getACL();
    
        // Find the ID for the Super Admins group
        $groupId = $acl->get_group_id('Super Administrator');
    
        // Find any users in the Super Admin group
        $users = $acl->get_group_objects($groupId);
    
        // The result is a nested array - just grab the first Super Admin
        // We should really loop through all the users and check they
        // are not blocked and have their send message option checked.
        if (isset($users['users']) && isset($users['users'][0]) {
            // Found one.  Load the user and get the information we need
            $admin = &JUser::getInstance( $users['users'][0] );
            $replyTo = $admin->get( 'email' );
            $replyToName = $admin->get( 'name' );
        }
        else {
            // Give up.  Site has no Super Admins and is in real trouble
            JError::raiseError(500, 'A serious error has occurred');
        }
    }
    
    // Prepare the message
    $recipient = 'somemail@foo.bar';
    $subject = JText::sprintf('A message from %s', $sitename);
    $body = JText::_('<p>Your password is too <strong>silly</strong>, please change it!</p>');
    
    // Now we send it
    $result = JUtility::sendMail( $from, $fromName, $recipient, $subject, $body,
                $mode, $cc, $bcc, $attachment, $replyTo, $replyToName );
    if (JError::isError( $result )) {
        // Some sort of error occurred
        // To look at the error we could do:
        // echo $result->getMessage();
    } 

While you need to be careful setting up the inputs, once it is assembled you can see that sending the message is actually quite easy.

## Using JMail

The JMail class is a Joomla wrapper for the popular PHPMailer class from [Codewerx Technologies][4].

Gmail Hack: http://forum.joomla.org/viewtopic.php?f=428&t=306258&p=1347118\#p1347118


[0]: http://api.joomla.org/Joomla-Framework/Utilities/JUtility.html#sendMail
[1]: http://api.joomla.org/Joomla-Framework/Utilities/JUtility.html
[2]: http://api.joomla.org/Joomla-Framework/Error/JException.html
[3]: http://api.joomla.org/Joomla-Framework/Error/JError.html#raiseNotice
[4]: http://phpmailer.codeworxtech.com
