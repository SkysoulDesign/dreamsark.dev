import {AbstractPage} from "../Abstract/AbstractPage";

/**
 * Project
 */
export class Project extends AbstractPage {

    public routes = [
        'project.show',
        'user.project.create'
    ]

    boot(stage) {

        if (stage)
            this[stage]();

        if (this.only('user.project.create')) {
            this.app.vue({
                data: {
                    name: 'test'
                },
                ready(){
                    console.log('im borm')
                }
            })
        }

    }

    idea() {
        // this.initChart();
    }

    synapse() {
        this.initChart();
    }

    script() {
        this.initChart();
    }

    review() {
        this.initChart();
    }

    distribution() {

    }

    fund() {
        this.initChart();
        this.app.on('nav.tab-crew.click', this.initCrew.bind(this))
    }

    initCrew(e:MouseEvent, element:HTMLElement) {
        // console.log(animation)
    }

    initChart() {

        var element = document.querySelector('.chart');

        new Chart(element, {
            easing: 'easeOutBounce',
            barColor: '#5eb404',
            trackColor: '#e3e3e3',
        });

    }

}
