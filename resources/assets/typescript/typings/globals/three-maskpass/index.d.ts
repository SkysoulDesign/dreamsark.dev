// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/7de6c3dd94feaeb21f20054b9f30d5dabc5efabd/threejs/three-maskpass.d.ts
declare namespace THREE {
	export class MaskPass {
		constructor( scene: Scene, camera: Camera);

		scene: Scene;
		camera: Camera;
		enabled: boolean;
		clear: boolean;
		needsSwap: boolean;
		inverse: boolean;

        render(renderer: WebGLRenderer, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, delta: number): void;
	}

	export class ClearMaskPass {
		constructor();

		enabled: boolean;

        render(renderer: WebGLRenderer, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, delta: number): void;
	}
}
