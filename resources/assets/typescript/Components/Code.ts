import {ComponentInterface} from "../Interfaces/ComponentInterface";

/**
 * Code Component
 */
export class Code implements ComponentInterface {

    register(vue, app) {

        vue.component('ark-code', {
            template: require('../templates/code/code.html'),
            ready(){

                let content = this.$el.children.item(0);
                    content.style.display = 'none';
                let textArea = this.$el.children.item(1);
                    textArea.textContent = content.innerHTML.trim();
            }
        });

    }
}
