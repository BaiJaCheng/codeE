<template>
  <div class="employee">
    <div class="dingdan">
      <!--    添加会议按钮     -->
      <div style="margin-left: 1rem;margin-top: 1rem">
        <el-button type="primary"  :icon="Plus"  text @click="tianjia = true" >查看会议</el-button>
      </div>
      <el-divider />

      <!--     表格   -->
      <div class="caidan">
        <el-table :data="tableData" size="large" >

          <el-table-column label="门牌号"  width="280"  align="center">
            <template #default="scope">
              <div style="display: flex; ">
                <span style="flex: 1">{{ scope.row.oNum }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="会议室名称"  width="230" align="center">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span style="flex: 1">{{ scope.row.oName }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="电话号"  width="330"  align="center" style="margin-bottom: 2rem;">
            <template #default="scope">
              <div style="display: flex; align-items: center;">
                <span style="flex: 1">{{ scope.row.oTel }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="会议室信息"  width="330"  align="center" style="margin-bottom: 2rem;">
            <template #default="scope">
              <div style="display: flex; align-items: center;">
                <span style="flex: 1">{{ scope.row.oInfo }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="280"  align="center">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row); bianji = true"
              >申请会议室</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <div style="margin-top: 2rem;">
          <el-pagination style="justify-content: center" background layout="prev, pager, next" :total="20"
                         hide-on-single-page
                         @size-change="handleSizeChange"
                         @current-change="pageChange"
                         pager-count="2"
          />
        </div>
      </div>
    </div>


    <!--  查看-->
    <el-dialog v-model="tianjia" title="会议记录" width="90%" center>
      <el-table :data="officeData" size="large" >

        <el-table-column label="序号" width="180" align="center">
          <template #default="scope"  >
            <div style="display: flex;  align-items: center" >
              <span style="flex: 1" >{{ scope.row.coId }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="会议室"  width="180"  align="center">
          <template #default="scope">
            <div style="display: flex; ">
              <span style="flex: 1">{{ scope.row.oId }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="开始时间"  width="180" align="center">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="flex: 1">{{ scope.row.startTime }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="结束时间"  width="180"  align="center" style="margin-bottom: 2rem;">
          <template #default="scope">
            <div style="display: flex; align-items: center;">
              <span style="flex: 1">{{ scope.row.endTime }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="申请人"  width="180"  align="center" style="margin-bottom: 2rem;">
          <template #default="scope">
            <div style="display: flex; align-items: center;">
              <span style="flex: 1">{{ scope.row.uId }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="所属部门"  width="180"  align="center" style="margin-bottom: 2rem;">
          <template #default="scope">
            <div style="display: flex; align-items: center;">
              <span style="flex: 1">{{ scope.row.dId }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="参会人数"  width="190"  align="center" style="margin-bottom: 2rem;">
          <template #default="scope">
            <div style="display: flex; align-items: center;">
              <span style="flex: 1">{{ scope.row.uIdStr }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="状态"  width="180"  align="center" style="margin-bottom: 2rem;">
          <template #default="scope">
            <div style="display: flex; align-items: center;">
              <span style="flex: 1">{{ scope.row.status }}</span>
            </div>
          </template>
        </el-table-column>

      </el-table>


      <template #footer>
                <span class="dialog-footer">
                  <el-button @click="tianjia = false">关闭</el-button>
                  <el-button type="primary" @click="add">
                    确定
                  </el-button>
                </span>
      </template>
    </el-dialog>

    <!--申请会议室-->
    <el-dialog v-model="bianji" title="申请使用会议室" width="30%" center>
      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea4"
          maxlength="10"
          placeholder="会议室ID"
          show-word-limit
          type="number"
          clearable
          disabled
      />

      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea5"
          placeholder="会议室信息"
          show-word-limit
          clearable
          disabled
      />

      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea6"
          placeholder="申请人"
          show-word-limit
          type="text"
          clearable
          disabled
      />

      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea7"
          placeholder="申请部门"
          show-word-limit
          type="text"
          clearable
          disabled
      />

      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea8"
          placeholder="参会者"
          show-word-limit
          type="text"
          clearable
      />
<!--      时间选择器-->
      <div class="demo-datetime-picker">
        <div class="block">
          <span class="demonstration">开始时间</span>
          <el-date-picker
              v-model="value1"
              type="datetime"
              placeholder="请选择会议开始时间"
              @change="changeTime"
          />
        </div>
        <div class="block">
          <span class="demonstration">结束时间</span>
          <el-date-picker
              v-model="value2"
              type="datetime"
              placeholder="请选择预计结束时间"
              @change="onChange"
          />
        </div>
      </div>






      <template #footer>
                <span class="dialog-footer">
                  <el-button @click="bianji = false">取消申请</el-button>
                  <el-button type="primary" @click="bian">
                    开始申请
                  </el-button>
                </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {reactive, shallowRef, computed} from "vue";
import { getAllOffice} from "@/api/office";
import {getAllCheckOffice,checkOfficeStatus,checkOffice} from "@/api/checkoffice";
import {getOneUser} from "@/api/user";
import {getOneDept} from "@/api/dept";
import Tips from "../../../config/Tips";
import {getAllUser} from "@/api/user";
const total = shallowRef(10)
const pageNumber = shallowRef(1)
const centerDialogVisible = shallowRef(false)
const tianjia = shallowRef(false)
const bianji = shallowRef(false)
const value1 = shallowRef('')
const value2 = shallowRef('')
const value3 = shallowRef('')
const defaultTime = new Date(2000, 1, 1, 12, 0, 0)
const textarea4 = shallowRef('')
const textarea5 = shallowRef('')
const textarea6 = shallowRef('')
const textarea7 = shallowRef('')
const textarea8 = shallowRef('')
const id = shallowRef('')
const search = shallowRef('')
//调用api获取全部菜单
const tableData = reactive([]);
getAllOffice({page:pageNumber.value}).then(res=>{
  console.log(res.data)
  total.value = res.data.length
  tableData.push(...res.data)
})
const officeData = reactive([]);
getAllCheckOffice().then(res=>{
  console.log(res.data)
  officeData.push(...res.data)
})


const handleSizeChange = (newSize) => {
  tableData.splice(0, tableData.length)
  pageNumber.value = newSize
  getAllOffice({page: pageNumber.value}).then(res => {
    tableData.push(...res.data)
    total.value = res.data.length
  })
}
const filterTableData = computed(() =>
    tableData.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)

//调取点击那一页的数据
const pageChange = (newPage)=>{
  pageNumber.value = newPage
  //将以前的数据清空
  tableData.splice(0,tableData.length)
  getAllOffice({page:pageNumber.value}).then(res=>{
    total.value = res.data.length
    tableData.push(...res.data)
  })
}


//添加部门
const add = () => {
  //调用添加接口

}

//编辑部门
const changeTime = (event) => {
  value1.value = event
  console.log(value1.value)
}
const onChange = (event) => {
  value2.value = event
}
const handleEdit = (index, row) => {
  textarea5.value = row.oName
  //获取localStorage中的用户id
  const userId = localStorage.getItem('uId')
  console.log(userId)
  //调用api获取用户信息
  getOneUser({uId:userId}).then(res=>{
    console.log(res.data)
    textarea6.value = res.data.uName
    const bumen = res.data.dId
    getOneDept({dId:bumen}).then(res=>{
      console.log(res.data)
      textarea7.value = res.data.dName
    })
  })
  //取出菜单id
  id.value = row.oId;
  textarea4.value = row.oId
}
const bian = () => {
  //调用申请接口
  checkOffice({oId:textarea4.value,startTime:value1.value,endTime:value2.value,uId:textarea6.value,dId:textarea7.value,uIdStr:textarea8.value,status:'1'}).then(res=>{
    console.log(res.data)
    if(res.data === '2'){
      Tips.error('申请失败请重试')
    }else if(res.data === 1){
      Tips.success('申请成功')
    }
  })
  //关闭输入框
  centerDialogVisible.value = false
  //刷新页面
  window.location.reload()
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
.demo-datetime-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-datetime-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.demo-datetime-picker .block:last-child {
  border-right: none;
}
.demo-datetime-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}

</style>