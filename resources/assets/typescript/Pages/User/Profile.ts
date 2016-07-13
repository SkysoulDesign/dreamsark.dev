import Vue = require("vue");
import {AbstractPage} from "../../Abstract/AbstractPage";

/**
 * Profile Class
 */
export class Profile extends AbstractPage {

    public routes = [
        'user.profile.create'
    ]

    boot() {

        this.noIdeaWhatsIsIt();
        this.initThreeJs();

    }

    noIdeaWhatsIsIt() {

        /**
         * Handle The Display of The Profile Selection
         *
         * @type {Element}
         */
        let button = document.querySelector('#selectProfile');
        button.addEventListener('click', function () {

            let container = <HTMLElement>document.querySelector('#wrapper');

            for (let i = 1; i < container.childElementCount; i++) {
                let child = <HTMLElement>container.children.item(i);
                child.style.display = 'none';
            }

            let form = document.querySelector('form');
            form.classList.remove('+hidden');

        });

    }


    initThreeJs() {

        let animation = this.app.plugin('profile', '#canvas');

        /**
         * Binding Vue
         */
        this.app.ready().then(function (app) {

            animation.start('main');

            app.vue({
                el: '.--profile-pick',
                data: function () {
                    return {
                        position: 'Designer'
                    }
                },
                methods: {
                    selectProfile: function (e:MouseEvent) {

                        let element = <HTMLElement>e.toElement;

                        if (element.className === 'project-page__palette__item') {

                            console.log(`Selected Character: ${element.dataset['position']}`);
                            this.position = element.dataset['position'];

                        }

                    }
                }
            });

        })

    }

}
