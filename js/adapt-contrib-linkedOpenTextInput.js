/*
 * adapt-contrib-linkedOpenTextInput
 * License - http://github.com/adaptlearning/adapt_framework/LICENSE
 * Maintainers
 * Thomas Eitler <thomas.eitler@learnchamp.com>
 * Barbara Fellner <me@barbarafellner.at>
 * Petra Nussdorfer <petra.nussdorfer@learnchamp.com>
 */

define(function(require) {
    var ComponentView = require('coreViews/componentView');
    var Adapt = require('coreJS/adapt');
    var OpenTextInput = require('components/adapt-contrib-openTextInput/js/adapt-contrib-openTextInput');

    var LinkedOpenTextInput = ComponentView.extend({
        events: {
            'click .linkedOpenTextInput-action-button': 'onActionClicked'
        },
        preRender: function() {
            this.setupLinkedModel();
            this.listenTo(this.model.get('_linkedModel'), 'change:_isComplete', this.showUserAnswer);
            console.log('9');
            console.log(this.model.get('_linkedModel').get('_isComplete'));
        },
        postRender: function() {
            this.setReadyStatus();
            this.$linkedTextbox = this.$('.linkedOpenTextInput-item-textbox');
            if (this.model.get('_linkedModel').get('_isComplete')) {
                this.showUserAnswer();
            }
        },
        setupLinkedModel: function() {
            var linkedModel = Adapt.components.findWhere({
                _id: this.model.get('_linkedToId')
            });
            this.model.set('_linkedModel', linkedModel);
        },
        showUserAnswer: function() {
            this.$('.linkedOpenTextInput-action-button').prop('disabled', false);
            this.model.set('_buttonState', 'user');
            this.updateActionButton(this.model.get('_buttons').showModelAnswer);
            this.$linkedTextbox.val(this.model.get('_linkedModel').get('_userAnswer'));
        }, 
        showModelAnswer: function() {
            this.model.set('_buttonState', 'model');
            this.updateActionButton(this.model.get('_buttons').showUserAnswer);
            this.$linkedTextbox.val(this.model.get('modelAnswer'));
        },
        updateActionButton: function(buttonText) {
            this.$('.linkedOpenTextInput-action-button')
                .html(buttonText);
        },
        onActionClicked: function(event) {
            if (this.model.get('_buttonState') == 'model') {
                this.showUserAnswer();
            } else {
                this.showModelAnswer();
            }
        }
    });
    Adapt.register('linkedOpenTextInput', LinkedOpenTextInput);
});
