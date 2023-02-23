 import request from "../../utils/request";

//获取全部菜单
export function getAllMenu() {
    return request({
        url: "/nav/getAllNav.php",
        method: "get",
    });
}
//删除菜单
export function delMenu(data) {
    return request({
        url: "/nav/delNav.php",
        method: "GET",
        params:data
    });
}

//添加菜单
export function addMenu(data) {
    return request({
        url: "/nav/addNav.php",
        method: "GET",
        params:data
    });
}

//做修改时根据菜单的id获取一条记录
export function getOneMenu(data) {
    return request({
        url: "/nav/getOneNav.php",
        method: "GET",
        params:data
    });
}

//执行修改菜单
export function updateMenu(data) {
    return request({
        url: "/nav/updateNav.php",
        method: "GET",
        params:data
    });
}

 // 获取权限路由
 export function getPower(data) {
     return request({
         url: "nav/getPowerNav.php",
         method: "get",
         params: data
     });
 }


