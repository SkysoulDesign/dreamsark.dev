module DreamsArk.Modules {

    /**
     * Collect and manage important data referent to the user browser data, OS.
     */
    export class Browser implements Initializable {

        public instance;
        public innerWidth:number;
        public innerHeight:number;
        public devicePixelRatio:number;

        constructor() {

            this.instance = this;
            this.innerWidth = window.innerWidth;
            this.innerHeight = window.innerHeight;
            this.devicePixelRatio = window.devicePixelRatio;

        }

        configure():void {

        }

    }

}