import {AbstractPage} from "../Abstract/AbstractPage";
import {g_ItemNameCN, g_ItemNameEN} from "../Plugins/Items/itemList";

/**
 * Profile
 */
export class PagesItem extends AbstractPage {

    public routes = [
        'user.456',
    //    'user.inventory',
    ]

    boot(e_UserID) {
        this.app.vue({
            methods: {
                img_create(src, alt, title,e_Width,e_Height) {
                    var img = document.createElement('img');
                    console.log(title);
                    img.src = src;
                    if(e_Width)
                        img.width = e_Width;
                    if(e_Height)
                        img.height = e_Height;
                    if (alt!=null) img.alt= alt;
                    if (title!=null) img.title= title;
                    return img;
                },
                CreateLabel(e_Text){
                    var l_Xml = "<\"label\">";
                    var l_Label = document.createElement('label');
                }
            },
            ready(){
                let response = this.$http.get(`/api/v1/user/${e_UserID}/items`);
                response.then( items => {
                    let l_ItemsMap = [];
                    let l_ItemsObject = items.json();
                    console.log(l_ItemsObject);
                    for(let i=0;i<l_ItemsObject.length;++i) {
                        let l_CurrentItem = l_ItemsObject[i];
                        if(!l_ItemsMap[l_CurrentItem.id]) {
                            l_ItemsMap[l_CurrentItem.id] = [];
                        }
                        if(l_CurrentItem.pivot || l_CurrentItem.pivot.quantity){
                            console.log("pivot of items is not exists!");
                        }
                        l_ItemsMap[l_CurrentItem.id].push([l_CurrentItem,l_CurrentItem.pivot.quantity]);
                    }
                    let l_Container = document.querySelector('.badges');
                    l_Container.innerHTML = '';
                    var l_CurrentLangue = "CN"
                    var l_ItemNameJson = l_CurrentLangue==="CN"?g_ItemNameCN:g_ItemNameEN;
                    for(let l_Index in l_ItemsMap) {
                        let l_Array = l_ItemsMap[l_Index];
                        if(l_Container) {
                            let l_LI = document.createElement("li")
                            l_Container.appendChild(l_LI);
                            let l_Contaioner2 = l_LI;//l_Container
                            console.log(l_Array[0]);
                            let l_ItemName = l_ItemNameJson[l_Array[0][0].id];
                            if(l_ItemName == null)
                                l_ItemName = "item name is not defind in Iten Name Json";
                            l_Contaioner2.appendChild(this.img_create(l_Array[0][0].image,null,l_ItemName,30,30));
                            let l_Text = document.createTextNode(l_Array[0][1])
                            l_Contaioner2.appendChild(l_Text);
                        }
                    }
                })
            }
        })

    }

}
