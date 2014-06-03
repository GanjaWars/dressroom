define(['backbone'], function (Backbone) {
    /**
     * @class ItemModel
     * @extends Backbone.Model
     */
    var ItemModel = Backbone.Model.extend({
        /**
         * @public
         * @returns {boolean}
         */
        isWeapon: function () {
            return this.get('type') <= 6;
        },

        /**
         * @public
         * @returns {boolean}
         */
        isTwoHandedWeapon: function () {
            return this.isWeapon() && this.get('slots')[0] === '0+1';
        },

        /**
         * @public
         * @returns {Array}
         */
        getAllSlots: function () {
            var itemSlots = [];
            this.get('slots').forEach(function (slot) {
                itemSlots = _.union(itemSlots, _.map((slot + '').split('+'), parseFloat));
            });
            return itemSlots;
        },

        /**
         * @public
         * @returns {boolean}
         */
        isMoreOneSlot: function () {
            return (this.get('slots')[0] + '').split('+').length > 1;
        },

        /**
         * @public
         * @returns {Array}
         */
        getMoreOneSlots: function () {
            return this.isMoreOneSlot() ? (this.get('slots')[0] + '').split('+').map(parseFloat) : [];
        },

        /**
         * @public
         * @returns {number}
         */
        getFirstSlot: function () {
            return (this.get('slots')[0] + '').split('+').map(parseFloat).shift();
        },

        /**
         * @public
         * @param {number} slotId
         * @returns {boolean}
         */
        checkMoreSlots: function (slotId) {
            return (!this.isMoreOneSlot() || slotId === this.getFirstSlot());
        },

        /**
         * @public
         * @returns {boolean}
         */
        isGrenade: function () {
            return this.isWeapon() && this.getFirstSlot() === 12;
        }
    });
    return ItemModel;
});