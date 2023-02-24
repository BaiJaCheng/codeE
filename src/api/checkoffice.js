import request from "../../utils/request";

//获取全部由会议室
export function getAllCheckOffice() {
    return request({
        url: "office/getAllCheckOffice.php",
        method: "get",
    });
}

//申请使用会议室
export function checkOffice(params) {
    return request({
        url: "office/checkOffice.php",
        method: "get",
        params
    })
}

//检查会议室状态
export function checkOfficeStatus(params) {
    return request({
        url: "office/checkOfficeSure.php",
        method: "get",
        params
    })
}
