import { BootableInterface } from "../../../Interfaces/BootableInterface";
import { ModulesInterface } from "../Interfaces/ModulesInterface";

require('../../../../../../node_modules/three/examples/js/controls/TrackballControls');
// require('../../../../../../node_modules/three/examples/js/controls/OrbitControls');

/**
 * Audio Class
 */
export class Audio implements BootableInterface, ModulesInterface {

    public instance;
    private loader: THREE.AudioLoader;
    private listener: THREE.AudioListener;
    private sounds = {};

    get audios() {
        return {
            ambient: {
                path: '/assets/audio/16567255_synth-machine_by_apl_preview.mp3',
                loop: true,
                volume: 0.5
            },
            takeOf: {
                path: 'assets/audio/10145575_spaceship-takoff_by_frontiersoundfx_preview.mp3',
                loop: false,
                volume: 1
            }
        }
    }

    boot({ camera, scene, mananger }) {

        this.listener = new THREE.AudioListener();
        this.loader = new THREE.AudioLoader(mananger);

        camera.add(this.listener);

        for (let audio in this.audios) {

            let {path, loop, volume} = this.audios[audio];

            this.loader.load(path, buffer => {

                const sound = new THREE.Audio(this.listener);
                sound.setBuffer(buffer);
                sound.setLoop(loop);
                sound.setVolume(volume);

                let clock = new THREE.Clock(false);

                if (this.sounds[audio]) {
                    sound.play();
                    clock.start()
                }

                this.sounds[audio] = {
                    sound: sound, timer: clock
                };

                scene.add(sound)

            }, function (xhr) {

            }, error => {
                console.log('failed loading audio', audio, error)
            })

        }

        // this.instance.enableDamping = true;

    }

    play(audio: string) {
        if (!this.sounds[audio]) {
            this.sounds[audio] = true;
        } else {
            this.sounds[audio].sound.play()
            this.sounds[audio].timer.start()
        }
    }

    get(audio: string): { sound: THREE.Audio, timer: THREE.Clock } {
        return this.sounds[audio];
    }

    update(time: number, delta: number): void {
    }

}
