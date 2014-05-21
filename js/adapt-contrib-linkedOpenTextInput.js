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
            // IMPORTANT! 
            // Both of the following methods need to be called inside your view.

            // Use this to set the model status to ready. 
            // It should be used when telling Adapt that this view is completely loaded.
            // This is sometimes used in conjunction with imageReady.
            this.setReadyStatus();

            // Use this to set the model status to complete.
            // This can be used with inview or when the model is set to complete/the question has been answered.
            this.setCompletionStatus();

            QuestionView.prototype.postRender.apply(this);
        },
        preRender: function() {
            this.setupDefaultSettings();
            this.resetQuestion({
                resetAttempts: true,
                initialisingScreen: true
            });
            // we do not need feedbackarrays
            this.listenTo(this.model, 'change:_isEnabled', this.onEnabledChanged);
        },
        setupDefaultSettings: function() {
            // initialize saved status
            this.model.set("_isSaved", false);

            QuestionView.prototype.setupDefaultSettings.apply(this);
        },


        forceFixedPositionFakeScroll: function() {
            // function copied from textInput component
            if (Modernizr.touch) {
                _.defer(function() {
                    window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
                });
            }
        },

 
       
        onModelAnswerShown: function() {
            // this.$(".modelAnswer").css
        },
        onUserAnswerShown: function() {
            //this.$(".userAnswer").css
        },
        /*getUserAnswer: function() {
            var identifier = this.model.get('_id') + "-OpenTextInput-UserAnswer";
            var userAnswer = '';
            if (this.supports_html5_storage()) {
                userAnswer = localStorage.getItem(identifier);
            } else {
                console.warn("No local storage available");
            }
            return userAnswer;
        },*/
        onComplete: function(parameters) {
            this.model.set({
                _isComplete: true,
                _isEnabled: false,
            });
            this.$(".component-widget").addClass("disabled");
            // this.showMarking();
            this.showUserAnswer();
            Adapt.trigger('questionView:complete', this);
        },
        
        markQuestion: function() {}
    });

    Adapt.register("linkedopentextinput", LinkedOpenTextInput);

});