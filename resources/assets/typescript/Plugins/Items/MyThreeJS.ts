//author cloud


export class TextureLoader {
    private m_Loader: THREE.TextureLoader;
    private m_DefaultImage: THREE.Texture;
    private m_ImageCache = [];
    private m_WaitList = [];

    constructor() {
        this.m_Loader = new THREE.TextureLoader();
        this.getTexture("/img/default.png", e_Image=> {
            this.m_DefaultImage = e_Image;
        });
        this.m_ImageCache = [];
    }
    doDumpImage(e_ImageName,e_Image){
        let l_Image = e_Image;
        let l_FunctionArray = this.m_WaitList[e_ImageName];
        console.log("1-----");
        if (l_FunctionArray) {
            for (var i = 0; i < l_FunctionArray.length; ++i) {
                console.log(i);
                l_FunctionArray[i](l_Image);
            }
        }
        this.m_WaitList[e_ImageName] = null;
    }
    getTexture(e_TextureName, e_ParsedoneFunction) {
        e_ParsedoneFunction(null);
        return;
        //I have no idea why this doesn't work
        let l_TextureName = e_TextureName;
        if (!l_TextureName) {
            e_ParsedoneFunction(this.m_DefaultImage);
            return;
        }
        if (this.m_ImageCache[e_TextureName]) {
            e_ParsedoneFunction(this.m_ImageCache[e_TextureName]);
            return;
        }
        if (!this.m_WaitList[e_TextureName]) {
            this.m_WaitList[e_TextureName] = [];
        }
        //this.m_WaitList[e_TextureName].push(e_ParsedoneFunction);
        // load a image resource
        let l_Texture = this.m_Loader.load(e_TextureName);
        e_ParsedoneFunction(l_Texture);
        this.m_ImageCache[e_TextureName] = l_Texture;
        // this.m_Loader.load(
        //     // resource URL
        //     e_TextureName,
        //     // Function when resource is loaded
        //     (image)=>{
        //         console.log("tex loaded:"+l_TextureName);
        //         this.m_ImageCache[l_TextureName] = image;
        //         this.doDumpImage(l_TextureName,image);
        //     },
        //     // Function called when download progresses
        //     (xhr)=>{
        //         console.log(l_TextureName + ":" + (xhr.loaded / xhr.total * 100) + '% loaded');
        //     },
        //     // Function called when download errors
        //     (xhr)=>{
        //         console.log( l_TextureName + ' An error happened return default image' );
        //         this.doDumpImage("/img/default.png",this.m_DefaultImage);
        //     })
    }
}
;

export var g_TextureLoader: TextureLoader = new TextureLoader();
export class My2DCamera extends THREE.OrthographicCamera {

    constructor(e_Width, e_Height) {
        super(0, e_Width,e_Height, 0,-1000, 1000);
        //var l_CameraHelper = new THREE.CameraHelper(camera2);
        //scene.add(l_CameraHelper);
    }

    update() {
        this.updateProjectionMatrix();
        //this.m_OrgthCamera.
        //   this.cube.rotation.x += 0.1;
        // this.cube.rotation.y += 0.1;
    }
}

export class My2DImage extends THREE.Object3D {
    protected   m_Material = null;
    protected   m_Geometry = null;
    public      m_Plane = null;
    private     m_bAssignImageSize:boolean = true;
    //var l_Test = new My2DImage("img/profile/dreamsArkRef89.png",720,480,this.app);
    constructor(e_FileName, e_iWidth, e_iHeight,e_bAssignImageSize) {
        super();
        if(e_bAssignImageSize){
            this.m_bAssignImageSize = e_bAssignImageSize;
        }
        //var l_Texture = THREE.ImageUtils.loadTexture(e_FileName);
        if(e_FileName && e_FileName.length ) {
            g_TextureLoader.getTexture(e_FileName, e_Texture => {
                    this.m_Geometry = new THREE.PlaneGeometry(10, 10, 1);
                    let l_TextureManager = new THREE.TextureLoader();
                    let l_Texture = l_TextureManager.load(e_FileName, e_Texture=> {
                        if (this.m_Geometry && this.m_bAssignImageSize) {
                            //console.log(e_Texture.image.width);
                            //console.log(e_Texture.image.height);
                            this.m_Geometry.width = e_Texture.image.width;
                            this.m_Geometry.height = e_Texture.image.height;
                        }
                    });
                    this.m_Material = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: l_Texture,transparent:true});
                    this.m_Plane = new THREE.Mesh(this.m_Geometry, this.m_Material);
                    this.add(this.m_Plane);
                }
            );
        }else {
            this.m_Geometry = new THREE.PlaneGeometry(e_iWidth?e_iWidth:1, e_iHeight?e_iHeight:1, 1);
            this.m_Material = new THREE.MeshBasicMaterial({side: THREE.DoubleSide,transparent:true});
            this.m_Plane = new THREE.Mesh(this.m_Geometry, this.m_Material);
            this.add(this.m_Plane);
        }
        //this.rotation.y = Math.PI / 2;
        // this.setRotationFromAxisAngle(new THREE.Vector3(0,0,1),0.314/4);
    }
    SetColor(e_Color,e_Alpha){
        if(this.m_Material) {
            this.m_Material.color.set(e_Color);
            this.m_Material.opacity = e_Alpha;
            //this.m_Material.transparent = true;
            //this.m_Material.depthwrite = false;
        }
    }
    //plane.quaternion.copy( camera.quaternion );

    // setPosition(e_PosX,e_PosY){
    //     this.m_Plane.position.set(e_PosX,e_PosY,0);
    // }
}
//for three init
export abstract class MyBaseView {
    protected m_Renderer: THREE.WebGLRenderer;
    //perspective projection
    protected m_Camera:THREE.PerspectiveCamera;
    protected m_Scene: THREE.Scene;
    //with 2D camera
    protected m_2DCamera: My2DCamera;
    protected m_2DScene: THREE.Scene;
    public m_ViewPortWidth;
    public m_ViewPortHeight;
    public m_Container;
    public m_Window;
    //time
    protected m_LastTime:Date;
    protected m_CurrentTime:Date;
    protected m_TimeDiff;
    constructor(e_ViewPortWidth, e_ViewPortHeight, e_Container, e_Window) {
        this.m_ViewPortWidth = e_ViewPortWidth;
        this.m_ViewPortHeight = e_ViewPortHeight;
        this.m_Container = e_Container;
        this.m_Window = e_Window;
    }

    InitWebGL() {
        this.m_Renderer = new THREE.WebGLRenderer();
        this.m_Renderer.setPixelRatio(this.m_Window.devicePixelRatio);
        this.m_Renderer.setSize(this.m_Window.innerWidth, this.m_Window.innerHeight);
        this.m_Container.appendChild(this.m_Renderer.domElement);
    }

    InitScene() {
        //constructor(fov?: number, aspect?: number, near?: number, far?: number);
        this.m_Camera = new THREE.PerspectiveCamera(60,this.GetViewPortAspect(),0,1000);
        this.m_Scene = new THREE.Scene();
        this.m_2DCamera = new My2DCamera(this.m_Window.innerWidth,this.m_Window.innerHeight);
        this.m_2DScene = new THREE.Scene();
    }
    Init(){
        console.log("InitWebGL");
        this.InitWebGL();
        console.log("InitScene");
        this.InitScene();
        this.m_LastTime = new Date();
        this.m_CurrentTime = new Date();
        this.m_TimeDiff = 0;
        this.InternalInit();
    }
    GetViewPortAspect(){
        let l_Aspect = this.m_Window.innerWidth/this.m_Window.innerHeight;
        return l_Aspect;
    }
    Update(e_fElpaseTime){
        this.m_2DCamera.update();
        this.m_Camera.updateProjectionMatrix();
        this.InternalUpdate(e_fElpaseTime);
    }
    Render(){
        this.InternalRender();
        console.log("test qoo");
        this.m_Renderer.setClearColor(new THREE.Color(0x888888));
        this.m_Renderer.render(this.m_Scene,this.m_Camera);
        this.m_Renderer.render(this.m_2DScene,this.m_2DCamera);

        //glViewport();
    }
    abstract InternalInit();
    abstract InternalUpdate(e_ElpaseTime);
    abstract InternalRender();
    animate(delta) {

        var loop = () =>{
            this.m_Window.requestAnimationFrame( loop );
            this.Update(delta);
            this.Render();
        }

        loop();

        // let l_CurrentTime = new Date();
        // this.m_LastTime = this.m_CurrentTime;
        // this.m_CurrentTime = l_CurrentTime;
//        this.m_TimeDiff = (this.m_CurrentTime.getTime() - this.m_LastTime.getTime())/1000;
        //this.m_TimeDiff = delta;

    }
}
