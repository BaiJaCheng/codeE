// 公用的弹窗组件
 import {ElMessage} from "element-plus";

const Tips = {
    // 成功提示
    success(msg) {
        ElMessage.success(msg);
    },
    // 失败提示
    error(msg) {
        ElMessage.error(msg);
    },
    // 警告提示
    warning(msg) {
        ElMessage.warning(msg);
    }
}

export default Tips;