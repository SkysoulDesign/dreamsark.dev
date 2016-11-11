interface Tweenable {
    duration:number,
    destination:any,
    origin?:any,
    delay?:number|boolean,
    start?: () => void,
    update:(el:any, progress?:number, on?:(progress:number, callback:DreamsArk.Modules.Tween|Function) => void) => void,
    complete?: () => void,
    overshoot?:number,
    autoStart?:boolean
}