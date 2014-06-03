define(['backbone', 'app/Items/Item.Collection', 'app/Items/Sets/sets', 'app/Items/Mods/Mod.Collection'], function (Backbone, ItemCollection, Sets, ModCollection) {
    /**
     * @class UserModel
     * @extends Backbone.Model
     */
    var UserModel = Backbone.Model.extend(/** @lends UserModel */{
        defaults: {
            'level-combat': 0,
            'level-economic': 0,
            'level-production': 0,
            'level-syndicate': 0,
            'param-straight': 10,
            'param-sharpshooting': 10,
            'param-endurance': 10,
            'param-life': 10,
            'weaponSkill-pistol': 0,
            'weaponSkill-bomb': 0,
            'weaponSkill-auto': 0,
            'weaponSkill-heavy': 0,
            'weaponSkill-shotgun': 0,
            'weaponSkill-sniper': 0,
            'prof-killer': 0,
            'prof-mercenary': 0,
            'prof-hitman': 0,
            'nickname': 'Новый персонаж',
            'syndicate-name': 'Основной боевой синдикат',
            'syndicate-id': 0,
            'items': {}
        },

        /**
         * @type {object} _values
         */
        _values: {
            base: {

            },
            battle: {

            },
            all: {

            }
        },

        values: {
            'gb': 0,
            'eun': 0,
            'weight': 0,
            'level-combat': 0,
            'level-economic': 0,
            'level-production': 0,
            'param-straight': 0,
            'param-sharpshooting': 0,
            'param-endurance': 0,
            'param-life': 0,
            'weaponSkill-pistol': 0,
            'weaponSkill-bomb': 0,
            'weaponSkill-auto': 0,
            'weaponSkill-heavy': 0,
            'weaponSkill-shotgun': 0,
            'weaponSkill-sniper': 0,
            'hp': 0,
            'freeStats': 0,
            'speed-ground': 0,
            'speed-water': 0,
            'armorBody': 0,
            'armorHead': 0,
            'armorFoots': 0,
            'armorActiveBody': 0,
            'armorActiveHead': 0,
            'armorActiveFoots': 0,
            'camouflage': 0,
            'nightvision': 0
        },

        bonuses: {
            'bonus-adrenalin': 'Бонус Адреналина',
            'bonus-sapper': 'Бонус Сапера',
            'bonus-mcCloud': 'Бонус Маклауда',
            'bonus-dieHard': 'Крепкий орешек',
            'bonus-aceInHole': 'Туз в рукаве',
            'bonus-healthRecovery': 'Бонус выздоровления',
            'bonus-durability': 'Бонус прочности',
            'bonus-bloodLust': 'Бонус Жажда Крови',
            'bonus-stability': 'Бонус Устойчивости',
            'bonus-secondStep': 'Бонус Второго шага',
            'bonus-rage': 'Бонус Ярости',
            'bonus-selfMedication': 'Бонус Самолечения',
            'bonus-skill': 'Бонус Умений',
            'bonus-sniper': 'Бонус Снайпера',
            'bonus-manBonus': 'Мужской бонус',
            'bonus-antikiller': 'Бонус антикиллера',
            'bonus-exp': 'Бонус опыта',
            'bonus-nightCamouflage': 'Бонус Ночная маскировка',
            'bonus-secondShot': 'Бонус Второй выстрел',
            'bonus-progress': 'Бонус прогресса',
            'bonus-luck': 'Бонус Удачи'
        },

        profsMap: [
            {
                required: {
                    'prof-killer': 5,
                    'prof-mercenary': 5,
                    'prof-hitman': 5
                },
                bonuses: {
                    'param-sharpshooting': 1,
                    'param-endurance': 1,
                    'nightvision': 1,
                    'camouflage': 1,
                    'armorHead': 1
                }
            },
            {
                required: {
                    'prof-killer': 8,
                    'prof-mercenary': 8,
                    'prof-hitman': 8
                },
                bonuses: {
                    'param-sharpshooting': 1,
                    'camouflage': 1,
                    'bonus-mcCloud': 1,
                    'armorActiveHead': 2,
                    'armorActiveBody': 2,
                    'armorActiveFoots': 2
                }
            },
            {
                required: {
                    'prof-killer': 10,
                    'prof-mercenary': 10,
                    'prof-hitman': 10
                },
                bonuses: {
                    'param-sharpshooting': 3,
                    'param-endurance': 3,
                    'camouflage': 3,
                    'armorActiveHead': 3,
                    'armorActiveBody': 3,
                    'armorActiveFoots': 3,
                    'bonus-bloodLust': 1,
                    'param-straight': 1
                }
            }
        ],

        weaponSkillsMap: [
            {
                required: [
                    {'weaponSkill-bomb': 15},
                    {'*': 15}
                ],
                bonuses: [
                    {'bonus-sapper': 1}
                ]
            },
            {
                required: [
                    {'weaponSkill-bomb': 17},
                    {'*': 17}
                ],
                bonuses: [
                    {'bonus-sapper': 1}
                ]
            },
            {
                required: [
                    {'*': 18},
                    {'*': 18},
                    {'*': 18}
                ],
                bonuses: [
                    {'bonus-mcCloud': 1}
                ]
            },
            {
                required: [
                    {'*': 20},
                    {'*': 20},
                    {'*': 20}
                ],
                bonuses: [
                    {'bonus-dieHard': 1}
                ]
            },
            {
                required: [
                    {'weaponSkill-bomb': 21}
                ],
                bonuses: [
                    {'bonus-aceInHole': 1}
                ]
            },
            {
                required: [
                    {'weaponSkill-bomb': 23}
                ],
                bonuses: [
                    {'bonus-aceInHole': 1}
                ]
            },
            {
                required: [
                    {'weaponSkill-bomb': 25}
                ],
                bonuses: [
                    {'bonus-aceInHole': 1}
                ]
            },
            {
                required: [
                    {'weaponSkill-bomb': 27}
                ],
                bonuses: [
                    {'bonus-aceInHole': 1}
                ]
            },
            {
                required: [
                    {'weaponSkill-bomb': 29}
                ],
                bonuses: [
                    {'bonus-aceInHole': 1}
                ]
            }
        ],

        /**
         * @type {Array}
         */
        levels: ['combat', 'economic', 'production'],

        /**
         * @type {Array}
         */
        params: ['straight', 'sharpshooting', 'endurance', 'life'],

        /**
         * @type {Array}
         */
        weaponSkills: ['pistol', 'bomb', 'auto', 'heavy', 'shotgun', 'sniper'],

        /**
         *  @type {Array}
         */
        profs: ['killer', 'mercenary', 'hitman'],

        /**
         * @type {Object}
         */
        _required: {},

        /**
         * @constructor
         */
        initialize: function () {
            /**
             * @type ItemsView
             */
            this.slots = null;

            /**
             * @private
             */
            this._addedValues = {};

            this._initValues();
        },

        /**
         * @private
         */
        _initValues: function () {
            var _params = [
                'gb',
                'eun',
                'weight',
                'hp',
                'armorBody',
                'armorHead',
                'armorFoots',
                'armorActiveBody',
                'armorActiveHead',
                'armorActiveFoots',
                'camouflage',
                'nightvision',
                'freeStats'
            ];

            /**
             * todo: поправить
             */
            this.params.forEach(function (param) {
                _.each(this._values, function (_value, _key) {
                    if (!this._values[_key]) {
                        this._values[_key] = {};
                    }
                    this._values[_key]['param-' + param] = 0;
                }, this);
            }, this);

            _.each(this.bonuses, function (value, key) {
                _.each(this._values, function (_value, _key) {
                    if (!this._values[_value]) {
                        this._values[_value] = {};
                    }
                    this._values[_key][key] = 0;
                }, this);
            }, this);

            _params.forEach(function (param) {
                _.each(this._values, function (_value, _key) {
                    if (!this._values[_key]) {
                        this._values[_key] = {};
                    }
                    this._values[_key][param] = 0;
                }, this);
            }, this);
        },

        /**
         * @public
         * @param {object} values
         */
        setSyndicateRankValues: function (values) {
            this._syndicateValues = values || {};
        },

        /**
         * @private
         */
        _calcSyndicateValues: function () {
            _.each(this._syndicateValues, function (bonusValue, bonusName) {
                var halfBonusValue = Math.floor(bonusValue / 2);
                this.addToBattleValues(bonusName, halfBonusValue);
                this.addToAllValues(bonusName, bonusValue);
            }, this);
        },

        /**
         * @param {string|object} key
         * @param {string} type
         * @param {object} values
         * @private
         */
        _addToTypeValues: function (type, key, values) {
            var objectValues = this._values;

            if (_.isString(key)) {
                var _values = {};
                _values[key] = values;
                values = _values;
            } else {
                values = key;
            }
            _.each(values, function (_value, _key) {
                if (typeof objectValues[type][_key] === 'undefined') {
                    objectValues[type][_key] = _value;
                } else {
                    objectValues[type][_key] += _value;
                }
            }, this);
        },

        /**
         * @public
         * @param {string|object} key
         * @param {object} [values]
         * @param {boolean} [force]
         */
        addToBaseValues: function (key, values, force) {
            var preventParam = false;
            if (_.isString(key)) {
                preventParam = /^param/.test(key);
            } else if (_.isObject(key)) {
                preventParam = _.find(key, function (_value, _key) {
                    return /^param/.test(_key);
                });
            }
            if (!preventParam || force) {
                this._addToTypeValues('base', key, values);
            }
            this.addToBattleValues(key, values, force);
            this.addToAllValues(key, values, force);
        },

        /**
         * @public
         * @param {string|object} key
         * @param {object} [values]
         * @param {boolean} [force]
         */
        addToBattleValues: function (key, values, force) {
            this._addToTypeValues('battle', key, values);
        },

        /**
         * @public
         * @param {string|object} key
         * @param {object} [values]
         * @param {boolean} [force]
         */
        addToAllValues: function (key, values, force) {
            this._addToTypeValues('all', key, values);
        },

        calc: function () {
            this._calcValues();
        },

        /**
         * @private
         */
        _calcValues: function () {
            this._resetValues();
            this._calcParams();
            this._calcBonuses();
            this._calcItems();
            this._calcProfs();
            this._calcSets();
            this._calcSyndicate();
            this._calcSyndicateValues();
            this._calcAddedValues();
            this._calcEndValues();
        },

        /**
         *
         * @private
         */
        _calcSyndicate: function () {
            var diffLevelSyndicate = this.get('level-syndicate') - 15;
            if (diffLevelSyndicate < 0) {
                diffLevelSyndicate = 0;
            }
            var hp = diffLevelSyndicate * 6;
            this.values.hp += hp;
            this.addToBaseValues('hp', hp);
        },

        /**
         * @private
         */
        _calcAddedValues: function () {
            _.each(this._addedValues, function (bonusValue, bonusName) {
                this.values[bonusName] += bonusValue;
            }, this);
        },

        /**
         * @private
         */
        _calcSets: function () {
            var items = this.getItemsNamesInSlots(true);
            this.definedSet = null;
            _.each(Sets, function (_set) {
                if (!this.definedSet && (this._isSetInItems(items, _set.items))) {
                    this.definedSet = _set;
                }
            }, this);

            if (this.definedSet) {
                _.each(this.definedSet.bonuses, function (bonusValue, bonusName) {
                    this.values[bonusName] += bonusValue;
                    this.addToBaseValues(bonusName, bonusValue);
                }, this);
            }
        },

        /**
         * @param {Array} currentItems
         * @param {Array} itemsSet
         * @returns {boolean}
         * @private
         */
        _isSetInItems: function (currentItems, itemsSet) {
            currentItems = currentItems || this.getItemsNamesInSlots();
            return _.all(itemsSet, function (itemId) {
                return currentItems.indexOf(itemId) > -1;
            });
        },

        /**
         * @todo: перенести в другое место
         * @param {boolean} [withoutMod]
         * @returns {Array}
         */
        getItemsNamesInSlots: function (withoutMod) {
            var slots = [];
            _.each(this.slots, function (slot) {
                var itemName = slot.model.get('value'),
                    mod = slot.model.get('mod');
                if (itemName) {
                    if (mod && !withoutMod) {
                        itemName += '[' + mod + ']';
                    }
                    slots.push(itemName);
                }
            }, this);
            return slots;
        },

        /**
         * @param {Object} values
         * @public
         */
        addValues: function (values) {
            this._addedValues = values;
        },

        /**
         * @private
         */
        _calcProduction: function () {
            /**
             * @todo: потом сделать по нормальному
             */
            var production = this.get('level-production'),
                diffProduction = production - 20;
            if (diffProduction < 0) {
                diffProduction = 0;
            }
            this.values['param-straight'] += diffProduction;
            this.addToBaseValues('param-straight', diffProduction);
            if (production > 22) {
                this.values['armorHead'] += 2;
                this.values['armorBody'] += 2;
                this.values['armorFoots'] += 2;

                this.addToBaseValues({
                    armorHead: 2,
                    armorBody: 2,
                    armorFoots: 2
                });
            }
            if (production > 23) {
                this.values['armorActiveHead'] += 2;
                this.values['armorActiveBody'] += 2;
                this.values['armorActiveFoots'] += 2;

                this.addToBaseValues({
                    armorActiveHead: 2,
                    armorActiveBody: 2,
                    armorActiveFoots: 2
                });
            }
            if (production > 24) {
                this.values['camouflage'] += 4;

                this.addToBaseValues('camouflage', 4);
            }
        },

        /**
         * @private
         */
        _calcEndValues: function () {
            this.values['param-straight'] += this.get('level-economic');
            this.addToBattleValues('param-straight', this.get('level-economic'));
            this.addToAllValues('param-straight', this.get('level-economic'));
            this.values['param-endurance'] += this.get('level-production');
            this.addToBattleValues('param-endurance', this.get('level-production'));
            this.addToAllValues('param-endurance', this.get('level-production'));
            this.values.hp += this.get('level-combat') + this.values['param-life'] * 6;
            this.addToBaseValues('hp', this.get('level-combat') + this._values.base['param-life'] * 6);
            this.addToBattleValues('hp', (this._values.battle['param-life'] - this._values.base['param-life']) * 6);
            this.addToAllValues('hp', (this._values.all['param-life'] - this._values.base['param-life']) * 6);
            this._calcProduction();
            this.values.freeStats = this.get('level-combat')
                - this.get('param-straight') + 10
                - this.get('param-sharpshooting') + 10
                - this.get('param-endurance') + 10
                - this.get('param-life') + 10;
            this.addToBaseValues('freeStats', this.get('level-combat')
                - this.get('param-straight') + 10
                - this.get('param-sharpshooting') + 10
                - this.get('param-endurance') + 10
                - this.get('param-life') + 10);
        },

        /**
         * @private
         */
        _calcProfs: function () {
            var values = this.values;
            this.profsMap.forEach(function (profMap) {
                if (this._includeProfSkills(profMap)) {
                    _.each(profMap.bonuses, function (bonusValue, bonusName) {
                        values[bonusName] += bonusValue;
                        this.addToBaseValues(bonusName, bonusValue);
                    }, this);
                }
            }.bind(this));
        },

        /**
         * @returns {boolean}
         * @private
         */
        _includeProfSkills: function (profMap) {
            var skills = this._getProfSkills();
            return _.every(profMap.required, function (requireValue, requireName) {
                if (this.get(requireName) >= requireValue) {
                    delete skills[requireName];
                    return true;
                } else if (requireName == '*') {
                    return _.some(skills, function (value, key) {
                        if (this.get(key) >= requireValue) {
                            delete skills[key];
                            return true;
                        }
                        return false;
                    }, this);
                }
                return false;
            }, this);
        },

        /**
         * @private
         */
        _getProfSkills: function () {
            var profSkills = {};
            this.profs.forEach(function (prof) {
                var profName = 'prof-' + prof;
                profSkills[profName] = this.get(profName);
            }.bind(this));
            return profSkills;
        },

        /**
         * @private
         */
        _calcItems: function () {
            _.each(this.slots, function (slot) {
                var item = ItemCollection.getById(slot.model.get('value'));
                if (item) {
                    if (item.get('params') && item.checkMoreSlots(slot.model.id)) {
                        _.each(item.get('params'), function (paramValue, paramName) {
                            this.values[paramName] += paramValue;
                            this.addToBaseValues(paramName, paramValue);
                        }, this);
                    }
                    if (item.get('bonuses')) {
                        _.each(item.get('bonuses'), function (bonusValue, bonusName) {
                            this.values[bonusName] += bonusValue;
                            this.addToBaseValues(bonusName, bonusValue);
                        }, this);
                    }
                    if (item.get('gb') && item.checkMoreSlots(slot.model.id)) {
                        this.values.gb += item.get('gb');
                        this.addToBaseValues('gb', item.get('gb'));
                    }
                    if (item.get('eun') && item.checkMoreSlots(slot.model.id)) {
                        this.values.eun += item.get('eun');
                        this.addToBaseValues('eun', item.get('eun'));
                    }
                    if (item.get('weight') && item.checkMoreSlots(slot.model.id)) {
                        this.values.weight += item.get('weight');
                        this.addToBaseValues('weight', item.get('weight'));
                    }
                    if (slot.model.get('mod')) {
                        var mod = ModCollection.getMod(item.get('type'), slot.model.get('mod'));
                        if (mod && mod.get('bonuses')) {
                            _.each(mod.get('bonuses'), function (bonusValue, bonusName) {
                                this.values[bonusName] += bonusValue;
                                this.addToBaseValues(bonusName, bonusValue);
                            }, this);
                        }
                    }
                    if (item.get('speed-water') > 0) {
                        this.values['speed-water'] = item.get('speed-water');
                        this.addToBaseValues('speed-water', item.get('speed-water'));
                    }
                    if (item.get('speed-ground') > 0) {
                        this.values['speed-ground'] = item.get('speed-ground');
                        this.addToBaseValues('speed-ground', item.get('speed-ground'));
                    }
                    if (item.get('required')) {
                        this._addRequired(item.get('required'));
                    }
                }
            }, this);
        },

        /**
         * @param {Object} required
         * @private
         */
        _addRequired: function (required) {
            _.each(required, function (paramValue, paramName) {
                if (!this._required[paramName] || (this._required[paramName] && this._required[paramName] < paramValue)) {
                    this._required[paramName] = paramValue;
                }
            }, this);
        },

        /**
         * @public
         * @returns {Object}
         */
        getRequired: function () {
            return this._required;
        },

        /**
         * @private
         */
        _calcBonuses: function () {
            var values = this.values;
            this.weaponSkillsMap.forEach(function (weaponMap) {
                if (this._includeWeaponSkills(weaponMap)) {
                    weaponMap.bonuses.forEach(function (bonus) {
                        var bonusName = _.keys(bonus)[0];
                        values[bonusName] += bonus[bonusName];
                        this.addToBaseValues(bonusName, bonus[bonusName]);
                    }.bind(this));
                }
            }.bind(this));
        },

        /**
         * @private
         */
        _includeWeaponSkills: function (weaponMap) {
            var skills = this._getWeaponsSkills();
            return _.every(weaponMap.required, function (require) {
                var weaponSkillName = _.keys(require)[0],
                    weaponSkillValue = require[weaponSkillName];
                if (this.get(weaponSkillName) >= weaponSkillValue) {
                    delete skills[weaponSkillName];
                    return true;
                } else if (weaponSkillName == '*') {
                    return _.some(skills, function (value, key) {
                        if (this.get(key) >= weaponSkillValue) {
                            delete skills[key];
                            return true;
                        }
                        return false;
                    }, this);
                }
                return false;
            }, this);
        },

        /**
         * @private
         */
        _getWeaponsSkills: function () {
            var weaponSkills = {};
            this.weaponSkills.forEach(function (weapon) {
                var weaponSkillName = 'weaponSkill-' + weapon;
                weaponSkills[weaponSkillName] = this.get(weaponSkillName);
            }.bind(this));
            return weaponSkills;
        },

        /**
         * @private
         */
        _calcParams: function () {
            this.params.forEach(function (param) {
                var paramName = 'param-' + param;
                this.values[paramName] = this.get(paramName);
                this.addToBaseValues(paramName, this.get(paramName), true);
            }.bind(this));
        },

        /**
         * @private
         */
        _resetValues: function () {
            this._required = {};
            this._initValues();
            _(this.values).each(function (value, index) {
                this.values[index] = 0;
            }, this);
            _.each(this.bonuses, function (bonus, bonusName) {
                this.values[bonusName] = 0;
            }, this);
        }
    });

    return UserModel;
});