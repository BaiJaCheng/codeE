<template>
  <div class="employee">
    <div class="dingdan">
      <!--    添加产品按钮     -->
      <div style="margin-left: 1rem;margin-top: 1rem">
        <el-button type="primary"  :icon="Plus"  text @click="tianjia = true" >添加产品</el-button>
      </div>

      <el-divider />

      <!--     表格   -->
      <div class="caidan">
        <el-table :data="tableData" size="large" >
          <el-table-column label="产品序号" width="230" align="center">
            <template #default="scope"  >
              <div style="display: flex;  align-items: center" >
                <span style="flex: 1" >{{ scope.row.pId }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="产品名称"  width="230"  align="center">
            <template #default="scope">
              <div style="display: flex; ">
                <span style="flex: 1">{{ scope.row.pName }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="产品规格"  width="230" align="center">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span style="flex: 1">{{ scope.row.pFalg }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="logo地址"  width="200"  align="center"  style="margin-bottom: 2rem;">
            <template #default="scope">
              <img style="width:10rem;height:10rem" :src="'http://localhost:9999/api/upLoad/'+scope.row.pImg" alt="">
            </template>
          </el-table-column>

          <el-table-column label="产品价格"  width="230"  align="center" style="margin-bottom: 2rem;">
            <template #default="scope">
              <div style="display: flex; align-items: center;">
                <span style="flex: 1">{{ scope.row.pPrice }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="产品信息"  width="230"  align="center" style="margin-bottom: 2rem;">
            <template #default="scope">
              <div style="display: flex; align-items: center;">
                <span style="flex: 1">{{ scope.row.pInfo }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="子公司序号"  width="160"  align="center" style="margin-bottom: 2rem;">
            <template #default="scope">
              <div style="display: flex; align-items: center;">
                <span style="flex: 1">{{ scope.row.scId }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="300"  align="center">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row); bianji = true"
              >编辑</el-button
              >
              <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row); centerDialogVisible = true">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!--删除-->
    <el-dialog v-model="centerDialogVisible" title="提示" width="30%" center>
              <span>
                确定删除吗？
              </span>
      <template #footer>
                <span class="dialog-footer">
                  <el-button @click="centerDialogVisible = false">关闭</el-button>
                  <el-button type="primary" @click="confirmthedeletion">
                    确定
                  </el-button>
                </span>
      </template>
    </el-dialog>

    <!--  添加-->
    <el-dialog v-model="tianjia" title="提示" width="30%" center>
      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea0"
          maxlength="20"
          placeholder="产品名称"
          show-word-limit
          type="text"
      />
      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea2"
          maxlength="20"
          placeholder="产品规格"
          show-word-limit
          type="text"
      />
      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea3"
          placeholder="产品信息"
          show-word-limit
          type="text"
          clearable
      />

      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea1"
          maxlength="20"
          placeholder="产品价格"
          show-word-limit
          type="text"
          clearable
      />

      <el-select  style="margin-bottom: 1rem" v-model="value" class="m-2" placeholder="请选择子公司" size="large">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>


      <el-upload
          class="upload-demo"
          action="http://localhost:9999/api/getPic.php"
          multiple
          :before-upload="beforeAvatarUpload"
          :limit="1"
      >
        <el-button type="primary">点击上传</el-button>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png格式，大小不超过500kb
          </div>
        </template>
      </el-upload>




      <template #footer>
                <span class="dialog-footer">
                  <el-button @click="tianjia = false">关闭</el-button>
                  <el-button type="primary" @click="add">
                    确定
                  </el-button>
                </span>
      </template>
    </el-dialog>

    <!--编辑-->
    <el-dialog v-model="bianji" title="提示" width="30%" center>
      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea8"
          placeholder="产品ID"
          show-word-limit
          type="text"
          clearable
      />
      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea4"
          placeholder="产品名称"
          show-word-limit
          type="text"
      />
      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea5"
          placeholder="产品规格"
          show-word-limit
          type="text"
      />
      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea6"
          placeholder="产品信息"
          show-word-limit
          type="text"
          clearable
      />

      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea7"
          placeholder="产品价格"
          show-word-limit
          type="text"
          clearable
      />





      <el-upload
          class="avatar-uploader"
          action="http://localhost:9999/api/getPic.php"
          :show-file-list="false"
          :before-upload="beforeAvatarUploa"
          :on-success="handleAvatarSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>

      <template #footer>
                <span class="dialog-footer">
                  <el-button @click="bianji = false">关闭</el-button>
                  <el-button type="primary" @click="bian">
                    确定
                  </el-button>
                </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {reactive, shallowRef, computed} from "vue";
import {getAllSonCom} from "@/api/soncom";
import {getAllProduce,getOneProduce,addProduce,delProduce,updateProduce} from "@/api/scsonproduce";
import Tips from "../../../config/Tips";
import { ElMessage } from 'element-plus'
import {addSonCom} from "@/api/soncom";
import { Plus } from '@element-plus/icons-vue'

const total = shallowRef(10)
const pageNumber = shallowRef(1)
const centerDialogVisible = shallowRef(false)
const tianjia = shallowRef(false)
const bianji = shallowRef(false)
const textarea0 = shallowRef('')
const textarea1 = shallowRef('')
const textarea2 = shallowRef('')
const textarea3 = shallowRef('')
const textarea4 = shallowRef('')
const textarea5 = shallowRef('')
const textarea6 = shallowRef('')
const textarea7 = shallowRef('')
const textarea8 = shallowRef('')
const id = shallowRef('')
const visible = shallowRef(false)
const search = shallowRef('')
//调用api获取全部菜单
const tableData = reactive([]);
getAllProduce().then(res=>{
  total.value = res.data.length
  tableData.push(...res.data)
})
const filterTableData = computed(() =>
    tableData.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)

//删除部门
const handleDelete = (index, row) => {
  // 将visible 状态 true
  visible.value = true
  //取出菜单id
  id.value = row.pId;
}
const confirmthedeletion = () => {
  //调用删除接口
  delProduce({pId:id.value}).then(res=>{
    if(res.data === 'error'){
      Tips.error('删除失败请重试')
    }else if(res.data === 1){
      Tips.success('删除成功')
    }
  })
  centerDialogVisible.value = false
  //刷新页面
  window.location.reload()
}

//添加部门
const options = shallowRef([])
const value = shallowRef('')
getAllSonCom().then(res=>{
  for (let i = 0; i < res.data.length; i++) {
    options.value.push({value:res.data[i].scId,label:res.data[i].scName})
  }
})

const multfileImg = shallowRef('')
const beforeAvatarUpload = (file) => {
  multfileImg.value = file
  console.log(file)
}



const add = () => {
  //调用添加接口
  let url =  "http://localhost:9999/api/getPic.php"
  let FormData = require("form-data");
  let fd = new FormData() //创建formData 处理普通数据 图片数据
  fd.append('pName', textarea0.value)
  fd.append('pFalg', textarea2.value)
  fd.append('pInfo', textarea3.value)
  fd.append('pPrice',textarea1.value)
  fd.append('scId', value.value)
  fd.append('file',multfileImg.value) //传图片的
  addProduce(fd).then((res)=>{
    console.log(fd,6666666666)
    Tips.success('添加成功')
    setTimeout(()=>{
      window.location.reload()
    },1000)
  })

}




//编辑部门
const imageUrl = shallowRef('')
const handleEdit = (index, row) => {
  //取出菜单id
  console.log(row)
  id.value = row.pId;
  console.log(id.value)
  textarea8.value = row.pId
   textarea4.value = row.pName
   textarea5.value = row.pFalg
   textarea6.value = row.pInfo
   textarea7.value = row.pPrice
  imageUrl.value ='http://localhost:9999/api/upload/'+row.pImg
  // 将visible 状态 true
  bianji.value = true
}
// 文件上传成功的钩子
// const handleAvatarSuccess = (response, uploadFile) => {
//   console.log(uploadFile,'文件上传成功的钩子')
//   imageUrl.value = URL.createObjectURL(uploadFile.raw)
// }

const beforeAvatarUploa = (file)=>{
  imageUrl.value = file
  console.log(file)
}

const bian = () => {
  //调用编辑接口
  let url =  "http://localhost:9999/api/getPic.php"
  let FormData = require("form-data"); //导入上传控件
  let fd = new FormData() //创建formData 处理普通数据 图片数据
  fd.append('pName', textarea4.value)
  fd.append('pFalg', textarea5.value)
  fd.append('pInfo',textarea6.value)
  fd.append('pPrice',  textarea7.value)
  fd.append('file',imageUrl.value) //传图片的
  updateProduce({pId:textarea8.value},fd).then((res)=>{
    console.log(fd,6666666666)
    console.log(res)
    Tips.success('编辑成功')
    window.location.reload()
  })
//清空图片
  imageUrl.value = ''

  //关闭输入框
  centerDialogVisible.value = false
  //刷新页面
  // window.location.reload()
}
</script>
<style scoped>
.employee {
  position: absolute;
  top: 4.7rem;
  left: 15.4rem;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.caidan{
  width: 90vw;
}
.dingdan{
  width: 100vw;
  /*height: 100vh;*/
  background-color: #fff;
  font-size: 3rem;
  font-weight: 700;

}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>