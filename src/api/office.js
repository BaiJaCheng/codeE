import request from "../../utils/request";

//获取会议列表
export function getAllOffice(data) {
    return request({
        url: "office/getOffice.php",
        method: "post",
         data
    });
}

//增加会议
export function addOffice(params) {
    return request({
        url: "office/addOffice.php",
        method: "get",
        params
    })
}

//删除会议
export function delOffice(params) {
    return request({
        url: "office/delOffice.php",
        method: "get",
        params
    })
}

//根据一个获取信息
export function getOneOffice(params) {
   return request({
         url: "office/getOneOffice.php",
            method: "get",
            params
   })
}

//修改会议
export function updateOffice(params) {
    return request({
        url: "office/updateOffice.php",
        method: "get",
        params
    })
}

