define(['jquery', 'backbone'], function ($, Backbone) {
    "use strict";

    /**
     * @class LoadUserForm
     * @type {Backbone.View}
     */
    var LoadUserForm = Backbone.View.extend({
        el: $('.load-user'),

        /**
         * @type {Object}
         */
        _classes: {
            userType: 'load-user__user-type'
        },

        /**
         * @type {Object}
         */
        _selectors: {
            type: 'input[name=type]'
        },

        /**
         * @returns {Object}
         */
        events: function () {
            var events = {};
            events['change ' + this._selectors.type] = this._onTypeChange;
            events['submit'] = this._onSubmit;
            return events;
        },

        /**
         * @param {Event} e
         * @private
         */
        _onSubmit: function (e) {
            e.preventDefault();
            var params = {};
            this.$el.serializeArray().forEach(function (item) {
                params[item.name] = item.value;
            });
            window.location.href = '/?' + params.type + '=' + params.user;
        },

        /**
         * @param {Event} e
         * @private
         */
        _onTypeChange: function (e) {
            this.$('.' + this._classes.userType).text($(e.currentTarget).data('value'));
        }
    });
    return LoadUserForm;
})
;