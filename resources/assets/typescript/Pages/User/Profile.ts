import Vue = require("vue");
import {Profile as profileAnimation} from "../../Profile";
import {AbstractPage} from "../../Abstract/AbstractPage";
import ComponentOption = vuejs.ComponentOption;

/**
 * Profile
 */
export class Profile extends AbstractPage {

    public routes = [
        'user.profile.create'
    ]

    boot(app) {

        this.noIdeaWhatsIsIt();
        this.initThreeJs(app);

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


    initThreeJs(app) {

        /**
         * Binding Vue
         */
        app.ready().then(function () {

            // var animation = new profileAnimation();
            //     animation.start()

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

                            profileAnimation.switch(this.position);

                        }

                    }
                }
            });

        })

    }

}
