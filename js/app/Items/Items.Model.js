define(['backbone'], function (Backbone) {
    /**
     * @class ItemsModel
     * @extends Backbone.Model
     */
    var ItemsModel = Backbone.Model.extend({
        defaults: {
            value: {}
        }
    });
    return ItemsModel;
});