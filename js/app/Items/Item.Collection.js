define(['backbone', 'app/Items/items', 'app/Items/Item.Model'], function (Backbone, items, ItemModel) {
    /**
     * @class ItemCollection
     * @extends Backbone.Collection
     */
    var ItemCollection = Backbone.Collection.extend(/** @lends ItemCollection */{
        /**
         * @type {ItemModel}
         */
        model: ItemModel,

        /**
         * @param {string} slots
         * @returns {Array}
         */
        getBySlot: function (slots) {
            return _.filter(this.models, function (item) {
                var itemSlots = [];
                item.get('slots').forEach(function (slot) {
                    itemSlots = _.union(itemSlots, _.map((slot + '').split('+'), parseFloat));
                });
                return itemSlots.indexOf(slots) !== -1;
            });
        },

        /**
         * @param {number} itemId
         * @returns {ItemModel}
         */
        getById: function (itemId) {
            return _.find(this.models, function (item) {
                return item.id === itemId;
            });
        },

        /**
         * @param {string} itemName
         * @returns {ItemModel}
         */
        getByName: function (itemName) {
            return _.find(this.models, function (item) {
                return item.get('name') === itemName;
            });
        }
    });
    return new ItemCollection(items);
});