---
layout:      post
title:       Joomla Templates 107 - Using Template Parameters
description: Joomla template have the ability to provide site users with customisable parameters.
date:        2010-11-11 22:39:31
date:        2009-04-09 10:47:22
category:    joomla-templates
image:
  thumb:     vendor/joomla.png
  feature:    abstract-8.jpg
  credit:     dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---
Joomla template have the ability to provide site users with customisable parameters.  This gives the template designer a great deal of flexibility in allow the user to have few or many options by which to display the template.  Parameters can be used to add additional features, like fancy menu systems, or control the size and shape of the web site in the browser, such as allowing for fixed or fluid width templates.


The user can edit the parameters be editting the template in the Admnistrator Template Manager.


![Screenshot](images/reference/template_edit_parameters.png)


The label, description and type of field is all taken from the template XML file as explained in a previous section.  The values for the parameters are stored in a file called `params.ini` that is saved in the template folder.

## 
Using Parameters in the Master Template File


We need to use PHP again to access the parameters.  There are a number of techniques and strategies for using parameters ranging from the very simple to extremely complicated examples that do require a good working knowledge of PHP.  The following presents many common examples by which you can leverage the parameters for your template.

### 
Setting the Class of an Element


A simple way to use parameters is to give the user a choice of classes by which to set an element.  Let's use the example of a div tag that we want to make either fixed or fluid width.  The definition for the parameter in the XML file could look like this:

    
    <param
            name="body_width"
            type="list"
            default="fluid90"
            label="Body_Width_Label"
            description="Body_Width_Desc">
            <option value="full">Option_Full_width</option>
            <option value="fluid90">Option_Fluid_90_percent</option>
            <option value="fixed1024">Option_Fixed_1024_pixels</option>
            <option value="fixed800">Option_800_pixels</option>
        </param>
    




When the user edits the template, they would get the option of setting the body width to 100% full width, fluid 90% width, fixed at 1024 pixels and fixed at 800 pixels.  You could of course add any number of other options.  To use this in the `index.php` file, we could use the following example:

    
    <body>
        <div class="body_<?php echo $this->params->get('body_width');?>">
        <!-- The rest of the code for the template -->
        </div>
    </body>
    




There is an assumption that we have set up styles in the stylesheet such as _body\_full_, _body\_fluid90_, and so on to actually present the web page in the desired form.  You can see we've used a simple PHP statement to access the value of the parameter using the `echo` command with which you should now be familiar.  The template has a property called `params` which happens to be another object.  This `params `object then has a method called `get` by which we can retrieve the value of the parameter.  We pass the `get` method the name of the parameter as we defined it in the XML file.


Now, what happens if the user was not aware that there were any parameters to set?  Well, it could mean that the value of the parameter is nothing.  If that is the case, then our output will look like this:

    
    <body>
        <div class="body_">
        <!-- The rest of the code for the template -->
        </div>
    </body>




Ok, you could have a class called body\_ to handle this but there is a better way.  The `get` method can take an optional second argument that is the default value if the parameter has accidentally not set.

    
    <body>
        <div class="body_<?php echo $this->params->get('body_width', 'fluid90');?>">
        <!-- The rest of the code for the template -->
        </div>
    </body>




So what this says is make the class of the `div` tag, prefixed with _body\__, the value of the _body\_width_ but if it hasn't been set use _fluid90_.  In the case where the parameter value has not been set, the output would be:

    
    <body>
        <div class="body_fluid90">
        <!-- The rest of the code for the template -->
        </div>
    </body>



### 
Including Alternative Colour Styles


Another common use of parameters is to providing support for change the colour style of the template.  The designer will typically have a secondary stylesheet included to achieve this.  Assuming we incorporated a _list_ type of parameter named _color\_theme_, like in the previous example, to give you the option to choose between a blue, red and green theme for the template.  To support this we have three extra stylesheets named _template\_blue.css_, _template\_red.css_ and _template\_green.css_.  We are going to make the blue theme the default, so we could implement this as follows:

    
    <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template;?>/css/template.css" type="text/css" />
    <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template;?>/css/template<?php echo $this->params->get('color_theme', 'blue');?>.css" type="text/css" />
    




This will include the master stylesheet for the template, and then a secondary template that would include the supplemental styles for providing the color variations.
