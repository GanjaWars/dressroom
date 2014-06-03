define(['backbone', 'app/User/User.View'], function(Backbone, UserView) {
     return Backbone.View.extend({
        el: $('body'),

        /**
         * @constructor
         */
        initialize: function () {
            this.user = new UserView();
        }
    });
});