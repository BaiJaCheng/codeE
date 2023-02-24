<template>
  <div class="employee">
    <div class="dingdan">
      <!--    添加部门按钮     -->
      <div style="margin-left: 1rem;margin-top: 1rem">
        <el-button type="primary"  :icon="Plus"  text @click="tianjia = true" >添加子公司</el-button>
      </div>

      <el-divider />

      <!--     表格   -->
      <div class="caidan">
        <el-table :data="tableData" size="large" >
          <el-table-column label="部门序号" width="200" align="center">
            <template #default="scope"  >
              <div style="display: flex;  align-items: center" >
                <span style="flex: 1" >{{ scope.row.scId }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="子公司名称"  width="200"  align="center">
            <template #default="scope">
              <div style="display: flex; ">
                <span style="flex: 1">{{ scope.row.scName }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="子公司负责人"  width="200" align="center">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span style="flex: 1">{{ scope.row.scMan }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="负责人电话"  width="200"  align="center" style="margin-bottom: 2rem;">
            <template #default="scope">
              <div style="display: flex; align-items: center;">
                <span style="flex: 1">{{ scope.row.scTel }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="公司网站"  width="200"  align="center" style="margin-bottom: 2rem;">
            <template #default="scope">
              <div style="display: flex; align-items: center;">
                <span style="flex: 1">{{ scope.row.scWebUrl }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="logo地址"  width="200"  align="center"  style="margin-bottom: 2rem;">
            <template #default="scope">
              <img style="width:6rem;height:6rem" :src="'http://localhost:9999/api/upLoad/'+scope.row.scLogo" alt="">
            </template>
          </el-table-column>

          <el-table-column label="角色Id"  width="200"  align="center" style="margin-bottom: 2rem;">
            <template #default="scope">
              <div style="display: flex; align-items: center;">
                <span style="flex: 1">{{ scope.row.uId }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="450"  align="center">
            <template #default="scope">
              <!--编辑-->
              <el-button size="small" @click="handleEdit(scope.$index, scope.row); bianji = true">编辑</el-button>
              <!--查看产品-->
              <el-button size="small" @click="handleLook(scope.$index, scope.row); ">查看产品</el-button>
              <!--添加产品-->
              <el-button size="small" @click="handleAdd(scope.$index, scope.row); tianjiaCp = true">添加产品</el-button>
              <!--删除-->
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
          placeholder="子公司名称"
          show-word-limit
          type="text"
      />
      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea2"
          maxlength="20"
          placeholder="公司负责人"
          show-word-limit
          type="text"
      />
      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea3"
          placeholder="电话号"
          show-word-limit
          type="text"
          clearable
      />

      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea1"
          maxlength="20"
          placeholder="公司网站"
          show-word-limit
          type="text"
          clearable
      />

      <div style="margin-bottom: 1rem">
        <el-cascader style="margin-right: 3.3rem" v-model="value" :options="options" @change="handleChange" />
      </div>

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

    <!--  添加产品-->
    <el-dialog v-model="tianjiaCp" title="提示" width="30%" center>
      <el-input
          style="margin-bottom: 1rem"
          v-model="textare0"
          maxlength="20"
          placeholder="产品名称"
          show-word-limit
          type="text"
      />
      <el-input
          style="margin-bottom: 1rem"
          v-model="textare1"
          maxlength="20"
          placeholder="产品规格"
          show-word-limit
          type="text"
      />
      <el-input
          style="margin-bottom: 1rem"
          v-model="textare2"
          placeholder="产品信息"
          show-word-limit
          type="text"
          clearable
      />

      <el-input
          style="margin-bottom: 1rem"
          v-model="textare3"
          maxlength="20"
          placeholder="产品价格"
          show-word-limit
          type="text"
          clearable
      />

<!--     子公司ID-->
      <el-select style="margin-bottom: 1rem" v-model="value" class="m-2" placeholder="Select" size="large">
        <el-option
            v-for="item in optio"
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
                  <el-button @click="tianjiaCp = false">关闭</el-button>
                  <el-button type="primary" @click="addCp">
                    确定
                  </el-button>
                </span>
      </template>
    </el-dialog>



    <!--编辑-->
    <el-dialog v-model="bianji" title="提示" width="30%" center>
      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea4"
          maxlength="10"
          placeholder="子公司Id"
          show-word-limit
          type="number"
          clearable
          disabled
      />
      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea5"
          maxlength="10"
          placeholder="子公司名称"
          show-word-limit
          type="text"
      />

      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea6"
          placeholder="负责人"
          show-word-limit
          type="text"
          clearable
      />
      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea7"
          placeholder="负责人电话"
          show-word-limit
          type="text"
          clearable
      />

      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea8"
          placeholder="公司网站"
          show-word-limit
          type="text"
          clearable
      />

      <div style="margin-bottom: 1rem">
        <el-select v-model="valu" class="m-2" placeholder="请选择" size="large">
          <el-option
              v-for="item in option"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </div>

      <el-form-item label="Logo" >
        <el-upload
            class="upload-demo"
            action="http://localhost:9999/api/sonCom/getPic.php"
            multiple
            :before-upload="beforeAvatarUploa"
            :on-success="handleAvatarSuccess"
            :limit="3"
            list-type="picture"
            name="multfile"
        >
          <img style="width: 10rem" v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>

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
import {getAllSonCom,delSonCom,addSonCom,updateSonCom} from "@/api/soncom";
import Tips from "../../../config/Tips";
import {getAllUser} from "@/api/user";
import {getAllProduce,getOneProduce,delProduce,addProduce,updateProduce} from "@/api/scsonproduce";
import router from "@/router";

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
const textarea9 = shallowRef('')
const textarea10 = shallowRef('')
const textarea11 = shallowRef('')
const textarea12 = shallowRef('')
const id = shallowRef('')
const visible = shallowRef(false)
const search = shallowRef('')
//调用api获取全部菜单
const tableData = reactive([]);
getAllSonCom().then(res=>{
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
  id.value = row.scId;
}
const confirmthedeletion = () => {
  //调用删除接口
  delSonCom({scId:id.value}).then(res=>{
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

//添加子公司
const multfileImg = shallowRef('')
const beforeAvatarUpload = (file) => { //上传
  multfileImg.value = file; //拿到文件的图片列表
  console.log(multfileImg.value)
}
  const options = shallowRef([])
  //获取选中的值
  getAllUser({page:1}).then(res=>{
    for(let i = 0; i < res.data.length; i++){
      options.value.push({value:res.data[i].uId,label:res.data[i].uName})
    }
  })
  const handleChange = (value) => {
    console.log(value)
    //将选中的值赋值给textarea1
    textarea10.value = value.join()
  }


const add = () => {
    let url =  "http://localhost:9999/api/getPic.php"
    let FormData = require("form-data"); //导入上传控件
    let fd = new FormData() //创建formData 处理普通数据 图片数据
    fd.append('scName', textarea0.value)
    fd.append('scMan', textarea2.value)
    fd.append('scTel', textarea3.value)
    fd.append('scWebUrl',textarea1.value)
    fd.append('uId', textarea10.value)
    fd.append('file',multfileImg.value) //传图片的
    addSonCom(fd).then((res)=>{
      console.log(fd,6666666666)
      if(res.data === '2'){
      Tips.error('添加失败请重试')
    }else if(res.data === 1){
      Tips.success('添加成功')
    }
      window.location.reload()
    })

  }




//编辑子公司
const imageUrl = shallowRef('')
const valu = shallowRef('')
const option = shallowRef([

])
//获取选中的值
getAllUser({page:1}).then(res=>{
  //添加到textarea9中
  for(let i = 0; i < res.data.length; i++){
    option.value.push({value:res.data[i].uId,label:res.data[i].uName})
    console.log(option.value)
  }
})
const handleEdit = (index, row) => {
  //取出菜单id
  valu.value = row
  id.value = row.scId;
    textarea4.value = row.scId
    textarea5.value = row.scName
    textarea6.value = row.scMan
    textarea7.value = row.scTel
    textarea11.value = row.uName
    textarea8.value = row.scWebUrl
  textarea9.value = row.uId
    imageUrl.value ='http://localhost:9999/api/upload/'+row.scLogo
}
const beforeAvatarUploa = (file)=>{
  imageUrl.value = file
  console.log(file)
}

// 文件上传成功的钩子
// const handleAvatarSuccess = (response, uploadFile) => {
//   console.log(uploadFile,'文件上传成功的钩子')
//   imageUrl.value = URL.createObjectURL(uploadFile.raw)
// }

const bian = () => {
  //调用编辑接口
  let url =  "http://localhost:9999/api/getPic.php"
  let FormData = require("form-data"); //导入上传控件
  let fd = new FormData() //创建formData 处理普通数据 图片数据
  fd.append('scName', textarea5.value)
  fd.append('scMan', textarea6.value)
  fd.append('scTel', textarea7.value)
  fd.append('scWebUrl',textarea8.value)
  fd.append('uId', textarea9.value)
  fd.append('file',imageUrl.value) //传图片的d
  updateSonCom({scId:textarea4.value},fd).then((res)=>{
    if(res.data === '2'){
      Tips.error('添加失败请重试')
    }else if(res.data === 1){
      Tips.success('添加成功')
    }
    window.location.reload()
  })
}


//添加子产品
const tianjiaCp = shallowRef(false)
const value = shallowRef('')
const textare0 = shallowRef('')
const textare1 = shallowRef('')
const textare2 = shallowRef('')
const textare3 = shallowRef('')
const optio = shallowRef([{
  value: '',
  label: ''
}])
getAllSonCom().then(res=>{
  console.log(res)
  for(let i = 0; i < res.data.length; i++){
    optio.value.push({value:res.data[i].scId,label:res.data[i].scName})
  }
})

const handleAdd = (index, row) => {
  //取出菜单id
  value.value = row.scId;
}
const addCp = ()=>{
  let url =  "http://localhost:9999/api/getPic.php"
  // let FormData = require("form-data"); //导入上传控件
  let fd = new FormData() //创建formData 处理普通数据 图片数据
  fd.append('pName', textare0.value)
  fd.append('pFalg', textare1.value)
  fd.append('pInfo', textare2.value)
  fd.append('pPrice',textare3.value)
  fd.append('scId',  valu.value)
  fd.append('file',multfileImg.value) //传图片的
 addProduce(fd).then((res)=>{
    console.log(fd,6666666666)
    if(res.data === '2'){
      Tips.error('添加失败请重试')
    }else if(res.data === 1){
      Tips.success('添加成功')
    }
    window.location.reload()
  })
}

//查看产品
const chakan = shallowRef(false)
const handleLook = (index, row) => {
  console.log(row)
 //跳转到产品详情页
   router.push({path:'/product',query:{}})
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
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>



