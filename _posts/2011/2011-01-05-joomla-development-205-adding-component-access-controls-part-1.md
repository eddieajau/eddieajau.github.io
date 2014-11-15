---
layout:      post
title:       Joomla development 205 - Adding Component Access Controls - Part 1
description: This video looks at the theory behind the Joomla access control system in Joomla 2.5 and Joomla 3 as it relates to component development.
date:        2011-01-05 20:08:34
category:    ["joomla-development","videos"]
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

<iframe allowfullscreen="allowfullscreen" frameborder="0" height="315" src="http://www.youtube.com/embed/qxGUQY3jP38" width="560"></iframe>

This lesson looks at the theory behind the access control system in Joomla 2.5 and Joomla 3\.

#### Introduction

Welcome back. I'm going to quickly go over some theory on access controls before we head back into the code. It's quite important to understand the new concepts in Joomla with regard to access control as they have changed slightly compared to the way we did it in Joomla 1.0 and 1.5\.

We touched on access checks very briefly in a previous lesson where we created the master controller for the component. You'll recall that we do access control checks on permission we are allowed to perform using the user object's authorise method. Typically in the code we would get the object for the current user by calling JFactory::getUser and then we can call the authorise method. You should also recall this method takes two argument, the first being the name of the permission we are wanting to check and the second will be name of the component's folder.

It's important to realise that permissions are assigned against the user groups, not individual users. So this means that access control checks will take into account all of the groups that a user belongs to.

Now, there are three permissions state. The first is actually no state at all which Joomla interprets as an implied deny. So, by default, Joomla doesn't allow you to do anything. The next state is Allow and this explicitly allows you to before an action. The last state is Deny and this explicitly prevents you from performing a given action. The important thing to remember here is that Allow can override then implied deny, and Deny will always override Allow. In other words, the explicit Deny always wins even if you have an explicit Allow set though another user group.

#### Actions Explained

With that explained, there is a small set of core permission that Joomla handles natively and I'll explain how they relate to a component.

**core.manage** is the permission that grants you physical access to the component. If you don't have the core.manage permission then you will not be able to access a component from the backend at all. It won't even appear under the Component menu.

**core.admin** is a special permission that allows you access to the configuration options for a component, and within those options is the ability to configure the permissions for each users group for the component. The reason this is separate from core.manage is because we may want some users to be able to manage the content of a component, but not be allowed to change the permissions for other users.

The next few permissions are more or less self-explanatory. core.create is the permission you check when a user is creating content.

**core.delete** is the permission you check when you are deleting content altogether.

**core.edit** is the permission you check when a user is trying to edit an item of content.

**core.edit.state** is the permission you check when the user is trying to change the state of content, such as publishing, unpublishing, trashing or archiving. You could also extend checks to other incidental fields like changing ordering or ownership if you so desired, but that's really up to you as a developer to determine.

**core.edit.own** is the permission you would check if a user is trying to edit their own content but lacks the more general core.edit permission.

This set of core permission should generally cover most of your needs in a typical component, but the access control API has been designed to allow you to add addition permissions if the core permissions and insufficient and, of course, you can ignore some of the core permissions if you want. The only permissions you are required to support are core.manage and core.admin so that you can be consistent with how the core component handle their own permissions.

So that's it for the theory and part 1 of this lesson. In part 2 of this lesson we see how we enable the setting of these permissions in the component. See you back soon.
