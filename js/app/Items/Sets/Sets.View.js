define([
    'backbone',
    'app/Items/Sets/Sets.Collection',
    'app/Items/Sets/sets',
    'app/Items/Sets/Set.View',
    'app/Items/Item.Collection',
    'app/locale'
], function (
    Backbone,
    SetsCollection,
    sets,
    SetView,
    ItemCollection,
    locale) {

    /**
     * @class SetsView
     * @extends Backbone.View
     */
    var SetsView = Backbone.View.extend(/** @lends SetsView */{
        /**
         * @type {jQuery}
         */
        el: $('.sets'),

        /**
         * @type {Object}
         */
        _classes: {
            body: 'sets__table'
        },

        /**
         * @type {Function}
         * @returns {Object}
         */
        events: function () {
            var events = {};
            events['click .' + this._classes.body + ' tr'] = this._onRowClick;
            return events;
        },

        /**
         * @constructs
         */
        initialize: function () {
            this._initCollection();
        },

        /**
         * @private
         */
        _initCollection: function () {
            this.collection = new SetsCollection(sets);
        },

        /**
         * @private
         */
        _onRowClick: function (e) {
            var $tr = $(e.target).closest('[data-set-id]');
            if ($tr.length) {
                var setId = $tr.data('setId') - 1;
                this.hide();
                this.trigger('changeSet', this, setId);
            }
        },

        /**
         * @public
         */
        show: function () {
            this.$el.show();
            return this;
        },

        /**
         * @public
         */
        hide: function () {
            this.$el.hide();
            return this;
        }
    });
    return SetsView;
});