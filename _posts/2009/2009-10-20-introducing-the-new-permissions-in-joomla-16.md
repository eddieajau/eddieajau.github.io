---
layout:      post
title:       Introducing the new permissions in Joomla 1.6
description: This article explains the theory behind Joomla 1.6's permissions management system, a part of the Joomla access control system as presented to the Joomla Day in Sydney, 17 October 2009.
date:        2009-10-20 17:35:00
category:    joomla
image:
  thumb:     vendor/joomla.png
---
Joomla 1.6 already demonstrates the ability to add your own user groups and access levels.  Recently the groundwork for the new permissions system was completed and is ready to showcase.

Joomla 1.6 already demonstrates the ability to add your own user groups and access levels.  Mark Dexter has done a very good tutorial on this at [http://docs.joomla.org/ACL\_Tutorial\_for\_Joomla\_1.6][0] which shows some of the supporting user interface under development.  Thanks also go to Mark for developing the design of the inheritance diagrams that you will see in this article.

This article presents the theory behind how the completed permissions management system, a part of the Joomla access control system, will work in Joomla as it currently stands to for **Version 1.6 Alpha 2**.  Screenshots of the user interface that allow you to set permissions will follow in other articles when the design of the appropriate pages becomes more stable.  This article also includes material presented by Andrew Eddie during his keynote address to the Sydney Joomla Day in October 2009\.

## Four Levels of Permissions Management

There are four levels of permissions management in Joomla 1.6 and these are set against the user groups defined in the User Manager.  Permissions can be set:

1. in Global Configuration,
2. then in each component,
3. then in each category, and
4. then in each article.

Each level allows you to choose more granularity for which to set the permissions.  For example, permissions set in Global Configuration will apply to the site as a whole without any additional work.  At the other end of the scale, you can customise the permissions of each article if that level of detail suits your business processes.  Obviously there is a trade-off.  As you apply specific permissions at deeper layers, the administration increases because you are micro-managing permissions on more and more objects.

## Actions and Permission Rules

There are eight base actions that you can perform in Joomla 1.6\.  These are:

1. Login Site
2. Login Admin
3. Manage
4. Admin
5. Create
6. Delete
7. Edit
8. Edit state

A component developer can add more, but most things that you want to restrict a user to do (based on the user groups they reside in) can be mapped to those eight actions.  However, each level of the permissions management system unlocks different abilities for each of the actions (sounds a bit like a computer game, doesn't it).  The following table outlines, in broad terms, what each action means with respect to each level of permissions management:

<table align="center" border="1" cellpadding="4" cellspacing="0" width="100%">
	<tbody>
		<tr>
			<th>
				&nbsp;</th>
			<th width="10%">
				Login<br />
				Site</th>
			<th width="10%">
				<p>
					Login<br />
					Admin</p>
			</th>
			<th width="10%">
				Manage</th>
			<th width="10%">
				Admin</th>
			<th width="10%">
				Create</th>
			<th width="10%">
				Delete</th>
			<th width="10%">
				Edit</th>
			<th width="10%">
				Edit State</th>
		</tr>
		<tr>
			<td>
				<b>Global Configuration</b></td>
			<td>
				Allows login to the site/ frontend.</td>
			<td>
				Allows login to the administrator/ backend.</td>
			<td style="text-align: center;">
				-</td>
			<td>
				Allows super user access.</td>
			<td>
				Can create content in any component.</td>
			<td>
				Can delete content in any component.</td>
			<td>
				Can edit content in any component.</td>
			<td>
				Can change the state of content in any component.</td>
		</tr>
		<tr>
			<td>
				<b>Component</b></td>
			<td style="text-align: center;">
				-</td>
			<td style="text-align: center;">
				-</td>
			<td>
				Allows component access.</td>
			<td>
				Allows access to component options.</td>
			<td>
				Can create content in this component.</td>
			<td>
				Can delete categories and content in this component.</td>
			<td>
				Can edit categories and content in this component.</td>
			<td>
				Can delete categories and content in this component.</td>
		</tr>
		<tr>
			<td>
				<b>Category</b></td>
			<td style="text-align: center;">
				-</td>
			<td style="text-align: center;">
				-</td>
			<td style="text-align: center;">
				-</td>
			<td style="text-align: center;">
				-</td>
			<td>
				Can create sub-categories and content in this category and its sub-categories.</td>
			<td>
				Can delete this category, its sub-categories and content therein.</td>
			<td>
				Can edit this category, its sub-categories and content therein.</td>
			<td>
				Can change the state of this category, its sub-categories and content therein.</td>
		</tr>
		<tr>
			<td>
				<b>Article</b></td>
			<td style="text-align: center;">
				-</td>
			<td style="text-align: center;">
				-</td>
			<td style="text-align: center;">
				-</td>
			<td style="text-align: center;">
				-</td>
			<td style="text-align: center;">
				-</td>
			<td>
				Can delete this article.</td>
			<td>
				Can edit this article.</td>
			<td>
				Can change the state of this article.</td>
		</tr>
	</tbody>
</table>

The rules for the permissions on these actions are quite easy because there are only three possible values as follows:


1. You can leave a permission unset (in the case of Global Configuration), or you can set it to inherit the permissions from the levels above.
2. You can set a permission to allow an action to be performed.
3. You can set a permission to deny an action from being performed.

With that in mind, there are four simple rules by which Joomla evaluates whether you can perform an action.

1. By default, you can't do anything.  We call this an implicit or soft deny.
2. You can allow an action, and we call this an explicit or hard allow.
3. You can deny an action, and we call this an explicit or hard deny.
4. An explicit or hard deny always wins regardless of whether a soft or hard allow is also available.

There is one exception to these rules concerning the Admin action which will be discussed later.

## Permission Inheritance

Permissions are always inherited, in order, down the levels and also down the user group tree.  For this reason, the user groups have been rearranged slightly in Joomla 1.6\.

![Screenshot](/images/2009/user_groups_list.jpg)

The Public Frontend and Public Backend groups have been merged together to form a single, top-level group.  Both the frontend and backend user group trees hang off the Public group.

The Super Administrator group is now called Super Users (to reduce confusion with the Adminstrator group).

With those things in mind, it's best to look at this with some diagrams that explain each action individually.  In each diagram as a number of symbols that represent the state of the permission that has been set for the action relative to both the user group and the permission level.  The following table explains the meaning of each symbol:

![Screenshot](/images/2009/acl_icon_unset.jpg)

An unset permission (which really means deny).

![Screenshot](/images/2009/acl_icon_allow.jpg)

An explicit, or hard, allow.

![Screenshot](/images/2009/acl_icon_deny.jpg)

An explicit, or hard, deny.

![Screenshot](/images/2009/acl_icon_allow_inherit.jpg)

An inherited allow.

![Screenshot](/images/2009/acl_icon_deny_inherit.jpg)

An inherited deny.

### The Login Site Action

The Login Site action simply allows you to login to the frontend of the web site.  It has no effect at the component, category or article level (symbols shown dashed).

![Screenshot](/images/2009/acl_login_site.jpg)

The Registered user group is set to Allow and, as you can see, this inherits down the tree through to the Publisher group.  Likewise, the backend groups are also given Login Site through the Manager group (set to Allow) and this inherits down the backend groups tree to the Super User group.

### The Login Admin Action

The Login Site action simply allows you to login to the backend of the web site.  It has no effect at the component, category or article level (symbols shown dashed).

![Screenshot](/images/2009/acl_login_admin.jpg)

The Manager user group is set to Allow and, as you can see, this inherits down the tree through to the Super User group.

### The Admin Action

Admin is a very special action.  When set at the Global Configuration level, it allows users in that group to perform any action regardless of any other allow or deny permissions (this is the one exception to the rule).  The default installation of Joomla will assign this permission to the Super Users group.

At the Component level, the Admin permission allows a user to change the component options (these are accessed via the Toolbar button called Preferences or Parameters in Joomla 1.5) which also includes the ability to change the component permissions.

![Screenshot](/images/2009/acl_admin.jpg)

Because the component options allow you to change the component permissions, you need to be careful how this is assigned.  The diagram above shows that in Global Configuration we have not assigned Admin to any user groups.  This is because that would also make an Adminstrator into a super user (and then they would be able to do anything).  However, in **each** component we have set Allow for the Administrator Group.  This means that users in the Administrator group are able change component options, but users in the Manager group will not because we have left the action unset.  In fact, users in the Manager group will not even see the Toolbar button for the options.

One thing to note is that if you install a new component (represented by the "New" component in the diagram) the Administrator group will not automatically have the Admin action.  Providing the component supports options and permissions, you will need to go into the component options and manually add the Admin action to the Administrator group.  In summary, this means that only your Super Users are allowed to assign who else can have access to change permissions.

The Admin permission has no effect at the Category or Article level.

### The Manager Action

At the Global Configuration level, the Manage action has no effect (but can still be set).

At the Component level, the Manage action allows the user group to actually access the repsective component.

![Screenshot](/images/2009/acl_manage.jpg)

The diagram above shows that at the Global Configuration level we have set Allow for the Administrator group.  Unlike the Admin action, setting the Manage action globally means that any user in the Administator group can access any component, even new ones that are installed by the site master.

At the component level we can see that the Administrator group inherits Allow for all components.  However, Manager group has allow set individually for each component.  You can see that users in the Manager group will not have access to extension installation or languages because the action has not been set (therefore the implicit deny rule applies).

The Manage action has no effect at the Category and Articles levels.

### The Create Action

The Create action allows a user to create categories and content in categories in components.

![Screenshot](/images/2009/acl_create.jpg)

The diagrams shows that only the Manager groups has set this action to Allow in Global Configuration and the Author group has been set to Allow at the component level (specifically, only in the Article Manager and Web Links Manager).  The Administator, Editor and Publisher groups also inherit the Allow setting at their respective levels.  This means that a users in the backend user groups are able to create content in any component and any category, and also create categories.  Users in the author, editor and publisher group are able to create articles in any category from the frontend.

The Create action obviously does not apply for articles (because if they exist, you've already created them).

### The Delete Action

The Delete action allows a user to delete categories and content in categories in components.

![Screenshot](/images/2009/acl_delete.jpg)

The diagrams shows that only the Manager group has been set to Allow.  The Administrator group also inherit the Allow setting.  This means that only users in the Manager and Administrator groups can delete categories and content in any category in any component.

### The Edit Action

The Edit action allows a user to modify categories and content in categories in components.

![Screenshot](/images/2009/acl_edit.jpg)

The diagrams shows that the Manager group has been set to Allow in Global Configuration.  The Editor group has also been set to Allow but only at the Component level (specifically in the Articles and Web Links components).

The Administrator group inherits the ability to edit categories and content from the Manager group at the Global Configuration level.

The Publisher group inherits the ability to edit categories and content from the Editor group at the Component level.

However, we have not set the Author group at the Component level.  This prevents a user in the Author group from editing any content or any categories (note that the ability for users in the Author group to edit their own content has not been implemented yet). 

### The Edit State Action

The Edit State action allows a user to modify secondary information, such as the published state, of categories and content in categories in components.

![Screenshot](/images/2009/acl_edit_state.jpg)

The diagrams shows that only the Manager group has been set to Allow in Global Configuration.  The Publisher has also been set to Allow but only at the Component level (specifically in the Articles and Web Links components).

The Administrator group inherits the ability to edit categories and content from the Manager group at the Global Configuration level.

The Author and Editor group have not been set.  This prevents a user in the Author or Editor groups from changing the published state of categories and content in the respective component.

## Conclusion

This article provides an introduction to interpretting the new permissions management system in Joomla 1.6\.  The key points to remember are:

1. Permissions inherit down the user group tree in order, and down the four levels in order.
2. By default, a soft deny applies until you Allow an action but then an explicit, or hard, Deny completely prevents access to the action.

We'll look at the effects of adding users to multiple groups and placing permissions on specific categories in future articles.

[0]: http://docs.joomla.org/ACL_Tutorial_for_Joomla_1.6
