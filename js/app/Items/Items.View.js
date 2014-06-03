define([
    'backbone',
    'app/Items/Item.Collection',
    'app/Items/items',
    'app/Slots/Slot.Model',
    'app/Slots/Slot.View',
    'app/Items/Sets/sets',
    'app/Items/Items.Model',
    'app/Items/Mods/Mod.Collection'
], function (
    Backbone,
    ItemCollection,
    Items,
    SlotModel,
    SlotView,
    sets,
    ItemsModel,
    ModCollection) {

    /**
     * @class ItemsView
     * @extends Backbone.View
     */
    var ItemsView = Backbone.View.extend(/** @lends ItemsView */{
        el: $('.items'),

        /**
         * @protected
         */
        _classes: {
            slot: 'items__slot',
            images: 'items__images'
        },

        /**
         * @type {Array}
         */
        slotNames: ['Левая рука', 'Правая рука', 'Пояс', 'Голова', 'Корпус', 'Спина', 'Ноги', 'Транспорт', 'Левый карман', 'Правый карман', 'Очки', 'Чипсет', 'Граната'],

        /**
         * @constructor
         */
        initialize: function () {
            /**
             * @type {ItemCollection}
             */
            this.collection = ItemCollection;



            /**
             * @type {Object}
             */
            this.slots = {};

            this._initSlots();
            this._initModel();
        },

        /**
         * @private
         */
        _initModel: function () {
            this.model = new ItemsModel();
            this.model.on('change:value', this._onChangeValue, this);
        },

        /**
         * @private
         */
        _onChangeValue: function () {
            this.setItems(this.model.get('value'));
        },

        /**
         * @type {Function}
         */
        _templateImages: _.template('<%\
           _.each(slots, function (slot, index) { \
                if (slot && slot.item && (!slot.item.isMoreOneSlot() || index === slot.item.getFirstSlot())) { %>\
                    <a href="http://www.ganjawars.ru/item.php?item_id=<%= slot.item.id %><% if (slot.mod) { %>&m=<%= slot.mod.get("modId") %><% } %>" title="<% print(slot.item.get("name")); %><% if (slot.mod) {%> [<%= slot.mod.get("name") %>]<% } %>" target="_blank"><img src="http://images.ganjawars.ru/img/items/<%= slot.item.id  %>_s.jpg" /></a><% \
                }\
           });\
        %>'),

        /**
         * @private
         */
        _initSlots: function () {
            _.each(this.$('.' + this._classes.slot), this._initSlot, this);
        },

        /**
         * @private
         */
        _initSlot: function (slotEl) {
            var $slot = $(slotEl),
                slotId = $slot.data('slotId'),
                slotModel = new SlotModel({
                    id: slotId
                }),
                slotView = new SlotView({
                    el: $slot,
                    model: slotModel
                });
            if (slotView) {
                slotModel.on('change', this._changeItem, this);
                this.slots[slotId] = slotView;
            }
        },

        /**
         * @param {number} slotId
         * @private
         */
        _emptySlot: function (slotId) {
            this.slots[slotId].setItem('');
            this.slots[slotId].mod.empty();
        },

        /**
         *
         * @param {Array} [slots]
         * @public
         */
        emptySlots: function (slots) {
            if (!_.isArray(slots)) {
                slots = [];
                _.each(this.slots, function (slot, index) {
                    slots.push(index);
                });
            }
            slots.forEach(function (slotId) {
                this._emptySlot(slotId);
            }.bind(this));
        },

        /**
         * @param {SlotModel} slot
         * @private
         */
        _emptySlotsByPreviousItem: function (slot) {
            if (!slot) {
                return;
            }
            var previousItem = this.collection.getById(slot._previousAttributes.value);
            if (previousItem) {
                this.emptySlots(this._getOtherSlotsByItem(previousItem));
            }
        },

        /**
         * @param {ItemModel} item
         * @returns {Array}
         * @private
         */
        _getOtherSlotsByItem: function (item) {
            var slots = [];
            if (item) {
                _.each(this.slots, function (slot) {
                    if (slot.model.get('value') === item.id && item.isMoreOneSlot()) {
                        slots.push(slot.model.id);
                    }
                });
            }
            return slots;
        },

        /**
         * @param {ItemModel} item
         * @param {SlotModel} slot
         * @private
         */
        _setItemOnOtherSlots: function (item, slot) {
            this._emptySlotsByPreviousItem(slot);
            if (!item || (item && !item.isMoreOneSlot())) {
                return;
            }

            var otherSlots = _.without(item.getAllSlots(), slot.id);
            otherSlots.forEach(function (slotId) {
                this.slots[slotId].setItem(item.id);
            }.bind(this));
        },

        /**
         * @param {SlotModel} slot
         * @private
         */
        _changeItem: function (slot) {
            var itemId = slot.get('value'),
                slotId = slot.id,
                item = this.collection.getById(itemId);
            if (slot.changed.value) {
                this._setItemOnOtherSlots(item, slot);
                if (item.isTwoHandedWeapon()) {
                    this.slots[1].mod.hide();
                } else if (item.isWeapon() && !item.isTwoHandedWeapon() && !item.isGrenade()) {
                    this.slots[1].mod.show();
                }
            }
            this._renderImages();
            this.trigger('changeItem', this, item);
        },

        /**
         * @private
         */
        _renderImages: _.debounce(function () {
            var slots = [];
            _.each(this.slots, function (slot) {
                var item = this.collection.getById(slot.model.get('value'));
                if (item) {
                    slots[slot.model.id] = {
                        item: item,
                        mod: ModCollection.getMod(item.get('type'), slot.model.get('mod'))
                    };
                }
            }, this);
            this.$('.' + this._classes.images).html(this._templateImages({slots: slots}));
        }),

        /**
         * @public
         */
        allDressOff: function () {
            this.emptySlots();
        },

        /**
         * @type {Array} items
         */
        setItems: function (items) {
            if (_.isArray(items)) {
                items.forEach(function (itemId) {
                    var modId;
                    itemId = itemId.split(/\[(\d+)\]/);
                    if (itemId[1]) {
                        modId = itemId[1];
                    }
                    itemId = itemId[0];
                    var item = ItemCollection.getById(itemId);
                    if (item) {
                        var slotId;
                        if (item.isWeapon() && item.getFirstSlot() === 0 && !item.isTwoHandedWeapon() && !this.slots[0].isEmpty()) {
                            slotId = 1;
                        } else {
                            slotId = item.getFirstSlot();
                        }
                        this.slots[slotId].setItem(itemId);
                        if (modId) {
                            this.slots[slotId].mod.model.set('value', modId);
                        }
                    }
                }.bind(this));
            }
        },

        /**
         * @param {number} setId
         */
        setItemsSet: function (setId) {
            var itemSet = sets[setId];
            if (itemSet) {
                this.setItems(itemSet.items);
            }
        }
    });
    return ItemsView;
});