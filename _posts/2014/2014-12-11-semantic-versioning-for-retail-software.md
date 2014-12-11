---
layout:      post
title:       Semantic versioning for retail software
description: 
tags:        semver, semantic versioning, software
date:        2014-12-11 10:00:00
category:    ["development"]
image:
  feature:    abstract-6.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

[Semantic Versioning](http://semver.org) is a very popular versioning strategy for software packages that gives developers a strategy for coping with (as the SemVer site puts it) _"dependency hell"_. The version number holds information that helps us determine if and when it's safe to upgrade. This is fine at the package level, where the sofware developer is effectively dealing directly with the warehouse. But does semantic versioning carry forward to use in _"retail"_ software, that is, the software the we developers produce and provide to other people to use?

> TL;DR - SemVer is great for developers sourcing (pun intended) code directly from the warehouse, but it does not always give the retail consumer of software, particularly Open Source software, an indication of whether they absolutely need to spend valuable time on the upgrade. The proposal is to always increment the _minor_ version number to signal to the retail user that it's worth their time upgrading the software, even if technically only a bug patch.

## SemVer basics

You can read the exact specification for semantic versioning (SemVer) on [their site](http://semver.org), but it works on these basic principles:

1. The version number is made up of three integers in the form `X.Y.Z`, and those integers indicate a major (X), minor (Y) and patch (Z) change in the software.
2. You increment the major version when you break compatibility (no matter how small).
3. You increment the minor version when you introduce new features that are backward-compatible.
4. You increment the patch version when you fix bugs in a backward-compatible manner.
5. The actual number hold no special significance except when a major version of zero (`0.y.z`) is used (aka: use at your own risk).

There are a few other nuances with respect to pre-releases, and it's also a fact the most of use **are** using `0.` code in production (I'm looking at you Node), but you should get the idea. The point is that SemVer gives you some indication as to the impact of a change over a purely incremental version strategy.

This works really well when we are actually building our software at the atomic level, but can it be useful for the finished product that is used, and I'm thinking mostly along the lines of Open Source software, by a non-developer consumer?

## But should I upgrade?

I love software upgrades for things I use personally, particularly games (like the next 15 levels in Angry Birds, or a new character type in Warhammer Quest). I'm generally not as thrilled about upgrading software on which other people rely, like my web site, or something huge like a payroll system (thankfully I've escaped ever having to build one of those babies). I'm even less thrilled about getting the "a new version has been released" email for the fourth day in a row.

When considering the software version, SemVer might give me a few clues as to whether I want or need to upgrade. For example, a major upgrade is probably always going to be met with apprehension because there's a good chance that something will break. New features (a change in the _minor_ version) might pique my interest, but do I need to worry about every bug fix?

When is it worth my time stressing over whether I need to upgrade a patch version?

## House rules for SemVer

There is one thing of which we can always be certain - the software we ship will contain bugs. Someone is always going to find them and their presence is going to range in severity from mild annoyance to catastrophic failure. SemVer, however, gives us no clue about the consequences of delaying an upgrade. For example, as far as SemVer is concerned, a small bug in the CSS of a Content Management System is no more or less significant than a zero-day security exploit if both are neither new features nor introduce backward incompatibilities.

To counter this, I propose that a slight adjustment to the _minor_ version could be useful as a house rule. 

> **Proposal:** Use an increment in the _minor_ version to indicate times when you want to signal to the user that it is really important to upgrade.

So, for example, whenever you fix a serious security exploit, increment the _minor_ version even if it doesn't technically qualify as a new feature. Likewise for a functional bug that is affecting the majority of your users.

This house rule opens up some other possibilities as well:

* It could allow you to configure your software to only automatically watch for minor updates.
* It could allow you to respond to patching minor issues more frequently (daily even), keeping more individual users more happy.
* It could allow you to make informal release announcements for patches and spin up the marketing machinery just for _minor_ and _major_ releases.

## Conclusion 

I think semantic versioning can be a good fit for retail software, providing that you can intuitively incorporate information about when the consumer has to upgrade (or, rather, when they can delay making the decision for as long as possible). It would appear that the _minor_ version number could be used effectively to get their attention.

As for anything, the key is to communicate to your users clearly and consistently.
