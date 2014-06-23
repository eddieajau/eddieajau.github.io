---
layout:      post
title:       Joomla Caching Explained
description: How to speed up your Joomla 1.5 Web site with module caching, view caching and page caching.
date:        2009-09-23 12:07:09
category:    joomla
image:
  thumb:     vendor/joomla.png
---
Translations: [French][0] [Spanish][1]

Any dynamic content management system makes the web server work and Joomla is no exception. However, most Web sites have content that does not change frequently where caching techniques can be employed to reduce reinventing the wheel (or the content as it may be) each time a page is visited. This article looks at the three levels of caching available to a Joomla 1.5 web site.

The idea behind caching is that once you've gone to the trouble of running a component, a module, or even building a whole page, it makes sense to take a copy and reuse that if possible. By default, Joomla does not cache any content. This means that every time someone visits your page, all the computations that it took to build the page are done over and over again even it there is actually no change in what the visitor sees. To overcome this, Joomla provides three levels of caching:

1. Page caching
2. View caching
3. Module caching

## Page Caching

Page caching is where Joomla takes a copy of the whole page when it is first displayed. If that page is then visited again, it takes that copy it saved and just displays the output, bypassing much of the code and many of the database queries that were required to build it.

Page caching is supported by the System Cache Plugin that comes with Joomla. To enable this, log into the Joomla Administator and choose _Extensions -\> Plugin Manager_ from the menu. Change the type filter to "system" so that the plugin is easier to find (or just search for "cache" in the filter box).

[![Screenshot](/images/2009/joomla_caching_plugin_manager.jpg)][2]

Click the icon in the enabled column to activate the plugin.

If you edit the System Cache plugin you will see that it has two options:

[![Screenshot](/images/2009/joomla_caching_system_cache.jpg)][3]

### Use browser caching

The help text for this is a bit cryptic:

>
> "If yes, use mechanism for storing page cache in the browser"
>

What this actually means is if you enable this option, Joomla will send a "304 Not Modiifed" header to the browser if the page has previously been cached. This will tell your browser that the page has not changed since you last saw it and saves another request to the server to actually get the contents of the page (assuming the browser stored a local copy). This is really only needed if visitors would return to pages while browsing your site. In this case, when they go back to a page they have previously visited, it can make the site feel a little more responsive. If your site visitors generally do not visit any page more than once during their browsing session, this option is of no real advantage.

### Cache Lifetime

This is the time, in minutes, to store a copy of the page before a full refresh is done. The choice of time depends on how frequently content is updated. If you have news coming out every few minutes, then you will want to keep this setting low, even as low as one minute. If you only update your content once a day, then several hours may be appropriate. When adjusting the cache time, you need to consider dynamic modules and the content they display. While you may only update your content once a day, or even once a week, you you have a comments system linked to a "Latest Comments" module, and those comments are made, on average, once every 10 minutes, then you may need to set your cache time as low as 3 to 5 minutes so those changes are reflected in a timely fashion.

### Page Caching Performance Testing

The following results are from testing a Joomla 1.5.14 site on a local development laptop (Macbook Pro 2.1.6 GHz Core Duo with 2 Gb of ram, PHP 5.2.6, MySQL 5.0.41).  The results where complied by turning on the System Debug plugin (and a little hacking to make the results show under cache due to a bug in the plugin).

**SEF Off, System Cache Plugin Off**

    Application afterLoad:       0.000 seconds, 0.24 MB
    Application afterInitialise: 0.072 seconds, 3.72 MB
    Application afterRoute:      0.114 seconds, 5.46 MB
    Application afterDispatch:   0.165 seconds, 6.86 MB
    Application afterRender:     0.667 seconds, 7.98 MB

**SEF Off, System Cache Plugin On**

    Application afterLoad:       0.000 seconds, 0.24 MB
    Application afterInitialise: 0.077 seconds, 3.79 MB
    Application afterCache:      0.080 seconds, 3.97 MB

The improvement is significant where caching delivers the same content about eight (8) times faster and uses half the memory.  This effectively constitutes a no-load test (in other words, ideal conditions) so it demonstrates the best possible performance you can get from turning caching on.  You will generally not see the same magnitude on a production server and probably even less in a shared hosting environment but the effect should still be noticeable (although, if your pages are module heavy, you might see a greater increase).

### Things to Watch When Using Page Caching

There are a number of things that you should watch when using the page caching plugin.  These include:

* It does not apply to the Administrator.
* It only applies to guest visitors (not logged in).
* It does not apply to posted forms (which is a good thing).
* It replaces security token with the correct value if required (another good thing).
* It adds a profiling mark called afterCache (but due to a bug, you will never see it).
* It stores a copy of the whole page after it is rendered based on the URL, so it will work for any unique URL regardless of the component.
* Articles hits will not increase when page caching is turned on (making any sorting options on hits ineffective).
* Javascript based dynamic content, such as Google Analytics or Google Adsense, still work.
* Page caching does not work if _Debug Site_ in _Global Configuration_ is set to _Yes_.

The cached pages are stored in the `/cache/page/` folder.  If your have a very large site on shared hosting you may need to watch your disk quota.

### Clearing the Page Cache

Sometimes you need to clear the page cache so that you can see recent changes you have made to the site.  To clear the page cache, select Tools -\> Clean Cache from the Administator menu.  Check the box next to the _Cache Group_ called "page" and then click _Delete_ in the toolbar.

## View and Module Caching

View and module caching is different to page caching because it only stores copies of parts of the page.  Joomla still analyses and renders the template but you receive a performance boost because parts of the page can be retrieved very quickly.

View and Module caching is controlled by the Cache Setting section under the System tab in Global Configuration.

[![Screenshot](/images/2009/joomla_caching_global_configuration.jpg)][4]

This allows you to enable caching and set the cache time (in minutes) and the handler (usually just file unless you have some fancy software installed on your server).

### View Caching

View caching is only supported in components that enable it within their MVC architecture.  The only component that enables it in the Joomla 1.5 stack is the Articles component but only for guests (visitors that are not logged in) and only if you are not looking at a Category Blog page (the reason why this view is singled out escapes me).  Several [JXtended extensions][5] also support view caching.

View caching captures a copy of the output of the component before it is handed off to the template for rendering.  This can be useful if the amount of work to generate a page is processor intensive (that is, it makes the web server work hard).

Like page caching, the view caching is linked to the URL.

### Module Caching

All modules (should) have a Caching option, usually in the Advanced Parameters pane and (should) have a Cache Time option which is the time, in minutes, to keep the copy of the module output.  The Caching option allows you to either Use Global, in which case use the setting in Global Configuration, or No Caching.  This means that you have three combinations to work with on your site:

1. Global configuration _Caching_ is _Off_, so no modules cache their output.
2. Global configuration _Caching_ is _On_, so all modules using _Use Global_ will be cached.
3. Global configuration _Caching_ is _On_ but modules can individually opt out of caching by selecting _No Caching_.

It is important to note that this caching setting is different from the caching that the System Cache plugin does.  Actually, they are completely unrelated except that the Cache Plugin takes precedence.  In other words, when the System Cache plugin is page caching, a copy of the whole page, including the modules, is stored.  When the page is pulled out of cache, there is no processing to check whether any modules were set the No Caching.

There are several modules where you should choose the _No Caching_ option.

The menu module generally should not be cached unless it is set not to expand (in other words, it stays open all the time).  Depending on how they are set up, split menu modules should not be cached.  If you do cache an expanding or split menu, it is going to get stuck and confuse your visitor.

Rotating content modules, such as the banners module, should not be cached.  If they are cached, then they will stay on the same content until the cache expires.  One exception is advertising modules that use javascript to display the content (such as Google Adsense).  This is not affected by caching.

The Polls module should not be cached otherwise you risk getting an "Invalid Token" message when someone votes.

Highly dynamic content modules should either use No Caching or set a very low value for the Cache Time (one or several minutes).

Module caching will work regardless of whether the visitor is a guest or logged in.

### Notes for Module Developers

Module developers need to be aware that module caching is handled by the module renderer in the `JDocumentRendererModule` class.  If the cache parameter is not provided, the module will never be cached regardless of the setting in Global Configuration.  To allow a module to be cached, you must include the following parameter in the module's XML file:

```xml
    <param
        name="cache"
        type="list"
        default="1"
        label="Caching"
        description="Select whether to cache the content of this module">
        <option value="1">Use global</option>
        <option value="0">No caching</option>
    </param>
```

[0]: http://alphadesign.fr/joomla/tutoriel-joomla-1.5-le-cache-de-joomla-explique.php
[1]: http://www.gnumla.com/articulos/tutorial-uso-de-la-cache-en-joomla-15.html
[2]: /images/2009/joomla_caching_plugin_manager.jpg
[3]: /images/2009/joomla_caching_system_cache.jpg
[4]: http:///images/2009/joomla_caching_global_configuration.jpg
[5]: http://jxtended.com/extensions.html
