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
            "click .linkedopentextinput-widget .button.user": "onUserAnswerClicked"
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

            if (this.model.get('modelAnswer') == "") {
                this.$(".linkedopentextinput-modelanswer").addClass("hide-model");
                this.$(".linkedopentextinput-useranswer").css("width", "100%");
            }
            if ((this.model.get('_layout') == 'right') || (this.model.get('_layout') == 'left')) {
                this.$(".linkedopentextinput-useranswer").css("width", "100%");
                this.$(".linkedopentextinput-modelanswer").css("width", "100%");
                this.$(".linkedopentextinput-modelanswer").css("display", "none");
                this.$(".model").css("visibility", "visible");
            } else {
                this.$(".model").css("visibility", "hidden");

            }


            QuestionView.prototype.postRender.apply(this);


        },

        evaluateNavigation: function() {
            var currentStage = this.model.get('_stage');
            var itemCount = this.model.get('_itemCount');

            if (currentStage == 0) {
                this.$('.narrative-control-left').addClass('narrative-hidden');

                if (itemCount > 1) {
                    this.$('.narrative-control-right').removeClass('narrative-hidden');
                }
            } else {
                this.$('.narrative-control-left').removeClass('narrative-hidden');

                if (currentStage == itemCount - 1) {
                    this.$('.narrative-control-right').addClass('narrative-hidden');
                } else {
                    this.$('.narrative-control-right').removeClass('narrative-hidden');
                }
            }

        },
        calculateWidths: function() {
            var slideWidth = this.$('.narrative-slide-container').width();
            var slideCount = this.model.get('_itemCount');
            var marginRight = this.$('.narrative-slider-graphic').css('margin-right');
            var extraMargin = marginRight === "" ? 0 : parseInt(marginRight);
            var fullSlideWidth = (slideWidth + extraMargin) * slideCount;
            var iconWidth = this.$('.narrative-popup-open').outerWidth();

            this.$('.narrative-slider-graphic').width(slideWidth)
            this.$('.narrative-strapline-header').width(slideWidth);
            this.$('.narrative-strapline-title').width(slideWidth);
            this.$('.narrative-strapline-title-inner').width(slideWidth - iconWidth);

            this.$('.narrative-slider').width(fullSlideWidth);
            this.$('.narrative-strapline-header-inner').width(fullSlideWidth);

            var stage = this.model.get('_stage');
            var margin = -(stage * slideWidth);

            this.$('.narrative-slider').css('margin-left', margin);
            this.$('.narrative-strapline-header-inner').css('margin-left', margin);

            this.model.set('_finalItemLeft', fullSlideWidth - slideWidth);
        },
        preRender: function() {
            this.listenTo(Adapt, 'device:changed', this.reRender, this);
            this.listenTo(Adapt, 'device:resize', this.resizeControl, this);
            this.setupLinkedModel();
            this.model.set('_isEnabled', this.model.get('_linkedModel').get('_isSubmitted'));
            console.log("Prerender: " + this.model.get('_linkedModel').get('_userAnswer'));
            this.setDeviceSize();
        },
        resizeControl: function() {
            this.setDeviceSize();
            this.calculateWidths();
            this.evaluateNavigation();
        },
        reRender: function() {
            if (this.model.get('_wasHotgraphic') && Adapt.device.screenSize == 'large') {
                this.replaceWithHotgraphic();
            }
        },
        setDeviceSize: function() {
            if (Adapt.device.screenSize === 'large') {
                this.$el.addClass('desktop').removeClass('mobile');
                this.model.set('_isDesktop', true);
            } else {
                this.$el.addClass('mobile').removeClass('desktop');
                this.model.set('_isDesktop', false)
            }
        },

        setupLinkedModel: function() {
            var linkedModel = Adapt.components.findWhere({
                _id: this.model.get('_linkedToId')
            });
            this.model.set('_linkedModel', linkedModel);
            console.log("setupLinkedModel: " + this.model.get('_linkedModel'));
        },
        listenToLinkedModel: function() {
            this.listenTo(this.model.get('_linkedModel'), 'change:_userAnswer', this.onLinkedUserAnswerChanged);
        },
        onLinkedUserAnswerChanged: function(linkedModel) {
            this.$(".linkedopentextinput-useranswer").text(this.model.get('_linkedModel').get('_userAnswer'));
            this.$(".linkedopentextinput-inner").addClass("display");
        },

        onModelAnswerShown: function() {
            //display model answer from json
            if (this.model.get('_layout') === 'right' || this.model.get('_layout') === 'left') {
                this.$(".linkedopentextinput-useranswer").css("display", "none");
                this.$(".linkedopentextinput-modelanswer").css("display", "inline-block");
                this.$(".user").css("visibility", "visible");
            }

        },
        onUserAnswerShown: function() {
            if (this.model.get('_layout') === 'right' || this.model.get('_layout') === 'left') {
                this.$(".linkedopentextinput-useranswer").css("display", "inline-block");
                this.$(".linkedopentextinput-modelanswer").css("display", "none");
                this.$(".model").css("visibility", "visible");
            }

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
