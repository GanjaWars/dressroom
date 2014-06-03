define(['backbone', 'app/Control/ControlModel'], function (Backbone, ControlModel) {
    /**
     * @class ControlView
     * @extends Backbone.View
     */
    var ControlView = Backbone.View.extend(/** @lends ControlView */ {
        /**
         * @protected
         * @type {Object}
         */
        _classes: {
            up: 'control__up',
            down: 'control__down',
            value: 'control__value'
        },

        /**
         * @protected
         * @returns {Object}
         */
        events: function () {
            var events = {};
            events['mousedown .' + this._classes.up] = this._onUpClick;
            events['mousedown .' + this._classes.down] = this._onDownClick;
            return events;
        },

        /**
         * @constructs
         */
        initialize: function (options) {
            this._initModel();

            /**
             * @type {number}
             * @private
             */
            this._timerId = -1;

            /**
             * @const
             * @type {number}
             */
            this.TIMEOUT = 150;

            /**
             * @type {Function}
             * @private
             */
            this._boundOnMouseUp = this._onMouseUp.bind(this);

            /**
             * @type {jQuery}
             * @private
             */
            this._$document = $(document);
        },

        /**
         * @private
         */
        _initModel: function () {
            var min = this.$el.attr('data-min') | 0,
                max = this.$el.attr('data-max') | 0;
            this.model = new ControlModel({
                min: min,
                max: max,
                attrUser: this.$el.attr('data-model-attr'),
                value: min
            });
            this.model.on('change:value', this.render, this);
        },

        render: function () {
            if (!/^param-/.test(this.model.get('attrUser'))) {
                this.$('.' + this._classes.value).html(this.model.get('value'));
            }
        },

        /**
         * @param {Event} e
         * @private
         */
        _onUpClick: function (e) {
            var value = this.model.get('value');
            this._$document.on('mouseup', this._boundOnMouseUp);
            this._timerId = setInterval(function () {
                this.model.set('value', ++value, {validate: true});
            }.bind(this), this.TIMEOUT);
            this.model.set('value', ++value, {validate: true});
        },

        /**
         * @param {Event} e
         * @private
         */
        _onDownClick: function (e) {
            var value = this.model.get('value');
            this._$document.on('mouseup', this._boundOnMouseUp);
            this._timerId = setInterval(function () {
                this.model.set('value', --value, {validate: true});
            }.bind(this), this.TIMEOUT);
            this.model.set('value', --value, {validate: true});
        },

        _onMouseUp: function () {
            clearInterval(this._timerId);
            this._$document.off('mouseup', this._boundOnMouseUp);
        },

        viewValue: function (value) {
            this.$('.' + this._classes.value).text(value);
        }

    });

    return ControlView;
});