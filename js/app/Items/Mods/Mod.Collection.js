define(['backbone', 'app/Items/Mods/mods', 'app/Items/Mods/Mod.Model'], function(Backbone, mods, ModModel) {
    /**
     * @class ModCollection
     * @extends Backbone.Collection
     */
    var ModCollection = Backbone.Collection.extend({
        /**
         * @type ModModel
         */
        model: ModModel,

        /**
         * @public
         * @param {number|string} type
         * @returns {Array}
         */
        getByType: function (type) {
            type = type | 0;
            return  _.filter(this.models, function (mod) {
                return type === mod.get('type');
            });
        },

        /**
         * @param {number} type
         * @param {number} modId
         */
        getMod: function (type, modId) {
            return _.find(this.models, function (mod) {
                return ((mod.get('modId') == modId) && (mod.get('type') == type));
            });
        }
    });
    return new ModCollection(mods);
});