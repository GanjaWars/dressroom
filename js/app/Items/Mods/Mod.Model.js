define(['backbone'], function(Backbone) {
    /**
     * @class ModModel
     * @extends Backbone.Model
     */
    var ModModel = Backbone.Model.extend({
        defaults: {
            value: 0
        }
    });
    return ModModel;
});