---
layout:      post
title:       Converting Old Extensions to Joomla 1.5 and 1.6
description: This article is an extensive cheat sheet to assist in converting Joomla 1.0 extensions to natively use the Joomla 1.5 API and notes about converting Joomla 1.5 extensions to be compatible with Joomla 1.6.
date:        2009-03-20 11:01:32
category:    joomla
image:
  thumb:     vendor/joomla.png
---
<p>
	Jump to converting <a href="#j15_16">1.5 to 1.6</a>, <a href="#j10_15">1.0 to 1.5</a></p>
<h2 id="j15_16">
	Joomla 1.5 to 1.6</h2>
<p>
	Joomla 1.6 was released on 10 January 2011. There are several changes that are required to allow extension to install on Joomla 1.6, and also other changes required for them to take advantage of new requirements and features.</p>
<p>
	Key points for 1.6 to remember are the minimum server requirements being <strong>PHP 5.2.4+</strong> and <strong>MySQL 5.0.4+</strong>. &nbsp;Also see <a href="http://docs.joomla.org/What%27s_new_in_Joomla_1.6#Developers" target="_blank">What&#39;s new in Joomla 1.6 for developers</a>.</p>
<table class="legacy">
	<caption>
		Changes to database tables in Joomla 1.6</caption>
	<thead>
		<tr>
			<th scope="col">
				Name in Joomla 1.5</th>
			<th scope="col">
				Name in Joomla 1.6</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th colspan="2">
				Changes to the table names</th>
		</tr>
		<tr>
			<td>
				jos_banner</td>
			<td>
				jos_banners</td>
		</tr>
		<tr>
			<td>
				jos_bannerclient</td>
			<td>
				jos_banner_clients</td>
		</tr>
		<tr>
			<td>
				jos_bannertrack</td>
			<td>
				jos_banner_tracks</td>
		</tr>
		<tr>
			<td>
				jos_components</td>
			<td>
				Removed and merged into jos_extensions</td>
		</tr>
		<tr>
			<td>
				jos_core_acl_aro</td>
			<td>
				No equivalent</td>
		</tr>
		<tr>
			<td>
				jos_core_acl_aro_groups</td>
			<td>
				jos_usergroups</td>
		</tr>
		<tr>
			<td>
				jos_core_aro_map</td>
			<td>
				No equivalent</td>
		</tr>
		<tr>
			<td>
				jos_core_acl_aro_sections</td>
			<td>
				No equivalent</td>
		</tr>
		<tr>
			<td>
				jos_core_acl_groups_aro_map</td>
			<td>
				jos_user_usergroup_map</td>
		</tr>
		<tr>
			<td>
				jos_core_log_items</td>
			<td>
				No equivalent</td>
		</tr>
		<tr>
			<td>
				jos_groups</td>
			<td>
				jos_viewlevels</td>
		</tr>
		<tr>
			<td>
				jos_plugins</td>
			<td>
				Removed and merged into jos_extensions</td>
		</tr>
		<tr>
			<td>
				jos_poll*</td>
			<td>
				Extension removed</td>
		</tr>
		<tr>
			<td>
				jos_sections</td>
			<td>
				Removed and merged into jos_categories</td>
		</tr>
		<tr>
			<td>
				jos_stats_agents</td>
			<td>
				No equivalent</td>
		</tr>
		<tr>
			<td>
				jos_templates_menu</td>
			<td>
				Removed and merged into jos_menu</td>
		</tr>
		<tr>
			<th colspan="2">
				Changes to table field names</th>
		</tr>
		<tr>
			<td>
				jos_bannerclient.cid</td>
			<td>
				jos_banner_clients.id</td>
		</tr>
		<tr>
			<td>
				jos_banner.bid</td>
			<td>
				jos_banners.id</td>
		</tr>
		<tr>
			<td>
				jos_banner.showBanner</td>
			<td>
				jos_banners.state</td>
		</tr>
		<tr>
			<td>
				jos_categories.name</td>
			<td>
				Removed</td>
		</tr>
		<tr>
			<td>
				jos_categories.ordering</td>
			<td>
				jos_categories.lft</td>
		</tr>
		<tr>
			<td>
				jos_categories.section</td>
			<td>
				jos_categories.extension</td>
		</tr>
		<tr>
			<td>
				jos_categories.image</td>
			<td>
				Removed</td>
		</tr>
		<tr>
			<td>
				jos_categories.image_position</td>
			<td>
				Removed</td>
		</tr>
		<tr>
			<td>
				jos_categories.editor</td>
			<td>
				jos_categories.created_user_id</td>
		</tr>
		<tr>
			<td>
				jos_categories.count</td>
			<td>
				Removed</td>
		</tr>
		<tr>
			<td>
				jos_menu.name</td>
			<td>
				jos_menu.title</td>
		</tr>
		<tr>
			<td>
				jos_menu.parent</td>
			<td>
				jos_menu.parent_id</td>
		</tr>
		<tr>
			<td>
				jos_modules.numnews</td>
			<td>
				Removed</td>
		</tr>
		<tr>
			<td>
				jos_modules.iscore</td>
			<td>
				Removed</td>
		</tr>
		<tr>
			<td>
				jos_modules.control</td>
			<td>
				Removed</td>
		</tr>
		<tr>
			<td>
				jos_session.gid</td>
			<td>
				Removed</td>
		</tr>
		<tr>
			<td>
				jos_users.gid</td>
			<td>
				Removed</td>
		</tr>
		<tr>
			<td>
				jos_weblinks.published</td>
			<td>
				jos_weblinks.state</td>
		</tr>
		<tr>
			<th colspan="2">
				Other New Tables</th>
		</tr>
		<tr>
			<td>
				&nbsp;</td>
			<td>
				jos_assets</td>
		</tr>
		<tr>
			<td>
				&nbsp;</td>
			<td>
				jos_extensions</td>
		</tr>
		<tr>
			<td>
				&nbsp;</td>
			<td>
				jos_languages</td>
		</tr>
		<tr>
			<td>
				&nbsp;</td>
			<td>
				jos_redirect_links</td>
		</tr>
		<tr>
			<td>
				&nbsp;</td>
			<td>
				jos_schemas</td>
		</tr>
		<tr>
			<td>
				&nbsp;</td>
			<td>
				jos_update_categories</td>
		</tr>
		<tr>
			<td>
				&nbsp;</td>
			<td>
				jos_update_sites</td>
		</tr>
		<tr>
			<td>
				&nbsp;</td>
			<td>
				jos_update_sites_extensions</td>
		</tr>
		<tr>
			<td>
				&nbsp;</td>
			<td>
				jos_updates</td>
		</tr>
		<tr>
			<td>
				&nbsp;</td>
			<td>
				jos_user_profiles</td>
		</tr>
	</tbody>
</table>
<p>
	For more information on database changes see the article <a href="http://www.theartofjoomla.com/home/9-developer/135-database-upgrades-in-joomla-16.html">Database upgrades in Joomla 1.6</a>.</p>
<table class="legacy">
	<caption>
		Changes to plugin events in Joomla 1.6</caption>
	<thead>
		<tr>
			<th scope="col">
				Usage in Joomla 1.5</th>
			<th scope="col">
				Usage in Joomla 1.6</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th colspan="2">
				Events that have been renamed</th>
		</tr>
		<tr>
			<td>
				onAfterContentSave</td>
			<td>
				onContentAfterSave</td>
		</tr>
		<tr>
			<td>
				onAfterDisplayTitle</td>
			<td>
				onContentAfterTitle</td>
		</tr>
		<tr>
			<td>
				onAfterDisplayContent</td>
			<td>
				onContentAfterDisplay</td>
		</tr>
		<tr>
			<td>
				onBeforeDisplayContent</td>
			<td>
				onContentBeforeDisplay</td>
		</tr>
		<tr>
			<td>
				onBeforeContentSave</td>
			<td>
				onContentBeforeSave</td>
		</tr>
		<tr>
			<td>
				onSearch</td>
			<td>
				onContentSearch</td>
		</tr>
		<tr>
			<td>
				onSearchAreas</td>
			<td>
				onContentSearchAreas</td>
		</tr>
		<tr>
			<td>
				onAuthenticate</td>
			<td>
				onUserAuthenticate</td>
		</tr>
		<tr>
			<td>
				onAfterDeleteUser</td>
			<td>
				onUserAfterDelete</td>
		</tr>
		<tr>
			<td>
				onAfterStoreUser</td>
			<td>
				onUserAfterSave</td>
		</tr>
		<tr>
			<td>
				onBeforeDeleteUser</td>
			<td>
				onUserBeforeDelete</td>
		</tr>
		<tr>
			<td>
				onBeforeStoreUser</td>
			<td>
				onUserBeforeSave</td>
		</tr>
		<tr>
			<td>
				onLoginFailure</td>
			<td>
				onUserLoginFailure</td>
		</tr>
		<tr>
			<td>
				onLoginUser</td>
			<td>
				onUserLogin</td>
		</tr>
		<tr>
			<td>
				onLogoutUser</td>
			<td>
				onUserLogout</td>
		</tr>
		<tr>
			<th colspan="2">
				New events</th>
		</tr>
		<tr>
			<td>
				n/a</td>
			<td>
				onBeforeCompileHead</td>
		</tr>
		<tr>
			<td>
				n/a</td>
			<td>
				onBeforeRender</td>
		</tr>
		<tr>
			<td>
				n/a</td>
			<td>
				onContentBeforeDelete</td>
		</tr>
		<tr>
			<td>
				n/a</td>
			<td>
				onContentAfterDelete</td>
		</tr>
		<tr>
			<td>
				n/a</td>
			<td>
				onContentChangeState</td>
		</tr>
		<tr>
			<td>
				n/a</td>
			<td>
				onContentPrepare</td>
		</tr>
		<tr>
			<td>
				n/a</td>
			<td>
				onContentPrepareData</td>
		</tr>
		<tr>
			<td>
				n/a</td>
			<td>
				onContentPrepareForm</td>
		</tr>
		<tr>
			<td>
				n/a</td>
			<td>
				onExtensionBeforeInstall</td>
		</tr>
		<tr>
			<td>
				n/a</td>
			<td>
				onExtensionBeforeSave</td>
		</tr>
		<tr>
			<td>
				n/a</td>
			<td>
				onExtensionBeforeUpdate</td>
		</tr>
		<tr>
			<td>
				n/a</td>
			<td>
				onExtensionBeforeUninstall</td>
		</tr>
		<tr>
			<td>
				n/a</td>
			<td>
				onExtensionAfterInstall</td>
		</tr>
		<tr>
			<td>
				n/a</td>
			<td>
				onExtensionAfterSave</td>
		</tr>
		<tr>
			<td>
				n/a</td>
			<td>
				onExtensionAfterUpdate</td>
		</tr>
		<tr>
			<td>
				n/a</td>
			<td>
				onExtensionAfterUninstall</td>
		</tr>
	</tbody>
</table>
<p>
	Note carefully that all content events (except for search and search areas) now pass a &#39;context&#39; variable as the first argument to advise the plugin as to what type of content is being passed. The plugin events have been rationalised to avoid collisions with, and possible errors caused by using the 1.5 argument list. &nbsp;While 1.5-named events will stop working in 1.6, they at least will not cause unexpected errors due to the change in the argument list. &nbsp;However, this does allow you to create dual 1.5/1.6 compatible plugins with one set of events for 1.5 and the other for 1.6 in the same file.</p>
<p>
	The plugin event should test this context variable to see if it is interested in processing the content. You can no longer assume that content events are from articles. &nbsp;All core content components (banners, articles, weblinks, et al) use the onContent before and after save. &nbsp;Extensions (modules, plugins, etc) use onExtension before and after save. &nbsp;Example plugins with events are provided in the Joomla 1.6 distribution.</p>
<p>
	For more information on plugins see the article&nbsp;<a href="http://www.theartofjoomla.com/home/41-extensions/132-more-on-upgrading-plugins-to-joomla-16.html">more on upgrading plugins to Joomla 1.6</a>.</p>
<h2 id="j10_15">
	Joomla 1.0 to 1.5</h2>
<p>
	Joomla 1.0 end-of-life occurred on July 22, 2009.&nbsp; Joomla 1.5 provides a legacy layer to allow many Joomla 1.0 extensions to run in Joomla 1.5. &nbsp; The following tables outline many of the API changes in a simple &quot;old way&quot; versus &quot;new way&quot; format.</p>
<p>
	The best way to convert your extensions to run natively with Joomla 1.5 is to turn legacy mode off and observe the errors that occur.&nbsp; Use the tables to look up the missing functions or classes and make the appropriate replacements.&nbsp; You may also find all of our <a href="topics/legacy-mode.html">Legacy Mode</a> topics useful to peruse.</p>
<p>
	Please note that these tables are only to be used to assist in converting your extensions to run natively on Joomla 1.5.&nbsp; In some cases there are &quot;better&quot; ways to do things, or there are new features in Joomla 1.5 that you can take advantage of that replace some of the Joomla 1.0 ways of doing things.&nbsp; To find out more about the &quot;Joomla Way&quot; in Joomla 1.5 I encourgage you to subscribe to <a href="reference.html">the Art of Joomla Developer Reference</a>.</p>
<p>
	Translations available: <a href="http://www.joomlashow.it/guide/sviluppo-estensioni/convertire-vecchie-estensioni-a-joomla-1.5/#index" title="Thanks go to Federico Capoano for this translation">IT</a> <a href="http://joomlakom.de/tutorials/cheatsheets/komponenten-nach-joomla-1.5-portieren.html" title="Thanks to Uwe Walter">DE</a></p>
<table class="legacy">
	<caption>
		Changes to template functions</caption>
	<thead>
		<tr>
			<th scope="col">
				Usage in Joomla 1.0</th>
			<th scope="col">
				Usage in Joomla 1.5</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th colspan="2">
				Display the component</th>
		</tr>
		<tr>
			<td>
				<code>&lt;?php echo mosMainBody();?&gt;</code></td>
			<td>
				<tt>&lt;jdoc:include type=&quot;component&quot; /&gt;</tt></td>
		</tr>
		<tr>
			<th colspan="2">
				&nbsp;Count the number of modules in a position</th>
		</tr>
		<tr>
			<td>
				<code>&lt;?php if (mosCountModules(&#39;left&#39;)) : ?&gt;</code></td>
			<td>
				<code>&lt;?php if ($this-&gt;countModules(&#39;left&#39;)) : ?&gt;</code></td>
		</tr>
		<tr>
			<td>
				<code>&lt;?php if (mosCountModules(&#39;left&#39;) || mosCountModules(&#39;right&#39;)) : ?&gt;</code></td>
			<td>
				<code>&lt;?php if ($this-&gt;countModules(&#39;left OR right&#39;)) : ?&gt;</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Loading modules in a position</th>
		</tr>
		<tr>
			<td>
				<code>&lt;?php mosLoadModules(&#39;left&#39;, 0);?&gt;</code></td>
			<td>
				<code>&lt;jdoc:include type=&quot;modules&quot; name=&quot;left&quot; style=&quot;table&quot;/&gt;</code></td>
		</tr>
		<tr>
			<td>
				<code>&lt;?php mosLoadModules(&#39;left&#39;, -1);?&gt;</code></td>
			<td>
				<code>&lt;jdoc:include type=&quot;modules&quot; name=&quot;left&quot; style=&quot;raw&quot;/&gt;</code></td>
		</tr>
		<tr>
			<td>
				<code>&lt;?php mosLoadModules(&#39;left&#39;, -2);?&gt;</code></td>
			<td>
				<code>&lt;jdoc:include type=&quot;modules&quot; name=&quot;left&quot; style=&quot;xhtml&quot;/&gt;</code></td>
		</tr>
		<tr>
			<td>
				<code>&lt;?php mosLoadModules(&#39;left&#39;, -3);?&gt;</code></td>
			<td>
				<code>&lt;jdoc:include type=&quot;modules&quot; name=&quot;left&quot; style=&quot;rounded&quot;/&gt;</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Load a single module</th>
		</tr>
		<tr>
			<td>
				<code>&lt;?php mosLoadModule(&#39;Banners&#39;, -1);?&gt;</code></td>
			<td>
				<code>&lt;jdoc:include type=&quot;module&quot; name=&quot;Banners&quot; style=&quot;raw&quot; /&gt;</code></td>
		</tr>
		<tr>
			<td>
				<code>&lt;?php mosLoadModule(&#39;Latest News&#39;, -2);?&gt;</code></td>
			<td>
				<code>&lt;jdoc:include type=&quot;module&quot; name=&quot;</code><code>Latest News</code><code>&quot; style=&quot;xhtml&quot; /&gt;</code></td>
		</tr>
		<tr>
			<td>
				<code>&lt;?php mosLoadModule(&#39;Newsflash&#39;, -3);?&gt;</code></td>
			<td>
				<code>&lt;jdoc:include type=&quot;module&quot; name=&quot;</code><code>Newsflash</code><code>&quot; style=&quot;rounded&quot; /&gt;</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Include directives in the HEAD tag</th>
		</tr>
		<tr>
			<td>
				<code>&lt;?php mosShowHead();?&gt;</code></td>
			<td>
				<code>&lt;jdoc:include type=&quot;head&quot; /&gt;</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Displaying the pathway</th>
		</tr>
		<tr>
			<td>
				<code>&lt;?php mosPathWay();?&gt;</code></td>
			<td>
				Include a module position to use the &quot;breadcrumbs&quot; module.</td>
		</tr>
	</tbody>
</table>
<table class="legacy">
	<caption>
		Changes involving global variables</caption>
	<tbody>
		<tr>
			<th scope="col">
				Usage in Joomla 1.0</th>
			<th scope="col">
				Usage in Joomla 1.5</th>
		</tr>
		<tr>
			<th colspan="2">
				File system path to the site</th>
		</tr>
		<tr>
			<td>
				<pre>
				global $mosConfig_abosolute_path;
$path = $mosConfig_abosolute_path.&#39;/file.php&#39;;</pre>
			</td>
			<td>
				&nbsp;
				<pre>
				$path = JPATH_SITE.DS.&#39;file.php&#39;;</pre>
			</td>
		</tr>
		<tr>
			<th colspan="2">
				File system path to adminstrator&nbsp;</th>
		</tr>
		<tr>
			<td>
				<pre>
				global $mosConfig_abosolute_path;
$path = $mosConfig_abosolute_path.&#39;/administrator/file.php&#39;;</pre>
			</td>
			<td>
				<pre>
				$path = JPATH_ADMINISTRATOR.DS.&#39;file.php&#39;;</pre>
			</td>
		</tr>
		<tr>
			<th colspan="2">
				File system path to the current component&nbsp;</th>
		</tr>
		<tr>
			<td>
				N/A</td>
			<td>
				<pre>
				$path = JPATH_COMPONENT.DS.&#39;file.php&#39;;</pre>
			</td>
		</tr>
		<tr>
			<th colspan="2">
				URL to the site&nbsp;</th>
		</tr>
		<tr>
			<td>
				<code>global $mosConfig_live_site;</code></td>
			<td>
				<code>$url = JUri::base(true);</code></td>
		</tr>
		<tr>
			<th colspan="2">
				The application object&nbsp;</th>
		</tr>
		<tr>
			<td>
				<code>global $mainframe;</code></td>
			<td>
				<code>$app = &amp;JFactory::getApplication();</code></td>
		</tr>
		<tr>
			<td>
				<code>$path = $mainframe-&gt;getBasePath(0);</code><br />
				<code>$path = $mainframe-&gt;getBasePath(&#39;site&#39;);</code><br />
				<code>$path = $mainframe-&gt;getBasePath(&#39;front&#39;);</code></td>
			<td>
				<code>$path = JPATH_SITE.DS;</code></td>
		</tr>
		<tr>
			<td>
				<code>$path = $mainframe-&gt;getBasePath(2);</code><br />
				<code>$path = $mainframe-&gt;getBasePath(&#39;installation&#39;);</code><br />
				<code> </code></td>
			<td>
				<code>$path = JPATH_INSTALLATION.DS;</code></td>
		</tr>
		<tr>
			<td>
				<code>$path = $mainframe-&gt;getBasePath(1);</code><br />
				<code>$path = $mainframe-&gt;getBasePath(&#39;admin&#39;);</code><br />
				<code>$path = $mainframe-&gt;getBasePath(&#39;administrator&#39;);</code></td>
			<td>
				<code>$path = JPATH_ADMINISTRATOR.DS;</code></td>
		</tr>
		<tr>
			<td>
				<code>$mainframe-&gt;setPageTitle($title);</code></td>
			<td>
				<pre>
				$document=&amp; JFactory::getDocument();
$document-&gt;setTitle($title);</pre>
			</td>
		</tr>
		<tr>
			<td>
				<code>$mainframe-&gt;getPageTitle();</code></td>
			<td>
				<pre>
				$document=&amp; JFactory::getDocument();
$title = $document-&gt;getTitle();</pre>
			</td>
		</tr>
		<tr>
			<th colspan="2">
				Accessing configuration file variables&nbsp;</th>
		</tr>
		<tr>
			<td>
				<code>global $mosConfig_list_limit;</code></td>
			<td>
				<pre>
				$app = &amp;JFactory::getApplication();
$limit = $app-&gt;getCfg(&#39;list_limit&#39;);
</pre>
			</td>
		</tr>
		<tr>
			<td>
				<p>
					<code>global $mosConfig_offset_user;</code></p>
			</td>
			<td>
				<pre>
				$user = &amp;JFactory::getUser();
$userOffset = $user-&gt;getParam(&#39;timezone&#39;);</pre>
			</td>
		</tr>
		<tr>
			<td>
				<pre>
				global $mosConfig_debug;

if ($mosConfig_debug) // ...</pre>
			</td>
			<td>
				<pre>
				if (JDEBUG) // ...

// or

$app = &amp;JFactory::getApplication();
if ($app-&gt;getCfg(&#39;debug&#39;)) // ...</pre>
			</td>
		</tr>
		<tr>
			<th colspan="2">
				Getting the option or component name&nbsp;</th>
		</tr>
		<tr>
			<td>
				<code>global $option;</code></td>
			<td>
				<code>$option = JRequest::getCmd(&#39;option&#39;);</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Getting the current user object&nbsp;</th>
		</tr>
		<tr>
			<td>
				<code>global $my;</code></td>
			<td>
				<code>$user = &amp;JFactory::getUser();</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Getting the database object&nbsp;</th>
		</tr>
		<tr>
			<td>
				<code>global $database;</code></td>
			<td>
				<code>$db = &amp;JFactory::getDbo();</code></td>
		</tr>
	</tbody>
</table>
<p>
	&nbsp;</p>
<table class="legacy">
	<caption>
		General API and function changes</caption>
	<thead>
		<tr>
			<th scope="col">
				Usage in Joomla 1.0</th>
			<th scope="col">
				Usage in Joomla 1.5</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th colspan="2">
				Direct access check</th>
		</tr>
		<tr>
			<td>
				<code>defined(&#39;_VALID_MOS&#39;) or die;</code></td>
			<td>
				<code>defined(&#39;_JEXEC&#39;) or die;</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Translating text</th>
		</tr>
		<tr>
			<td>
				<code>&lt;?php echo _COMMENTS_TITLE;?&gt;</code></td>
			<td>
				<code>&lt;?php echo JText::_(&#39;Comments_Title&#39;);?&gt;</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Accessing request variables&nbsp;</th>
		</tr>
		<tr>
			<td>
				<code>$cid = mosGetParam($_REQUEST, &#39;cid&#39;, array());</code></td>
			<td>
				<code>$cid = JRequest::getVar(&#39;cid&#39;, array());</code></td>
		</tr>
		<tr>
			<td>
				<code>$ints = josGetArrayInts($name, $type);</code></td>
			<td>
				<pre>
				$ints = JRequest::getVar($name, array(), &#39;method&#39;, &#39;array&#39;);
JArrayHelper::toInteger($ints);
</pre>
			</td>
		</tr>
		<tr>
			<th colspan="2">
				Parameters&nbsp;</th>
		</tr>
		<tr>
			<td>
				<code>$params = new mosParameters($ini);</code></td>
			<td>
				<code>$params = new JParameter($ini);</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Getting component parameters&nbsp;</th>
		</tr>
		<tr>
			<td>
				<pre>
				$comp = new mosComponent($database);
$comp-&gt;load($foobar_id);
$params = new mosParameters($comp-&gt;params);</pre>
			</td>
			<td>
				<pre>
				$params = JComponentHelper::getParams(&#39;com_foobar&#39;);</pre>
			</td>
		</tr>
		<tr>
			<th colspan="2">
				Bind data to objects</th>
		</tr>
		<tr>
			<td>
				<code>mosBindArrayToObject($array, &amp;$obj, $ignore, $prefix, $checkSlashes);</code></td>
			<td>
				<pre>
				// Providing object is derived from JTable
$object-&gt;bind($array, $ignore);
</pre>
			</td>
		</tr>
		<tr>
			<th colspan="2">
				Hash a string</th>
		</tr>
		<tr>
			<td>
				<code>$value = mosHash($seed);</code></td>
			<td>
				<code>$value = JUtility::getHash($seed);</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Bounce an unauthorised user</th>
		</tr>
		<tr>
			<td>
				<code>mosNotAuth();</code></td>
			<td>
				<code>JError::raiseError(&#39;401&#39;, JText::_(&#39;ALERTNOTAUTH&#39;));</code></td>
		</tr>
		<tr>
			<th colspan="2">
				&nbsp;Display an error popup</th>
		</tr>
		<tr>
			<td>
				<code>mosErrorAlert($text, $action, $mode);</code></td>
			<td>
				No direct replacement. Recommend raising a notice using JError::raiseNotice or a warning using JError::raiseWarning and redirecting the page.</td>
		</tr>
		<tr>
			<th colspan="2">
				Clean a file system path</th>
		</tr>
		<tr>
			<td>
				<code>mosPathName($p_path, $p_addtrailingslash);</code></td>
			<td>
				<pre>
				jimport(&#39;joomla.filesystem.path&#39;);
$path = JPath::clean($p_path);
// Handle trailing slash manually
</pre>
			</td>
		</tr>
		<tr>
			<th colspan="2">
				Sending mails</th>
		</tr>
		<tr>
			<td>
				<code>mosMail($from, $fromname, $recipient, $subject, $body, $mode, $cc, $bcc, $attachment, $replyto, $replytoname )</code><br />
				&nbsp;</td>
			<td>
				<code>JUtility::sendMail($from, $fromname, $recipient, $subject, $body, $mode, $cc, $bcc, $attachment, $replyto, $replytoname );</code></td>
		</tr>
		<tr>
			<td>
				<code>mosSendAdminMail($adminName, $adminEmail, $email, $type, $title, $author);</code></td>
			<td>
				<code>JUtility::sendAdminMail($adminName, $adminEmail, $email, $type, $title, $author)</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Making a password</th>
		</tr>
		<tr>
			<td>
				<code>$pwd = mosMakePassword();</code></td>
			<td>
				<pre>
				jimport(&#39;joomla.user.helper&#39;);
$pwd = JUserHelper::genRandomPassword();
</pre>
			</td>
		</tr>
		<tr>
			<th colspan="2">
				Redirecting to a new page</th>
		</tr>
		<tr>
			<td>
				<code>mosRedirect($url, $msg);</code></td>
			<td>
				<pre>
				$app = &amp;JFactory::getApplication();
$app-&gt;redirect($url, $msg);
</pre>
			</td>
		</tr>
		<tr>
			<th colspan="2">
				Managing folders</th>
		</tr>
		<tr>
			<td>
				<code>$result = mosMakePath($base, $path, $mode);</code></td>
			<td>
				<pre>
				jimport(&#39;joomla.filesystem.folder&#39;);
$result = JFolder::create($base.$path, $mode == null ? 0755 : $mode);</pre>
			</td>
		</tr>
		<tr>
			<td>
				<code>$result = deldir($path);</code></td>
			<td>
				<pre>
				jimport(&#39;joomla.filesystem.folder&#39;);
$result = JFolder::delete($path);
</pre>
			</td>
		</tr>
		<tr>
			<th colspan="2">
				Converting an array to integers</th>
		</tr>
		<tr>
			<td>
				<code>mosArrayToInts($array, $default);</code></td>
			<td>
				<code>JArrayHelper::toInteger($array, $default);</code></td>
		</tr>
		<tr>
			<th colspan="2">
				File permissions</th>
		</tr>
		<tr>
			<td>
				<code>$result = mosChmod($path);</code></td>
			<td>
				<pre>
				jimport(&#39;joomla.filesystem.path&#39;);
$result = JPath::setPermissions($path);
</pre>
			</td>
		</tr>
		<tr>
			<td>
				<code>$result = mosChmodRecursive($path, $filemode, $dirmode);</code></td>
			<td>
				<pre>
				jimport(&#39;joomla.filesystem.path&#39;);
$result = JPath::setPermissions($path, $filemode, $dirmode);</pre>
			</td>
		</tr>
		<tr>
			<td>
				<code>$result = mosIsChmodable($file);</code></td>
			<td>
				<pre>
				jimport(&#39;joomla.filesystem.path&#39;);
$result = JPath::canChmod($file);</pre>
			</td>
		</tr>
		<tr>
			<th colspan="2">
				Getting browser information</th>
		</tr>
		<tr>
			<td>
				<code>$browser = mosGetBrowser($agent); </code></td>
			<td>
				<pre>
				jimport(&#39;joomla.environment.browser&#39;);
$browser = &amp;JBrowser::getInstance();
</pre>
			</td>
		</tr>
		<tr>
			<td>
				<code>$os = mosGetOS($agent);</code></td>
			<td>
				<pre>
				jimport(&#39;joomla.environment.browser&#39;);
$browser = &amp;JBrowser::getInstance();
$os = $instance-&gt;getPlatform();
</pre>
			</td>
		</tr>
		<tr>
			<th colspan="2">
				Displaying an ordering select list</th>
		</tr>
		<tr>
			<td>
				<code>mosGetOrderingList($sql, $chop)</code></td>
			<td>
				<code>JHTML::_(&#39;list.genericordering&#39;, $sql, $chop)</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Parsing INI formatted strings</th>
		</tr>
		<tr>
			<td>
				<code>$params = mosParseParams($txt)</code></td>
			<td>
				<pre>
				$registry = new JRegistry();
$registry-&gt;loadINI($txt);
$params = $registry-&gt;toObject();
// or
$params = new JParameter($txt);</pre>
			</td>
		</tr>
		<tr>
			<th colspan="2">
				Using Editors</th>
		</tr>
		<tr>
			<td>
				<code>initEditor();</code></td>
			<td>
				<pre>
				$editor = &amp;JFactory::getEditor();
echo $editor-&gt;initialise();</pre>
			</td>
		</tr>
		<tr>
			<td>
				<code>getEditorContents($editorArea, $hiddenField);</code></td>
			<td>
				<pre>
				jimport(&#39;joomla.html.editor&#39;);
$editor = &amp;JFactory::getEditor();
echo $editor-&gt;save($hiddenField);</pre>
			</td>
		</tr>
		<tr>
			<td>
				<code>editorArea($name, $content, $hiddenField, $width, $height, $col, $row);</code></td>
			<td>
				<pre>
				jimport( &#39;joomla.html.editor&#39; );
$editor = &amp;JFactory::getEditor();
echo $editor-&gt;display($hiddenField, $content, $width, $height, $col, $row);</pre>
			</td>
		</tr>
		<tr>
			<th colspan="2">
				Menu based authorisation</th>
		</tr>
		<tr>
			<td>
				<code>$allowed = mosMenuCheck($Itemid, $menu_option, $task, $gid);</code></td>
			<td>
				<pre>
				$user =&amp; JFactory::getUser();
$menus =&amp; JSite::getMenu();
$allowed = $menus-&gt;authorize($Itemid, $user-&gt;get(&#39;aid&#39;)); </pre>
			</td>
		</tr>
		<tr>
			<th colspan="2">
				Converting an object to an array</th>
		</tr>
		<tr>
			<td>
				<code>$array = mosObjectToArray($p_obj, $recurse, $regex);</code></td>
			<td>
				<code>$array = JArrayHelper::fromObject($p_obj, $recurse, $regex);</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Date functions</th>
		</tr>
		<tr>
			<td>
				<code>echo mosFormatDate($date, $format, $offset);</code></td>
			<td>
				<code>echo JHTML::_(&#39;date&#39;, $date, $format ? $format : JText::_(&#39;DATE_FORMAT_LC1&#39;), $offset);</code></td>
		</tr>
		<tr>
			<td>
				<code>echo mosCurrentDate($format);</code></td>
			<td>
				<code>echo JHTML::_(&#39;date&#39;, &#39;now&#39;, $format ? $format : JText::_(&#39;DATE_FORMAT_LC1&#39;));</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Preparing an variables for safe output</th>
		</tr>
		<tr>
			<td>
				<code>mosMakeHtmlSafe($row, $quote_style, $exclude_keys);</code></td>
			<td>
				<code>JFilterOutput::objectHTMLSafe($row, $quote_style, $exclude_keys);</code></td>
		</tr>
		<tr>
			<td>
				<code>&lt;?php echo ampReplace($text);?&gt;</code></td>
			<td>
				<code>&lt;?php echo JFilterOutput::ampReplace($text);?&gt;</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Sorting an array of objects</th>
		</tr>
		<tr>
			<td>
				<code>SortArrayObjects($array, $k, $sort_direction);</code></td>
			<td>
				<code>JArrayHelper::sortObjects($array, $k, $sort_direction);</code></td>
		</tr>
		<tr>
			<th colspan="2">
				CSRF (spoof) checking</th>
		</tr>
		<tr>
			<td>
				<code>josSpoofValue($alt);</code></td>
			<td>
				<p>
					Place the following code before the end of your form:</p>
				<p>
					<code>&lt;?php echo JHtml::_(&#39;form.token&#39;); ?&gt;</code></p>
			</td>
		</tr>
		<tr>
			<td>
				<code>josSpoofCheck($header, $alternate);</code></td>
			<td>
				<code>JRequest::checkToken() or die(JText::_(&#39;Invalid Token&#39;));</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Load javascript tooltip support</th>
		</tr>
		<tr>
			<td>
				<code>loadOverlib();</code></td>
			<td>
				<code>JHTML::_(&#39;behavior.tooltip&#39;);</code></td>
		</tr>
		<tr>
			<td>
				<code>mosToolTip($tooltip, $title, $width, $image, $text, $href, $link);</code></td>
			<td>
				<code>JHTML::_(&#39;tooltip&#39;, $tooltip, $title, $image, $text, $href, $link)</code></td>
		</tr>
		<tr>
			<td>
				<code>&lt;?php echo mosWarning($warning, $title);?&gt;</code></td>
			<td>
				<code>&lt;?php echo JHTML::tooltip($warning, $title, &#39;warning.png&#39;, null, null, null);?&gt;</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Routing URLs</th>
		</tr>
		<tr>
			<td>
				<code>&lt;?php echo sefRelToAbs($link);?&gt;</code></td>
			<td>
				<code>&nbsp;&lt;?php echo JRoute::_($link);?&gt;</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Traversing tree data</th>
		</tr>
		<tr>
			<td>
				<code>mosTreeRecurse($id, $indent, $list, $children, $maxlevel, $level, $type);</code></td>
			<td>
				<code>JHTML::_(&#39;menu.treerecurse&#39;, $id, $indent, $list, $children, $maxlevel, $level, $type)</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Functions without direct replacements</th>
		</tr>
		<tr>
			<td>
				<code>mosBackTrace($message);</code></td>
			<td>
				&nbsp;</td>
		</tr>
		<tr>
			<td>
				<code>mosCreateMail($from, $fromname, $subject, $body);</code></td>
			<td>
				&nbsp;</td>
		</tr>
		<tr>
			<td>
				<code>mosShowSource($filename, $withLineNums);</code></td>
			<td>
				&nbsp;</td>
		</tr>
		<tr>
			<td>
				<code>mosLoadComponent($name);</code></td>
			<td>
				Handled by <code>JDocument</code>.</td>
		</tr>
		<tr>
			<td>
				<p>
					<code>initGzip();</code><br />
					<code>doGzip();</code></p>
			</td>
			<td>
				Only ever used at the application level. Doesn&#39;t affect extensions.</td>
		</tr>
	</tbody>
</table>
<p>
	&nbsp;</p>
<table class="legacy">
	<caption>
		Changes involving the database</caption>
	<tbody>
		<tr>
			<th scope="col">
				Usage in Joomla 1.0</th>
			<th scope="col">
				Usage in Joomla 1.5</th>
		</tr>
		<tr>
			<th colspan="2">
				Database table classes&nbsp;</th>
		</tr>
		<tr>
			<td>
				<pre>
				class MyTable extends mosDBTable {
 // lots of variables defined
 function MyTable(&amp;$db) {
  $this-&gt;mosDBTable(&#39;#__table_name&#39;, &#39;id&#39;, $db);
 }
}</pre>
			</td>
			<td>
				<pre>
				class MyTable extends JTable {
 // lots of variables defined
 function __construct(&amp;$db) {
   parent::__construct(&#39;#__table_name&#39;, &#39;id&#39;, $db);
 }
}</pre>
			</td>
		</tr>
		<tr>
			<th colspan="2">
				Limits in database queries&nbsp;</th>
		</tr>
		<tr>
			<td>
				<pre>
				$sql = &#39;SELECT *&#39;
     . &#39; FROM #__table_name&#39;
     . &#39; LIMIT 10, 20&#39;;
$database-&gt;setQuery($sql);
</pre>
			</td>
			<td>
				<pre>
				$db = &amp;JFactory::getDbo();
$db-&gt;setQuery(
 &#39;SELECT *&#39;
 .&#39; FROM #__table_name&#39;
 .&#39; LIMIT 10, 20&#39;,
 10, 20
);</pre>
			</td>
		</tr>
		<tr>
			<th colspan="2">
				Loading an object from the database&nbsp;</th>
		</tr>
		<tr>
			<td>
				<code>$db-&gt;loadObject($object);</code></td>
			<td>
				<code>$object = $db-&gt;loadObject();</code></td>
		</tr>
	</tbody>
</table>
<p>
	&nbsp;</p>
<table class="legacy">
	<caption>
		Changes to components</caption>
	<thead>
		<tr>
			<th scope="col">
				Usage in Joomla 1.0</th>
			<th scope="col">
				Usage in Joomla 1.5</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th colspan="2">
				Getting a predefined path</th>
		</tr>
		<tr>
			<td>
				<code>$mainframe-&gt;getPath(&#39;admin_html&#39;);</code></td>
			<td>
				<code>JApplicationHelper::getPath(&#39;admin_html&#39;);</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Getting component parameters&nbsp;</th>
		</tr>
		<tr>
			<td>
				<pre>
				$comp = new mosComponent($database);
$comp-&gt;load($foobar_id);
$params = new mosParameters($comp-&gt;params);</pre>
			</td>
			<td>
				<pre>
				$params = JComponentHelper::getParams(&#39;com_foobar&#39;);</pre>
			</td>
		</tr>
	</tbody>
</table>
<p>
	&nbsp;</p>
<table class="legacy">
	<caption>
		Changes to the Administrator menus helper</caption>
	<thead>
		<tr>
			<th scope="col">
				Usage in Joomla 1.0</th>
			<th scope="col">
				Usage in Joomla 1.5</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th colspan="2">
				Display an ordering select list</th>
		</tr>
		<tr>
			<td>
				<code>mosAdminMenus::Ordering($row, $id)<br />
				</code></td>
			<td>
				<code>JHTML::_(&#39;menu.ordering&#39;, $row, $id)</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Display an access level select list</th>
		</tr>
		<tr>
			<td>
				&nbsp;<code>mosAdminMenus::Access($row)</code></td>
			<td>
				<code>JHTML::_(&#39;list.accesslevel&#39;, $row)</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Display a published state select list</th>
		</tr>
		<tr>
			<td>
				&nbsp; <code>mosAdminMenus::Published($row)</code></td>
			<td>
				<code>JHTML::_(&#39;select.booleanlist&#39;, &#39;published&#39;, &#39;class=&quot;inputbox&quot;&#39;, $row-&gt;published)</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Display a multi-select menu list</th>
		</tr>
		<tr>
			<td>
				<code>mosAdminMenus::MenuLinks($lookup, $all, $none, $unassigned)</code></td>
			<td>
				<code>JHTML::_(&#39;select.genericlist&#39;, $options, &#39;selections[]&#39;, &#39;class=&quot;inputbox&quot; size=&quot;15&quot; multiple=&quot;multiple&quot;&#39;, &#39;value&#39;, &#39;text&#39;, $lookup, &#39;selections&#39; )</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Display a category select list</th>
		</tr>
		<tr>
			<td>
				<code>mosAdminMenus::Category($menu, $id, $javascript)</code></td>
			<td>
				No direct replacement</td>
		</tr>
		<tr>
			<th colspan="2">
				Display a section select list</th>
		</tr>
		<tr>
			<td>
				<code>mosAdminMenus::Section($menu, $id, $all)</code></td>
			<td>
				No direct replacement</td>
		</tr>
		<tr>
			<th colspan="2">
				Display a component select list</th>
		</tr>
		<tr>
			<td>
				<code>mosAdminMenus::Component($menu, $id)</code></td>
			<td>
				No direct replacement</td>
		</tr>
		<tr>
			<th colspan="2">
				Get the name of a component</th>
		</tr>
		<tr>
			<td>
				<code>mosAdminMenus::ComponentName($menu, $id)</code></td>
			<td>
				No direct replacement</td>
		</tr>
		<tr>
			<th colspan="2">
				Display a select list of images</th>
		</tr>
		<tr>
			<td>
				<code>mosAdminMenus::Images($name, $active, $javascript, $directory)</code></td>
			<td>
				<code>JHTML::_(&#39;list.images&#39;, $name, $active, $javascript, $directory)</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Display a select list of ordering values</th>
		</tr>
		<tr>
			<td>
				<code>mosAdminMenus::SpecificOrdering($row, $id, $query, $neworder)</code></td>
			<td>
				<code>JHTML::_(&#39;list.specificordering&#39;, $row, $id, $query, $neworder)</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Display a select list of users</th>
		</tr>
		<tr>
			<td>
				<code>mosAdminMenus::UserSelect( $name, $active, $nouser, $javascript, $order, $reg)</code></td>
			<td>
				<code>JHTML::_(&#39;list.users&#39;, $name, $active, $nouser, $javascript, $order, $reg);</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Display a select list of alignment positions</th>
		</tr>
		<tr>
			<td>
				<code>mosAdminMenus::Positions($name, $active, $javascript, $none, $center, $left, $right, $id)</code></td>
			<td>
				<code>JHTML::_(&#39;list.positions&#39;, $name, $active, $javascript, $none, $center, $left, $right, $id)</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Display a select list of component categories</th>
		</tr>
		<tr>
			<td>
				<code>mosAdminMenus::ComponentCategory($name, $section, $active, $javascript, $order, $size, $sel_cat)</code></td>
			<td>
				<code>JHTML::_(&#39;list.category&#39;, $name, $section, $active, $javascript, $order, $size, $sel_cat)</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Display a select list of sections</th>
		</tr>
		<tr>
			<td>
				<code>mosAdminMenus::SelectSection($name, $active, $javascript, $order)</code></td>
			<td>
				<code>JHTML::_(&#39;list.section&#39;, $name, $active, $javascript, $order)</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Display a select list of menu items of a given type</th>
		</tr>
		<tr>
			<td>
				<code>mosAdminMenus::Links2Menu($type, $and)</code></td>
			<td>
				No direct replacement</td>
		</tr>
		<tr>
			<th colspan="2">
				Display a select list of menu items</th>
		</tr>
		<tr>
			<td>
				<code>mosAdminMenus::MenuSelect($name, $javascript)</code></td>
			<td>
				No direct replacement</td>
		</tr>
		<tr>
			<th colspan="2">
				Return a named array (by folder) of images in folders</th>
		</tr>
		<tr>
			<td>
				<code>mosAdminMenus::ReadImages($imagePath, $folderPath, $folders, $images)</code></td>
			<td>
				No direct replacement</td>
		</tr>
		<tr>
			<th colspan="2">
				Display a special select list of image folders</th>
		</tr>
		<tr>
			<td>
				<code>mosAdminMenus::GetImageFolders($folders, $path)</code></td>
			<td>
				No direct replacement</td>
		</tr>
		<tr>
			<th colspan="2">
				Display a special select list of images with preview behaviours</th>
		</tr>
		<tr>
			<td>
				<code>mosAdminMenus::GetImages($images, $path)</code></td>
			<td>
				No direct replacement</td>
		</tr>
		<tr>
			<th colspan="2">
				Display a special select list of images with preview behaviours</th>
		</tr>
		<tr>
			<td>
				<code>mosAdminMenus::GetSavedImages($row, $path)</code></td>
			<td>
				&nbsp;No direct replacement</td>
		</tr>
		<tr>
			<th colspan="2">
				&nbsp;Display a frontend image checking for a template override</th>
		</tr>
		<tr>
			<td>
				<code>mosAdminMenus::ImageCheck($file, $directory, $param, $param_directory=, $alt, $name, $type, $align)</code></td>
			<td>
				<code>JHTML::_(&#39;image.site&#39;, $file, $directory, $param, $param_directory, $alt, array(&#39;align&#39; =&gt; $align), $type)</code></td>
		</tr>
		<tr>
			<th colspan="2">
				&nbsp;Display a backend image checking for a template override</th>
		</tr>
		<tr>
			<td>
				<code>mosAdminMenus::ImageCheckAdmin($file, $directory, $param, $param_directory, $alt, $name, $type, $align)</code></td>
			<td>
				<code>JHTML::_(&#39;image.administrator&#39;, $file, $directory, $param, $param_directory, $alt, array(&#39;align&#39; =&gt; $align), $type)</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Deprecated method</th>
		</tr>
		<tr>
			<td>
				<code>mosAdminMenus::menutypes()</code></td>
			<td>
				No longer used</td>
		</tr>
		<tr>
			<th colspan="2">
				Deprecated method</th>
		</tr>
		<tr>
			<td>
				<code>mosAdminMenus::menuItem($item)</code></td>
			<td>
				&nbsp;No longer used</td>
		</tr>
	</tbody>
</table>
<p>
	&nbsp;</p>
<table class="legacy">
	<caption>
		Changes to the cache API</caption>
	<thead>
		<tr>
			<th scope="col">
				Usage in Joomla 1.0</th>
			<th scope="col">
				Usage in Joomla 1.5</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th colspan="2">
				Get the cache for a group</th>
		</tr>
		<tr>
			<td>
				<code>$cache = mosCache::getCache($group); </code></td>
			<td>
				<code>return JFactory::getCache($group);</code></td>
		</tr>
		<tr>
			<th colspan="2">
				&nbsp;Clean the cache for a group</th>
		</tr>
		<tr>
			<td>
				<code>mosCache::cleanCache($group)</code></td>
			<td>
				<pre>
				$cache =&amp; JFactory::getCache($group);
$cache-&gt;clean($group);</pre>
			</td>
		</tr>
	</tbody>
</table>
<p>
	&nbsp;</p>
<table class="legacy">
	<caption>
		Changes to miscellaneous classes</caption>
	<thead>
		<tr>
			<th scope="col">
				Usage in Joomla 1.0</th>
			<th scope="col">
				Usage in Joomla 1.5</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>
				<code>class MyClass extends mosAbstractTasker</code></td>
			<td>
				<code>class MyController extends JController</code></td>
		</tr>
		<tr>
			<td>
				<code>$object = new mosEmpty;</code></td>
			<td>
				<code>$object = new JObject;</code></td>
		</tr>
		<tr>
			<td>
				<code>MENU_Default::MENU_Default();</code></td>
			<td>
				<pre>
				JToolBarHelper::publishList();
JToolBarHelper::unpublishList();
JToolBarHelper::addNew();
JToolBarHelper::editList();
JToolBarHelper::deleteList();
JToolBarHelper::spacer();</pre>
			</td>
		</tr>
		<tr>
			<td>
				<code>$tabs = new mosTabs($useCookies);</code></td>
			<td>
				<code>$pane = new JPaneTabs(array(&#39;useCookies&#39; =&gt; $useCookies));</code></td>
		</tr>
	</tbody>
</table>
<p>
	&nbsp;</p>
<table class="legacy">
	<caption>
		Changes to HTML helper classes</caption>
	<thead>
		<tr>
			<th scope="col">
				Usage in Joomla 1.0</th>
			<th scope="col">
				Usage in Joomla 1.5</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>
				<code>mosCommonHTML::ContentLegend()</code></td>
			<td>
				No direct replacement.</td>
		</tr>
		<tr>
			<td>
				<code>mosCommonHTML::menuLinksContent($menus)</code></td>
			<td>
				No direct replacement.</td>
		</tr>
		<tr>
			<td>
				<code>mosCommonHTML::menuLinksSecCat($menus)</code></td>
			<td>
				No direct replacement.</td>
		</tr>
		<tr>
			<th colspan="2">
				Display a checkbox or checkout icon</th>
		</tr>
		<tr>
			<td>
				<code>mosCommonHTML::checkedOut($row, $overlib)</code></td>
			<td>
				<pre>
				jimport(&#39;joomla.html.html.grid&#39;);
echo JHTML::_(&#39;grid.checkedOut&#39;,$row, $overlib);</pre>
			</td>
		</tr>
		<tr>
			<td>
				<code>mosCommonHTML::CheckedOutProcessing($row, $i)</code></td>
			<td>
				<pre>
				jimport(&#39;joomla.html.html.grid&#39;);
echo JHTML::_(&#39;grid.checkedout&#39;, $row, $i);</pre>
			</td>
		</tr>
		<tr>
			<th colspan="2">
				Load javascript tooltip support</th>
		</tr>
		<tr>
			<td>
				<code>mosCommonHTML::loadOverlib();</code></td>
			<td>
				<code>JHTML::_(&#39;behavior.tooltip&#39;);</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Load javascript calendar support</th>
		</tr>
		<tr>
			<td>
				<code>mosCommonHTML::loadCalendar();</code></td>
			<td>
				<code>JHTML::_(&#39;behavior.calendar&#39;);</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Display a link that cycles through the access levels</th>
		</tr>
		<tr>
			<td>
				<code>mosCommonHTML::AccessProcessing($row, $i, $archived)</code></td>
			<td>
				<code>JHTML::_(&#39;grid.access&#39;,&nbsp; $row, $i, $archived);</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Display a published state icon</th>
		</tr>
		<tr>
			<td>
				<code>mosCommonHTML::PublishedProcessing($row, $i, $imgY, $imgX)</code></td>
			<td>
				<code>JHTML::_(&#39;grid.published&#39;,$row, $i, $imgY, $imgX)</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Display a published state icon with toggle</th>
		</tr>
		<tr>
			<td>
				<code>mosCommonHTML::selectState($filter_state, $published, $unpublished, $archived)</code></td>
			<td>
				<code>JHTML::_(&#39;grid.state&#39;, $filter_state, $published, $unpublished, $archived)</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Display a save order button</th>
		</tr>
		<tr>
			<td>
				<code>mosCommonHTML::saveorderButton($rows, $image);</code></td>
			<td>
				<code>echo JHTML::_(&#39;grid.order&#39;, $rows, $image)</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Display the ordering icon in a column heading</th>
		</tr>
		<tr>
			<td>
				<code>mosCommonHTML::tableOrdering($text, $ordering, $lists, $task);</code></td>
			<td>
				<code>echo JHTML::_(&#39;grid.sort&#39;,&nbsp; $text, $ordering, @$lists[&#39;order_Dir&#39;], @$lists[&#39;order&#39;], $task);</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Display a back button</th>
		</tr>
		<tr>
			<td>
				<code>&lt;?php mosHTML::BackButton ($params, $hide_js);?&gt;</code></td>
			<td>
				No direct replacement.</td>
		</tr>
		<tr>
			<th colspan="2">
				Clean and prepare text for output</th>
		</tr>
		<tr>
			<td>
				<code>&lt;?php echo mosHTML::cleanText ($text);?&gt;</code></td>
			<td>
				<code>&nbsp;&lt;?php echo JFilterOutput::cleanText($text);?&gt;</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Displaying a print button</th>
		</tr>
		<tr>
			<td>
				<code>&lt;?php mosHTML::PrintIcon($row, &amp;$params, $hide_js, $link, $status);?&gt;</code></td>
			<td>
				No direct replacement.</td>
		</tr>
		<tr>
			<th colspan="2">
				Cloak an email</th>
		</tr>
		<tr>
			<td>
				<code>&lt;?php echo mosHTML::emailCloaking($mail, $mailto, $text, $email);?&gt;</code></td>
			<td>
				<code>&lt;?php echo JHTML::_(&#39;email.cloak&#39;, $mail, $mailto, $text, $email);?&gt;</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Load support to keep the page alive (avoiding session time-outs)</th>
		</tr>
		<tr>
			<td>
				<code>&lt;?php mosHTML::keepAlive();?&gt;</code></td>
			<td>
				<code>&lt;?php echo JHTML::_(&#39;behavior.keepalive&#39;);?&gt;</code></td>
		</tr>
	</tbody>
</table>
<p>
	&nbsp;</p>
<table class="legacy">
	<caption>
		Working with the menubar and toolbars</caption>
	<thead>
		<tr>
			<th scope="col">
				Usage in Joomla 1.0</th>
			<th scope="col">
				Usage in Joomla 1.5</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>
				<code>mosMenuBar::startTable();<br />
				</code><code>mosToolbar::startTable();</code><br />
				<code> </code></td>
			<td>
				No longer used.</td>
		</tr>
		<tr>
			<td>
				<code>mosMenuBar::endTable();<br />
				</code><code>mosToolbar::endTable();</code><br />
				<code> </code></td>
			<td>
				No longer used.</td>
		</tr>
		<tr>
			<td>
				<code>mosMenuBar::addNew();<br />
				</code><code>mosMenuBar::addNewX();</code><br />
				<code> </code></td>
			<td>
				<code>JToolbarHelper::addNew(&#39;new&#39;, &#39;New&#39;);</code></td>
		</tr>
		<tr>
			<td>
				<code>mosMenuBar::saveedit()</code><code>;</code></td>
			<td>
				<p>
					<code>JToolbarHelper::save(&#39;saveedit&#39;);</code></p>
			</td>
		</tr>
		<tr>
			<td>
				<code>mosToolbar</code></td>
			<td>
				<code>JToolbarHelper</code></td>
		</tr>
	</tbody>
</table>
<p>
	&nbsp;</p>
<table class="legacy">
	<caption>
		Changes to the core database table classes</caption>
	<thead>
		<tr>
			<th scope="col">
				Usage in Joomla 1.0</th>
			<th scope="col">
				Usage in Joomla 1.5</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>
				<code>mosCategory</code></td>
			<td>
				<code>JTableCategory</code></td>
		</tr>
		<tr>
			<td>
				<code>mosContent</code></td>
			<td>
				<code>JTableContent</code></td>
		</tr>
		<tr>
			<td>
				<code>mosComponent</code></td>
			<td>
				<code>JTableComponent</code></td>
		</tr>
		<tr>
			<td>
				<code>mosMambot</code></td>
			<td>
				<code>JTablePlugin</code></td>
		</tr>
		<tr>
			<td>
				<code>mosMambotHandler</code></td>
			<td>
				<code>JDispatcher</code></td>
		</tr>
		<tr>
			<td>
				<code>mosMenu</code></td>
			<td>
				<code>JTableMenu</code></td>
		</tr>
		<tr>
			<td>
				<code>mosModule</code></td>
			<td>
				<code>JTableModule</code></td>
		</tr>
		<tr>
			<td>
				<code>mosSection</code></td>
			<td>
				<code>JTableSection</code></td>
		</tr>
		<tr>
			<td>
				<code>mosSession</code></td>
			<td>
				<code>JTableSession</code></td>
		</tr>
		<tr>
			<td>
				<code>mosUser</code></td>
			<td>
				<code>JTableUser</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Updating the order of items</th>
		</tr>
		<tr>
			<td>
				<code>$result = $row-&gt;updateOrder($where); </code></td>
			<td>
				<code>$result = $row-&gt;reorder($where);</code></td>
		</tr>
		<tr>
			<th colspan="2">
				Publishing a list of items</th>
		</tr>
		<tr>
			<td>
				<code>$result = $row-&gt;publish_array($cid, $publish, $user_id)</code></td>
			<td>
				<code>$result = $row-&gt;publish($cid, $publish, $user_id);</code></td>
		</tr>
	</tbody>
</table>
<p>
	&nbsp;</p>
<table class="legacy">
	<caption>
		Working with plugins</caption>
	<thead>
		<tr>
			<th scope="col">
				Usage in Joomla 1.0</th>
			<th scope="col">
				Usage in Joomla 1.5</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>
				<code>mosMambotHandler::loadBotGroup($group);</code></td>
			<td>
				<code>JPluginHelper::importPlugin($group, null, false);</code></td>
		</tr>
		<tr>
			<td>
				<code>mosMambotHandler::loadBot($folder, $element, $published, $params);</code></td>
			<td>
				<code>JPluginHelper::importPlugin($folder, $element);</code></td>
		</tr>
		<tr>
			<td>
				<code>mosMambotHandler::registerFunction( $event, $function )</code></td>
			<td>
				<code>JApplication::registerEvent( $event, $function );</code></td>
		</tr>
		<tr>
			<td>
				<code>mosMambotHandler::call($event);</code></td>
			<td>
				<pre>
				$dispatcher =&amp; JDispatcher::getInstance();
$result = $dispatcher-&gt;trigger($event, $arguments);</pre>
			</td>
		</tr>
		<tr>
			<td>
				&nbsp;</td>
			<td>
				&nbsp;</td>
		</tr>
	</tbody>
</table>
<p>
	&nbsp;</p>
<table class="legacy">
	<caption>
		File formats</caption>
	<thead>
		<tr>
			<th scope="col">
				Usage in Joomla 1.0</th>
			<th scope="col">
				Usage in Joomla 1.5</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th colspan="2">
				Translation files</th>
		</tr>
		<tr>
			<td>
				<code>/language/english.php</code></td>
			<td>
				<code>/language/en-GB/en-GB.ini</code><br />
				<code>/language/en-GB/en-GB.com_content.ini</code><br />
				<code>/language/en-GB/en-GB.mod_latest_news.ini</code><br />
				<code>/language/en-GB/en-GB.plg_content_code.ini</code></td>
		</tr>
		<tr>
			<td>
				<pre>
				&lt;?php
// Files saved as PHP files
define(&#39;_COMMENTS_TITLE&#39;, &#39;Title&#39;);
define(&#39;_COMMENTS_GUEST_TO_POST&#39;, &#39;Allow guests to post&#39;);
</pre>
			</td>
			<td>
				<pre>
				# Files must be saved as UTF-8 in INI format
COMMENTS_TITLE=Title
COMMENTS_GUEST_TO_POST=Allow guests to post</pre>
			</td>
		</tr>
		<tr>
			<td>
				&nbsp;</td>
			<td>
				&nbsp;</td>
		</tr>
	</tbody>
</table>
