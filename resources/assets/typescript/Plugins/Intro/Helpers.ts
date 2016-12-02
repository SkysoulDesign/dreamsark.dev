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
export var configureMaterial = (material: any, {x, y, width, height, sprite, uvs}, base: number = 2048) => {

    let clone;

    /**
     * Ignore if its a shader
     */
    if (material instanceof THREE.ShaderMaterial) {

        clone = material;
        clone['userData'].uniforms.texture.value = material['userData'].textures[sprite.name];

    } else {

        clone = material.clone()
        clone.map = material.userData ? material.userData[sprite.name] : material.map;

        /**
         * Persist UserData
         */
        clone.userData = material['userData'] || {};

    }

    if (!uvs) {

        let texture = clone.map.clone();

        texture.name = sprite.name;
        texture.repeat.set(width / base, height / base);
        texture.offset.set(x / base, (base - (y + height)) / base);
        texture.needsUpdate = true;

        clone.map = texture;

    }

    return clone;
}

export var configureMaterialOld = (material: any, {x, y, width, height, sprite}, base: number = 2048) => {

    let tex,
        clone;

    /**
     * Ignore if its a shader
     */
    if (material instanceof THREE.ShaderMaterial) {
        clone = material;
        tex = material['userData'].textures[sprite.name]
    } else {
        clone = material.clone()
        tex = material.userData ? material.userData[sprite.name] : material.map
    }

    let texture = tex.clone();

    /**
     * Persist UserData
     */
    clone.userData = material['userData'] || {};

    texture.name = sprite.name;
    texture.repeat.set(width / base, height / base);
    texture.offset.set(x / base, (base - (y + height)) / base);

    if (material instanceof THREE.ShaderMaterial) {
        clone['userData'].uniforms.texture.value = texture;
    } else {
        clone.map = texture;
    }

    texture.needsUpdate = true;

    return clone;
}

export var sprite = function (name: string) {
    return require('json!../../../../../public/assets/img/sprite-1.json')[name];
}

export var configureTexture = (sprites, maps: any[], name: string, base: number = 2048) => {

    let sprite = sprites[name],
        texture = maps[sprite.sprite.name].clone()

    let {x, y, width, height} = sprite;

    texture.repeat.set(width / base, height / base);
    texture.offset.set(x / base, (base - (y + height)) / base);
    texture.needsUpdate = true;

    return texture;
}

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
    static between(min: number, max: number, round: boolean = false): number {
        let result = (Math.random() * ((max + 1) - min)) + min;

        return round ? Math.floor(result) : result;
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
