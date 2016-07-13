export interface CharacterInterface {
    create(models:{}, textures, ...materials):THREE.Object3D
    material?():THREE.Material
}
