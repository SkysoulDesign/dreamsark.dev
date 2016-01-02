import Scene = DreamsArk.Modules.Scene;
import Camera = DreamsArk.Modules.Camera;

interface Composable {
    elementsBag?:any[],
    elements():string[];
    setup(scene:Scene, camera:Camera, elements:{}):void;
    update(scene:Scene, camera:Camera, elements:{}):void;
}