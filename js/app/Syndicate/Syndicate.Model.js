define(['backbone', 'app/Syndicate/ranks'], function (Backbone, ranks) {
    /**
     * @class SyndicateModel
     * @extends Backbone.Model
     */
    var SyndicateModel = Backbone.Model.extend(/** @lends SyndicateModel */{
        /**
         * @public
         * @return {object|null}
         */
        getRank: function () {
            var level = this.get('value'),
                rank = 0;
            for (var i = 0, l = ranks.length; i < l; i++) {
                if (level < ranks[i].level) {
                    break;
                }
                if (level >= ranks[i].level &&
                    (level === ranks[i].level ||
                        ranks[i + 1] &&
                        ranks[i + 1].level > level
                    )) {
                    ranks[i].id = i;
                    return ranks[i];
                } else if (level > ranks[l - 1].level) {
                    return ranks[l - 1];
                }

            }
            return null;
        }
    });
    return SyndicateModel;
});