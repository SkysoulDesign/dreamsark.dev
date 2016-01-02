module.exports = (function (classie) {

    var menu = {

        trigger: null,
        menu: null,
        tabs: null,
        tabsContent: null,
        status: false,

        init: function () {

            this.trigger = document.querySelector('#extra-trigger');
            this.menu    = document.querySelector('.extra-container');

            this.tabs = document.getElementById('tabs');//li[data-tab]
            this.tabsContent = document.getElementById('tabs-content');//li[data-tab]

            //this.initTabs();
            this.events();

        },

        initTabs: function (e) {

            //e.target.style.backgroundColor = '#000';

            var c = this.tabsContent.children;
            var t = this.tabs.children;

            for (var i = 0; c.length > i; i++) {

                /**
                 * Remove All And Any class containing show within
                 */
                classie.remove(c[i], 'active');
                classie.remove(t[i + 1], 'active'); //+1 because there is a title on the list

                if (c[i].dataset.tab == e.target.dataset.tab) {
                    classie.add(c[i], 'active');
                    classie.add(t[i + 1], 'active');
                }

            }

        },

        events: function () {
            this.trigger.addEventListener('mouseenter', this.showHideMenu.bind(this), false);
            this.trigger.addEventListener('mouseleave', this.showHideMenu.bind(this), false);
            this.menu.addEventListener('mouseenter', this.showHideMenu.bind(this), false);
            this.menu.addEventListener('mouseleave', this.showHideMenu.bind(this), false);

            /**
             * Tabs
             */
            this.tabs.addEventListener('click', this.initTabs.bind(this), false)

        },

        showHideMenu: function () {

            this.status = !this.status;

            classie.toggle(this.menu, 'show');
            classie.toggle(this.trigger, 'active');

        }

    };

    menu.init();

});