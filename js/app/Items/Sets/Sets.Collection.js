define(['backbone', 'app/Items/Sets/Set.Model'], function(Backbone, SetModel) {
    /**
     * @class SetsCollection
     * @extends Backbone.Collection
     */
    var SetsCollection = Backbone.Collection.extend(/** @lends SetsCollection */ {
        /**
         * @type {Function}
         */
        model: SetModel,

        /**
         * @constructs
         */
        initialize: function () {

        }
    });
    return SetsCollection;
});