---
layout:      post
title:       Removing a Legacy - Part 3
description: Converting a Joomla 1.0 component to run in Joomla 1.5 natively without legacy mode (part 3). Looking at the Joomla toolbar helper and translation files.
date:        2009-01-05 21:41:55
category:    joomla
image:
  thumb:     vendor/joomla.png
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
Welcome to Part 3 of my series for converting an existing component to work natively in version 1.5 without using legacy mode.  Last time we looked at configuration variables, dug into JRequest and also had a look at a few other things.  This time we are hit the administrator component hard to see if we can actually get some output happening. 

### The Toolbar

What we are seeing now is a Class 'mosMenuBar' not found error in the toolbar.letterman.html.php file.  This one is not too hard to fix as it is simple name change to JToolBarHelper.

We can remove the old mosMenuBar::startTable() and mosMenuBar::endTable(); methods -- we don't need them anymore.

Something new we can add in is a title for the page using the  JToolBarHelper::title method.  We'll just put the following line in for each of our toolbars just for now:

```php
JToolBarHelper::title( 'LetterMan', 'logo' );
```

The default toolbar method now looks like this:

```php
    function DEFAULT_MENU()
    {
        JToolBarHelper::title( 'LetterMan', 'logo' );
        JtoolBarHelper::publishList();
        JtoolBarHelper::unpublishList();
        JToolBarHelper::addNew( 'new', 'New' );
        JToolBarHelper::addNew( 'compose', 'Compose Newsletter');
        JToolBarHelper::editList( 'edit', 'Edit' );
        JToolBarHelper::deleteList( '', 'remove', 'Delete');
    }
```

Spacers and Dividers aren't really used anymore because of the better style control. You can remove them from the toolbar methods.

Refresh ... and ... oh wow, finally I've got my backend back, albeit punctuated with lots of missing constants, but hey, it's a start.

Something that you cannot do anymore is insert table cells by hand.

Many developers would have written something like this to include custom toolbar buttons:

```php
    <td>
        <a class="toolbar" href="/<?php echo $href;?>"
            onmouseout="MM_swapImgRestore();"
            onmouseover="MM_swapImage('users','','<?php echo $mosConfig_live_site."/components/com_letterman/images/user_f2.png" ?>',1);">
            <img name="users" src="/<?php echo $mosConfig_live_site."/components/com_letterman/images/user.png" ?>" alt="assignUsers" border="0" align="middle" />
            <?php echo LM_ASSIGN_USERS; ?></a>
    </td>
```

LetterMan has a few of these, and they will need to be replaced with the following, more compact, code:

```php
JToolBarHelper::custom( 'assignUsers', 'user.png', 'user.png', JText::_( 'Assign Users' ), false );
```

In order to include the custom button based on user.png, I will create a few new folders under the component folder:

```
/com_letterman
../media
..../css
......default.css
..../images
......logo.png
......user.png
```

The default.css contains the following style information:

```css
.icon-48-logo {
    background: url(../images/logo.png) no-repeat left;
}
.icon-32-user {
    background: url(../images/user.png) no-repeat left;
}
.icon-32-validate {
    background: url(../images/validate.gif) no-repeat left;
}
```

The icon-48-logo style is used in the toolbar title (hence the second argument of 'logo').  The two icon-32 styles are used by the toolbar.  As long as you marry the name of the file (less the file type) with the suffix of the class name in the stylesheet, everything should marry together nicely.

To push this stylesheet into the output of the component we use a helper method in the JHTML class called stylesheet.  I've put this in the admin.letterman.php file near the top.

```php
JHTML::stylesheet( 'default.css', '/administrator/components/com_letterman/media/css/' );
```

### Translations

Translations are not handled by PHP constants anymore and this is why I'm seeing a heap of undefinded constant errors.  We have a helper class called JText with several static methods to support translations such as \_ (underscore, based on the shortcut used for gettext) and sprintf.  JText also allows you to use more natural strings, including spaces, that is particularly useful for shorter phrases.  For longer strings you might still use an abbreviation that maps to a full description.

We use JText like this:

```php
<?php echo JText::_( 'Compose a newsletter from content items' ); ?>
```

An advantage of using this method is that it has a debug mode in the Global Configuration settings.  When you turn Debug Language on, it wraps words and phrases in special characters that help you determine if the string is translated or not.

This takes a bit of time but the next step is to find and replace all of the constants with JText including using more natural phrases (unless it's a really long description or tooltip).

For example, in the toolbar change \_E\_SAVE to 'Save', \_E\_CANCEL to 'Cancel' and so on.

In admin.letterman.html.php you would change change <?php echo \_SEARCH\_TITLE;?\> to <?php echo Jtext::\_( 'Search' );?\> and so on.

As I mentioned before, some strings are really long.  I found some of these in the LetterMan language files:

```php
define( 'LM_ADD_CONTENT_TOOLTIP', 'If you select a content item from the list,
a tag will be inserted into the textarea. This tag will be rendered to the full article
(Into Text only with images) when clicking on Save.' );
```

What we can do with this one is use the symbol that the author has used, but just wrap it in a JText call:

```php
<?php echo JText::_( 'LM_ADD_CONTENT_TOOLTIP' ); ?>
```

The last step now is to remove the files that hold the language constants and replace them with files in the new format.

We need to create the following file:

```php
/administator/language/eb-GB/en-GB.com_letterman.ini
```

As you will notice this is an ini file and, rather than using PHP constants, we use a "token" equals "some string", like this:

```ini
COMPOSE A NEWSLETTER FROM CONTENT ITEMS=Compose a newsletter from content items
LM_ADD_CONTENT_TOOLTIP=If you select a content item from the list,
a tag will be inserted into the textarea. This tag will be rendered to the full article
(Into Text only with images) when clicking on Save.
```

Make sure the tokens are in uppercase and don't add any line-breaks in the strings.

That's it for this part in the series.  Next time I'll look at cleaning up the presentation of the backend pages more.
