/*
 * adapt-contrib-linkedopenTextInput
 * License - http://github.com/adaptlearning/adapt_framework/LICENSE
 * Maintainers
 * Thomas Eitler <thomas.eitler@learnchamp.com>
 * Barbara Fellner <me@barbarafellner.at>
 * Petra Nussdorfer <petra.nussdorfer@learnchamp.com>
 */




define(function(require) {
    var QuestionView = require('coreViews/questionView');
    var Adapt = require('coreJS/adapt');


    var LinkedOpenTextInput = QuestionView.extend({
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

            // Read the last saved answer and paste it into the textarea
            this.$(".linkedopentextinput-item-textbox").val(this.getUserAnswer());


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
        supports_html5_storage: function() {
            // check for html5 local storage support
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch (e) {
                return false;
            }
        },
        canSubmit: function() {
            // function copied from textInput component
            var canSubmit = true;
            if ($(".linkedopentextinput-item-textbox").val() == "") {
                canSubmit = false;
            }
            return canSubmit;
        },
       
        storeUserAnswer: function() {
            // store user answer from textarea to localstorage
            var userAnswer = this.$(".linkedopentextinput-item-textbox").val();
            // use unique identifier to avoid collisions with other components
            var identifier = this.model.get('_id') + "-LinkedOpenTextInput-UserAnswer";

            if (this.supports_html5_storage()) {
                localStorage.setItem(identifier, userAnswer);
                this.model.set("_isSaved", true);
            } else {
                console.warn("No local storage available");
            }
        },
        onSaveClicked: function(event) {
            event.preventDefault();

            this.storeUserAnswer();

            var pushObject = {
                title: "",
                body: this.model.get('savedMessage'),
                _timeout:2000,
                _callbackEvent: "pageLevelProgress:stayOnPage"
            };
            

            Adapt.trigger('notify:push', pushObject);
        },

        onClearClicked: function(event) {
            event.preventDefault();

            var promptObject = {
             title: "Clear Text",
            body: "Do you really want to delete your written text?",
            _prompts:[
                {
                    promptText: "Yes",
                    _callbackEvent: "clickEvent:clearText",
                },
                {
                    promptText: "No",
                    _callbackEvent: "pageLevelProgress:stayOnPage"
                }
            ],
            _showIcon: true
        };


            Adapt.on('clickEvent:clearText', function() {
                // Error: Undefined is not a function
                this.clearTextarea();
            }, this);

            Adapt.trigger('notify:prompt', promptObject);
            
        },

        clearTextarea: function(event) {
            this.$(".linkedopentextinput-item-textbox").val('');
            this.storeUserAnswer();

        },

        onSubmitClicked: function(event) {
            event.preventDefault();

            if (!this.canSubmit()) return;

            Adapt.tabHistory = $(event.currentTarget).parent('.inner');

            this.model.set({
                _isEnabled: false,
                _isSubmitted: true,
            });
            this.$(".component-widget").addClass("submitted user");

            var userAnswer = this.$(".linkedopentextinput-item-textbox").val();
            this.model.set("_userAnswer", userAnswer);

            this.storeUserAnswer();
        },
        onEnabledChanged: function() {
            this.$('.linkedopentextinput-item-textbox').prop('disabled', !this.model.get('_isEnabled'));
        },
        onModelAnswerShown: function() {
            this.$(".linkedopentextinput-item-textbox").val(this.model.get('modelAnswer'));
        },
        onUserAnswerShown: function() {
            this.$(".linkedopentextinput-item-textbox").val(this.getUserAnswer());
        },
        getUserAnswer: function() {
            var identifier = this.model.get('_id') + "-LinkedOpenTextInput-UserAnswer";
            var userAnswer = '';
            if (this.supports_html5_storage()) {
                userAnswer = localStorage.getItem(identifier);
            } else {
                console.warn("No local storage available");
            }
            return userAnswer;
        },
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