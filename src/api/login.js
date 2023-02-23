import request from "../../utils/request";

// 登录
export function login(data) {
    return request({
        url: "/login/login.php",
        method: "post",
        dataType: "jsonp",
        data
    });
}

//注册
export function register(data) {
    return request({
        url: "/users/reg.php",
        method: "get",
        dataType: "jsonp",
        params:data
    });
}