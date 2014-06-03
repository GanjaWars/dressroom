define(['backbone', 'app/Items/Mods/Mod.Collection', 'app/Items/Mods/Mod.Model'], function(Backbone, ModCollection, ModModel) {
    /**
     * @class ModView
     * @extends Backbone.View
     */
    var ModView = Backbone.View.extend(/** @lends ModView */{
        /**
         * @type {Function}
         */
        template: _.template('<option value="">---</option><% if (mods.length) { mods.forEach(function (mod) {%><option value="<%= mod.get("modId") %>"><%= mod.get("name") %></option><% }); } %>'),

        events: function () {
            var events = {};
            events['change'] = this._onChange;
            return events;
        },

        /**
         * @constructs
         */
        initialize: function () {
            this.model = new ModModel();
            this.model.on('change:value', this._onChangeValue, this);
        },

        /**
         * @param {number|string} type
         * @returns {ModView}
         */
        render: function (type) {
            var mods = ModCollection.getByType(type);
            this.$el
                .prop('disabled', !mods.length)
                .html(this.template({mods: mods}));
            return this;
        },

        /**
         * @private
         */
        _onChange: function () {
            this.model.set('value', this.$el.val() | 0);
        },

        /**
         * @private
         */
        _onChangeValue: function () {
            this.$el.val(this.model.get('value'));
        },

        /**
         * @public
         */
        hide: function () {
            this.$el.hide();
        },

        /**
         * @public
         */
        show: function () {
            this.$el.show();
        },

        /**
         * @public
         */
        empty: function () {
            this.model.set('value', 0);
        }
    });
    return ModView;
});