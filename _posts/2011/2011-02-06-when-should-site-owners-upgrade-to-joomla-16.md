---
layout:      post
title:       When should site owners upgrade to Joomla 1.6?
description: Should I upgrade my site to Joomla 1.6?  Can I upgrade it?  Where are the extensions for Joomla 1.6?  Is Joomla 1.6 stable?
date:        2011-02-06 04:55:01
category:    joomla
image:
  thumb:     vendor/joomla.png
---
Should I upgrade my site to Joomla 1.6?  Can I upgrade it?  Where are the extensions for Joomla 1.6?  Is Joomla 1.6 stable?

These are but some of the many questions rushing around the Joomla community at this very moment.  But because of the wide variety of web sites built on, and extensions built for Joomla 1.5, such questions don't always have a definitive answer.  This article attempts to provide some information about how to weigh up these questions for your own site, because every web site is different.

## Joomla 1.6 for the site owner

### Should I upgrade my Joomla 1.5 site to Joomla 1.6?

This question is probably one of the hardest to answer because "it depends", and it involves you considering quite a few different issues.  Let's explore some of these issues.

### What does this "long term support" and "short release cycle" thing mean for me?

This is a great place to start because it's a very important new change in the Joomla release cycle that many people misunderstand.

At various points in time, a particular release of Joomla will be designated for Long Term Support (LTS).  This means that the particular version will be fully maintained until the next LTS version is selected, plus 3 months.  As it currently stands, Joomla 1.5 is designated for LTS.  This means it will be actively maintained (meaning major bugs and security issues will be fixed) until the next LTS version is selected.  So, when will that be?

Joomla now releases a new **minor version** of the software every six months.  Instead of taking years to develop each release in one huge block with lots of changes, as was the case for Joomla 1.5 and 1.6, the releases are done in smaller sustainable steps, spread out over a longer time period.  This obviously has a great benefit to the site owner because a) the scale of change is not as big per release, but b) those changes are coming at a manageable pace.

Now, with that in mind, the next LTS is set for Joomla 1.8 which should be released on or about twelve months after Joomla 1.6, sometime in January 2012\.  If that's the case, it means **Joomla 1.5's end of life** comes sometime in **April 2012**.

To summarise this point, if your Joomla 1.5 site is serving you well, then you don't really need to worry about upgrading it to a new version until April of 2012\.  For many, many site owners, this will be the best and most viable option all other considerations being equal.  In fact, this site (the Art of Joomla) may very well last until then because the Joomla 1.5 features are sufficient (for now, although, Joomla 1.6 would be "nicer" to work with).  Ultimately the choice is up to you whether you take the slow LTS track, or the fast incremental, six-monthly updates - there is a path that should suit most needs.

### If I'm considering Joomla 1.6, have the minimum hosting requirements changed?

Yes, they have.  Your host needs to provide you with a minimum of PHP 5.2.4 and MySQL 5.0.4\.

### What features are in Joomla 1.6 that would compel me to upgrade?

Well, that's a very good question.  Joomla 1.5 was a very good release introducing many new features over the previous version, but it had its limitations.  Joomla 1.6 has tried to address many of these based on a lot of community comment from end users and developers.  A number of people, including this author, have contributed to an extensive but non-exhaustive list of new features in Joomla 1.6 on the official documentation wiki: [What's new in Joomla 1.6][0].

Here's some highlights.  If any of the features below sound like something you need in your existing site then you should be planning to upgrade.


* **Productivity improvements** - There are lots of subtle improvements to menus and toolbars that make Joomla 1.6 just a pleasure, and faster to use.  Menus are more consistent and have a number of shortcut links.  Toolbars have really cool "Save & New" options that allow you to process large batches of content more quickly.  In the administrator, if your session expires, when you log back in you'll return to the page you were on just like in the frontend.
* **Feature consistency** - In Joomla 1.5, one component would have one feature but it would not be available in another.  Joomla 1.6 has standardised a lot of the features in each component.
* **Nested categories** - Finally, sections and categories have been merged into one list and there is no limit to the depth you can build your category trees.  All other extensions supporting categories automatically receive the same benefits as well.
* **Custom user groups** - The fixed groups in Joomla 1.5 can now be customised.  While the user groups certainly assist with the new access control system, they can also be used to group people for other purposes (such as for an organisational chart, etc).  You can also put people in more than one user group.
* **Custom view access levels** - You can now expand on the fixed "Public", "Registered" and "Special" access levels that you had in Joomla 1.5\.  The way these viewing access levels were handled in Joomla 1.5 has not changed but you have the ability to add new ones.  Combined with the new user groups, it's easy to restrict particular groups of people to particular categories of content or even individual articles.
* **New permissions** - Joomla 1.5 locked you into fixed permissions.  Joomla 1.6 allows you to traverse four different layers of permissions starting with an easy global level and drilling right down to the article level if you so choose.  You can specify who can create, edit, published and delete content.
* **Module enhancements** - Modules now have a toggle to display on all pages _except_ those selected.  The also have publish up and down times just like regular articles and most article based modules plug into the new nested categories system.
* **Search Engine Ordering (SEO) improvements** - Big changes make SEO even easier in Joomla 1.6\.  Meta information can be added to categories and articles can change the page title and page heading separately.
* **Multi-language support** - Joomla 1.6 supports some basic multi-lingual features that allow you to prepare sets of content for different languages, giving the site visitor to be able to switch between them.
* **Administrator template selectable for user** - Administrator users can select which administrator template they can user.  This is a huge boon for organisations with people with disparate disabilities that require different treatment to access your web site with maximum comfort and efficiency.
* **Template styles** - In 1.5 you could set the parameters for a single template. Joomla 1.6 allows you to store different sets of parameters for the same template as styles.  You can then assign a style to a menu item and set those in both the menu edit screen and the template style editor.
* **Integrated trash management** - All content now goes to trash before being permanently deleted and this is integrated into each list view.
* **Extension installer improvements** - Extension developers can take advantage of update sites and this makes it easier for site owners to upgrade extensions en masse.
* **404 redirection** - Joomla 1.6 has a plugin to monitor 404 pages and store information about them (this varies depending on your SEF settings).  You can then set those 404 pages to permanently redirect to another page.  This is invaluable for sites where you have moved content around.
* **Semantic HTML markup** - Joomla 1.6 finally brings Joomla output into the modern era and dispenses with all those horrible tables that still lurked in dark places.

As you can see, there is a lot in the release to tempt the site owner - much more than _just_ access control and nested categories.

### Is Joomla 1.6 stable enough to use?

There is a closely guarded secret amongst developers, and that is that no software is truly stable.  Joomla 1.6 went through a lengthy, six month beta process to iron out both major and minor bugs.  It was released when it was considered sufficiently stable to be used in production. The new term for that is called "General Availability" or GA.  This does not mean that Joomla 1.6 is bug free - it most certainly is not - but neither is Joomla 1.5 nor any other extension that you will install.

Stability is also a relative concept - not all bugs will affect you directly, and others you can live with knowing that they will be fixed in a month or two.  As a subjective assessment, Joomla 1.6.0 was much more stable on release than its 1.5.0 counterpart almost three years prior.  That is a testament to the dedication of the teams volunteering their time to fix bugs and other issues.

### Where can I find Joomla 1.6 extensions?

The Joomla Extension Directory now has a new tag for Joomla 1.6 extensions.  It's quite easy to search for them.  Just go to the [JED advanced search page][1], and click the "1.6 native" option, then the "Search" button (or use this [quick link][2]).

Over time, this list will expand.  It took approximately six months for Joomla 1.5 extensions to become readily available for most needs and a similar timeframe could be expected this time around.  This should decrease in future releases to about a month because going from a two to three year release cycle down to six months will reduce compatibility issues significantly.  Most good developers should be welcome this as a refreshing change.

If you are using extensions and you want them upgraded to support Joomla 1.6 and future versions, please let the developers know.

### I've decided to upgrade/migrate to Joomla 1.6, how do I do it?

Migrating to Joomla 1.6 is done with a community component called jUpgrade and the instructions can be found on the following page:

[http://docs.joomla.org/Tutorial:Migrating\_from\_Joomla\_1.5\_to\_Joomla\_1.6][3]

The process is far more streamlined than for Joomla 1.5 but complex sites may still require attention after the migration (just because complex sites are, well, complex).

### Should I start a new site in Joomla 1.5 or Joomla 1.6?

That's a really good question.  When starting a new site you of course need to consider all the major points already outlined above.  However, your main dilemma will be getting a template and getting extensions for your site.  Custom template designs will generally not be too much of a problem because designers will just work to the new HTML markup.  Template clubs are taking time to upgrade due to changes with installation packages and massive changes to core HTML output.  Some clubs have Joomla 1.6 offerings.  Others will no doubt follow as soon as they possibly can as the already high interest in Joomla 1.6 increases.

As a rule though, if you can make Joomla 1.6 work for your new site, you should probably err on the side of using that version.  Each version of Joomla gets easier to upgrade particularly with the new short release cycle.  Choosing Joomla 1.6 now will also mean your SEF URL's won't go through a transition state because of the merging of sections and categories.  It will save you a lot of work building redirection lists in the future if you build on Joomla 1.6 now.

That concludes this part of the article for web site owners.  The next part will look at the issues that developers face in choosing, or not, to upgrade their extensions to Joomla 1.6\.  If you like to discuss this further, please join us at [http://people.joomla.org/groups/viewgroup/742-The+Art+of+Joomla.html][4].

[0]: http://docs.joomla.org/What%27s_new_in_Joomla_1.6
[1]: http://extensions.joomla.org/extensions/advanced-search
[2]: http://extensions.joomla.org/search?f=1&q=16native&sa.x=0&sa.y=0
[3]: http://docs.joomla.org/Tutorial:Migrating_from_Joomla_1.5_to_Joomla_1.6
[4]: http://people.joomla.org/groups/viewgroup/742-The+Art+of+Joomla.html
