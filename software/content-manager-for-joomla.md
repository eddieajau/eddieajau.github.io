---
layout:      page
title:       Content Manager - access control for Joomla 1.5
description: Content Manager allows you to control the access to who can edit articles from the Joomla frontend.
date:        2009-06-04 10:00:00
image:
  feature: abstract-7.jpg
  credit: dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
comments: false
reading_time: false
---
**[DOWNLOAD VERSION 1.0.4 Beta 1][0]** 
Last updated {{ page.date | date: "%B %d, %Y" }} ![Compatible with Joomla 1.5](/images/software/joomla/compat_15_native.png)

**Note: you must install the JXtended Libraries Plugin and JXtended Control first!**  

[DOWNLOAD THE SUPPORTING JXTENDED LIBRARIES][1]  

[DOWNLOAD THE SUPPORTING CONTROL EXTENSION][2]  

Also read the [reviews for Content Manager][3] on the Joomla Extensions Directory.  

**Content Manager** is an advanced frontend article manager for Joomla.  Joomla's built-in permission system is limited to three types of frontend groups.  By combining Content Manager with JXtended Control (a precursor to the access control technology for future versions of Joomla), you can create new User Groups and grant them various levels of access at the article category level.  Add the JXtended WYSIWYG editor and you have the ability to create anything from small standard paragraphs to whole skeletal frameworks that you can insert into your article.  Content Manager provides a user-friendly and configurable Control Panel for frontend users, giving them only the information they need at a glance.


[![](/images/software/contentmanager/content_manager_site_control_panel.png)](/images/software/contentmanager/content_manager_site_control_panel.png)

**Note for Joomla 1.5.11 sites**: Unfortunately there is a bug in the editor button handling that causes a white-screen-of-death or fatal PHP error.  For more information and possible workarounds, see [http://groups.google.com/group/the-art-of-joomla/msg/e7698115abcd3bde][6].

## Features

* Create new user groups.
* Place users in more than one group.
* Control add and edit permissions on a per category basis for users in one or more groups.
* Control publishing rights, modification of author, access level and parameters as a whole.
* Configurable module-based control panels (less scary than the Administrator Articles Manager).
* Allows for public or registered user article submission.
* Fully customisable output using Joomla's flexible layout override system.

While Joomla does provide some access control for editting frontend articles, it is severely limited.  There are three permission types, Authors, Editors and Publishers.  Authors can submit but only edit their own articles.  Editors can submit and then edit any article.  Publisher can edit and publish any article.  Content Manager serves to increase the options available to site masters by allowing edit access controls related to the category or articles.  With Content Manager you can avoid the use of the broad-brush groups like Author, Editor and Publisher altogether.  Using [JXtended Control][2] you can create totally new user groups to provide finer grained edit control over your frontend users.

## Requirements

* JXtended Libraries
* The Control extension
* Joomla 1.5.7+
* **PHP 5.2+**

You must install the JXtended Libraries plugin and JXtended Control component before you install Content Manager.

This extensions requires a **medium to advanced** working knowledge of Joomla to configure and use to its maximum potential.  Please familiarise youself with all instructions first.

## Packing List

All extensions are automatically installed from the one package.

* The Content Manager backend component (com\_contentmanager) to configure rules and permissions, the control panels and optionally article templates.
* The Content Manager frontend component giving for frontend article management.
* An access controlled articles module (mod\_contentmanager\_article) for listing articles that you have permission to work with.
* An access controlled category modules (mod\_contentmanager\_categories) for creating new articles in the catgories you have permission to work with.
* An access controlled search module (mod\_contentmanager\_search) for finding articles that you have permission to work with.
* An access controlled and context aware toolbar module (mod\_contentmanager\_toolbar) that gives you access to the Content Manager Control Panel, allows you to edit the article you are viewing or create a new article in the same category if you have permission.
* The EN-GB language files for all components and modules.

## License and Support

This extension is free to download and use on any number of Joomla web sites. It is released as Open Source under the GNU General Public License.

No official support is provided.  However, usage difficulties can be reported on the [Art of Joomla project tracker][7].

If you find any this extension useful, please consider paying us forward (not paying us back) by supporting one of our nominated charities [Kiva.org][8] or [World Hope Australia][9] and help fight world poverty! Let us know if you do.

## Installation

**Is the server that your web site is running on using PHP5?  If not, you cannot use this extension!**

Before you start using Content Manager, it is important to know that it relies of two other extensions.

You must **first** install the JXtended Libaries plugin (this is a plugin that supports extended framework features) and the JXtended Control component (this component gives you extra access control abilities).

**STOP! HAVE YOU INSTALLED THE JXTENDED LIBRARIES PLUGIN AND JXTENDED CONTROL?**

**HAVE YOU CHECKED THAT THE PLUGIN IS ENABLED AND THAT CONTROL APPEARS TO WORK?**

Download the single extension package from the Art of Joomla project site.

Install the single package using the Joomla installer.

Log into the Joomla 1.5 Administrator.

Select _Extensions -\> Install/Unistall_ from the menu.

Click _Browse_ and select the extension package you downloaded.

Click _Upload & Install File_ (alternatively use the other installation methods available if desired).

[![](/images/software/contentmanager/content_manager_installed.png)](/images/software/contentmanager/content_manager_installed.png)

If you accidentally install Content Manager first, don't panic.  Just uninstall it, install the JXtended Libaries plugin and the JXtended Control component, then reinstall Content Manager.

Optinally, you can also install the JXtended WYSIWYG editor.  Content Manager integrates with the templates button in this editor to allow you to insert prewritten text in your article.

## How to Use Content Manager

Content Manager relies on some Administrator configuration, and frontend components and modules to give you extended control over who users can edit articles on your Joomla web site.

The frontend relies on a page called a Control Panel.  This is a page that is able to display HTML markup as well as Joomla modules.  You can customise these pages to suit the needs of users that maintain articles on your site.  You can restrict access to the Control Panel to particular groups of users.  Then, you can restrict your users to be able to work with articles in particular categories, and also restrict what parts of an article they can change (such as the published state).

The Administrator provides three features.  It gives you the ability to configure the frontend Control Panels, it gives you the ability to configure the access controls for your users, and it optionally gives you the ability to configure Editor Templates that integrates with the JXteneded WYSIWYG editor (it provides you with a list of template snippets that you can insert into your article).

Finally you can extended the access controls by adding new user groups with JXtended Control which allows you to give different permissions to different groups of users for articles in specific categories.

### Control Permissions by User Groups

Content Manager and Control works on the principle that permissions are defined at the User Group level.  You will need to define a new user group for each specific set of actions you want to grant on selected categories.  For example, for a typical news site you may have a number of editors that you want to restrict rights for several categories each (probably all categories in an individual section).  Let's say you have a Business section (a Joomla section) and a Sports section.  Each of these sections have a number of categories.  The process for configuring Control and Content Manager to divide the users that can maintain content in each section, and also have an editor-in-chief over them all is as follows:

1. Go to the JXtended Control backend component
2. Create three new groups under the existing Registered user group - Business Editor, Sport Editor and Chief Editor.
3. Assign the appropriate users to those new groups.
4. Go to the Content Manager backend component and select Access Control.
5. Create the first of three Type 2 rules.
6. Select the Business user group.
7. Select the actions you want them to perform (probably create and edit articles).
8. Select all the categories in the Business Joomla section.
9. Save this first rule.
10. Create a second Type 2 rule.
11. Select the Sports user group.
12. Select the actions you want them to perform (probably create and edit articles).
13. Select all the categories in the Sports Joomla section.
14. Save the second rule.
15. Create the last Type 2 rule.
16. Select the Chief Editor user group.
17. Select the actions you want them to perform (probably all the available actions).
18. Select all the categories that you want them to control.
19. Save the last rule.

You can repeat this process for as many times as is appropriate to give your site the required granularity of access control on your articles.

At this stage we do not include features to control access at the individual user level.  This is done for performance reasons and is a compromise to allow for a slightly less complex user interface for configuring the rules.  However, you can workaround this limitation by creating a special user group for each user you need to grant individual access to.

### Frontend Management

Central to the frontend management of articles in the Content Manager Control Panel.  This is a fully configurable page using the same markup as the main Joomla template and allows you to include HTML and `jdoc:include` markup.  Content Manager ships with a number of useful modules that all work on the articles and categories that the user has access to.  These include a simple search form, a module that allows you to create new articles, and one that allows you to list articles (such as your most recent new or modified articles).  You can of course include any other frontend modules that are installed on you web site.

The Control Panel is complimented by a context aware Toolbar module.  This module works around is aware of the permissions you have given the user in Content Manager's backend and only displays if they have access to the frontend component.  It also is aware when you are viewing an article, allows you to edit it if the user has permission, or create a new article in the same category if that is allowed.

With that brief introduction, it's appropriate to look at each feature in detail.

## Control Panels

Content Manager gives you the ability to configure control panel pages made up of standard Joomla or Content Manager modules.  The control panels use the same markup that is available to the Joomla template.  You can include HTML and also load modules using the `jdoc:include` tags.

[![](/images/software/contentmanager/content_manager_control_panels.png)](/images/software/contentmanager/content_manager_control_panels.png)

Content Manager comes with two sample Control Panels.

The _Typical Editor_ sample shows you the markup to include some typical modules the provide a useful interface for most cases.  It includes the Content Manager Search module, a module that displays the Categories in which you can create new articles, a module showing your most recently added articles, and a module showing your most recently modified articles.  The advantage with this sample is that you can configure all the parameters of the modules manually.  It is a good example to start with and get a feel for what Content Manager can do.  The disadvantage is that you need to know what those parameters are.  To configure modules in the normal way using the Module Manager, use the next sample.

The _Standard Position Loader_ sample shows you the markup that is required to load modules in a specifc position.  To use this Control Panel, you would configure modules in the Module Manager to display in a position named contentmanager-cpanel.  You would use this sample if you want to control the module parameters with the Module Manager.

### Creating a New Control Panel

You should first use the samples provided, particularly if you do not have experience with Joomla template markup.  Once you have some experience working with them, you can move onto designing your own.

To create a new Control Panel, select _Control Panels_ from the Linkbar and then click _New_ in the Toolbar.

![](/images/software/contentmanager/content_manager_control_panel_edit.png)

Enter a descriptive title for the Control Panel.  Press the tab key and the alias will be automatially populated for you.

In the _Control Panel Body_ you can provide any markup that would be valid in a Joomla template.  There is a dropdown list of snippets that you can use for many common cases.  It gives you sample code for including invidual modules as well as to display modules in a position.

Optionally provide details in the _Meta Description_ and _Meta Keywords_ fields.  There is no great SEO benefit to providing these as Control Panels will likely only be available to registered users.

Finally, click _Save_ in the Toolbar and your new Control Panel will appear in the list.

The Control Panel page has an integrated trash manager.  Note that you can only delete items from trash when the state filter is set to Trash.

## Configuring Access Controls

There are two types of rules that Content Manager uses to control who can access the appropriate features.

Firstly, there is the rule that allows access to the frontend Control Panel.  We need this because we cannot limit this from Joomla's built-in access controls.  This type of rule is called a Type 1 Rule.  You generally only need one Type 1 Rule as this is simply to allow users access to the frontend component.

Secondly, we can restrict the categories for articles that the user can edit, and also the permissions they are allowed.  This type of rule is called a Type 2 Rule.  You will likely have several Type 2 Rules depending on the granularity by which you want to allow users access.

To configure the access controls for Content Manager, click _Access Control_ in the Linkbar.

![](/images/software/contentmanager/content_manager_rules.png)

### Controlling Access to Content Manager - the Type 1 Rule

There is one Type 1 Rule pre-installed with Content Manager.  This rule controls the groups of users that you want to give access to the frontend Control Panel and all the associated features that comes with the component.  Only one of this type of rule is required but you may need to add extra user groups to the rule from time to time.  To edit this rule, click the linked title.

![](/images/software/contentmanager/content_manager_edit_rule1.png)

Each rule has a descriptive title and two settings that affect how the rule is applied.

The _Allowed_ setting can affect whether this rule Allows or Denies access to the user.  Generally it is set to _Allow_.

The _Enabled_ setting affects whether the rule is actually to be evaluated or not.  Generally rules are enabled, so the _Yes_ setting will be selected.

In the Permissions tab there are two areas, one area to select the user groups that are affected by the rule, and one to select what actions users in those groups can perform (or denied from performing if _Allowed_ is set to _Deny_).

There is only one type of action available called Access.  So, for the user groups you select, they will be given access to the frontend Control Panel for Content Manager.  Select the additional user groups that you want to have access to the Control Panel.  Note that you can use JXtended Control to create new user groups for you site.

If you want to give public users the ability to submit content, then you also need to select the Public Frontend group in the User Groups list.

Click _Save_ in the Toolbar when you are finished configuring the form.

#### Special Note About the Type 1 Rule

If you create new user groups using JXtended Control, you must also give these groups permission to access Content Manager in this rule otherwise they will not be able to use it.

### Controlling Access to Permissions - the Type 2 Rule

Once we have establish which users have access to the frontend Control Panel, we have the ability to tune what they can and cannot do.  We do this by setting up Type 2 Rules.  Click _New_ Type 2 in the Toolbar.

![](/images/software/contentmanager/content_manager_edit_rule2.png)

You can see this page is very similar to the Type 1 rule, but there are now three sections in the Permissions area and there are more actions available to you.  The Assets box shows you a list of the categories you have created on you site.  So, with this type of rule, we are able to define what actions a user in a group can perform on articles in one or more categories.

These are the actions that are available:

* Create Articles: This allows the user to create new articles in the selected categories.
* Edit Articles: This allows the user to edit existing articles in the selected categories.
* Publish Articles
* Trash Articles

Within the article edit form and for either creating a new article or modifying an existing article, there are a number of sub-permissions:

* Edit Article Access: This allows the user to modify the Access Level of the article.
* Edit Article Author: This allows the user to change the Author of the article.
* Edit Article Parameters: This allows the user to modify the Parameters of the article.

When you are satisfied with the combination of user groups, actions and categories, click _Save_ in the Toolbar.

![](/images/software/contentmanager/content_manager_rules_b.png)

You can configure any number of Type 2 rules.

## Preparing the Frontend

There are a number of ways to set up your environment to use Content Manager from the frontend.  The quickest and easiest way is to simply add the Content Manager Toolbar module.

### Adding the Toolbar Module

Go to the Module Manager by selecting Extensions -\> Module Manager from the Administrator Menubar.  Click _New_ in the Toolbar.

![](/images/software/contentmanager/content_manager_new_module.png)

Select _Content Manager - Toolbar_ from the list.

![](/images/software/contentmanager/content_manager_edit_toolbar_module.png)

Give the module a title that will help you find it again.

The module should be placed in a position that has the _none_ module style so it doesn't matter whether the title shows or not.  If in doubt, set _Show Title_ to _No_.

The best position for the module will depend on your site template.  A position just above the component output is usually the most suitable.  If your template does not have a suitable position, you might like to add the following code in an appropriate location:

    <jdoc:include type="modules" name="toolbar" style="none" />

Set the _Access Level_ to _Registered_.  The Type 1 Rule will do the rest of the access check for you and only display the Toolbar if the user has permission to see it (in Joomla 1.6 you will actually be able to create a new Access Level).

In the Module Parameters, change the _Control Panel_ setting to _Typical Editor_.  This gives you a preconfigured Control Panel that gives you a feel for what the Control Panel can do.

Click _Save_ in the Toolbar when you are done.

### Using the Control Panel

It is finally time to turn our attention to the frontend site.  Login to your site.

![](/images/software/contentmanager/content_manager_site_toolbar.png)

Providing the rules and Toolbar module are configured correctly, you should see the Toolbar appear above your content (depending on the actual module position you use of course).  Click the _Article Control Panel Link_.

![](/images/software/contentmanager/content_manager_site_control_panel.png)

You should see a two column layout (if there is not enough room in the component area of the template, it could display as one column).  There are four modules displaying.

On the left there is a Search module that allows you to find articles you have permission to work with.  Beneath that is a module that shows you links to the categories under which you are allowed to add articles.  Click any of these links to create a new article in the category.

On the right are two variations of the same module.  The top shows you the new articles you own.  If the title is linked, then you have access to edit the article in that category.  The titles that aren't linked mean that you have probably had permission to create an article in the category, but not modify it.  Below this modules is a similar listing only showing you the articles you created and have most recently modified.

### Creating an Article

Click one of the category links to create a new article in that category.  Please note that the page will open in full-width mode.  If the font looks a bit strange, please contact your template provider and as them to fix their `component.php` file.

![](/images/software/contentmanager/content_manager_edit_article1.png)

While organised in a slightly different way, the elements of the screen should be quite familar.

![](/images/software/contentmanager/content_manager_edit_article2.png)

![](/images/software/contentmanager/content_manager_edit_article3.png)

![](/images/software/contentmanager/content_manager_edit_article4.png)

When you have filled out the appropriate details, click _Save_.

## Trouble shooting

### I get an error like _Call to undefined function jximport()_.

Things to check:

* Is your web site running on a server with PHP 5?  This extension will not work with PHP 4\.
* Are you running Joomla 1.5.7 or higher? If you aren't, your site is vulnerable to very serious security issues found in previous versions. Upgrade as soon as possible.
* Have you installed the JXtended Libraries plugin?
* Is the JXtended Libraries plugin enabled (see Extensions -\> Plugin Manager)?
* Have you installed JXtended Control?
* Does Control appear to work when you go to the component?

### I get an error like _Fatal error: Call to a member function get() on a non-object in /plugins/editors/tinymce.php on line 433 _

Chances are you are running Joomla 1.5.11\.  Unfortunately there is a bug in the editor button handling that requires core fixes to address this issue.  For more information and possible workarounds, see [http://groups.google.com/group/the-art-of-joomla/msg/e7698115abcd3bde](http://groups.google.com/group/the-art-of-joomla/msg/e7698115abcd3bde).

### I can't see the Toolbar module on the frontend.

Things to check:

* Are you logged into the frontend?
* Have you given the correct user group or groups access to Content Manager (see the Type 1 Rule called _Content Manager - Access_)?

There is a global rule for people who can see the Toolbar.  By default the Administrator's and Super Administrator's can see the module and access Content Manager.  If you create a new group, for example "writers" using Control, you must add that group to the general access rule otherwise they will not be able to do anything at all.

### The Content Manager Search Module does not show any results.

It will only show the articles you can normally see on the site.

### There are no category links showing so that I can add a new article.

Things to check:

* Do you have any categories available on your site (if not, you won't be able to use Content Manager)?
* For the user group that you are logged in as, have you given them permission to create an article in any category?

You need to include your user groups in at least two rules for them to be able to submit content.  First give them general access to Content Manager using the Type 1 rule.  Then create a Type 2 rule that gives them permission to perform operations on articles in specific categories.

[0]: http://joomlacode.org/gf/download/frsrelease/10388/40511/taoj_contentmanager.1.0.4beta1.tar.gz
[1]: http://joomlacode.org/gf/download/frsrelease/10418/40683/jxlibraries.1.0.10.tar.gz
[2]: http://joomlacode.org/gf/download/frsrelease/10418/40682/jxcontrol.1.0.7.tar.gz
[3]: http://extensions.joomla.org/extensions/news-production/content-submission/8621 "If you like Content Manager, please rate or review it on the JED."
[4]: http://people.joomla.org/groups/viewgroup/742-The+Art+of+Joomla.html
[6]: http://groups.google.com/group/the-art-of-joomla/msg/e7698115abcd3bde
[7]: http://joomlacode.org/gf/project/theartofjoomla/tracker/?action=TrackerItemBrowse&tracker_id=7320
[8]: http://www.kiva.org/team/joomla
[9]: http://worldhope.org.au
