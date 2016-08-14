//author cloud
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TextureLoader = (function () {
    function TextureLoader() {
        var _this = this;
        this.m_ImageCache = [];
        this.m_WaitList = [];
        this.m_Loader = new THREE.TextureLoader();
        this.getTexture("/img/default.png", function (e_Image) {
            _this.m_DefaultImage = e_Image;
        });
        this.m_ImageCache = [];
    }
    TextureLoader.prototype.doDumpImage = function (e_ImageName, e_Image) {
        var l_Image = e_Image;
        var l_FunctionArray = this.m_WaitList[e_ImageName];
        console.log("1-----");
        if (l_FunctionArray) {
            for (var i = 0; i < l_FunctionArray.length; ++i) {
                console.log(i);
                l_FunctionArray[i](l_Image);
            }
        }
        this.m_WaitList[e_ImageName] = null;
    };
    TextureLoader.prototype.getTexture = function (e_TextureName, e_ParsedoneFunction) {
        e_ParsedoneFunction(null);
        return;
        //I have no idea why this doesn't work
        var l_TextureName = e_TextureName;
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
        var l_Texture = this.m_Loader.load(e_TextureName);
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
    };
    return TextureLoader;
}());
exports.TextureLoader = TextureLoader;
;
exports.g_TextureLoader = new TextureLoader();
var My2DCamera = (function (_super) {
    __extends(My2DCamera, _super);
    function My2DCamera(e_Width, e_Height) {
        _super.call(this, 0, e_Width, e_Height, 0, -1000, 1000);
        //var l_CameraHelper = new THREE.CameraHelper(camera2);
        //scene.add(l_CameraHelper);
    }
    My2DCamera.prototype.update = function () {
        this.updateProjectionMatrix();
        //this.m_OrgthCamera.
        //   this.cube.rotation.x += 0.1;
        // this.cube.rotation.y += 0.1;
    };
    return My2DCamera;
}(THREE.OrthographicCamera));
exports.My2DCamera = My2DCamera;
var My2DImage = (function (_super) {
    __extends(My2DImage, _super);
    //var l_Test = new My2DImage("img/profile/dreamsArkRef89.png",720,480,this.app);
    function My2DImage(e_FileName, e_iWidth, e_iHeight, e_bAssignImageSize) {
        var _this = this;
        _super.call(this);
        this.m_Material = null;
        this.m_Geometry = null;
        this.m_Plane = null;
        this.m_bAssignImageSize = true;
        if (e_bAssignImageSize) {
            this.m_bAssignImageSize = e_bAssignImageSize;
        }
        //var l_Texture = THREE.ImageUtils.loadTexture(e_FileName);
        if (e_FileName && e_FileName.length) {
            exports.g_TextureLoader.getTexture(e_FileName, function (e_Texture) {
                _this.m_Geometry = new THREE.PlaneGeometry(10, 10, 1);
                var l_TextureManager = new THREE.TextureLoader();
                var l_Texture = l_TextureManager.load(e_FileName, function (e_Texture) {
                    if (_this.m_Geometry && _this.m_bAssignImageSize) {
                        //console.log(e_Texture.image.width);
                        //console.log(e_Texture.image.height);
                        _this.m_Geometry.width = e_Texture.image.width;
                        _this.m_Geometry.height = e_Texture.image.height;
                    }
                });
                _this.m_Material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: l_Texture, transparent: true });
                _this.m_Plane = new THREE.Mesh(_this.m_Geometry, _this.m_Material);
                _this.add(_this.m_Plane);
            });
        }
        else {
            this.m_Geometry = new THREE.PlaneGeometry(e_iWidth ? e_iWidth : 1, e_iHeight ? e_iHeight : 1, 1);
            this.m_Material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true });
            this.m_Plane = new THREE.Mesh(this.m_Geometry, this.m_Material);
            this.add(this.m_Plane);
        }
        //this.rotation.y = Math.PI / 2;
        // this.setRotationFromAxisAngle(new THREE.Vector3(0,0,1),0.314/4);
    }
    My2DImage.prototype.SetColor = function (e_Color, e_Alpha) {
        if (this.m_Material) {
            this.m_Material.color.set(e_Color);
            this.m_Material.opacity = e_Alpha;
        }
    };
    return My2DImage;
}(THREE.Object3D));
exports.My2DImage = My2DImage;
//for three init
var MyBaseView = (function () {
    function MyBaseView(e_ViewPortWidth, e_ViewPortHeight, e_Container, e_Window) {
        this.m_ViewPortWidth = e_ViewPortWidth;
        this.m_ViewPortHeight = e_ViewPortHeight;
        this.m_Container = e_Container;
        this.m_Window = e_Window;
    }
    MyBaseView.prototype.InitWebGL = function () {
        this.m_Renderer = new THREE.WebGLRenderer();
        this.m_Renderer.setPixelRatio(this.m_Window.devicePixelRatio);
        this.m_Renderer.setSize(this.m_Window.innerWidth, this.m_Window.innerHeight);
        this.m_Container.appendChild(this.m_Renderer.domElement);
    };
    MyBaseView.prototype.InitScene = function () {
        //constructor(fov?: number, aspect?: number, near?: number, far?: number);
        this.m_Camera = new THREE.PerspectiveCamera(60, this.GetViewPortAspect(), 0, 1000);
        this.m_Scene = new THREE.Scene();
        this.m_2DCamera = new My2DCamera(this.m_Window.innerWidth, this.m_Window.innerHeight);
        this.m_2DScene = new THREE.Scene();
    };
    MyBaseView.prototype.Init = function () {
        console.log("InitWebGL");
        this.InitWebGL();
        console.log("InitScene");
        this.InitScene();
        this.m_LastTime = new Date();
        this.m_CurrentTime = new Date();
        this.m_TimeDiff = 0;
        this.InternalInit();
    };
    MyBaseView.prototype.GetViewPortAspect = function () {
        var l_Aspect = this.m_Window.innerWidth / this.m_Window.innerHeight;
        return l_Aspect;
    };
    MyBaseView.prototype.Update = function (e_fElpaseTime) {
        this.m_2DCamera.update();
        this.m_Camera.updateProjectionMatrix();
        this.InternalUpdate(e_fElpaseTime);
    };
    MyBaseView.prototype.Render = function () {
        this.InternalRender();
        console.log("test qoo");
        this.m_Renderer.setClearColor(new THREE.Color(0x888888));
        this.m_Renderer.render(this.m_Scene, this.m_Camera);
        this.m_Renderer.render(this.m_2DScene, this.m_2DCamera);
        //glViewport();
    };
    MyBaseView.prototype.animate = function (delta) {
        var _this = this;
        var loop = function () {
            _this.m_Window.requestAnimationFrame(loop);
            _this.Update(delta);
            _this.Render();
        };
        loop();
        // let l_CurrentTime = new Date();
        // this.m_LastTime = this.m_CurrentTime;
        // this.m_CurrentTime = l_CurrentTime;
        //        this.m_TimeDiff = (this.m_CurrentTime.getTime() - this.m_LastTime.getTime())/1000;
        //this.m_TimeDiff = delta;
    };
    return MyBaseView;
}());
exports.MyBaseView = MyBaseView;
//# sourceMappingURL=MyThreeJS.js.map