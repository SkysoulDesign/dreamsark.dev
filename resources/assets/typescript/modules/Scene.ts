module DreamsArk.Modules {

    export class Scene implements Initializable {

        public instance:THREE.Scene;

        constructor() {
            this.instance = new THREE.Scene();
        }

        configure():void {
            this.instance.fog = new THREE.Fog(0x19020d, 1, 1000)
        }

    }

}