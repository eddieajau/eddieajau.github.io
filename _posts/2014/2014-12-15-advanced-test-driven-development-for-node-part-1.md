---
layout:      post
title:       Advanced Test Driven Development for Node - Part 1
description: Part 1 of my attempt to port Robert C. Martin's talk '8LU:Advanced Concepts in TDD' to Node.
tags:        tdd, test driven development
date:        2014-12-15 10:00:00
category:    ["node", "javascript"]
image:
  feature:    abstract-6.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

This is a part 1 of a port-to-Node of Robert C. Martin's [8LU:Advanced Concepts in TDD](https://vimeo.com/71816368) (TDD = Test Driven Development) video presentation. What I'm aiming for is a thought-for-thought equivalent of his examples using Node instead of Java. 

I was really impressed with the video, and I decided I wanted to recreate the idea in Node (and there's no reason why the same principles don't apply to JavaScript in general). While an exact match is not possible, the principles of what he was showing carry across most languages.

## Setting the scene

Robert's example is to design the code for an environment controller in a thermostat mechanism thingy. It's assumed that the base hardware is going to poll the environment controller to check the environment, so we don't have to worry about any timing functions. All the environment controller has to do is adjust the HVAC (Heating, Ventilation, Air-Conditioning) unit controller for which we are given the following API from the manufacturer which I've converted into a Node module:

```js
/**
 * An imaginary interface for the HVAC unit controller class.
 */
function HVAC() {
}

HVAC.prototype.heaterIsOn = function () { /* Unknown */ };
HVAC.prototype.coolerIsOn = function () { /* Unknown */ };
HVAC.prototype.blowerIsOn = function () { /* Unknown */ };

HVAC.prototype.setHeater = function (state) { /* Unknown */ };
HVAC.prototype.setCooler = function (state) { /* Unknown */ };
HVAC.prototype.setBlower = function (state) { /* Unknown */ };

HVAC.prototype.getActualTemperature = function () { /* Unknown */ };

module.exports = HVAC;
```

## Setting up the test environment with Mocha

I'm going to use vanilla Mocha for these examples (see [mochajs.org](http://mochajs.org) for details on how to install the command line tool). My basic source tree is going to look like this:

```
root
|- src
|  `- EnvironmentController.js
`- test
   |- doubles
   |  `- HvacDouble.js
   `- EnvironmentControllerTest.js
```

## A test double for the HVAC controller

The first thing we need is a simple test double, a stub, to simulate the HVAC controller. Robert goes through a few iterations, and they are worth following in the video, but to just get things working he builds something that might look similar to this in Node. 

```js
/**
 * test/doubles/HvacDouble.js
 */

function HvacDouble() {
	this.heaterState = true;
	this.coolerState = true;
	this.blowerState = true;
}

HvacDouble.prototype.heaterIsOn = function () {
	return this.heaterState;
};

HvacDouble.prototype.coolerIsOn = function () {
	return this.coolerState;
};

HvacDouble.prototype.blowerIsOn = function () {
	return this.blowerState;
};

HvacDouble.prototype.setHeater = function (state) {
	this.heaterState = state;
};

HvacDouble.prototype.setCooler = function (state) {
	this.coolerState = state;
};

HvacDouble.prototype.setBlower = function (state) {
	this.blowerState = state;
};

module.exports = HvacDouble;
```

Robert uses a lot of private scope in the Java example, and I will try and address that at a later time otherwise it will just distract us from the basic lessons we want to learn.  All we've done here is stub out the methods of the HVAC API that we've been provided (we have no idea, nor do we care, what the real implementation details are to make the HVAC work).

## First draft of the Environment Controller

The first draft of the Environment Controller is simply to get a simple use case tested - that is, when the Environment Controller is created, it turns everything off in the HVAC.

But, we start with the test (not the source) code:

```js
/**
 * test/EnvironmentControllerTest.js
 */

var assert = require('assert');

var HVAC = require('./doubles/HvacDouble');
var EnvironmentController = require('../src/EnvironmentController');

describe('EnvironmentController', function () {

	it('should turn everything off upon construction', function () {
		var hvac = new HVAC();
		var controller = new EnvironmentController(hvac);

		assert(!hvac.heaterIsOn());
		assert(!hvac.coolerIsOn());
		assert(!hvac.blowerIsOn());
	});

});
```

The test sets up the behaviour we are expecting from the Environment Controller (this is why we call it Test Driven Development). Notice that the description of the test is fairly verbose so there should be no confusion to your team (which includes your future self) about what we are testing.

Robert goes on to rough out some basic code for the Environment Controller which translates roughly to the following in Node:

```js
/**
 * src/EnvironmentController.js
 *
 * The Environment Controller class.
 *
 * @param {HVAC} hvac 
 * @constructor
 */
function EnvironmentController(hvac) {
	hvac.setHeater(false);
	hvac.setCooler(false);
	hvac.setBlower(false);
}

module.exports = EnvironmentController;
```

So we've got a constructor function that takes an instance of the HVAC unit controller, and it just turns the heating, cooling and fans off (it is initialising the state of the system). That's pretty rough code, but it's a perfectly acceptable place to start to just get things working, or rather, get the tests passing.

```sh
$ mocha

  EnvironmentController
    ✓ should turn everything off upon construction 

  1 passing (2ms)

```

Pretty basic stuff but you should be able to see that the tests are beginning to constrain the problem, and they will get more and more specific. The next question is what do we test next? More on that next time.
