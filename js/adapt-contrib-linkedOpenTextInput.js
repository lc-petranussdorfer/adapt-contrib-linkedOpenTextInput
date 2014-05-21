/*
 * adapt-contrib-linkedOpenTextInput
 * License - http://github.com/adaptlearning/adapt_framework/LICENSE
 * Maintainers
 * Thomas Eitler <thomas.eitler@learnchamp.com>
 * Barbara Fellner <me@barbarafellner.at>
 * Petra Nussdorfer <petra.nussdorfer@learnchamp.com>
 */




define(function(require) {
    var QuestionView = require('coreViews/questionView');
    var Adapt = require('coreJS/adapt');
    var OpenTextInput = require('components/adapt-contrib-openTextInput/js/adapt-contrib-openTextInput');

    var LinkedOpenTextInput = OpenTextInput.extend({
        events: {
            "click .linkedopentextinput-widget .button.model": "onModelAnswerClicked",
            "click .linkedopentextinput-widget .button.user": "onUserAnswerClicked",
        },


        postRender: function() {
            
        },
        preRender: function() {
            
        },
        setupLinkedModel: function() {
            
        },
 
       
        onModelAnswerShown: function() {
            
        },
        onUserAnswerShown: function() {
            
        },
        getUserAnswer: function() {
            
        },

        
    });

    Adapt.register("linkedopentextinput", LinkedOpenTextInput);

});