import request from "../../utils/request";

// 子公司列表
export function getAllSonCom() {
    return request({
        url: "/sonCom/getAllSC.php",
        method: "get",
        dataType: "jsonp",
    });
}

// 删除子公司
export function delSonCom(data) {
    return request({
        url: "sonCom/delSC.php",
        method: "get",
        params: data
    });
}

// 添加子公司
export function addSonCom(data) {
    return request({
        url: "sonCom/addSC.php",
        method: "post",
        data
    });
}

// 做修改时根据子公司的id获取一条记录
export function getOneSonCom(data) {
    return request({
        url: "sonCom/getOneSC.php",
        method: "get",
        params: data
    });
}

// 执行修改子公司
export function updateSonCom(params,data) {
    return request({
        url: "sonCom/updateSC.php",
        method: "post",
        params,
        data
    });
}