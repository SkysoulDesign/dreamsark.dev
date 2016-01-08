module DreamsArk.Modules {

    export class Raycaster implements Initializable {

        public instance:THREE.Raycaster;

        constructor() {
            this.instance = new THREE.Raycaster();
        }

        configure():void {

        }

    }

}