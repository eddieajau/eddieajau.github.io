---
layout:      post
title:       Layout Override - Making a Joomla section look like a book contents
description: The Joomla Section Blog layout can be modified to look like the table of contents of a book. With layout overrides, you can have categories act as chapters with the articles forming the body of the chapters.
date:        2009-03-03 20:00:00
category:    joomla
image:
  thumb:     vendor/joomla.png
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
Is there a way to have Joomla display a section like a table of contents in a book?  It turns out there is.  I wanted the Art of Joomla's Developer Reference to look like a table of contents, with each category being like a chapter and all the articles to display under each category as parts of the chapter.  I found that you can modify the Section Blog Layout with a layout override to achieve this effect - and I think it works quite well.

The following screenshot shows what I wanted to achieve for the reference page:

![Screenshot](/images/2009/layout_overrides_book_contents_specification_marked.dithered.png)

As you can see I wanted the Page Title as set by the menu followed by the description of the section.  After that I wanted the layout to cycle through each category and display all of the articles in each category in order.  Finally, for any article that has an access level of "Public", I wanted to display a small note that it was a "free sample".

It may seem odd but the Section Blog is the only layout that can actually achieve this result.  This is because it loads all of the articles.  The Section \[Default\] Layout was not suitable (although I intially thought that would be the winner) because it only displays the articles in the active category.

The first thing to do is set up the menu item.  Add a new menu item in the normal way and select _Articles_, then _Section Blog Layout_ from the tree.  The following screenshot shows how I filled out this menu item:

![Screenshot](/images/2009/layout_overrides_book_contents_menu_item.png)

You pretty much fill this screen out normally.  The one trick is to but a very big number in the "\# Leading" field in the Basic Parameters.  This ensures that all of the articles in all the categories in the section are loaded into the view (I've chosen 999).  The "Category Order" and "Primary Order" are both set to order by the category and article ordering fields.  The rest of the fields can be set up however you want to suit but in the layout override we will be ignoring many things (like "Pagination Results", and so on).

Save that menu item.  We are half way there.

Now, I have one problem.  My home page is actually a Section Blog Layout as well.  If I put a layout override in, won't it apply to all the Section Blog Layouts I have created.  Well, the answer is yes to that question, but there is a way around it and I'll show you how.  The next screenshot shows you my workspace in Eclipse (that's a really good Integrated Development Environment, or IDE, if you haven't discovered it already).

![Screenshot](/images/2009/layout_overrides_book_contents_code.png)

 There is a little bit of slight of hand in this layout override.  What I've done is create a master override, and then two variations: one for the table of contents look, and one to display the normal section blog.  The procedure was:

Copy:


`/components/com_content/views/section/tmpl/blog.php`

to (and note the change of file name):

`/templates/your_template/html/com_content/section/blog_default.php`

Then create new files called:

`/templates/your_template/html/com_content/section/blog.php`

`/templates/your_template/html/com_content/section/blog_toc.php`

Let's look at the master layout first, `blog.php`.  This is the listing of that file (which you can also see in the screenshot):

```php
<?php
defined('_JEXEC') or die('Restricted access');

// An array of the Section ID's that you want to show in TOC format
$showAsToc = array(2);

if (in_array($this->section->id, $showAsToc)) :
	// Load the new sub-template
	echo $this->loadTemplate('toc');
else :
	// Load a copy of the normal Joomla layout
	echo $this->loadTemplate('default');
endif;
```

So let me explain what's happening here.  I've set up a PHP array in the variable `$showAsToc`.  This will include a list of all of the section ID's that I want to display in the Table of Contents format, and for all the others (like my home page) it will just display them as a normal section blog.  For now, I only have the one section I want to display as a table of contents, but I've set it up as an array so that you can see how easy it is to scale to other sections.  The next block of code is simply an "if" statement to load one sub-template or the other.  Notice, when we are loading sub-templates we only have to include the part of the name after the underscore (the \_ thingy), that is providing that all start with the same base (that is, "blog").

Now all that is left to do is to create the table of contents like layout in the file `blog_toc.php`.  We aren't supporting all of the parameters that are in the normal blog layout, so it's quite clean:

```php
<?php
defined('_JEXEC') or die('Restricted access');

// First we do a reverse lookup of the articles in each category
$rlu = array();
foreach ($this->items as $i => $item) :
	if (!isset($rlu[$item->catid])) :
		$rlu[$item->catid] = array();
	endif;
	$rlu[$item->catid][] = &$this->items[$i];
endforeach;
?>
<?php if ($this->params->get('show_page_title', 1)) : ?>
<h1 class="componentheading<?php echo $this->params->get('pageclass_sfx');?>">
	<?php echo $this->escape($this->params->get('page_title')); ?>
</h1>
<?php endif; ?>
<div class="contentdescription<?php echo $this->params->get( 'pageclass_sfx' ); ?>">
<?php if ($this->params->get('show_description') && $this->section->description) : ?>
	<?php echo $this->section->description; ?>
<?php endif; ?>
</div>

<?php foreach ($this->categories as $category) : ?>
	<h2><?php echo $category->title;?></h2>
	<?php if ($category->description) : ?>
	<?php echo $category->description; ?>
	<?php endif; ?>
	<?php if (!empty($rlu[$category->id])) : ?>
	<ul>
		<?php foreach ($rlu[$category->id] as $article) : ?>
		<li>
			<a href="<?php echo JRoute::_(ContentHelperRoute::getArticleRoute($article->slug, $article->catslug, $article->sectionid)); ?>">
				<?php echo $article->title; ?></a>
			<?php if ($article->access == 0) : ?>
				<small>(free sample)</small>
			<?php endif; ?>
		</li>
		<?php endforeach; ?>
	</ul>
	<?php endif; ?>
<?php endforeach; ?>
```

So what are we doing here?  The first block of code creates what I call a reverse lookup.  It builds a lookup array in `$rlu` of all of the articles in each of the categories.  We'll see why are do this very soon.

Next is a block that displays the Page Title in the H1 tag if the page title is defined.  Just after that we display the Section Desciption if it is defined.  I've made this optional because sometimes you might want a fairly compact look and feel.  I've chosen to embelish the page so that people have a better understanding of what they might be signing up for.

The last block of code is the main loop that works through each of the categories that contains articles.  In the loop we display the Category Title in a H2 tag.  If the category has a description we display it (no special formatting - you could put a DIV tag or something around it if you wanted to).  Then the real magic starts.  For the category that we are in, we check our reverse lookup array for all of the articles.  If the category has articles, then we output them in an unordered list.  The anchor tag looks a bit complex but that's what is required to create the SEF link (we call it "routing" the link) if you have that option turned on in your Global Configuration (SEF is really easy in Joomla 1.5).  After we display the link to the article, we check the "access" field of the article.  If the value is zero, it means that the article is publically accessible to any visitor to the site.  What I've done there is add a short message (in small text) that this is a free sample.  The rest of the articles require you to be a registered user.

And there you have it.  Once all the files are in place refresh the page and watch the layout override magic happen.

You can download the layout overrides shown from joomlacode.org: [section\_blog\_table\_of\_contents\_layout\_overrides.zip][0].  To install them, unzip the files into the `/html/` folder in your default Joomla template.  Remember to backup any files and folders that already exist (just in case).

For more information on Joomla layout overrides, see my [tutorial here][1].

## Variations

Based on the comments (thanks for those) there is obviously a need to support some different variations.  Here are some additional examples.

To use the contents-like layout for all of the sections on your web site (or just to test out how it looks), use the following listing for `blog.php`:

```php
<?php
defined('_JEXEC') or die('Restricted access');

// Load the new sub-template
echo $this->loadTemplate('toc')
```

To use the contents-like layout on more than one section, use the following listing for `blog.php`:

```php
<?php
defined('_JEXEC') or die('Restricted access');

// An array of the Section ID's that you want to show in TOC format
$showAsToc = array(2,3,5);

if (in_array($this->section->id, $showAsToc)) :
	// Load the new sub-template
	echo $this->loadTemplate('toc');
else :
	// Load a copy of the normal Joomla layout
	echo $this->loadTemplate('default');
endif;
```

Note that all you need to do is include the Section IDs in the array separated by commas.

[0]: http://joomlacode.org/gf/download/frsrelease/9706/37020/section_blog_table_of_contents_layout_overrides.zip
[1]: http://docs.joomla.org/Understanding_Output_Overrides
