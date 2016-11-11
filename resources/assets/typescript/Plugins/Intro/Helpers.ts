/**
 * Configure the material
 *
 * @param material
 * @param x
 * @param y
 * @param width
 * @param height
 * @param base
 * @returns {THREE.MeshBasicMaterial}
 */
export var configureMaterial = (material: any, {x, y, width, height, sprite}, base: number = 2048) => {

    let tex = material.userData ? material.userData[sprite.name] : material.map

    let clone = material.clone(),
        texture = tex.clone()

    texture.repeat.set(width / base, height / base);
    texture.offset.set(x / base, (base - (y + height)) / base);

    clone.map = texture;
    texture.needsUpdate = true;

    return clone;
}

export var sprite = function (name: string) {
    return require('json!../../../../../public/assets/img/sprite-1.json')[name];
}

// export var configureTexture = (texture: THREE.Texture, name: string, base: number = 2048) => {

//     let {x, y, width, height} = sprite(name);

//     texture.repeat.set(width / base, height / base);
//     texture.offset.set(x / base, (base - (y + height)) / base);
//     texture.needsUpdate = true;

//     return texture;
// }

/**
 * Convert proportionally a given width/height
 *
 * @param targetWidth
 * @param targetHeight
 * @param currentWidth
 * @param currentHeight
 * @returns {width: number, height: number}
 */
export var resize = function (targetWidth: number, targetHeight: number, currentWidth: number, currentHeight: number, scale: number = 100) {

    let ratio = Math.min(
        targetWidth / currentWidth, targetHeight / currentHeight
    );

    return {
        width: (currentWidth * ratio) * (scale * 0.01),
        height: (currentHeight * ratio) * (scale * 0.01)
    };

}

/**
 * Convert degrees to radians
 */
export var deg2rad = function (degrees: number) {
    return (degrees * Math.PI / 180);
};

/**
 * Generate random elements
 */
export class random {

    /**
     * Generate random number between a given min and max
     */
    static between(min: number, max: number): number {
        return (Math.random() * ((max + 1) - min)) + min;
    }

    /**
     * Generate Random Vector3 object
     *
     * @param x - number
     * @param y - number
     * @param z - number
     * @param distance or radius
     * @param stick - stick to a surface or get free-style
     */
    static vector3(x: number = 0, y: number = 0, z: number = 0, distance: number = 0, stick: boolean = false): THREE.Vector3 {

        // Coordinates
        var u1 = Math.random() * 2 - 1,
            u2 = Math.random(),
            radius = Math.sqrt(1 - u1 * u1),
            theta = 2 * Math.PI * u2;

        // Stick to surface or disperse inside sphere
        if (!stick)
            distance = Math.random() * distance;

        return new THREE.Vector3(
            radius * Math.cos(theta) * distance + x,
            radius * Math.sin(theta) * distance + y,
            u1 * distance + z
        );

    }

}
