import Material = THREE.Material;

/**
 * Material Interface
 */
export interface MaterialInterface {
    textures: {}
    create(textures: {}): Material
}

export interface AnimationInterface {
    animations: {}
    create(textures: {}): Animation
}
