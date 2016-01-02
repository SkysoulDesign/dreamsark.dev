global.jQuery = require("jquery");
global.$ = global.jQuery;

/**
 * Particle Js
 */
require('../../../node_modules/particles.js/particles.js');

$(document).ready(function () {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 101,
                "density": {
                    "enable": false,
                    "value_area": 100
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle", //image
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "image": {
                    "src": "/dreamsark-assets/avatar.png",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 100,
                "color": "#ffffff",
                "opacity": 1,
                "width": 0.8
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out"
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "bubble"
                },
                "onclick": {
                    "enable": false,
                    "mode": "repulse"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 85.26810729164123,
                    "size": 24.362316369040354,
                    "duration": 10,
                    "opacity": 0.6577825419640896,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
});

