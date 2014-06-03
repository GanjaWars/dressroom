define([
    'backbone',
    'app/User/User.Model',
    'app/Control/ControlView',
    'app/Items/Items.View',
    'app/Syndicate/Syndicate.View',
    'app/Items/Sets/Sets.View',
    'app/locale',
    'app/Forms/LoadUser/LoadUserForm'
], function (Backbone, UserModel, ControlView, ItemsView, SyndicateView, SetsView, locale, LoadUserForm) {

    /**
     * @class UserView
     * @extends Backbone.View
     */
    var UserView = Backbone.View.extend(/** @lends UserView */{
        /**
         * @type {Object}
         */
        _classes: {
            content: 'wrapper',
            control: 'control',
            health: 'health',
            freeStats: 'free-stats',
            bonuses: 'bonuses',
            itemsCostGb: 'items-cost-gb',
            itemsCostEun: 'items-cost-eun',
            itemsWeight: 'items-weight',
            itemsWeightBalance: 'items-weight-balance',
            transportSpeed: 'transport-speed',
            armorHead: 'items-armor-head',
            armorBody: 'items-armor-body',
            armorFoots: 'items-armor-foots',
            camouflage: 'items-camouflage',
            nightvision: 'items-nightvision',
            allDressOff: 'items__all-dress-off',
            showSets: 'items__sets',
            blacker: 'blacker',
            actionSave: 'action__save',
            actionLoad: 'action__load',
            popupSave: 'popup__save',
            popupLoad: 'popup__load',
            saveText: 'save__text',
            attentions: 'attentions',
            loadUserForm: 'load-user'
        },

        /**
         * @type {Function}
         * @returns {Object}
         */
        events: function () {
            var events = {};
            events['click .' + this._classes.allDressOff] = this._allDressOff;
            events['click .' + this._classes.showSets] = this._onShowSetsClick;
            events['click .' + this._classes.blacker] = this._onBlackerClick;
            events['click .' + this._classes.actionSave] = this._onSaveClick;
            events['click .' + this._classes.actionLoad] = this._onLoadClick;
            return events;
        },

        el: $('.wrapper'),

        _bonusTemplate: _.template(
            '<% _.each(all, function (bonusValue, bonusName) {%>' +
                '<% if (/bonus-/.test(bonusName) && bonusValue > 0) {%>' +
                '<p class="skill"><span class="skill__title"><%= bonuses[bonusName] %>:</span><span title="В обычном бою" class="skill__value"><%= battle[bonusName] %></span>, <span title="В синдикатном бою" class="skill__value"><%= bonusValue %></span></p>' +
                '<% } %>' +
                '<% }); %>'),

        _templateHp: _.template('[<span title="Количество HP в обычном бою"><%= values.battle.hp %></span> / <span title="Количество HP в синдикатном бою"><%= values.all.hp %></span>]'),

        _templateNightvision: _.template('<span title="В обычном бою"><%= values.battle.nightvision %>%</span>, <span title="В синдикатном бою"><%= values.all.nightvision %>%</span>'),

        _templateCamouflage: _.template('<span title="В обычном бою"><%= values.battle.camouflage %>%</span>, <span title="В синдикатном бою"><%= values.all.camouflage %>%</span>'),

        _templateAttentions: _.template('<% _.each(attentions, function (attentionValue, attentionName) {%>' +
            '<p class="attention">Недостаточное значение параметра <span class="f_bold">"<%= locale[attentionName] ? locale[attentionName] : attentionName %></span>". Необходимое значение: <span class="f_bold"><%= attentionValue %></span></p>' +
            '<% }); %>'),

        /**
         * @constructs
         */
        initialize: function () {
            /**
             * @type {Object}
             * @private
             */
            this._controls = {};


            /**
             * @type {ItemsView}
             */
            this.items = null;


            this._initControls();
            this._initSyndicate();
            this._initModel();
            this._initItems();


            this._initSets();
            this._initBlacker();

            this._initLoadSet();

            this._initLoadUser();
        },

        /**
         * @private
         */
        _initLoadUser: function () {
            this._loadUserForm = new LoadUserForm();
        },

        /**
         * @param {String} name
         * @returns {String}
         * @private
         */
        _GET: function (name) {
            var match = new RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
            return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
        },

        /**
         * @private
         */
        _initLoadSet: function () {
            var setId = (this._GET('set') | 0) - 1;
            if (setId !== null && setId > -1) {
                this.items.emptySlots();
                this.items.setItemsSet(setId);
            }
        },

        /**
         * @private
         */
        _initBlacker: function () {
            this.$_blacker = $('.' + this._classes.blacker);
            this.$_body = $('body');
        },

        /**
         * @private
         */
        _initSyndicate: function () {
            this._syndicate = new SyndicateView();
            this._syndicate.on('change:rank', this._onChangeSyndicateRank, this);
            this._syndicate.model.on('change:value', this._onChangeSyndicateValue, this);
        },

        /**
         * @private
         */
        _initItems: function () {
            this.items = new ItemsView();
            this.model.slots = this.items.slots;
            this.items.on('changeItem', this._onChangeItem, this);
            this.items.model.set('value', this.model.get('items'));
        },

        /**
         * @private
         */
        _onChangeItem: function () {
            this.model.set('items', this.model.getItemsNamesInSlots());
            this.render();
        },

        /**
         * @private
         */
        _initModel: function () {
            this.model = new UserModel();
            this.model.on('change', this._onChange, this);
            if (window.user) {
                this.model.set(user);
            }
        },

        /**
         * @private
         */
        _initControls: function () {
            var self = this;
            _(this.$('.' + this._classes.control)).each(function (control) {
                if ($(control).data('modelAttr') !== 'level-syndicate') {
                    var controlView = new ControlView({
                        el: self.$(control)
                    });
                    var attrName = controlView.$el.attr('data-model-attr');
                    self._controls[attrName] = controlView;
                    controlView.model.on('change:value', self._onControlChange, self);
                }
            });
        },

        /**
         * @private
         */
        _onBlackerClick: function () {
            this._hideBlacker();
        },

        /**
         * @private
         */
        _initSets: function () {
            this._sets = new SetsView();
            this._sets.on('changeSet', this._onChangeSet, this);
        },

        /**
         * @private
         */
        _hideBlacker: function () {
            $('.popup').hide();
            this.$_blacker.hide();
            this.$_body.css({overflow: 'auto'});
        },

        /**
         * @private
         */
        _showBlacker: function () {
            this.$_blacker.show();
            this.$_body.css({overflow: 'hidden'});
        },

        /**
         * @param {SetsView} setsView
         * @param {number} setId
         * @private
         */
        _onChangeSet: function (setsView, setId) {
            this.items.setItemsSet(setId);
            this._hideBlacker();
        },

        /**
         * @private
         */
        _onShowSetsClick: function (e) {
            e.preventDefault();
            this._sets.show();
            this._showBlacker();
        },

        /**
         * @param {SyndicateView} syndicate
         * @param {Object} rank
         * @private
         */
        _onChangeSyndicateRank: function (syndicate, rank) {
            this.model.addValues(rank.bonuses);
            this.model.setSyndicateRankValues(rank.bonuses);
            this.render();
        },

        /**
         * @private
         */
        _onChangeSyndicateValue: function (model) {
            this.model.set('level-syndicate', model.get('value'));
        },

        /**
         * @param {UserModel} model
         * @private
         */
        _onControlChange: function (model) {
            var attr = model.get('attrUser');
            if (!attr) {
                return;
            }
            this.model.set(attr, model.get('value'));
        },

        /**
         * @public
         */
        render: _.debounce(function () {
            this.model.calc();
            this._renderNickname();
            this._renderHealth();
            this._renderStats();
            this._renderSkills();
            this._renderItems();
            this._renderSyndicate();
            this._renderAttentions();
        }),

        /**
         * @private
         */
        _renderAttentions: function () {
            var attentions = {};
            _.each(this.model.getRequired(), function (requiredValue, requiredName) {
                // todo: костыль
                requiredName = requiredName.replace(/^skill-/, 'weaponSkill-');
                requiredName = requiredName.replace(/^level-synd$/, 'level-syndicate');

                var value = this.model._values.all[requiredName] || this.model.get(requiredName) || 0;
                if (value !== false && value < requiredValue) {
                    attentions[requiredName] = requiredValue;
                }
            }, this);
            this.$('.' + this._classes.attentions).html(this._templateAttentions({attentions: attentions, locale: locale}));
        },

        /**
         * @private
         */
        _renderSyndicate: function () {
            this.$('.syndicate__id').html(this.model.get('syndicate-id'));
            this.$('.syndicate__name').html('<a href="http://www.ganjawars.ru/syndicate.php?id=' + this.model.get('syndicate-id') + '">' + this.model.get('syndicate-name') + '</a>');
        },

        /**
         * @private
         */
        _renderNickname: function () {
            this.$('.nickname').text(this.model.get('nickname'));
        },

        /**
         * @private
         */
        _renderItems: function () {
            this._renderItemsCost();
            this._renderWeight();
            this._renderSpeed();
            this._renderArmor();
        },

        /**
         * @private
         */
        _renderArmor: function () {
            this.$('.' + this._classes.armorHead).text(this.model.values.armorHead + ', ' + this.model.values.armorActiveHead + '%');
            this.$('.' + this._classes.armorBody).text(this.model.values.armorBody + ', ' + this.model.values.armorActiveBody + '%');
            this.$('.' + this._classes.armorFoots).text(this.model.values.armorFoots + ', ' + this.model.values.armorActiveFoots + '%');
            this.$('.' + this._classes.camouflage).html(this._templateCamouflage({values: this.model._values}));
            this.$('.' + this._classes.nightvision).html(this._templateNightvision({values: this.model._values}));
        },

        /**
         * @private
         */
        _renderSpeed: function () {
            this.$('.' + this._classes.transportSpeed).text(this.model.values['speed-ground'] + ' / ' + this.model.values['speed-water']);
        },

        /**
         * @private
         */
        _renderWeight: function () {
            var balance = this.model.values['param-straight'] - this.model.values.weight;
            if (balance > 0) {
                balance = '+' + balance;
            }
            this.$('.' + this._classes.itemsWeight).text(this.model.values.weight + ' (' + (balance) + ')');
        },

        /**
         * @private
         */
        _renderItemsCost: function () {
            this.$('.' + this._classes.itemsCostGb).text(this._numberFormat(this.model.values.gb));
            this.$('.' + this._classes.itemsCostEun).text(this._numberFormat(this.model.values.eun));
        },

        /**
         * @private
         */
        _renderStats: function () {
            this._renderParams();
            this._renderFreeStats();
        },

        /**
         * @private
         */
        _renderParams: function () {
            this.model.params.forEach(function (param) {
                var paramName = 'param-' + param;
                this._controls[paramName].viewValue([this.model._values.base[paramName], this.model._values.battle[paramName], this.model._values.all[paramName]].join(' / '));
            }.bind(this));
        },

        _renderHealth: function () {
            this.$('.' + this._classes.health).html(this._templateHp({values: this.model._values}));
        },

        _renderFreeStats: function () {
            var freeStats = this.model._values.all.freeStats;
            this.$('.' + this._classes.freeStats).html(freeStats);
        },

        /**
         * @private
         */
        _renderSkills: function () {
            var $bonuses = this.$('.' + this._classes.bonuses).html(''),
                html = this._bonusTemplate({battle: this.model._values.battle, all: this.model._values.all, bonuses: this.model.bonuses});
            $bonuses.append(html);
        },

        /**
         * @param {string|number} str
         * @private
         */
        _numberFormat: function (str) {
            return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,');
        },

        /**
         * @param model
         * @param attrs
         * @private
         */
        _onChange: function (model, attrs) {
            attrs = attrs.changes;
//            _(attrs).each(function (value, key) {
//                var methodName = '_onChange' + this._reformatMethodName(key);
//                if (this[methodName]) {
//                    this[methodName]();
//                } else {
//
//                }
//            }, this);
            _.each(attrs, function (value, attr) {
                /**
                 * todo: костыль
                 */
                if (this._controls[attr]) {
                    this._controls[attr].model.value(this.model.get(attr));
                } else if (attr === 'level-syndicate') {
                    this._syndicate.model.set('value', this.model.get('level-syndicate'));
                }
            }, this);
            this.render();
        },

        /**
         * @private
         */
        _allDressOff: function (e) {
            e.preventDefault();
            this.items.allDressOff();
        },

        /**
         * @param {Event} e
         * @private
         */
        _onSaveClick: function (e) {
            e.preventDefault();
            this._showBlacker();
            $('.' + this._classes.popupSave).show();
            $.ajax({
                type: 'POST',
                url: '/save.php',
                data: {
                    data: JSON.stringify(this.model.toJSON())
                },
                success: function (response) {
                    response = JSON.parse(response);
                    if (response.link) {
                        $('.' + this._classes.saveText).html('<a href="' + response.link + '">' + response.link + '</a>');
                    }
                }.bind(this)
            });
        },

        /**
         * @param {Event} e
         * @private
         */
        _onLoadClick: function (e) {
            e.preventDefault();
            this._showBlacker();
            $('.' + this._classes.popupLoad).show();
        }
    });

    return UserView;
});