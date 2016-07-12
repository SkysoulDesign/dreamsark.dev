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
            easing: 'easeOutBounce',
            barColor: '#5eb404',
            trackColor: '#e3e3e3',
            // your options goes here
        });

    }

}
