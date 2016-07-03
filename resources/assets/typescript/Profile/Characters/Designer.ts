import {Character} from "../Abstract/Character";

/**
 * Character: Designer
 */
export class Designer extends Character {

    create() {

        let material = this.material(),
            head = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), material),
            body = new THREE.Mesh(new THREE.BoxGeometry(300, 400, 200), material);

        head.position.set(0, 200, 0);
        body.position.set(0, -300, 0);

        head.add(
            body
        );
        
        return head;
        
    }

    material() {
        return new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
    }

}
