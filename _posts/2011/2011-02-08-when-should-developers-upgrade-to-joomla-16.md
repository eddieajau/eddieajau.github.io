---
layout:      post
title:       When should developers upgrade to Joomla 1.6?
description: The previous article, when should site owners upgrade to Joomla 1.6, looked at the things a Joomla web site owner would consider when trying to answer that question. But what about the developer?  Do they have the luxury of it depends or is the question more critical, or less urgent for them.  This article looks at some of the issues that face Joomla extension developers and how they differ greatly from that of the web site owner.
date:        2011-02-08 08:15:18
category:    joomla
image:
  thumb:     vendor/joomla.png
---
The previous article, "[when should site owners upgrade to Joomla 1.6?][0]", looked at the things a Joomla web site owner would consider when trying to answer that question. But what about the developer?  Do they have the luxury of "it depends" or is the question more critical, or less urgent for them.  This article looks at some of the issues that face the Joomla extension developer and how they differ greatly from that of the web site owner.

## Joomla 1.6 for the site developer

### Should I upgrade my Joomla 1.5 extensions for use in Joomla 1.6?

New versions of software are a two-edged sword for every developer.  While, on the one hand, they are an opportunity to take advantage of new features and API, on the other hand they can be a pain in the neck to support, particularly if you have to deal with concurrent versions of a platform.  Since the end-of-life of Joomla 1.0, the Joomla developer community has been blessed with a golden age of only having to support one version of the core software.  That age, of course, ended when Joomla 1.6 was released on 10 January 2011 and developers are now faced with the prospect of having to support two versions.  Is this the end of the world?  Is it even achievable?  Should you bury your head in the sand and resist change?  These are all valid questions.  This article tries to address some issues a developer will face from programming and other points of view.

### Can I ignore Joomla 1.6 and just keep doing my Joomla 1.5 extensions?

The answer to that question has more to do with risk management than actual programming effort.  Obviously there are some logistic considerations.  

If Joomla 1.6 has made your Joomla 1.5 extension obsolete, there is obviously no point in continuing it.  As explained in the [previous article][0], Joomla 1.5 still has a very comfortable shelf life lasting until April 2012, so you would do well to continue to support your current user base for that time.

If you simply don't have the infrastructure or resources to support multiple versions, then that can obviously be a consideration, but in that case you aren't really ignoring Joomla 1.6\.  It's better to support one thing well, than two things half-heartedly.

However, if you possess even a modestly popular extension, with a faithful user base, ignoring Joomla 1.6, or any future version for that matter, could be a fatal mistake.  Ignoring future versions, to be blunt, give competing products a foothold into your market space.  Joomla's extension industry is fiercely competitive at the best of times and mistakes can have an irrecoverable effect.  Not only are you at risk from direct competitors, you are also at risk from the Open Source community themselves.  

Imagine a scenario where you announce, on some principle, that you are not supporting Joomla 1.6 and possibly future versions.  Someone is going to be smart enough to seize on that opportunity and fork your software, declaring "XYZ is now supported by me for Joomla 1.6, come over here and join me".  Not only will you irreparably damage your ability to eventually support Joomla 1.6, but you will also punch a hole in your existing Joomla 1.5 market as well.

The final nail in the coffin is that the confidence of your user base is shattered.  Many of them will consider that even though they may not need Joomla 1.6 now, they might someday and if you aren't going to support it, they will immediately go looking for alternatives.  Loyalty will get you so far but it does have a breaking point.  Again, remember there are at least two other forces rallying for your market space as outlined above, looking for these disillusioned users.

As stated earlier, the answer to this question is all about risk management.  Maybe the question is better put as "how much can you afford to loose by ignoring Joomla 1.6".  What, then, should you do?  Communicate with your user or customer base before you make your final decisions.  If you have at least between 10 and 20 percent of your user base interested in Joomla 1.6 now or in the near future, that is a fairly compelling argument to adjust your plans to including the support for Joomla 1.6 - even if you do take a few months to achieve it.  Also keep looking behind you to see what your competitors are doing (if they are leaving any clues, which they may deliberately not).  The trigger to move quickly to support Joomla 1.6 could very well come from that direction.  Finally, don't fall into the trap of _waiting_ for Joomla 1.7 to see what happens.  That is too late to start making your run as others will have already started.

### Is the Joomla API stable and backward compatible?

The API is certainly stable in that once a point-zero (i.e. 1.6.0) is released, there are no more changes to the new API introduced (some new API would shift around during the alpha and beta periods and that is to be expected).

There is also a very high state of backward compatibility between Joomla 1.6 and 1.5 in terms of classes, function and method calls, argument ordering and so on.  There generally has to be a very good reason to break an API between minor versions and these cases are, fortunately, rare and isolated.  If you do find instances where backward compatibility has been affected, talk to the people on the Joomla Bug Squad (see links below) about whether or not it's possible to fix, or a compromise can be reached.

### What does deprecated mean?

Great question, because it's a very misunderstood concept.  When the Joomla core wants to remove a feature of the API or change something that break backward compatibility, it does not do it immediately.  What happens is the API is marked as deprecated but no change is made when the version of Joomla it is in is released.  For example, there are many API features in Joomla 1.5 that have been marked as deprecated in Joomla 1.6, but Joomla 1.6 still carries them.  Generally there will be a note as to what the alternative is and developers should progressively monitor and change their code to use the alternative API.  In some future release, but in our previous example not before Joomla 1.7, the deprecated API will be completely removed.

In summary, when something is deprecated, it is not removed immediately but the developer should be aware that it could be removed in the next minor version of the software.  The developer should make appropriate adjustments to code sooner rather than later.

A special note to distribution builders: If you are stripping down whole distributions of Joomla, **do not** remove deprecated code.  This will lead to enormous compatibility issues that will cost you time, and probably money, as most site builders won't understand why custom extensions suddenly stop working and they'll blame you.  Unless you have a very specific or niche vertical market, where you know it won't come back to bite you, only remove deprecated code in the version that the Joomla core does.  If you must remove it, ensure the people who download your distribution are very aware of the fact and what it means for them.

### Can my Joomla 1.5 "just work" in Joomla 1.6?

No, well, probably not - not until it's installed anyway and there is the first hurdle.  There are a few minor things you need to change and these are outlined well in the document "[What's new in Joomla 1.6][1]" under the developer section.  This section is comprehensive but the main points are:

* Adjust your install file to use the root `<extension>` tag and change `<params>` and `<param>` tags to use the JForm `<config>`, `<fieldset>`, `<fields>` and `<field>` tags.
* Update your component `config.xml` file or any layout XML meta files to use the JForm tags the same as above.
* Update your language files to comply with the INI file specification, that is, no spaces or punctuation in language keys, values must be double quotes strings.  On the bright side, you can include your `/language/` folder with your extension now.
* Add the rules field in the component parameters and access.xml file so that your component can at least take advantage of the first two levels of the new access control system.
* Change plugins to use their own folder like you do for all other components.
* Rename plugin events that have changed name (and be aware of the new argument lists).
* Be aware of core language key changed (for example, use "JYES" instead of "YES").
* Templates need to be aware of the massive changes to the core HTML layout and styling.

These changes are by no means onerous but, understandably, could be labourious depending on complexity of your extension.  Also be aware that under PHP 5, protected and private variables will be honoured.  If you are using PHP 4 tricks to access these in a public context, your code will result in an error.

### Is there any advantage to upgrading?

Yes, because there are rich new API's to take advantage of.  The MVC patterns have been expanded so the you don't have to write as much code (DRY - Don't Repeat Yourself) and make handling lists and forms much easier.  There is a super class that handles the nested categories, new SQL query building API, form processing (JParameter on steroids) and much, much more.  Also, the "tweaks" required to mesh with the new access control system are very small.

### Can I support dual-version extensions?

It is possible and other developers in the Joomla community are doing it.  However, there are just as many challenges to supporting dual version extensions as there are supporting version specific extensions.  When considering dual-version extensions you have to factor in the amount of effort that is required for switching between different API's if you want to take advantage of the full Joomla 1.6 API when installing on that version.  The more complex the extension, the more problematic this becomes. This author recommends producing version specific extensions for all but the most simple of cases (for example, plugins and modules, but not components and templates). 

### Where do I get support for building in Joomla 1.6?

You've made the decision to support Joomla 1.6 extensions?  That's great.  What next?  Where do I get information or help?

### Something's broken in Joomla 1.6, what do I do?

If you think something's broken in Joomla 1.6 the project would love to here about it.  The team tasked with maintaining the source code is called the [Joomla Bug Squad][2] and their point of truth regarding what needs to be fixed is the [Joomla 1.6 Issue Tracker][3].  You can either raise an issue right away in the issue tracker, or join the mailing list and discuss it first if you aren't quite sure about it.

Remember when posting your issue that volunteers are giving their own time to process issues from everyone in the community and patience is recommended.  Some issues will be dealt with very quickly while others, for no rhyme or reason, will sit unattended for long periods of time.

### Where can I talk with other developers about Joomla 1.6?

To talk to other developers about, more or less, any issue in general, use the [Joomla! General Development][4] mailing list on Google Groups.  This is a group where you can talk about anything related to your custom extensions you are building either for community release or one-off projects.

### Where can I talk to people about adding new features beyond Joomla 1.6?

In the past, this has been one of the weakest attributes of the Joomla project - getting good, consistent involvement from the developer community in the actual core release cycle.  Most of the problem has been due to the excessively long release cycle that we have experienced with Joomla 1.5 and 1.6 - in all honesty, people just loose interest over those time frames.  With Joomla 1.7 and beyond comes a new opportunity to see contributions accepted and delivered in a new release in a timely fashion.  This, it is hoped, keeps good developers interested in the process for longer.

So, the place to discuss features for the next version of Joomla is the [Joomla! CMS Development][5] mailing list on Google Groups. 

In concert with that, if you are interested in the core platform that powers the Joomla CMS, then you might also be interested in the [Joomla! Framework Development][6] mailing list on Google Groups.

Finally there is also an [ideas pool][7] which is explained in an article about "[Where next for Joomla][8]".

### Is there a roadmap for Joomla 1.6 that I can align with?

No, there isn't a roadmap per se.  Joomla isn't a software company that has paid employees and project managers that can deliver product/project A in specified time B.  The project works with public contributors, a variable resource which ebbs and flows over time.  Not only that, but each of those contributors has their own idea about what they'd like to do or even see in any given release.  To that end, roadmaps are not overly practical.

Instead, the project has a _vision_ for what they'd like to see in the next release.  The vision for Joomla 1.7 is summed up with the title "[Rediscover Content][9]" and a rather cool picture of the author bird watching (the feathered variety).  Contributors may choose to align with this vision, or they may choose to do something completely different.

### Where do I get critical information about development that might affect me?

There are a few places but here are the major sources of information you should connect with are:

1. the main news feed on [www.joomla.org][10],
2. the Leadership Blog feed on [community.joomla.org][11], and
3. the Joomla Developer Network site at [developer.joomla.org][12].

Those sites will alert you to information that will affect you as an extension developer.  

### Where can I learn more about Joomla 1.6?

Joomla's documentation wiki has a plethora of user contributed articles that may be of use to you.  The [Joomla 1.6 category][13] is a great place to start.  This site also has many [articles and videos][14] explaining the features of Joomla 1.6

Reasonably priced commercial, online developer training is available at [learn.theartofjoomla.com][15].

If you would like to discuss anything raised in this article further, please join us at [http://people.joomla.org/groups/viewgroup/742-The+Art+of+Joomla.html][16].

[0]: http://www.theartofjoomla.com/home/5-commentary/133-when-should-site-owners-upgrade-to-joomla-16.html
[1]: http://docs.joomla.org/What%27s_new_in_Joomla_1.6#Developers
[2]: http://groups.google.com/group/joomlabugsquad/ "Click to go to the Joomla bug squad mailing list"
[3]: http://joomlacode.org/gf/project/joomla/tracker/?action=TrackerItemBrowse&tracker_id=8103 "Click to browse the issues raised for Joomla"
[4]: http://groups.google.com/group/joomla-dev-general
[5]: http://groups.google.com/group/joomla-dev-cms
[6]: http://groups.google.com/group/joomla-dev-framework
[7]: http://ideas.joomla.org
[8]: http://community.joomla.org/blogs/leadership/1330-where-next-for-joomla-development.html
[9]: http://www.joomla.org/announcements/general-news/5321-rediscover-content-the-vision-for-next-years-release.html
[10]: http://www.joomla.org
[11]: http://community.joomla.org/blogs/leadership.html
[12]: http://developer.joomla.org
[13]: http://docs.joomla.org/Category:Joomla%21_1.6
[14]: http://www.theartofjoomla.com/topics/joomla-16.html
[15]: http://learn.theartofjoomla.com
[16]: http://people.joomla.org/groups/viewgroup/742-The+Art+of+Joomla.html
