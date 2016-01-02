module DreamsArk.Modules {

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