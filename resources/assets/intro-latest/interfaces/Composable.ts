interface Composable {
    elementsBag?:any[],
    elements():string[];
    setup(scene:DreamsArk.Modules.Scene, camera:DreamsArk.Modules.Camera, elements:{}):void;
    update(scene:DreamsArk.Modules.Scene, camera:DreamsArk.Modules.Camera, elements:{}, elapsed?:number):void;
}