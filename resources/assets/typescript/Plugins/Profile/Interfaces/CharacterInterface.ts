export interface CharacterInterface {
    create(models:{}, ...materials):THREE.Object3D
    material?():THREE.Material
}
