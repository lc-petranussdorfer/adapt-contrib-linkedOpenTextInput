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
    var OpenTextInput = require('components/adapt-contrib-openTextInput/js/adapt-contrib-openTextInput');


    var LinkedOpenTextInput = QuestionView.extend({
        events: {

            "click .linkedopentextinput-widget .button.model": "onModelAnswerClicked",
            "click .linkedopentextinput-widget .button.user": "onUserAnswerClicked",
        },


        postRender: function() {
            this.setReadyStatus();
            this.setCompletionStatus();
            this.listenToLinkedModel();

            // Check if the original component is already submitted
            if (this.model.get('_linkedModel').get('_isSubmitted')) {
                // Show linked component, display user answer
                this.$(".linkedopentextinput-useranswer").text(this.model.get('_linkedModel').get('_userAnswer'));
            }




            QuestionView.prototype.postRender.apply(this);
        },
        preRender: function() {
            this.setupLinkedModel();
            this.model.set('_isEnabled', this.model.get('_linkedModel').get('_isSubmitted'));
            console.log("Prerender: " + this.model.get('_linkedModel').get('_userAnswer'));


        },
        setupLinkedModel: function() {
            var linkedModel = Adapt.components.findWhere({
                _id: this.model.get('_linkedToId')
            });
            this.model.set('_linkedModel', linkedModel);
            console.log("setupLinkedModel: " + this.model.get('_linkedModel'));
        },
        listenToLinkedModel: function() {
            this.listenTo(this.model.get('_linkedModel'), 'change:_isSubmitted', this.onLinkedSubmittedChanged);
            this.listenTo(this.model.get('_linkedModel'), 'change:_userAnswer', this.onLinkedUserAnswerChanged);

        },
        onLinkedSubmittedChanged: function(linkedModel) {
            if (linkedModel.get('_isSubmitted')) {

                /* this.$(".linkedopentextinput-useranswer").text(this.model.get('_linkedModel').get('_userAnswer'));
                 */

                console.log("Is submitted in onLinkedSubmittedChanged: " + this.model.get('_linkedModel').get('_userAnswer'));

            }

        },

        onLinkedUserAnswerChanged: function(linkedModel) {
            this.$(".linkedopentextinput-useranswer").text(this.model.get('_linkedModel').get('_userAnswer'));
        },

        onModelAnswerShown: function() {
            this.$(".linkedopentextinput-item-textbox").val(this.model.get('modelAnswer'));
        },
        onUserAnswerShown: function() {
            this.$(".linkedopentextinput-item-textbox").val(this.getUserAnswer());
        },
        getUserAnswer: function() {
            /* var identifier = this.model.get('_id') + "-LinkedOpenTextInput-UserAnswer";
            var userAnswer = '';
            if (this.supports_html5_storage()) {
                userAnswer = localStorage.getItem(identifier);
            } else {
                console.warn("No local storage available");
            }
            return userAnswer;*/
        },
        onComplete: function(parameters) {
            /* this.model.set({
                _isComplete: true,
                _isEnabled: false,
            });
            this.$(".component-widget").addClass("disabled");
            // this.showMarking();
            this.showUserAnswer();
            Adapt.trigger('questionView:complete', this);*/
        },

        markQuestion: function() {}
    });

    Adapt.register("linkedopentextinput", LinkedOpenTextInput);

});
