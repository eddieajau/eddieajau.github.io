---
layout:      post
title:       Database upgrades in Joomla 1.6
description: The Joomla database structure has remained relatively constant since Joomla 1.0 was first launched in 2005, and even beyond that to Mambo 4.5.2.  After six years, it was time to refactor, fix many issues holding Joomla back, and set the stage for the next five or six years of development.  The Converting Old Extensions guide has been updated to include changes in the Joomla 1.6 database schema, and this article provides further information on how that might affect common database SQL queries.
date:        2011-02-11 09:56:43
category:    joomla
image:
  thumb:     vendor/joomla.png
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
The Joomla database structure has remained relatively constant since Joomla 1.0 was first launched in 2005, and even beyond that to Mambo 4.5.2\.  After six years, it was time to refactor, fix many issues holding Joomla back, and set the stage for the next five or six years of development.  The [Converting Old Extensions][0] guide has been updated to include changes in the Joomla 1.6 database schema, and this article provides further information on how that might affect common database SQL queries.

## Using the new JDatabaseQuery class in Joomla 1.6

In respond to requests for better future support of other database engines, like MongoDB, MSSQL, et al, Joomla 1.6 introduces a new query builder class that developers can optionally take advantage of.  This class allows you to build queries in the order that make sense to you are a developer rather than in the strict SQL format.  Below is an example of what a query in Joomla 1.5 looks like and how that translates to Joomla 1.6 should you wish to use the query class.  Note also that in PHP you can use chaining to build queries in a very neat format.  Using the query class, you can build lots of conditional elements into queries in a programmatically neat fashion.

### Building a SQL query in Joomla 1.5

```php
$db = JFactory::getDbo();
$db->setQuery(
 'SELECT *'.
 ' FROM #__articles'.
 ' WHERE state = '.(int) $published.
 '  AND catid = '.(int) $categoryId.
 ' ORDER BY created DESC'
);
```



### Alternative method to build a query in Joomla 1.6

```php
$db = JFactory::getDbo();
$query = $db->getQuery(true);
$query->select('*')
 ->from('#__articles')
 ->where('state = '.(int) $published)
 ->where('catid = '.(int) $categoryId)
 ->order('created DESC');
$db->setQuery($query);
```

## Changes in the Joomla 1.6 database structure for installed extensions


One of the things that has dogged Joomla developers in the past is the fact that meta information about extensions was stored in multiple tables.  Most developers would be aware of the awkward nature of the jos\_components table that served as a master list of components, but moonlighted also moonlighted as a menu system.  For templates and modules, there was no master list of installed extensions so the developer resorted to expensive folder scans time after time.  Joomla 1.6 addresses this issue by introducing the jos\_extensions table.  This table absorbs the jos\_components and jos\_plugins tables, and adds meta information about all the other installed extension types: modules, templates and plugins.

Following are example queries that you might use in practice.  Note the queries use the new `JDatabaseQuery` class for assembly.

## Getting information about components

### Listing all Joomla 1.6 components

```php
$db = JFactory::getDbo();
$query = $db->getQuery(true);
$query->select('*')
    ->from('#__extensions')
    ->where('type = '.$db->quote('components'))
    ->order('ordering');
```

### Getting information about a single component

```php
$db = JFactory::getDbo();
$query = $db->getQuery(true);
$query->select('*')
    ->from('#__extensions')
    ->where('type = '.$db->quote('components'))
    ->where('element = '.$db->quote('com_content'))
    ->order('ordering');
```

## Getting information about languages

### Listing all Joomla 1.6 installed language packs

```php
$db = JFactory::getDbo();
$query = $db->getQuery(true);
$query->select('*')
    ->from('#__extensions')
    ->where('type = '.$db->quote('language'))
// Use client_id = 1 for backend packs
    ->where('client_id = 0')
    ->order('ordering');
```

### Getting information about a single language pack

```php
$db = JFactory::getDbo();
$query = $db->getQuery(true);
$query->select('*')
    ->from('#__extensions')
    ->where('type = '.$db->quote('language'))
    ->where('element = '.$db->quote('en-GB'))
// Use client_id = 1 for backend packs
    ->where('client_id = 0)
    ->order('ordering');
```

## Getting information about libraries

### Listing all Joomla 1.6 libraries

```php
$db = JFactory::getDbo();
$query = $db->getQuery(true);
$query->select('*')
    ->from('#__extensions')
    ->where('type = '.$db->quote('library'))
    ->order('ordering');
```

### Getting information about a single library

```php
$db = JFactory::getDbo();
$query = $db->getQuery(true);
$query->select('*')
    ->from('#__extensions')
    ->where('type = '.$db->quote('library'))
    ->where('element = '.$db->quote('simplepie'))
    ->order('ordering');
```

## Getting information about modules

### Listing all Joomla 1.6  frontend modules

```php
$db = JFactory::getDbo();
$query = $db->getQuery(true);
$query->select('*')
    ->from('#__extensions')
    ->where('type = '.$db->quote('modules'))
// Use client_id = 1 for backend modules.
    ->where('client_id = 0')
    ->order('ordering');
```

### Getting information about a single module

```php
$db = JFactory::getDbo();
$query = $db->getQuery(true);
$query->select('*')
    ->from('#__extensions')
    ->where('type = '.$db->quote('module'))
    ->where('element = '.$db->quote('mod_menu'))
// Use client_id = 1 for backend modules.
    ->where('client_id = 0');
    ->order('ordering');
```

## Getting information about plugins

### Listing all Joomla 1.6 plugins in a group

```php
$db = JFactory::getDbo();
$query = $db->getQuery(true);
$query->select('*')
    ->from('#__extensions')
    ->where('type = '.$db->quote('plugin'))
    ->where('folder = '.$db->quote('system'))
    ->order('ordering');
```

### Getting information about a single plugin

```php
$db = JFactory::getDbo();
$query = $db->getQuery(true);
$query->select('*')
    ->from('#__extensions')
    ->where('type = '.$db->quote('plugin'))
    ->where('folder = '.$db->quote('system'))
    ->where('element = '.$db->quote('redirect'))
    ->order('ordering');
```

## Getting information about templates

### Listing all Joomla 1.6 frontend templates

```php
$db = JFactory::getDbo();
$query = $db->getQuery(true);
$query->select('*')
    ->from('#__extensions')
    ->where('type = '.$db->quote('template'))
// Use client_id = 1 for backend templates.
    ->where('client_id = 0')
    ->order('ordering');
```

### Getting information about a single template

```php
$db = JFactory::getDbo();
$query = $db->getQuery(true);
$query->select('*')
    ->from('#__extensions')
    ->where('type = '.$db->quote('template'))
    ->where('element = '.$db->quote('com_content'))
// Use client_id = 1 for backend templates.
    ->where('client_id = 0')
    ->order('ordering');
```

## Changes in Joomla 1.6 database structure for users and groups

In order for Joomla 1.6 do deliver new access controls, the number one feature requested by the Joomla community for this version, a number of changes to the database schema had to take place.  From Mambo 4.5.0 right through to Joomla 1.5, an architecture based on phpGACL has been used to support the access control system.  This is a great "generic" toolkit for supporting granular access controls, but when developers began looking at it deeply, it was felt that it was going to attract too much overhead to support.  A number of proposals where examined in detail and the project settled on refactoring and simplifying the user groups and access level structure.

Joomla 1.6 separates the notion of "doing" permissions from "viewing" permissions.  This is because the most efficient way to handle one is the least efficient way to handle the other.  So the tables that manage the new access control system are `jos_assets`, `jos_users`, `jos_usergroups`, `jos_usergroup_map`, `jos_viewlevels` (staying with phpGACL would have resulted in about 12 tables being used).

The following example look at the effect on queries just for user group manipulation.  One important change in the jos\_user table is that the "gid" field has been dropped.  This is because users can now be in more than one group.

### Getting the user groups for a user in Joomla 1.5

```php
$db = JFactory::getDbo();
$db->setQuery(
    'SELECT g.value AS group_name'.
    ' FROM #__core_acl_groups AS g'.
    ' LEFT JOIN jos_core_acl_groups_aro_map AS grpMap ON grpMap.group_id = g.id'.
    ' LEFT JOIN jos_core_acl_aro AS aro ON aro.id = grpMap.aro_id'.
    ' WHERE aro.value = '.(int) $userId
);
```

### Getting the user groups for a user in Joomla 1.6

```php
$db = JFactory::getDbo();
$query = $db->getQuery(true);
$query->select('g.title AS group_name')
    ->from('#__usergroups AS g')
    ->leftJoin('jos_user_usergroup_map AS map ON map.group_id = g.id')
    ->where('map.user_id = '.(int) $userId)
$db->setQuery($query);
```

[0]: http://www.theartofjoomla.com/converting-old-extensions.html
