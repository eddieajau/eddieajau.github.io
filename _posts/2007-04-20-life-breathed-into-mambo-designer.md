---
layout: post
title:  "Life Breathed into Mambo Designer"
description: "This rather interesting Joomla component is a bit of a veteran having come through various incarnations - MamboMDK, MamboDesigner, JamboDesigner, JoomlaDesigner, RokCodeIt - and now, just to be different, JXtended Engineer."
date:   2007-04-20 00:00:00
category:    joomla
image:
  thumb:     vendor/joomla.png
---

This rather interesting component is a bit of a veteran having come through various incarnations - MamboMDK, MamboDesigner, JamboDesigner, JoomlaDesigner - and now, just to be different, RokCodeIt. It's a rather sentimental project because it was one of my first publically released components back in the Mambo glory days.
RokCodeIt is a Joomla! 1.0 extension for developers. I originally wrote it because I was fed up with the task of assembling all the file paths in the mambo install xml file. Once I'd done that, I thought to myself - self, wouldn't it be good to have this build the zip file automagically for me. Even if I do say so myself, it pretty quick and slick at creating a package file for distribution.
The other thing is does really well is exporting a database table to a derived mosDBTable class.
If you look under the hood you will see my signature 1.5 forward-compatibility framework (most people think this is the craziest thing they have ever heard - but hey, it works) bolstering most of the source. I haven't had time to refactor all of the source "the right way" - but the export view is a good example of how things should be done in Joomla! version 1.5.
Several things are pluggable. You can add more export formats by just following the examples provided. You can also add more security scanning routines.
As always, because it can mess with some of the important core tables, be careful. This component should not be installed just to see what it does. If you are not a developer, please steer clear of it because it could stuff up your site badly if used the wrong way.
There is a true 1.5 version in the melting pot and hopefully it will include sopme extra productivity tools like being able to create boiler-plate components.
RokCodeIt can be downloaded from the [project site on joomlacode](http://joomlacode.org/gf/project/rocketwerx/frs/).
