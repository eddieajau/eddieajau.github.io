---
layout:      post
title:       Filtering Joomla request input
description: The importance of filtering and sanitising input in a web based application cannot be overstated.  The Joomla Framework provides a class called JRequest to fulfill this very important role.
date:        2009-02-17 11:29:22
category:    joomla-development
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
The importance of filtering and sanitising input in a web based application cannot be overstated.  The Joomla Framework provides a class called JRequest to fulfill this very important role.

JRequest is one of the most important classes you need to learn about.  It provides a number of core level methods used from the framework itself, and a number of methods that extensions will use on a daily basis.  JRequest is found in the joomla.environement package.  You would load JRequest via the following function:

    jimport('joomla.environment.request');

However, when developing extensions, the application will have already loaded this class for you.

A `JRequest` object should never be created.  It's methods should be called static (that is, using the :: operator, not -\>).  

The methods supported by JRequest are now explained in detail.

## Most commonly used methods

### `JRequest::getVar($name [, $default, $method, $type, $mask])`

The getVar method is the real workhorse of this class.  It takes the following arguments:

* `$name` - This is the name of the request variable that you are trying to retrieve (for example, 'view')
* `$default` (optional) - If no value for the variable is found, you can supply a default value to use
* `$method` (optional) - You can specify the HTTP method to look in.  The valid values are GET, POST, FILES, COOKIE,  and METHOD (the one that was actually used).
* `$type` (optional) - You can specify the type of variable that is returned.  The valid values are the same as for JFilterInput::clean, INT, FLOAT, BOOLEAN, WORD, ALNUM, CMD, BASE64, STRING, ARRAY, PATH, and NONE.
* `$mask` (optional) - You can specify a bit mask to apply additional filtering rules.  The valid masks are JREQUEST\_NOTRIM, JREQUEST\_ALLOWRAW and JREQUEST\_ALLOWHTML.  By default, JRequest::getVar trims the returned value.  If you do not want to to trim then apply the JREQUEST\_NOTRIM mask.  This method also automatically "cleans" the return value of HTML, Javascript, unusual control characters, etc.  To get the raw value you need to apply the JREQUEST\_ALLOWRAW mask.  To get a "safe" html value then use the JREQUEST\_ALLOWHTML mask.

Examples

Get the value of the "view" variable (from any type of request, GET, POST, etc)
    
    $view = JRequest::getVar('view');

Get the value of the "view" variable but give it a default if it wasn't specified in the request:
    
    $view = JRequest::getVar('view', 'dashboard');

Get the value of "id" by only if it is specified in a POST request.
    
    $id = JRequest::getVar('id', 0, 'post');

Get the value of "id", only from actual request method (because we don't care which one it was) and cast it to an integer.
    
    $id = JRequest::getVar('id', 0, 'post', 'method', 'int');

### `JRequest::getInt($name, [$default, $method])`

This method is a proxy for getVar using the "int" type to return an integer value.
    
    $userId = JRequest::getVar('user_id', 0);

### `JRequest::getFloat($name, [$default, $method])`

This method is a proxy for getVar using the "float" type to return a floating point value.
    
    $price = JRequest::getFloat('price', '5.95');

### `JRequest::getBool($name, [$default, $method])`

This method is a proxy for getVar using the "bool" type to return a boolean value.
    
    $hideBorders = JRequest::getBool('hide_borders', false);

### `JRequest::getWord($name, [$default, $method])`

This method is a proxy for getVar using the "word" type to return a string with only A-Z or underscores.  It is used for getting very clean strings, such as the name of a file folder or a system command.
    
    $folder = JRequest::getWord('folder');

### `JRequest::getCmd($name, [$default, $method])`

This method is a proxy for getVar using the "cmd" type to return a string with only A-Z, 0 -9, dash, period or underscores.
    
    $task = JRequest::getCmd('task', 'notes.save');

#### `JRequest::getString($name, [$default, $method])`

This method is a proxy for getVar using the "string" type to return a filtered string.  A request could pass a variable as an array so this method would enforce that you get a string.
    
    $fullName = JRequest::getString('full_name');

### `JRequest::checkToken()`

This is an important method to use to to ensure that incoming requests are coming from your site and not an remote attack from anther server.  A web form can insert "token" as a variable via a helper method:
    
    <?php echo JHtml::_('form.token');?>
    </form>

When the form posts to a component, you should do the following check:
    
    function save()
    {
        JRequest::checkToken() or die(JText::_('JInvalid_Token');
        // more code...

## Less Commonly Used Methods

### `JRequest::get([$method, $mask])`

This method returns a filtered version of the the entire array for the method.

### `JRequest::clean()`

This method is generally used by the application itself.  You don't have to worry about it unless you are writing new Joomla application.  The method effectively emulates the PHP setting register\_globals = off

### `JRequest::getUri()`

This method returns the full request path and the query string, eg:

`/joomla/1.5.9/administrator/index.php?option=com_test `

You probably wouldn't use this method directly.  You'd be more inclined to work with the JUri class directly (as that it all this method is doing anyway).

### `JRequest::getMethod()`

This method returns the HTTP method (uppercased) used for the request.  Values you will typically see are:

* GET - The request comes directly from a URL (foe example, typing in a link in your browser).
* POST - The request probably comes from a form that has been submitted.

### `JRequest::set($array [, $method, $overwrite])`

### `JRequest::setVar($name [, $value, $method, $overwrite])`
