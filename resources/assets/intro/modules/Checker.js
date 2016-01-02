module.exports = (function (e) {

    /**
     * Append Checker to Engine
     */
    return e.checker = {

        collection: [],
        checker: null,
        time: null,

        init: function () {
            this.checker = this;
        },

        add: function (callback, context, description) {
            this.collection.push({description: description, callback: callback, context: context, time: +new Date()});
        },

        delete: function (index) {
            this.collection.splice(index, 1);
        },

        reset: function () {
            this.collection = [];
        },

        update: function () {

            var checker = this;

            if (e.helpers.length(checker.collection) >= 1)

                e.helpers.keys(this.collection, function (el, index) {

                    if (el.callback.call(el.context || e, (+new Date()) - el.time, el.time))
                        checker.delete(index);

                });

        }
    }

})(Engine);