---
layout:      post
title:       Joomla Development 103 - Coding styles, docblocks and code comments
description: With a few exceptions, Joomla adheres to the PEAR coding standard. I'm going to walk you through most of the parts of this standard and highlight where we differ.
date:        2010-11-25 20:32:56
category:    ["joomla-development","videos"]
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

<iframe allowfullscreen="allowfullscreen" frameborder="0" height="315" src="http://www.youtube.com/embed/GFk3vvfHhWY" width="560"></iframe>

#### Introduction

Ah good, you have the makings of an excellent apprentice developer and you make me very happy by doing this lesson. Coding formatting is the dish-washing of the programming world. Everyone hates it but doing it right and doing it consistently is very important

With a few exceptions, Joomla adheres to the PEAR coding standard. I'm going to walk you through most of the parts of this standard and highlight where we differ.

#### Indenting

Under indenting is our most controversial deviation. In Joomla we always indent with true tabs, not spaces. We have no strict rules about line length but around 120 characters seems to be a reasonable goal.

#### Control structures

For control structures we adhere to the guidelines but in a switch statement we indent the case statements under the switch which PEAR optionally allows. The main thing to watch is that there is no space between, for example, the if and the opening bracket.

#### Class definitions

Class definitions are as per the standards. Make sure that opening brace goes on a new line.

#### Function calls

For function calls we also adhere to the guidelines. The thing to watch here is that there is no space between the function name and the opening bracket.

Function calls are the same as classes, make sure the opening brace is on a new line.

#### Arrays

I really like arrays split up onto their own lines, I think it makes it more readable.

#### Commenting

For commenting, I personally use the C block comments only for the docblocks, and if I'm making notations in the code, I tend to use the single-line double-slash even if it's a multiline comment. That's just personal preference but whatever the case, we don't use the Perl style comments.

#### PHP code tags

Always use full PHP code tags. Don't use the shorthand version because not all servers support them. I should also note here that for all files except layouts, we don't include a closing PHP tag at the end of the file. The reason is sometimes the files are included before the session is started, and if there is any accidental whitespace at the end of a file, it can cause problems.

#### DocBlocks

DocBlocks are very important. You need to have a Docblock at the top of every file, you need one as a header for every class, every property and method in a class, and every function call. Always define your function and class method arguments as you write your function. Don't leave it for later because later never arrives, and by that time, you've forgotten what they were supposed to do. As we progress into the coding lessons, you'll we'll look at the Docblocks in detail.

#### Naming conventions

Name conventions are a bit hit and miss in the core of Joomla, but when writing new code for your extensions, let's get into the habit of following the standard where we can. The biggest change compared to earlier versions of Joomla is that the underscore is used only for private class properties and methods. Class naming, however, is generally done without underscores.

#### File format

File formats must use the UTF-8 encoding and have unix line endings. Yes, this makes it look funny in Wordpad, but I'll argue to the death that the problem is the people that use Wordpad, not the line endings. Here again I'll point out we don't close the PHP tags at the end of the file to eliminate the risk of stray white-space creeping into the output at the wrong time.

#### E\_STRICT

Try to be as PHP E\_STRICT as possible (which is not to be confused with MySQL strict more, nor the HTML standard).

#### Best practice

PEAR is a bit light on with best practices but the ones that are there I agree with. Use new lines to help make your code more readable. And, although my high-school teacher taught me otherwise, we do try to return early to save on excessive indenting. It does look a lot neater.

#### Conclusion

Ok, so that's code formatting. Thank's for hanging in there. I know it's a dry topic but once you develop good habits in this area, you will start looking at other people's code differently or even your own you wrote last week. Enough of the theory - in the next lesson we are going to look at how best to set up Joomla for debugging and development. Don't miss it. See you back soon.
