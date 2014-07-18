#adapt-contrib-linkedOpenTextInput

An Adapt core contributed linkedOpenTextInput component that allows the user to view his already answered question. This is a subclass of adapt-contrib-openTextInput

##Installation

First, be sure to install the [Adapt Command Line Interface](https://github.com/adaptlearning/adapt-cli), then from the command line run:-

        adapt install adapt-contrib-linkedOpenTextInput

This component can also be installed by adding the component to the adapt.json file before running `adapt install`:

        "adapt-contrib-openTextInput": "*"

##Usage

Once installed, the component can be used to ask the user open questions.

##Settings overview

For example JSON format, see [example.json](https://github.com/adaptlearning/adapt-contrib-narrative/blob/master/example.json). A description of the core settings can be found at: [Core model attributes](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes).

Further settings for this component are:

####_component

This value must be: `linkedOpenTextInput`

####_classes

You can use this setting to add custom classes to your template and LESS file.

####_layout

This defines the position of the component in the block. Values can be `full`, `left` or `right`. 

####_linkedToId

The id of the related openTextInput component.

####title

This value is the title for the linkedOpenTextInput element. This is mandatory, but will not be displayed.

####displayTitle

This value is the displayed title for the linkedOpenTextInput element. This is optional and will be displayed.

####body

This is the main text for the linkedOpenTextInput.

####placeholder

This value will be displayed if the user has not submitted the opentextinput component.

####modelAnswer

This value is the best practise answer. The user can compare this answer to his one.

####_buttons

The value of the buttons

#####showModelAnswer

This value is displayed on the showModelAnswer Button.

#####showUserAnser

This value is displayed on the showUserAnswer Button.

##Limitations
 
To be completed.

##Browser spec

This component has been tested to the standard Adapt browser specification.
