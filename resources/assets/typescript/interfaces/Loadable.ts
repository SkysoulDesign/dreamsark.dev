interface Loadable {
    instance:THREE.Object3D;
    maps?: {};
    objs?: {};
    data?: {};
    create:(maps:{}, objs:{}, data:{}) => {};
}