import request from "../../utils/request";

// 获取用户数据
export function getAllUser(data) {
    return request({
        url: "users/getAllUsers.php",
        method: "get",
        dataType: "jsonp",
        params: data
    });
}

// 删除用户
export function delUser(data) {
    return request({
        url: "users/delUsers.php",
        method: "get",
        params: data
    });
}

// 添加用户
export function addUser(data) {
    return request({
        url: "users/addUsers.php",
        method: "get",
        params: data
    });
}

// 做修改时根据用户的id获取一条记录
export function getOneUser(data) {
    return request({
        url: "users/getOneUsers.php",
        method: "get",
        params: data
    });
}

// 执行修改用户
export function updateUser(data) {
     return request({
            url: "users/updateUsers.php",
            method: "get",
            params: data
     })
}

// 修改用户权限
export function updateUserRole(data) {
    return request({
        url: "users/usersPower.php",
        method: "get",
        params: data
    });
}

//
export function userLoginAccess(data) {
    return request({
        url: "users/userLoginAccess.php",
        method: "get",
        params: data
    });
}