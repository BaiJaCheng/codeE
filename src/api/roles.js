import request from "../../utils/request";

// 获取所有角色数据
export function getAllRole() {
    return request({
        url: "/roles/getAllRoles.php",
        method: "get",
        dataType: "jsonp",
    });
}

// 删除角色
export function delRole(data) {
    return request({
        url: "roles/delRoles.php",
        method: "get",
        params: data
    });
}

// 添加角色
export function addRole(data) {
    return request({
        url: "roles/addRoles.php",
        method: "get",
        params: data
    });
}

// 做修改时根据角色的id获取一条记录
export function getOneRole(data) {
    return request({
        url: "roles/getOneRoles.php",
        method: "get",
        params: data
    });
}

// 执行修改角色
export function updateRole(data) {
    return request({
        url: "roles/updateRoles.php",
        method: "get",
        params: data
    });
}
