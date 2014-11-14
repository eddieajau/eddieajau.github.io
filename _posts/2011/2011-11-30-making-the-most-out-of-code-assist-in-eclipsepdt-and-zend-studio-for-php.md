---
layout:      post
title:       Making the most out of code assist in Eclipse/PDT and Zend Studio for PHP
description: This article shows you how to use docblocks and comments to get the most out of code-assist in Eclipse with PDT or Zend Studio.
date:        2011-11-30 10:46:00
category:    PHP
image:
  thumb:     vendor/joomla.png
  feature:    abstract-1.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
One of the powerful features of an IDE like Eclipse is the ability for it to "read" your code and give you some assistance about your API as you type. This could include things like class property or methods names, constants, functions, argument lists, and so on. Eclipse/PDT and ZendStudio do this by parsing a PHP class directly, but they also look at your docblocks and some other special comments where the raw PHP is not enough. This article is a bag of tricks that help you get the most out of code assistance using Eclipse/PDT or Zend Studio in those awkward corners of your code that you might have through previously inaccessible.

## Class properties

PHP doesn't offer strong typing of class properties, but you can use the docblock to specify the type of variable using an `@var` label, followed by the variable type, in a docblock above the declaration of the property.

```php
class WhenIsIt
{
	/**
	 * @var DateTime
	 */
	protected $date;

	public function guess()
	{
		$date-> ... code assist should appear
	}
}
```

As you start typing `$this->`, Eclipse will suggest "date" and any other properties or methods available to the class. This is a common feature in and PHP-aware IDE's. However, a docblock has been provided that uses the `@var` label to specify type of variable that the property is. As a result, typing `$this->date->` will show code assistance for the API of the DateTime class.

Note that the class and method docblocks have not been shown for clarity but all good developers would be putting them in religiously.

## Class methods

Class methods can provide strong typing in the argument list using type hinting for objects and array, but this is not helpful when mixed input is allowed and, more importantly, there is no way to specify the return type of the method within the language. Docblocks come to the rescue again allowing you to specify the variable type of method arguments using the `@param` label, followed by the variable type, name and a description, and the return type using the `@return` label, followed by the variable type and a description. Consider the following method outline:

```php
/**
 * @param DateTime $date   The date and time for the note.
 * @param string   $modify The modification string.
 *
 * @return DateTime
 */
public function modifyDate($date, $modify)
{
	if ($date instanceof DateTime)
	{
		$newDate = clone $date;
	}
	else
	{
		$newDate = new DateTime((string) $date);
	}

	$newDate->modify($modify);

	return $newDate;
}
```

This is a method that takes a date, modifies it and returns the result as a new DateTime object. You might be thinking we could have given $date a type hint in the function definition like this:

```php
public function modifyDate(DateTime $date, $modify)
```

However, we want to be able to take a string representation of the date. To make sure Eclipse knows that `$date` is a DateTime object, we use the `@param` label followed by the variable type, followed by the variable name of the argument, followed by a description of the argument.

## Magic properties and methods

Eclipse provides support for code assistance with magic properties by allowing you to declare them with the @property label in the class docblock. Similarly, magic methods can be declared using the @method label.

```php
/**
 * @property integer roll A magic property that returns last die roll.
 * @method   boolean r    A magic alias for the roll method.
 */
class Fortune
{
	// Code goes here...
}
```

## Arbitrary variables

The previous cases cover what happens when you are using the API either within the scope of a class, but what happens if you are including a secondary file in your class (for example, template file that is called from a HTML renderer class). Ordinarily, that file will not know that it is being called within the scope of one class or another. You get no assistance from the IDE after typing "`$this->`".

Another case is where you are traversing an array. Generally there is no hint about what type of variable the array element is.

To overcome this, Eclipse allows you to declare abritrary variables with the @var label which code-assist is aware of. Consider the following example.

```php
<?php
/**
 * HTML template
 */

/* @var $this HtmlView */
/* @var $date DateTime */

foreach ($this->dates as $date)
{
	// Do stuff ...
}
```

Eclipse will recognise that `$this` has been declared as an HtmlView class, so when you type "`$this->`" it will give you a list of the API available to you. Similarly, if you use `$date` in the loop, you will will get context assistance for all the API available in the DateTime class.

Using all these techniques can improve your productivity as well as generally improving the readability and accuracy of your code.
