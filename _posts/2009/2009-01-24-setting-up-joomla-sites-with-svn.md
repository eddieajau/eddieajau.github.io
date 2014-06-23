---
layout:      post
title:       Setting up Joomla Sites with SVN
description: This tutorial shows you how to set up a Subversion repository for an entire Joomla Web site using CVSDude as an example of a hosted service provider. 
date:        2009-01-24 21:35:13
category:    joomla
image:
  thumb:     vendor/joomla.png
---
When you start out as a Web site designer or developer, managing sites on your local workstation is not too hard, but as the workload increases, and other consultants and contractors become involved, things get more complicated.  How can everyone deploy the same staging site?  How can I get my work back which someone else just overwrote?  What do you do when the client comes back to me 18 months after the project has finished and asks for a copy of the site because they accidentally deleted a few files and you've misplaced them yourself?  One way to address these questions is to store your projects in a source code repository.  There are several different types of repository available but this tutorial will focus on using Subversion (SVN) and how to store the minimum amount of information to conserve repository space as much as possible (because, after all, space is money).

This tutorial is aimed at the advanced Joomla! Web site designer or developer that deals with multiple clients (commercial or otherwise) to assist them in managing either their own work, or projects where they may be one person in a team working on different aspects of the Web site.

## Finding a Subversion Repository

If you already know how to set up a Subversion repository on your own hardware then you can skip this section.  However, if you are like me and have seen your workmates pull their hair out getting Webdav and all the other stuff to work, then there are sites that will provide Subversion services for you.

The Joomla!Code site provides Subversion repositories for developer projects, but please note, what will be shown in this tutorial is **not allowed** on Joomla!Code.  Do not use Joomla!Code for your personal or commercial Web site projects (extensions yes, whole Web sites no).

With that clarification out of the way, I would like to suggest the first place to look is with an Australian service provider called [CVSDude][0].  The great thing about CVSDude is that it offers a free, entry level plan with enough space to give you a taste for how it can work for you.  When you outgrow the free plan, there are a [range of other plans][1] available at very reasonable rates depending on your needs.

For larger Web site projects, involving several developers (like myself building extensions) and one or more designers (doing template work), I will often request the client set up their own CVSDude account for the team of consultants to share while the project is being carried out.  They then have the option of keeping it going after the project is finished, more or less as a restoration backup of the site, or dropping it.  A three month project could cost less that $20 to provide a repository for collaborative development.  Some of the plans also come with a Trac wiki and Bugzilla support.

When you apply for your CVSDude account, the first thing you need to do is set up a module.  This is really just a "bucket" in which your development is done.  The module name can be anything applicable to your project but I often simply use "sites".

![](/images/2009/cvsdude_svn_module_add.png)

Depending on the account you applied for, you may be entitled to set up more modules, but for most projects or even for a single client, one module is enough.  If you have multiple Web sites to do for the same client you can simply add these as subdirectories under a single module.

![](/images/2009/cvsdude_svn_module_added.png)

Your plan may or may not give you much flexibility in terms of additional users.  For the higher plans you may be able to set up access for each "real" users in your team.  For the lower plans I will typically create generic users.  For example, the "Startup" plan which allows you only 2 users so I will set up `client_name_developer` and `client_name_designer` to at least allow tracking of commits between the "coders" and the "templaters".  It is obviously better to be able to track commits from all your users but you have to trafe that off with the extra cost.  The choice is up to you and how much you want to spend.

There is not much more to do from this side of things.  Once you have created your module and users you will be able to connect to Subversion over http with a url something like `http://some_name-svn.cvsdude.com/sites` using your favourite client.  Further information about desktop clients can be found on the [Source Code][2] page of this site.  Most Linux based system will at least have the SVN command line applications installed if you are hosting your own server (shared hosting solutions probably don't).

## Setting Up and Importing to the SVN Repository

So you've organised your Subversion repository somehow.  What next?

What we need to do is set up a directory tree to import to the repository.  We **do not** run up the Joomla! site as the first set - this comes later.

### Importing the Base Directory

Let's assume that you will be running your site up in a directory called `/htdocs/projects/mightymeats/` (where `mightmeats` can be replaced by something meaningful to you - _Mighty Meats_ is the name of my Dad's butcher shop in case you where wondering).  Now these next few steps seem a bit bizzare but it all works so stay with me.  We have to:

1. Import the `mightmeats` directory to the repository.
2. Delete the `mightymeats` directory locally (that's the bizarre bit - but it's because just importing it doesn't put it under what we call source control).
3. Checkout the `mightymeats` directory from the repository to our local file system.

Using a Linux style command line, you would do it like this:

```sh
$ cd htdocs/projects
$ mkdir mightmeats
$ svn import -m "Initial import" mightymeats http://some_name-svn.cvsdude.com/sites/mightymeats

Committed revision 1.
$ rmdir mightymeats
$ svn checkout http://some_name-svn.cvsdude.com/sites/mightymeats mightymeats
Checked out revision 1.
$ ls -al mightymeats total 0
drwxr-xr-x  3 admin  admin  102 Jul 22 10:34 .
drwxr-xr-x  7 admin  admin  238 Jul 22 10:34 ..
drwxr-xr-x  9 admin  admin  306 Jul 22 10:34 .svn
```

You can see we've created the directory and there is also a hidden `.svn` directory within it.  This means that the directory is now under _source control_.

Under Windows, you might use something like TortoiseSVN.  The steps to take using Tortoise would be something like:

1. Create the new directory.
2. Right-click on the new directory.
3. Choose the Import option.
4. Fill out the URL based on what you see above using the command line and execute the import
5. Delete the new directory.
6. Right-click in what is the "parent" directory.
7. Select Checkout.
8. Fill out the URL based on what you see above using the command line and execute the checkout.

If you are using Eclipse (I use [EasyEclipse][3] myself) then you would need to create the directory, create a project on that directory, and follow the _Team -\> Sharing_ Wizard.

### Creating the Main Joomla! Directories

Having the top-most directory under source control gives us the best foundation on which to now create the rest of our site.  For typcial projects you will not want to commit the whole Joomla! file system to the repository.  Doing this for every project would quickly blow out any disk quotas you have.  Rather, we set up a directory tree that matches key points in the Joomla! directory tree into which we want to put customised files.

The main rule to remember is that if you want to commit something to the repository, all of the parent folders must also be in the repository.  The best example of this is the template that will be used for the site.  Let's say we wanted to use the Joomla! Template Content entry [javanya][4] for the site.  In order to commit the javanya template, the `/templates/` directory must also be under source control.  In the same way, if we wanted to add custom made modules to the site, then we would also add the `/modules/` directory to the source tree.  With that in mind, here is the base directory structure that I will commit to the repository.

For Linux, or similar, when in the `/mightmeats/` directory:

```sh
mkdir -p administrator/components
mkdir -p administrator/modules
mkdir -p administrator/language/en-GB
mkdir -p components
mkdir -p images/banners
mkdir -p images/stories
mkdir -p language/en-GB
mkdir -p libraries
mkdir -p modules
mkdir -p plugins/content
mkdir -p plugins/search
mkdir -p plugins/authentication
mkdir -p plugins/system
mkdir -p plugins/user
mkdir -p templates
```

For windows when in the `/mightmeats/` directory:

```php
mkdir administrator/components
mkdir administrator/modules
mkdir administrator/language/en-GB
mkdir components
mkdir images/banners
mkdir images/stories
mkdir language/en-GB
mkdir libraries
mkdir modules
mkdir plugins/content
mkdir plugins/search
mkdir plugins/authentication
mkdir plugins/system
mkdir plugins/user
mkdir templates
```

Depending on your customisation needs, there may be a few more directories to include (for example, the `administrator/templates/` directory if you provide your clients with a branded version of the administrator template) but the list outlined above will cover most of the typical cases.

### Committing the Main Joomla! Directories

Our next step is to commit those directories to the repository.  I'm only going to show the command line versions as it is fairly easy to translate the operations to one of the GUI based tools (Tortoise or Eclipse).

First add the directories to the repository.  In the `/mightmeats/` directory execute the following command:

```sh
$ svn add *
A         administrator
A         administrator/components
A         administrator/language
A         administrator/language/en-GB
A         administrator/modules
A         components
A         images
A         images/banners
A         images/stories
A         language
A         language/en-GB
A         libraries
A         modules
A         plugins
A         plugins/authentication
A         plugins/content
A         plugins/search
A         plugins/system
A         plugins/user
A         templates
```

That should have been a pretty quick operation.  It flags locally that you want all these directories in the repository, but it doesn't actually store them.  To do that, we have to "commit" the directories to the repository, like this:

```sh
$ svn commit -m "Initial import" *
Adding         administrator
Adding         administrator/components
Adding         administrator/language
Adding         administrator/language/en-GB
Adding         administrator/modules
Adding         components
Adding         images
Adding         images/banners
Adding         images/stories
Adding         language
Adding         language/en-GB
Adding         libraries
Adding         modules
Adding         plugins
Adding         plugins/authentication
Adding         plugins/content
Adding         plugins/search
Adding         plugins/system
Adding         plugins/user
Adding         templates

Committed revision 2.
```

That probably took a little more time (compared to the add) because now the directory information is being sent to the repository itself.  The final display of the revision number is always a good sign that the operation went well.

## Running Up Joomla!

We are now ready to run up the Joomla! site and there are a couple of ways we can do this.

The first way is to download the latest distribution from [Joomal!Code][5] (or use a [nightly build][2]) and upack it in the normal way (via the command line or an extraction utility like [7-Zip][6]).

The second way is to export directly from the Joomla! source code repository.  The command line way to do this is via:

```sh
$ svn export --force --username anonymous http://joomlacode.org/svn/joomla/development/releases/1.5 .
A    .
A    index2.php
A    media
A    media/system
A    media/system/swf
A    media/system/swf/uploader.swf
A    media/system/images
A    media/system/images/closebox.png
... and so on
A    libraries/openid/README
A    CHANGELOG.php
Exported revision 10576.
```

Make sure you are still in your equivalent of the `/mightymeats/` directory and observe the "dot" at the end (which translates to export to "here" please).  If you miss that dot, the export will go into a subdirectory.  We use the force option to ensure that Subversion exports over the top of the existing directories.  The operation takes some time.

I recommend using the direct export method only if you need an up-to-date version of Joomla! (probabloy because it contains some fixes you need).  For production sites I would generally recommend only using the latest stable distribution files.

To upgrade Joomla! when a new version comes out, simply repeat the steps above.  Just remember that because you are doing an export, any files that have been removed from the official distribution will not be removed on your local site.

**Tip:** never commit `configuration.php` to the repository because it will mess with the the local installs of others in your team, and the production site.  It's a good idea to mark it with an _ignore_ flag so it can never be accidentally committed.

## Installing and Committing Extensions

The needs and scope of your project will affect whether you commit your extensions to the repository or not.

If you are just a template designer, and the only thing you are contributing to the project is the template, and it is your own repository to manage your own projects, then you probably don't need to commit the third-party extensions to the repository.  All you might really need is the record of the template work you did and a few custom modules, etc.

However, if one of the goals is for multiple people to be able to recreate the file system for the site, then it is a good idea to commit the third-party extensions to the repository.

To do this, you would install the extensions in the normal way.  We have already added all of the install points to the repository (`/components/`, `/modules/`, etc) so, once installed, you simply need to add the extension and then commit it.

For example, you might install the [Fireboard][7] extension.  You would add the `com_fireboard` directories (frontend and backend) to the repository (most tools recursively add all the subdirectories), and then you would commit those directories.  Do the same for any modules and language files.

**Now, here is where you need to be careful!** Unless you have a good reason for it, you never want to commit the Joomla! source code to the repository.  It is really easy to do this accidentally so be careful!  If you are using the command line, make sure you add and commit in the correct directory.  If you are using a GUI tools, make sure you right-click (or similar) only on the directory you want to add and/or commit.

## Upgrading and Removing Extensions

Okay, there is a second area where you need to be careful.  Some Joomla! 1.5 developers are using the `method="upgrade"` flag in their packages which allows you to reinstall new versions of an extension without removing the existing one first (like you had to do in 1.0 ).  This causes the least impact on your local copy.  It usually means that you have to add some more files and commit others that have changed.  Again, you might have to be careful with files that have been removed.

If you have to remove and extension completely, or upgrade by removing the old copy, you have to also delete the files from the repository.  Even though you can remove the extension from your local copy using the Joomla! uninstall process, the next time you update from the repository the files will come back.

## Deploying the Site in a New Location

It's one thing to have your local site working, and have all the files safely committed to the repository, but how do you deploy this site to another location?

Basically you follow most of the steps you used to create the site in the first place:

1. Login to your remote server.
2. Checkout the repository in the web root (or appropriate location) of your Web site.
3. Download Joomla! and unpack it or export it directly from the Joomla!Code SVN.
4. Manually set up the configuration.php file.
5. Export your local database (using phpMyAdmin or similar).
6. Set up your remote database and import from your local export.

Using Linux style commands (and using example directories), you would enter commands similar to the following:

```sh
$ cd /var/www/html
$ svn checkout http://some_name-svn.cvsdude.com/sites/mightymeats .
A    administrator
A    administrator/language
A    administrator/language/en-GB
A    administrator/components
A    administrator/modules
A    plugins
A    plugins/authentication
A    plugins/system
A    plugins/search
A    plugins/content
A    plugins/user
A    language
A    language/en-GB
A    components
A    images
A    images/banners
A    images/stories
A    modules
A    libraries
A    templates
Checked out revision 2.
```

You may be asked for a password when you try to checkout for the first time, for example:

```sh
Authentication realm: <http://some_name-svn.cvsdude.com:80> CVSDude.com Subversion Login
Password for 'foobar':
```

Usually "foobar" is what you are logged into the server as, and this will be different to the username used to connect to the repository.  Just press the Enter key and you will then be asked for your username and password.  After you have done this the first time, your connection credentials should be cached on the server.

**Tip:** If you are on a client's server and you don't want to risk your access credentials to your private Subversion server to be cached, use the `--no-auth-cache` option when using any subversion operation.  The downside is that you will have to constantly type your username and password in, but that is the price of security.

Next we get the Joomla! package using one of the techniques outlined previous.  This time we will get the package directly from Joomla!Code using wget and unpack it.

```sh
$ wget http://joomlacode.org/gf/download/frsrelease/9294/34965/Joomla_1.5.9-Stable-Full_Package.tar.gz
... lots of output as it comes down the wire
11:47:07 (586 KB/s) - `Joomla_1.5.9-Stable-Full_Package.tar.gz' saved [4162842/4162842]
$ tar -xzf Joomla_1.5.9-Stable-Full_Package.tar.gz
$
```

Finally, copy the database and set up `configuration.php`.

At this stage it becomes important for you to establish a "point of truth" for your data.  Is it your local site, or the remote site?  That's a question you have to work out between yourself and your team or client.

When you make a change locally and want to see the change reflected on the remote server, simply log in to the server and naviagate to the web root directory.  Then you will issue an `svn update` command, like this:

```sh
$ cd /var/www/html
$ svn update
A    modules/mod_signup
A    modules/mod_signup/view.php
A    modules/mod_signup/mod_signup.xml
A    modules/mod_signup/index.html
A    modules/mod_signup/mod_signup.php
A    modules/mod_signup/tmpl
A    modules/mod_signup/tmpl/default.php
A    modules/mod_signup/tmpl/index.html
Updated to revision 3.
```

If no changes have been made since your last update, you will just see the current version number of the repository, otherwise you will see a list of file changed, added or deleted.  If you are sure you have made a change then double check that you haven't forgotten to commit the files you changed.

## Conclusion

This tutorial has attempted to outline the method I using for a number of years to deploy small to large Joomla! projects.  Hopefully it allows you to increase your productivity and the reliability by which you can deploy Web sites.  Fortunately, though, this is not the end of the story because there are some other tricks and tips for helping to automate some the processes above - particularly with regard to updating your sites with many components using a thing called [Phing][8].  But until I am able to write that next installment, I hope you enjoy committing your projects to Subversion.

[0]: http://cvsdude.com/
[1]: https://node14.cvsdude.com/product.pl
[2]: http://developer.joomla.org/code.html
[3]: http://www.easyeclipse.org/site/distributions/php.html
[4]: http://forum.joomla.org/viewtopic.php?t=215070
[5]: http://joomlacode.org/gf/project/joomla/frs/?action=FrsReleaseBrowse&frs_package_id=3786
[6]: http://www.7-zip.org/
[7]: http://www.bestofjoomla.com/
[8]: http://phing.info/
