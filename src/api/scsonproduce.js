import request from "../../utils/request";

// 产品列表
export function getAllProduce() {
    return request({
        url: "/scComProduct/getAllProduct.php",
        method: "get",
        dataType: "jsonp",
    });
}

// 删除产品
export function delProduce(data) {
    return request({
        url: "scComProduct/delProduct.php",
        method: "get",
        params: data
    });
}

// 添加产品
export function addProduce(data) {
    return request({
        url: "scComProduct/addProduct.php",
        method: "post",
        data
    });
}

// 做修改时根据产品的id获取一条记录
export function getOneProduce(data) {
    return request({
        url: "scComProduct/getOneProduct.php",
        method: "get",
        params: data
    });
}

// 执行修改产品
export function updateProduce(params,data) {
    return request({
        url: "scComProduct/updateProduct.php",
        method: "post",
        params,
        data
    });
}