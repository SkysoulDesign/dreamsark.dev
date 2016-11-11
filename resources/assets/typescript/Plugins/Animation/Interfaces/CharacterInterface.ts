export interface CharacterInterface {
    create(models:{}, textures, ...materials):THREE.Object3D
    models?():string[]
}
