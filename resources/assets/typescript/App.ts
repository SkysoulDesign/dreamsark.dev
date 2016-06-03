import Ripple from "./components/ripple";

export class App {

    constructor() {
        let ripple = new Ripple();
    }

    /**
     * Document Ready
     * @returns {Promise<T>}
     */
    ready() {
        return new Promise(resolve => document.addEventListener('DOMContentLoaded', () => resolve(this)));
    }

}

let app = new App();
    app.ready().then(application => {
        alert('zxczxczxc')
    });