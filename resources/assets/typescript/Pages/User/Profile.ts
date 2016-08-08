import Vue = require("vue");
import {AbstractPage} from "../../Abstract/AbstractPage";

/**
 * Profile Class
 */
export class Profile extends AbstractPage {

    public routes = [
        'user.profile.create'
    ]

    boot(profileRoute, container) {

        this.initProfileSelection(profileRoute);
        this.initThreeJs();

        document.querySelector(container).addEventListener('click', e => {

            let target = <HTMLElement>e.target;

            if (target.dataset.hasOwnProperty('profileName')) {

                this.app.plugin('item').switch(
                    target.dataset['profileName'], target.dataset['localizedName']
                )
            }

        })

        /**
         * initialize the position with the first element
         */
        this.app.on('animation.started', function (id, position) {
            this.$set('position',
                document.querySelector(`[data-profile-name="${position}"]`).dataset['localizedName']
            )
        })

        this.app.vue({
            data: {
                position: null
            }
        })

    }

    initProfileSelection(profileRoute) {

        /**
         * Handle The Display of The Profile Selection
         *
         * @type {Element}
         */
        let button = document.querySelector('#selectProfile');

        button.addEventListener('click', e => {

            let request = this.app.vueInstance.$http.get(profileRoute, {
                params: {
                    profile: this.app.vueInstance.position
                }
            })

            request.then(response => {

                let form = document.querySelector('form'),
                    container = <HTMLElement>document.querySelector('#wrapper'),
                    formContainer = form.querySelector('#form-container'),
                    header = document.querySelector('.profile-page__header');

                header.classList.add('--extended')
                form.classList.remove('+hidden');

                let profile_input = document.createElement('input');
                profile_input.setAttribute('name', 'profile_id');
                profile_input.setAttribute('type', 'hidden');

                response.json().forEach(function (item, index) {


                    let h3 = document.createElement('h3');
                    h3.classList.add('small-12', 'columns', 'form__step');
                    h3.innerHTML = `<span>${index + 1}</span>${item.question}`;

                    let field = document.createElement('div');
                    field.classList.add('small-12', 'columns', 'form__field');

                    let input = document.createElement('input');
                    input.setAttribute('type', item.type.name)
                    input.setAttribute('name', 'question_' + item.id)
                    input.setAttribute('placeholder', item.question);

                    profile_input.setAttribute('value', item.pivot.profile_id);

                    field.appendChild(input)
                    formContainer.appendChild(h3)
                    formContainer.appendChild(field)

                })

                formContainer.appendChild(profile_input);

                for (let i = 1; i < container.childElementCount; i++) {
                    let child = <HTMLElement>container.children.item(i);
                    child.style.display = 'none';
                }

            })

        });

    }


    initThreeJs() {

        // let animation = this.app.plugin('profile', '#canvas');
        //     animation.start('project');

        /**
         * Binding Vue
         */
        // this.app.vue({
        //     el: '#vueRoot',
        //     data: function () {
        //         return {
        //             position: 'Designer'
        //         }
        //     },
        //     methods: {
        //         selectProfile: function (e:MouseEvent) {
        //
        //             let element = <HTMLElement>e.toElement;
        //
        //             if (element.className === 'project-page__palette__item') {
        //
        //                 console.log(`Selected Character: ${element.dataset['position']}`);
        //                 this.position = element.dataset['position'];
        //
        //             }
        //
        //         }
        //     }
        // });


    }

}
