import {AbstractPage} from "../Abstract/AbstractPage";

/**
 * Project
 */
export class Project extends AbstractPage {

    public routes = [
        'project.show',
    ]

    boot() {

        var element = document.querySelector('.chart');

        new Chart(element, {
            // your options goes here
        });

    }

}
