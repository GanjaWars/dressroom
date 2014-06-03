define(['backbone', 'app/Items/Item.Collection', 'app/Items/Mods/Mod.View'], function (Backbone, itemCollection, ModView) {
    /**
     * @class SlotView
     * @extends Backbone.View
     */
    var SlotView = Backbone.View.extend({
        /**
         * @private
         */
        _classes: {
            options: 'slot__select',
            mod: 'slot__mod'
        },

        /**
         * @type {Function}
         * @returns {Object}
         */
        events: function () {
            var events = {};
            events['change .'+ this._classes.options] = this._changeItem;
            return events;
        },

        /**
         * @constructor
         */
        initialize: function () {
            this.items = itemCollection.getBySlot(this.model.id);
            this.$item = this.$('.' + this._classes.options);
            this.model.on('change:value', this._changeValue, this);
            this._initOptions();
            this._initMod();
        },

        /**
         * @private
         */
        _initMod: function () {
            this.mod = new ModView({
                el: this.$('.' + this._classes.mod)
            });
            this.mod.model.on('change:value', this._onChangeMod, this);
        },

        /**
         * @private
         */
        _onChangeMod: function (model) {
            this.model.set('mod', model.get('value'));
        },

        /**
         * @type {Function}
         * @private
         */
        _templateOption: _.template('<option value="<%= id %>" <% if (typeof eun !== "undefined") { %>class="slot__art"<% } %>><% if (typeof required !== "undefined" && typeof required["level-combat"] !== "undefined") { print(required["level-combat"]); } else { print(0); } %>) <%= name %></option>'),

        /**
         * @private
         */
        _initOptions: function () {
            if (!this.items.length) {
                return;
            }
            var $options = this.$('.' + this._classes.options);
            $options.append('<option value="">---</option>');
            _.each(this.items, function (item) {
                var $option = this._templateOption(item.attributes);
                $options.append($option);
            }, this);
        },

        /**
         * @private
         */
        _changeItem: function () {
            var val = this.$item.val();
            this.model.set('value', val);
        },

        /**
         * @private
         */
        _changeValue: function (e) {
            var itemId = this.model.value(),
                item = itemCollection.getById(itemId),
                itemType = (item && item.get('type')) || 0;
            this.$item.val(itemId);
            this.mod.render(itemType);
        },

        /**
         * @param {object} options
         * @param {String} itemId
         */
        setItem: function (itemId, options) {
            var item = itemCollection.getById(itemId);
            this.model.set('value', itemId, options);
        },

        /**
         * @returns {boolean}
         */
        isEmpty: function () {
            return !this.model.get('value');
        }
    });
    return SlotView;
});