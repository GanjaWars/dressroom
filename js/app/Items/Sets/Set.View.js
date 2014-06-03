define(['backbone', 'app/locale'], function(Backbone, locale) {
    /**
     * @class SetView
     * @extends Backbone.View
     */
    var SetView = Backbone.View.extend(/** @lends SetView */ {
        tagName: 'tr',

        /**
         * @type {Function}
         */
        _template: _.template('<td><%= set.index %></td><td><% var _items = []; set.items.forEach(function (item) { _items.push(item.attributes.name); }); print(_items.join(", ")); %></td><td><% _.each(set.bonuses, function (bonus, bonusName) {%><span><%= locale[bonusName] %>: +<%= bonus %></span><% }); %></td><td><%= set.level %></td>'),

        /**
         * @constructs
         */
        initialize: function () {

        },

        render: function () {
            this.$el.html(this._template({'set': this.model.attributes, locale: locale}));
            return this;
        }
    });
    return SetView;
});