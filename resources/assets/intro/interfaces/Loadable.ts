interface Loadable {
    /**
     * Instance of a Object3D
     */
    instance:THREE.Object3D;

    /**
     * Texture maps
     */
    maps?: {};

    /**
     * External objects (.OBJ)
     */
    objs?: {};

    /**
     * Extra data to be appended to userData
     */
    data?: {};

    /**
     * Create Function
     */
    create:(maps:{}, objs:{}, data:{}) => {};
}