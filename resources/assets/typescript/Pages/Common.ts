import {AbstractPage} from "../Abstract/AbstractPage";
import {submitForm} from "../Helpers";

/**
 * Common Page
 */
export class Common extends AbstractPage {

    public routes = ['*'];

    boot() {

        this.app.logger.info('This class {Common} will run on every request');

        this.dropdown();
        this.languageSwitcher();

    }

    languageSwitcher() {

        if (this.is(['login', 'register', 'admin.*', 'committee.*'])) {
            return
        }

        document.querySelector('#language-switcher')
            .addEventListener('change', (e:MouseEvent) => {

                let form = document.createElement('form'),
                    element = <HTMLSelectElement>e.target;

                form.method = 'post';
                form.action = element.dataset['action'];
                form.appendChild(element);

                submitForm(form)

            })


    }

    /**
     * Initialize Dropdown
     */
    dropdown() {

    }

}
