---
layout:      post
title:       Layout Override - Adding a Title Tag to the Banners Module
description: This is a simple layout override tutorial that shows you how to customise the output of the Joomla Banners Module.
date:        2009-03-17 20:00:00
category:    joomla
image:
  thumb:     vendor/joomla.png
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
This layout override tutorial gives you a basis for overriding the output of the Joomla banners module. This simple example shows you how to add a title tag to the click link but also gives you a base for allowing addition customisation.

The banner module is a little difficult to override because much of it's output logic is hidden in a helper method.  The first step in creating this override is to copy:

`/modules/mod_banners/tmpl/default.php`

to:

`/templates/your_template/html/mod_banners/default.php`

Then replace the code in the new file with the following:

```php
<?php // no direct access
defined('_JEXEC') or die('Restricted access');
$baseurl = JURI::base();
?>
<div class="bannergroup<?php echo $params->get('moduleclass_sfx') ?>">
<?php if ($headerText) : ?>
	<div class="bannerheader"><?php echo $headerText ?></div>
<?php endif; ?>

<?php foreach($list as $item) :
	$link = JRoute::_('index.php?option=com_banners&task=click&bid='. $item->bid);
?>
	<div class="banneritem<?php echo $params->get('moduleclass_sfx') ?>">
	<?php
		if (trim($item->custombannercode)) :
			// Text based banners
			echo str_replace(
				array('{CLICKURL}', '{NAME}'),
				array($link, $item->name),
				$item->custombannercode
			);
		elseif (BannerHelper::isImage($item->imageurl)) :
			// Image based banner
			if ($item->clickurl) :
				$target = $params->get('target', 1);
				// Wrap the banner in a link
				if ($target == 1) :
					// Open in a new window
			?>
			<a href="<?php echo $link; ?>" target="_blank"
				title="<?php echo htmlspecialchars($item->name, ENT_QUOTES, 'UTF-8');?>">
				<img src="<?php echo $baseurl;?>images/banners/<?php echo $item->imageurl;?>"
					alt="<?php echo JText::_('Banner');?>" /></a>

			<?php
				elseif ($target == 2):
					// open in a popup window
			?>
			<a href="javascript:void window.open('<?php echo $link;?>', '',
				'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=550'); return false"
				title="<?php echo htmlspecialchars($item->name, ENT_QUOTES, 'UTF-8');?>">
				<img src="<?php echo $baseurl;?>images/banners/<?php echo $item->imageurl;?>"
					alt="<?php echo JText::_('Banner');?>" /></a>
			<?php
				else :
					// open in parent window
			?>
			<a href="<?php echo $link;?>"
				 title="<?php echo htmlspecialchars($item->name, ENT_QUOTES, 'UTF-8');?>">
				<img src="<?php echo $baseurl;?>images/banners/<?php echo $item->imageurl;?>"
					alt="<?php echo JText::_('Banner');?>" /></a>
			<?php
				endif;
			else :
				// Just display the image if no link specified
			?>
				<img src="<?php echo $baseurl;?>images/banners/<?php echo $item->imageurl;?>"
					alt="<?php echo JText::_('Banner');?>" /></a>
			<?php
			endif;
		elseif (BannerHelper::isFlash($item->imageurl)) :
			//echo $item->params;
			$params2 = new JParameter($item->params);
			$width = $params2->get('width');
			$height = $params2->get('height');
			$imageurl = $baseurl."images/banners/".$item->imageurl;
		?>
		<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
				codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0"
				border="0"
				width="<?php echo $width;?>"
				height="<?php echo $height;?>">
			<param name="movie" value="<?php echo $imageurl;?>" />
			<embed src="<?php echo $imageurl;?>"
					loop="false"
					pluginspage="http://www.macromedia.com/go/get/flashplayer"
					type="application/x-shockwave-flash"
					width="<?php echo $width;?>"
					height="<?php echo $height;?>">
			</embed>
		</object>";
		<?php
		endif;
	?><div class="clr"></div>
	</div>
<?php endforeach; ?>

<?php if ($footerText) : ?>
	<div class="bannerfooter<?php echo $params->get('moduleclass_sfx') ?>">
		 <?php echo $footerText ?>
	</div>
<?php endif; ?>
</div>
```

You can obviously see that there is a lot more code than in the original layout.  This is because I've imported all of the code in the helper.

All I've really done here is add a title tag to the link tag because I wanted a descriptive title to display when someone hovered over the banners on this site (see the Rochen banner and the images under the "Thanks to" heading).  However, this also gives you a basis for customising the banner module, particularly if you haven't been able to work out how.  You could also provide a more informative alt tag in the image if this was useful for your site.

You can download the layout overrides shown from joomlacode.org: [mod\_banners\_layout\_override.zip][0].  To install them, unzip the files into the `/html/` folder in your default Joomla template.  Remember to backup any files and folders that already exist (just in case).

For more information on Joomla layout overrides, see my [tutorial here][1].

[0]: http://joomlacode.org/gf/download/frsrelease/9879/37561/mod_banners_layout_override.zip
[1]: http://docs.joomla.org/Understanding_Output_Overrides
