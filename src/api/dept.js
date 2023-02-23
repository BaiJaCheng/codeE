import request from "../../utils/request";

//获取全部部门
export function getAllDept() {
    return request({
        url: "/dept/getAllDept.php",
        method: "get",
    });
}

//删除部门
export function delDept(data) {
    return request({
        url: "/dept/delDept.php",
        method: "post",
        params:data
    });
}

//添加部门
export function addDept(data) {
    return request({
        url: "/dept/addDept.php",
        method: "GET",
        params:data
    });
}

//做修改时根据部门的id获取一条记录
export function getOneDept(data) {
    return request({
        url: "/dept/getOneDept.php",
        method: "GET",
        params:data
    });
}

//执行修改部门
export function updateDept(data) {
    return request({
        url: "/dept/updateDept.php",
        method: "GET",
        params:data
    });
}