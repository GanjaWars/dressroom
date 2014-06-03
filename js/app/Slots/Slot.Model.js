define(['backbone'], function(Backbone) {
    /**
     * @class SlotModel
     * @extends Backbone.Model
     */
    var SlotModel = Backbone.Model.extend({
        /**
         * @protected
         * @type Object
         */
        defaults: {
            value: '',
            mod: ''
        },

        /**
         * @public
         * @returns {String}
         */
        value: function () {
            return this.get('value');
        }
    });
    return SlotModel;
});