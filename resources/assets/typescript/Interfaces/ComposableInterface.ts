import {BootableInterface} from "./BootableInterface";
import {Scene} from "../Plugins/Profile/Classes/Scene";
import {Camera} from "../Plugins/Profile/Classes/Camera";

export interface ComposableInterface extends BootableInterface {
    characters():string[];
    stage(scene:Scene, camera:Camera, characters:any);
}
