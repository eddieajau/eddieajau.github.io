---
layout:      post
title:       Layout Overrides - Popup Login Box
description: Login boxes can take up valuable space on your web site, or just detract from the overall feel of the site.  A popular technique for addressing this problem is to show a modal popup login box.
date:        2009-02-16 20:08:00
category:    joomla
image:
  thumb:     vendor/joomla.png
---
Login boxes can take up valuable space on your web site, or just detract from the overall feel of the site.  A popular technique for addressing this problem is to show a modal popup login box.  The idea is that you replace the page hungry username and password fields with a "login" link that, when clicked, opens a modal popup login box.  This can all be achieved out-of-the-box with Mootools and Joomla layout overrides.

In this Joomla development tutorial we will be using two simple layout overrides for the login module and the user component's login page.  Our first step is to create is to copy the native layouts to the layout override folder in the active template.

![Layout override folders and files](/images/2009/layout_overrides_folders_for_login.png)Copy:

`/modules/mod_login/tmpl/default.php`

to:

`/templates/template_name/html/mod_login/default.php`

and copy:

`/components/com_user/views/login/tmpl/default_login.php`

to:

`/templates/template_name/html/com_user/login/default_login.php`

where _template\_name_ is the folder name for the default template used on your site.  If you use more than one template, linked to menu items, then you will need to create the layout overrides for each template.  Your folders should look something like the image to the side.

Open the login module layout override first (`/html/mod_login/default.php`).  Replace the code with the following listing:

```php
<?php // no direct access
defined('_JEXEC') or die('Restricted access'); ?>

<?php if ($type == 'logout') : ?>
<form action="index.php" method="post" name="login" id="form-login">
<?php if ($params->get('greeting')) : ?>
    <div>
    <?php if ($params->get('name')) : {
         echo JText::sprintf( 'HINAME', $user->get('name') );
    } else : {
        echo JText::sprintf( 'HINAME', $user->get('username') );
    } endif; ?>
    </div>
<?php endif; ?>
    <div align="center">
        <input type="submit" name="Submit" class="button" value="<?php echo JText::_( 'BUTTON_LOGOUT'); ?>" />
    </div>
    <input type="hidden" name="option" value="com_user" />
    <input type="hidden" name="task" value="logout" />
    <input type="hidden" name="return" value="<?php echo $return; ?>" />
</form>
<?php else :
    JHtml::_('behavior.modal', 'a.login');
?>
<script type="text/javascript">
window.addEvent('domready', function() {
    // Decorate the login windows to use a modal.
    $ES('a.login').each(function(a){
        a.setProperty('rel', '{size: {x: 175, y: 225}, ajaxOptions: {method: "get"}}');
        if (a.getProperty('href').contains('?')) {
            a.setProperty('href', a.getProperty('href')+'&tmpl=component');
        } else {
            a.setProperty('href', a.getProperty('href')+'?tmpl=component');
        }
    });
});
</script>
    <p>
        <a href="<?php echo JRoute::_('index.php?option=com_user&view=login'); ?>"
class="login" title="<?php echo JText::_('LOGIN') ?>">
            <?php echo JText::_('LOGIN') ?></a>
        &bull;
        <a href="<?php echo JRoute::_( 'index.php?option=com_user&task=register' ); ?>">
            <?php echo JText::_('REGISTER'); ?></a>.
    </p>
<?php endif; ?>
```

The display for the module when logged in is unchanged.  But when not logged in only two links will be displayed: the login link and the register link.  On the login link, a class of "login" has been applied.  A small amount of unobtrusive Javascript has been used to add a modal popup on any anchor tags with a class of "login".  This technique degrades gracefully in the event that Javascript is disabled (so on a handheld device, clicking on the link will just take you to the normal login page).

Before we started, the login box will have looked something like the following image.

![Normal login box](/images/2009/layout_overrides_normal_login_module.png)

After we have created the layout overrides, the display will change to something like the following image:

![New slim login links](/images/2009/layout_overrides_login_module.png)

When you click the login link it will open the model popup login box.  The description is still being displayed in the popup, so let's look at taking that out (but still leaving it in if the full login page is displayed).

Open the login module layout override first (`/html/com_user/login/default_login.php`).  Where the login description is being display, wrap it in an if block to only display if it is being shown in a popup, as follows:

```php
<?php if (JRequest::getVar('tmpl') != 'component') :?>
	<div>
		<?php echo $this->image; ?>
		<?php if ( $this->params->get( 'description_login' ) ) : ?>
			<?php echo $this->params->get( 'description_login_text' ); ?>
			<br /><br />
		<?php endif; ?>
	</div>
	<?php endif; ?>
```

The `tmpl `request variable is reserved in Joomla.  If is has a value of "component" then we know that the outer site template is not being displayed (this happens in several places in Joomla, such as the "print" view in articles).

The final result will look something like the following image after we click on the "Login" link:

![Popup login box](/images/2009/layout_overrides_login_popup.png)

Those are the basic principles for creating an unobtrusive login box.  You can download the layout overrides shown from joomlacode.org: [popup\_login\_box\_layout\_overrides.zip][0].  To install them, unzip the files into the `/html/` folder in your default Joomla template.  Remember to backup any files and folders that already exist (just in case).

For more information on Joomla layout overrides, see my [tutorial here][1].

[0]: http://joomlacode.org/gf/download/frsrelease/9605/36552/popup_login_box_layout_overrides.zip
[1]: http://docs.joomla.org/Understanding_Output_Overrides
