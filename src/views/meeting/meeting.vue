<template>
  <div class="employee">
    <div class="dingdan">
      <!--    添加会议按钮     -->
      <div style="margin-left: 1rem;margin-top: 1rem">
        <el-button type="primary"  :icon="Plus"  text @click="tianjia = true" >添加会议</el-button>
      </div>
      <el-divider />

      <!--     表格   -->
      <div class="caidan">
        <el-table :data="tableData" size="large" >
          <el-table-column label="会议序号" width="300" align="center">
            <template #default="scope"  >
              <div style="display: flex;  align-items: center" >
                <span style="flex: 1" >{{ scope.row.oId }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="门牌号"  width="230"  align="center">
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

          <el-table-column label="电话号"  width="230"  align="center" style="margin-bottom: 2rem;">
            <template #default="scope">
              <div style="display: flex; align-items: center;">
                <span style="flex: 1">{{ scope.row.oTel }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="会议室信息"  width="230"  align="center" style="margin-bottom: 2rem;">
            <template #default="scope">
              <div style="display: flex; align-items: center;">
                <span style="flex: 1">{{ scope.row.oInfo }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="230"  align="center">
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
          placeholder="门牌号"
          show-word-limit
          type="text"
      />
      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea2"
          maxlength="20"
          placeholder="会议室名称"
          show-word-limit
          type="text"
      />
      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea3"
          placeholder="会议室电话"
          show-word-limit
          type="text"
          clearable
      />

      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea1"
          placeholder="会议室信息"
          show-word-limit
          type="text"
          clearable
      />



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
          v-model="textarea4"
          maxlength="10"
          placeholder="会议室ID"
          show-word-limit
          type="number"
          clearable
          display
      />
      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea5"
          maxlength="10"
          placeholder="会议室门牌号"
          show-word-limit
          type="text"
      />

      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea6"
          placeholder="会议室名称"
          show-word-limit
          type="text"
          clearable
      />
      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea7"
          placeholder="会议室电话"
          show-word-limit
          type="text"
          clearable
      />

      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea8"
          placeholder="会议室基本信息"
          show-word-limit
          type="text"
          clearable
      />
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
import {addOffice, getAllOffice, delOffice, updateOffice} from "@/api/office";
import Tips from "../../../config/Tips";
import {getAllUser} from "@/api/user";
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
getAllOffice({page:pageNumber.value}).then(res=>{
  console.log(res.data)
  total.value = res.data.length
  tableData.push(...res.data)
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


//删除部门
const handleDelete = (index, row) => {
  // 将visible 状态 true
  visible.value = true
  //取出菜单id
  id.value = row.oId;
}
const confirmthedeletion = () => {
  //调用删除接口
  delOffice({oId:id.value}).then(res=>{
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
const add = () => {
  //调用添加接口
  addOffice({oNum:textarea0.value,oName:textarea2.value,oTel:textarea3.value,oInfo:textarea1.value}).then(res=>{
    if(res.data === '2'){
      Tips.error('添加失败请重试')
    }else if(res.data === 1){
      Tips.success('添加成功')
    }
    //清空输入框
    textarea0.value = ''
    textarea1.value = ''
    textarea2.value = ''
    textarea3.value = ''
    tianjia.value = false
    //刷新页面
    window.location.reload()
  })
}

//编辑部门
const handleEdit = (index, row) => {
  //取出菜单id
  id.value = row.oId;
  textarea4.value = row.oId
  textarea5.value = row.oNum
  textarea6.value = row.oName
  textarea7.value = row.oTel
  textarea8.value = row.oInfo
}
const bian = () => {
  //调用编辑接口
  updateOffice({oId:textarea4.value,oNum:textarea5.value,oName:textarea6.value,oTel:textarea7.value,oInfo:textarea8.value}).then(res=>{
    if(res.data === 'error'){
      Tips.error('编辑失败请重试')
    }else if(res.data === 1){
      Tips.success('编辑成功')
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
</style>