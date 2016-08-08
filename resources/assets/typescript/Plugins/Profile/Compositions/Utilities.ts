//author cloud
//
// export class My2DImage {
//
//     protected m_Material = null;
//     protected m_Geometry = null;
//     public m_Plane = null;
//     //protected m
//     constructor(e_FileName,e_iWidth,e_iHeight,e_App){
//         //var l_Texture = THREE.ImageUtils.loadTexture(e_FileName);
//         e_App.loader.load(e_FileName, e_Image => {
//                 console.log(e_Image);
//                 if (this.m_Material) {
//                     this.m_Material.map = e_Image;
//                     this.m_Material.needsUpdate = true;
//                 }
//             }
//         );
//         this.m_Geometry = new THREE.PlaneGeometry( e_iWidth, e_iHeight, 1 );
//         this.m_Material = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide} );
//         this.m_Plane = new THREE.Mesh( this.m_Geometry, this.m_Material );
//         // getTextureByName(e_FileName,function(e_Image){
//         // }.bind(this));
//     };
// }
