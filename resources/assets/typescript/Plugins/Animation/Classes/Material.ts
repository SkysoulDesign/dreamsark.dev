import {Components} from "../Abstract/Components";
import {countKeys} from "../../Helpers";

/**
 * Material Class
 */
export class Material extends Components {

    /**
     * List of Initialized Materials
     */
    private initialized = {};
    private loader;

    private materials = {
        baseMaterial: require('../Materials/BaseMaterial'),
        itemMaterial: require('../Materials/ItemMaterial')
    }

    boot(app) {
        this.loader = app.loader;
    }

    /**
     * Get Material
     * @param name
     * @returns {any}
     */
    get(name:string) {

        if (!this.materials.hasOwnProperty(name))
            return window['dreamsark'].logger.error(`No material found with the name: ${name}`);

        if (this.initialized.hasOwnProperty(name))
            return this.initialized[name];

        return this.load(name, this.materials[name]);

    }

    private load(name, object) {

        let material;

        for (let i in object) {

            let instance = new object[i];
            instance.boot(this.app);

            material = instance.material();

            let textures = instance.textures(),
                counter = 1,
                max = countKeys(textures);

            for (let name in textures) {

                this.loader.load(textures[name], texture => {

                    texture.name = name;
                    textures[name] = texture;

                    if (counter !== max)
                        return ++counter;

                    instance.loaded(material, textures)

                })

            }

        }

        return this.initialized[name] = material;

    }

}
