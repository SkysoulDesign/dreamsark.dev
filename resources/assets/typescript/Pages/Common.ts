import {AbstractPage} from "../Abstract/AbstractPage";

/**
 * Common Page
 */
export class Common extends AbstractPage {

    public routes = ['*'];

    boot(app) {
        app.logger.info('This class {Common} will run on every request');

        this.dropdown();
        this.languageSwitcher();

    }

    languageSwitcher() {

        document.querySelector('#language-switcher')
            .addEventListener('change', (e:MouseEvent) => {

                let form = document.createElement('form'),
                    element = <HTMLSelectElement>e.target;

                form.method = 'post';
                form.action = element.dataset['action'];
                form.appendChild(element);
                form.submit();

            })

    }

    /**
     * Initialize Dropdown
     */
    dropdown() {


        let dropdown = document.querySelectorAll('.dropdown');

        for (let i = 0; i < dropdown.length; i++) {
            dropdown[i].addEventListener('click', function (event:MouseEvent) {
                this.classList.toggle('--show');
            })
        }

        window.onclick = function (event:MouseEvent) {

            if (!event.target.matches('.dropdown__trigger')) {
                for (let i = 0; i < dropdown.length; i++) {
                    if (dropdown[i].classList.contains('--show')) {
                        dropdown[i].classList.remove('--show');
                    }
                }
            }

        }


    }

}
