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
        });

        this.app.on('nav.tab-crew.click', this.initCrew.bind(this))

    }

    initCrew(e:MouseEvent, element:HTMLElement) {

        let animation = this.app.plugin('profile')

    }

}
