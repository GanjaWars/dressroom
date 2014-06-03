define(['backbone'], function (Backbone) {
    /**
     * @class ControlModel
     * @extends Backbone.Model
     */
    var ControlModel = Backbone.Model.extend({
        defaults: {
            value: 0
        },

        /**
         * @param {Object} attrs
         * @returns {String|undefined}
         */
        validate: function (attrs) {
            if (attrs.value < attrs.min || (attrs.value > attrs.max && attrs.max > 0)) {
                return 'Validation error';
            }
            if (['param-straight', 'param-sharpshooting', 'param-endurance', 'param-life'].indexOf(attrs.attrUser) > -1) {
                /**
                 * todo: Переписать. Это не должно быть в модели
                 */
                var freeStats = parseInt($('.free-stats').html(), 10);
                if (attrs.value - this.value() > freeStats) {
                    return 'Validation error';
                }
            }
        },

        /**
         * @returns {number|undefined}
         * @param {Number} [value]
         */
        value: function (value) {
            if (typeof value == 'undefined') {
                return this.get('value');
            }
            this.set('value', value, {validate: true});
        }
    });
    return ControlModel;
});