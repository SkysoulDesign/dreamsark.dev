import {App} from "../../App";
import {PageInterface} from "../../interfaces/PageInterface";
import Vue = require("vue");
import {Profile as profileAnimation} from "../../Profile";

/**
 * Profile
 */
export class Profile implements PageInterface {

    constructor(app:App, className:string, root:string, item:string, select:string, wrapper:string) {

        /**
         * Handle The Display of The Profile Selection
         *
         * @type {Element}
         */
        let button = document.querySelector(select);
        button.addEventListener('click', function () {

            let container = <HTMLElement>document.querySelector(wrapper);

            for (let i = 1; i < container.childElementCount; i++) {
                let child = <HTMLElement>container.children.item(i);
                child.style.display = 'none';
            }

            let form = document.querySelector('form');
            form.classList.remove('+hidden');

        });

        /**
         * Binding Vue
         */
        app.ready().then(function () {

            var animation = new profileAnimation();
                animation.start()
            
            new Vue({
                el: root,
                data: function () {
                    return {
                        position: 'Designer'
                    }
                },
                methods: {
                    selectProfile: function (e:MouseEvent) {

                        let element = <HTMLElement>e.toElement;

                        if (element.className === item) {

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
