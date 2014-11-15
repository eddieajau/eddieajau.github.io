---
layout:      post
title:       Building a command line application with the Joomla Framework - Part 11 - Wiring up
description: This tutorial looks at how to wire up a model into a command line application built using the Joomla Framework.
date:        2013-09-18 20:07:50
category:    joomla-framework
image:
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
## Wiring up the model and rendering output

In [Part 10][0], I looked at the design of the model class I used to handle the "data" for the application. In this tutorial I'm going to look at how I wired it all up to finally produce my changelog.

The source code for this tutorial is available in under `v1.2` tag on [Github][1].

### Wiring up the model

Now that I have my model, it's time to look at how it is all wired up. This is done in the application's [`doExecute`][2] method so let's have a look at the final product.
    
        public function doExecute()
        {
            // Check if help is needed.
            if ($this->input->get('h') || $this->input->get('help'))
            {
                $this->help();
    
                return;
            }
    
            $config = $this->container->get('config');
            $user = $this->input->get('user', $config->get('github.user'));
            $repo = $this->input->get('repo', $config->get('github.repo'));
    
            if (empty($user) or empty($repo))
            {
                throw new \UnexpectedValueException(
                    'A Github user and repository must be provided via the command line or application configuration.'
                );
            }
    
            $state = new Registry(array(
                'user' => $user,
                'repo' => $repo,
            ));
    
            $model = new Model($this->container->get('github'), $state);
            $model->setLogger($this->container->get('logger'));
            $log = $model->getChangelog();
    
            $this->renderLog($log);
        }

Let's step through this.

If `-h` or `--help` has been provided as a command line argument, we stop everything and display a help message.

If not, I'm getting the configuration from the application's DI container. I'm then checking if `--user=aUserName` and/or `--repo=aRepoName` have been provided as a command line argument. If not, I'm falling back to what is set in the configuration file. Then, if either of those are not set, I throw an exception.

Following this, I prepare a `Registry` for the model state. I then create the model injecting the Github service provider and the state object. I then set the logger.

Next. I call the public `getChangelog` method in the model which will connect to github.com or an instance of Github Enterprise and do its thing. That result I pass to a new method called `renderLog` in the application.

### Converting the data into output

There are a couple of ways I could have handled rendering the data from the model, but for now I've opted for the most simple. I'm just using the application's `out` method to produce a result. Fancier solutions using template engines like [Mustache][3] or [Twig][4] could obviously be employed, but this exercise is so simply it hardly justifies it - at least, not for this version of the application.

Here is the [`renderLog`][5] method that I called from the `doExecute` method:
    
        private function renderLog($log)
        {
            foreach ($log as $tag)
            {
                $this->out(sprintf('## %s - %s', $tag['tag']->tag, $tag['tag']->date));
    
                foreach ($tag['pulls'] as $pull)
                {
                    $this->out();
                    $this->out(
                        sprintf(
                            '* [# %d](%s) : %s by [%s](%s) %s',
                            $pull->number,
                            $pull->url,
                            $pull->title,
                            $pull->user_login,
                            $pull->user_url,
                            $pull->merged_at
                        )
                    );
                }
    
                $this->out();
            }
        }

It's a pretty simple nested loop culminating in using the application's `out` method to produce the formatted output.

The output is in [Markdown][6] format so that I can easily paste my changelogs to a Github wiki.

## Running the final application

Well, we've arrived. It's time to run the application and see what it does on the [Tagaliser][7] repository.

### Output before tagging

Below, I've captured the output of a run, specifying the Github user and repository on the command line. I've already issued and merged my own pull request for the changes I've been explaining in the last few lessons, but I've not yet tagged the repository as version 1.2\. Here's the output:

    
    $ php -f bin/tagaliser.php -- --user=eddieajau --repo=tagaliser
    [2013-09-02 14:31:21] Tagaliser.INFO: Getting pulls page #01. [] []
    [2013-09-02 14:31:21] Tagaliser.INFO: ---------------------------------------- [] []
    [2013-09-02 14:31:26] Tagaliser.INFO: Got 3 merged pulls. [] []
    [2013-09-02 14:31:26] Tagaliser.INFO: Getting tags page #01. [] []
    [2013-09-02 14:31:26] Tagaliser.INFO: ---------------------------------------- [] []
    [2013-09-02 14:31:30] Tagaliser.INFO: Got 2 tags. [] []
    [2013-09-02 14:31:30] Tagaliser.INFO: Getting pulls page #02. [] []
    [2013-09-02 14:31:30] Tagaliser.INFO: ---------------------------------------- [] []
    [2013-09-02 14:31:31] Tagaliser.INFO: Got 0 merged pulls. [] []
    # Not tagged - to date.
    
    * [# 5](https://api.github.com/repos/eddieajau/tagaliser/pulls/5) : Add changelog builder. by [eddieajau](https://api.github.com/users/eddieajau) 2013-09-02T04:27:53Z
    
    # v1.1 - 2013-08-26T01:44:58Z
    
    * [# 2](https://api.github.com/repos/eddieajau/tagaliser/pulls/2) : Adding Github and DI by [eddieajau](https://api.github.com/users/eddieajau) 2013-08-26T01:43:48Z
    
    # v1.0 - 2013-08-23T06:55:41Z
    
    * [# 1](https://api.github.com/repos/eddieajau/tagaliser/pulls/1) : Get the basic application working by [eddieajau](https://api.github.com/users/eddieajau) 2013-08-23T06:54:03Z

You should be able to see where the model is sending messages to the logger (all the lines starting with a date-time stamp). The result is telling me that there is one pull request in the tag "v1.0" and also one in the tag "v1.1". It's also picking up that there is a pull request after the last tag as indicated by the "Not tagged - to date" heading.

### Output after tagging

Now I'm going to push the tags up to the repository:
    
    $ git push --tags
    Counting objects: 1, done.
    Writing objects: 100% (1/1), 156 bytes, done.
    Total 1 (delta 0), reused 0 (delta 0)
    To https://github.com/eddieajau/tagaliser.git
     * [new tag]         v1.2 -> v1.2

And then it's time to run the application again:
    
    $ php -f bin/tagaliser.php -- --user=eddieajau --repo=tagaliser
    [2013-09-02 14:39:45] Tagaliser.INFO: Getting pulls page #01. [] []
    [2013-09-02 14:39:45] Tagaliser.INFO: ---------------------------------------- [] []
    [2013-09-02 14:39:51] Tagaliser.INFO: Got 3 merged pulls. [] []
    [2013-09-02 14:39:51] Tagaliser.INFO: Getting tags page #01. [] []
    [2013-09-02 14:39:51] Tagaliser.INFO: ---------------------------------------- [] []
    [2013-09-02 14:39:56] Tagaliser.INFO: Got 3 tags. [] []
    [2013-09-02 14:39:56] Tagaliser.INFO: Getting pulls page #02. [] []
    [2013-09-02 14:39:56] Tagaliser.INFO: ---------------------------------------- [] []
    [2013-09-02 14:39:57] Tagaliser.INFO: Got 0 merged pulls. [] []
    # v1.2 - 2013-09-02T04:37:48Z
    
    * [# 5](https://api.github.com/repos/eddieajau/tagaliser/pulls/5) : Add changelog builder. by [eddieajau](https://api.github.com/users/eddieajau) 2013-09-02T04:27:53Z
    
    # v1.1 - 2013-08-26T01:44:58Z
    
    * [# 2](https://api.github.com/repos/eddieajau/tagaliser/pulls/2) : Adding Github and DI by [eddieajau](https://api.github.com/users/eddieajau) 2013-08-26T01:43:48Z
    
    # v1.0 - 2013-08-23T06:55:41Z
    
    * [# 1](https://api.github.com/repos/eddieajau/tagaliser/pulls/1) : Get the basic application working by [eddieajau](https://api.github.com/users/eddieajau) 2013-08-23T06:54:03Z

And there you can see that it has picked up that my most recent pull request belonged to the "v1.2" tag.

## End of Part 11

Well, that's it for now. There are lots of bells and whistles we could add to the application, fix a few bugs to fix that you might have already noticed and maybe write some unit tests, but these tutorials should provide you a good grounding in how to make a command line application using the Joomla Framework. In fact, you'll use a lot of the same principles when designing any sort of application on the Joomla Framework be it a web application like the Joomla CMS, or a web services application that could power something like Github's developer API.

I hope you've enjoyed the series. Let me know what you thought and what I can write about next.


[0]: /posts/building-a-command-line-application-with-the-joomla-framework-part-10.html "A model for the application."
[1]: https://github.com/eddieajau/tagaliser/tree/v1.2 "Click here to see the source code for part 11 of building a command line application with the Joomla Framework."
[2]: https://github.com/eddieajau/tagaliser/blob/v1.2/src/Tagaliser/Application.php#L45
[3]: http://mustache.github.io
[4]: http://twig.sensiolabs.org
[5]: https://github.com/eddieajau/tagaliser/blob/v1.2/src/Tagaliser/Application.php#L134
[6]: http://daringfireball.net/projects/markdown/
[7]: https://github.com/eddieajau/tagaliser
