import { is } from "../../Helpers";
import { extend, requireAll, } from "../../../Helpers";
import { resize, configureMaterial, deg2rad } from "../Helpers";
import { Intro } from "../Intro";

export abstract class Forgable {

    public app;
    public camera;
    private sprite = {};

    get defaults() {
        return {
            scale: 100,
            widthFactor: 1,
            heightFactor: 1,
            mesh: THREE.Mesh,
            geometry: THREE.PlaneGeometry,
            uvs: true,
            uv: {},
            isle: 1,
            rotation: {
                x: 0, y: 0, z: 0
            },
            position: {
                x: 50,
                y: 50,
                z: 50
            }
        }
    }

    constructor(app: Intro) {
        this.app = app;
        this.camera = app.camera;

        let sprites = requireAll(
            require.context('json!../../../../../../public/assets/img', false, /\.json$/)
        )

        for (let sprite in sprites) {
            Object
                .keys(sprites[sprite])
                .map(property => this.sprite[property] = sprites[sprite][property])
        }

    };

    /**
     * Forge a new asset
     *
     * @param name
     * @param material
     * @param options
     * @returns {THREE.Mesh}
     */
    public forge(name: string, material: any, options: any = {}): THREE.Object3D {
        return this.setup(name, extend(this.sprite[name], options), material);
    }

    public get3DPosition(view, size, targetX, targetY) {

        let x = (view.width - size.width) / 2,
            y = (view.height - size.height) / 2;

        return {
            x: -(x + (((-x - x) / 100) * targetX)),
            y: (y + (((-y - y) / 100) * targetY)),
            z: view.depth
        }
    }

    public createMesh(geometry: THREE.Geometry, material: THREE.Material, mesh: any): THREE.Mesh {
        return new mesh(geometry, material)
    };

    public createGeometry(width: number, height: number, view, geometry: any): THREE.Geometry {

        if (geometry instanceof THREE.Geometry) {
            return this.computeGeometrySize(geometry, width);
        }

        return new geometry(width, height);
    }


    /**
     * @todo the defaults.width is not right.. 
     * because if its already a 3D object.. it is not the texture size
     */
    public getDimentions(...options: any[]) {

        let defaults = extend(this.defaults, ...options),
            view = this.camera.getViewSize(defaults.position.z),
            size = resize(
                view.width * defaults.widthFactor, view.height * defaults.heightFactor, defaults.width, defaults.height, defaults.scale
            );

        let position = this.get3DPosition(view, size, defaults.position.x, defaults.position.y)

        return {
            view, size, position, defaults
        }

    }

    private computeGeometrySize(geometry: any, width: number) {

        geometry.computeBoundingBox();

        let box = geometry.boundingBox,
            scale = Math.abs(box.max.x - box.min.x) / width;

        geometry.vertices.forEach((vertice: THREE.Vector3) => {
            vertice.divideScalar(scale)
        });

        geometry.verticesNeedUpdate = true;

        return geometry;

    }

    public setup(object: THREE.Object3D | string, options: any = {}, material?: THREE.Material): THREE.Object3D {

        /**
         * If its an object its necessary to know its width, and height
         */
        if (object instanceof THREE.Mesh) {

            let box = object.geometry.boundingBox,
                result = box.max.add(box.min.negate());

            options = extend(options, {
                width: result.x,
                height: result.y,
            })

        }

        let {view, size, position, defaults} = this.getDimentions(options);

        if (object instanceof THREE.Mesh) {

            object.geometry = this.computeGeometrySize(
                object.geometry.clone(), size.width
            );

        }

        if (typeof (object) === "string") {

            const name = object;

            let geometry;

            /**
             * if its a object it must to have a create method create
             */
            if (is.Object(defaults.geometry) && !(defaults.geometry instanceof THREE.Geometry)) {
                geometry = defaults.geometry.create(size.width, size.height, view)
            } else {
                geometry = this.createGeometry(size.width, size.height, view, defaults.geometry);
            }

            object = this.createMesh(
                geometry, configureMaterial(material, defaults), defaults.mesh
            );

            object.name = name;

        }

        /**
         * Only Apply if it uses uvs
         */
        if (defaults.uvs)
            this.configureUVs(object['geometry'], options.uv, defaults.isle)

        object.userData.meta = {
            view, size, position, defaults
        }

        object.position.set(
            position.x, position.y, position.z
        );

        object.rotation.set(
            deg2rad(defaults.rotation.x),
            deg2rad(defaults.rotation.y),
            deg2rad(defaults.rotation.z)
        );

        return object;

    }

    public configureUVs(geometry: THREE.Geometry, data: any, isle: number) {

        if (geometry instanceof THREE.Geometry) {
            
            for (let face of geometry.faceVertexUvs[isle - 1]) {

                for (let uv of face) {

                    let u = (uv.x * data.uDistance) + data.u1,
                        v = (uv.y * data.vDistance) + data.v1;

                    uv.set(u, v);

                }

            }

        }

        geometry.uvsNeedUpdate = true;

    }


}
