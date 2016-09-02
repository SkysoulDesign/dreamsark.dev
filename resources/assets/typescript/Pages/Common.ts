import {AbstractPage} from "../Abstract/AbstractPage";

/**
 * Common Page
 */
export class Common extends AbstractPage {

    public routes = ['*'];

    boot() {

        console.log('This class {Common} will run on every request');

        this.dropdown();
        // this.languageSwitcher();

        let divs = document.querySelectorAll('.under-construction');
        [].forEach.call(divs, function (div) {
            div.addEventListener('click', function () {
                alert('功能即将开放敬请期待')
            })
        });
    }

    languageSwitcher() {

        if (this.is(['login', 'register', 'admin.*', 'committee.*'])) {
            return
        }

        // document.querySelector('#language-switcher')
        //     .addEventListener('change', (e:MouseEvent) => {
        //
        //         let form = document.createElement('form'),
        //             element = <HTMLSelectElement>e.target;
        //
        //         form.method = 'post';
        //         form.action = element.dataset['action'];
        //         form.appendChild(element);
        //
        //         submitForm(form)

        // })


    }

    /**
     * Initialize Dropdown
     */
    dropdown() {

    }

}
