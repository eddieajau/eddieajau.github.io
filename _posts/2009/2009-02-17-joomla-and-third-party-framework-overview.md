---
layout:      post
title:       Joomla and third-party framework overview
description: The key to successfully developing in Joomla 1.5 (and it's significant advantages over 1.0) is the Joomla Framework.
date:        2009-02-17 11:16:51
category:    joomla-development
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

The key to successfully developing in Joomla 1.5 (and it's significant advantages over 1.0) is the Joomla Framework. While other frameworks such as Zend, phpCake and others attempt to be general frameworks on which you can build an application, the Joomla Framework is specifically targeted at being suitable to build a web-based Content Management System (although it is certainly possible to build other types of applications).


The framework is found in the /libraries/` folder. Each folder under `/libraries/` represents a group of packages by an author. The top level package groups are:

### bitfolge

Used for VCard support for the Contacts component and also has an RSS class used by Joomla 1.0\.

### DOMIT

DOMIT provides support for reading and manipulating XML documents. However, even its "lite" class is fairly heavy and JSimpleXML should be used for reading XML documents. For DOM based manipulation it is advised to use PHP 5 and its built-in DOMDocument class. DOMIT is not included after version 1.5\.

### Geshi

Geshi is a code beautifying class used by the Geshi plugin. It is moved out of the Framework into the Geshi content plugin after version 1.5\.  

### Joomla

This is the Joomla provided framework (discussed later).

### OpenID

The is the API for using the Open ID authentication plugin. It is moved out of the Framework into the OpenID plugin after version 1.5\.

### patTemplate

patTemplate is an XML based templating engine. Although the Joomla installation application renders with patTemplate, it lacks the robustness needed for most components (very weak on support for nested loops). It has been dropped from the Framework after version 1.5\.

### PEAR

A small amount of the PEAR framework is included to support the Archive\_Tar class. Unfortunately it presents a license conflict with the GNU General Public License and this group is removed after version 1.5\.

### phpGACL

This is a very powerful access control class. Joomla 1.5 supports a simplified subset of the capabilities of this class but custom development can harness the full API. It forms the inspiration of the new, native access control system used after version 1.5\.

### phpInputFilter

This is not used in the core 1.5 distribution. It, however, forms the inspiration for the native JFilterInput class in the Framework.

### phpMailer

The Framework mail handling classes (JMail) are derived from phpMailer.

### phpUTF8

This package provides support for UTF8 string manipulation where the support does not exist natively in PHP.

### phpXMLRPC

This package supports the web services protocol for XML-RPC used in the XML-RPC application.

### Simplepie

This package supports the syndication features if required for extensions.

### TCPDF

This package supports the generation of PDF files in the Articles component.

## The Joomla Framework

The Joomla Framework, found in `/libraries/joomla/`, are suite of natively built or derived classes that support the applications and extensions that form the Joomla CMS.

The framework is built upon a number of umbrella classes. The JLoader class and jimport function are used to physically load the files required for the Framework. JFactory is a static factory class that is used to get key system information (the current User, the database connector, the Application, and so on). JRoute is used heavily to support SEF URLs and JText is the mainstay for outputing translated text (see methods.php). JVersion defines the currently installed version of the Joomla Framework and CMS.

The Framework is built up of the following packages:

### Application

This packages supports the building of Joomla Applications (for example, the "Frontend" and the "Backend" Administrator). It also includes support and helper classes for building components and modules including the MVC classes, routing, menu and pathway support.

### Base

This package contains several base classes used by the Framework. `JObject` forms the basis of almost all Framework classes. `JObserver` and `JObservable` are used to support the plugin architecture. `JTree` and `JNode` are used to support menu generation.

### Cache

This package provides support for different caching handlers such as file based, APC, eAccelerator, MemCache and XCache.

### Client

This package include classes to support different network protocols such as FTP and LDAP.

### Database

This package is fundamental to the supporting database connectivity for Joomla. It includes connector classes for MySQL and MySQLi database engines and all of the core database tables (via `JTable`).

### Document

This package supports the Joomla Document types. Each component renders out as a "document". Types of HTML, Raw, PDF, Feed and Error are supported.

### Environment

This package supports browser detection, request and response handling (via `JRequest` and `JResponse`) and URI processing (via `JURI`).

### Error

This package support the error handling classes `JError` and `JException`. It also contains the logging (JLog) and profiling (`JProfiler`) support.

### Event

This package supports the plugin architecture (`JDispatcher` and `JEvent`).

### Filesystem

This package supports the file handling features in the Framework via `JFile`, `JFolder` and `JPath`. It also supports archive handling via `JArchive`.

### Filter

This package support input filtering (`JFilterInput`) and output filtering (`JFilterOutput`).

### HTML

This package supports many output related features. JHTML is a mainstay of output "widgets" that are available to developers. JEditor supports the plugable WYSIWYG editors. `JPagination` supports the pagination links used in list views. `JPane` supports the tabbed and accordion style screen elements. `JToolbar` supports the Administator application toolbar.

### Installer

This package supports the extensions installation features in Joomla (not to be confused with the Joomla installation application - that's where you install Joomla as a whole).

### Language

This package supports in the localisation of Joomla text into other languages. `JLanguage` processes language files. Help sites are also supported in this package.

### Mail

This package supports the mail handling features in the Framework via `JMail` and `JMailHelper`.

### Plugin

This package supports the plugin architecture.

### Registry

This package supports the registry class. `JRegistry` is used to hold and input from and output to various formats (`XML`, `INI`, etc).

### Session

This packages supports the session handling (via `JSession`) in an application. Different storage mechanisms are supported for file based storage, database, APC, eAccelerator, MemCache and XCache.

### User

This package support user authentication (`JAuthentication`), permissions control (`JAuthorization`) and general user support (`JUser`).

### Utilities

This package holds several general support clasess. `JArrayHelper` is used to retrieve data out of arrays and convert array from and to objects. JBuffer is a general stream handling class. JDate handles basic date conversions and formatting. `JSimpleCrypt` supports simple encryption. `JSimpleXML` is used to read and traverse XML documents. JString is used to perform UTF8 safe operations on strings. `JUtility` has several general utility methods (getToken and getHash are the most commonly used).
