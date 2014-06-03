define(['backbone', 'app/Syndicate/Syndicate.Model', 'app/Control/ControlView'], function (Backbone, SyndicateModel, ControlView) {
    /**
     * @class SyndicateView
     * @extends Backbone.View
     */
    var SyndicateView = Backbone.View.extend(/** @lends SyndicateView */{
        el: $('.syndicate'),

        /**
         * @protected
         * @type {object}
         */
        _classes: {
            rank: 'syndicate__rank',
            id: 'syndicate__id',
            name: 'syndicate__name',
            control: 'control'
        },

        /**
         * @constructs
         * @protected
         */
        initialize: function () {
            /**
             * @type {SyndicateModel}
             */
            this.model = new SyndicateModel();
            this.model.on('change:value', this._onChangeValue, this);

            this._initControl();

            /**
             * @type {Object}
             * @private
             */
            this._previousRank = null;

            /**
             * @type {jQuery}
             * @private
             */
            this._$rank = $('.' + this._classes.rank);
        },

        /**
         * @private
         */
        _initControl: function () {
            this._control = new ControlView({
                el: this.$('.' + this._classes.control)
            });
            this._control.model.on('change:value', this._onChangeControlValue, this);
        },

        /**
         * @param {SyndicateModel} model
         * @private
         */
        _onChangeValue: function (model) {
            var rank = model.getRank();
            if (rank !== this._previousRank) {
                this._$rank
                    .removeClass('rank' + ((this._previousRank && this._previousRank.id) || 0))
                        .addClass('rank' + rank.id)
                        .attr('title', rank.name);
                this.trigger('change:rank', this, rank);
            }
            this._control.model.set('value', model.get('value'));
            this._previousRank = rank;
        },

        /**
         * @param {ControlModel} model
         * @private
         */
        _onChangeControlValue: function (model) {
            this.model.set('value', model.get('value'));
        }

    });
    return SyndicateView;
});