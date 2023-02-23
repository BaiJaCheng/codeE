<template>
  <div class="employee">
    <div class="dingdan">
      <!--    添加角色按钮     -->
      <div style="margin-left: 1rem;margin-top: 1rem">
        <el-button type="primary"  :icon="Plus"  text @click="tianjia = true" >添加角色</el-button>
      </div>

      <el-divider />

      <!--     表格   -->
      <div class="caidan">
        <el-table :data="tableData" size="large" >
          <el-table-column label="角色序号" width="360" align="center">
            <template #default="scope"  >
              <div style="display: flex;  align-items: center" >
                <span style="flex: 1" >{{ scope.row.rId }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="角色名成"  width="400"  align="center">
            <template #default="scope">
              <div style="display: flex; ">
                <span style="flex: 1">{{ scope.row.rName }}</span>
              </div>
            </template>
          </el-table-column>


          <el-table-column label="角色权限"  width="400"  align="center" style="margin-bottom: 2rem;">
            <template #default="scope">
              <div style="display: flex; align-items: center;">
                <span style="flex: 1">{{ scope.row.rPower }}</span>
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
          placeholder="角色名"
          show-word-limit
          type="text"
          clearable
      />

      <el-checkbox-group v-model="checkedCities" :min="0" >
        <el-checkbox v-for="(item,index) in cities"
                     :key="index" :label="item.nId"
                     @change="handleCheckAllChange(item.nId)"
        >
          {{item.nName }}
        </el-checkbox>
      </el-checkbox-group>


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
          v-model="textarea5"
          maxlength="10"
          placeholder="角色名称"
          show-word-limit
          type="text"
      />

      <el-checkbox-group v-model="checkedCitie" :min="0" >
        <el-checkbox v-for="(item,index) in citie"
                     :key="index" :label="item.nId"
                     @change="handleCheckAllChange(item.nId)"
        >
          {{item.nName }}
        </el-checkbox>
      </el-checkbox-group>
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
import {getAllRole, delRole, addRole, getOneRole, updateRole} from '@/api/roles'
import {getAllMenu} from '@/api/nav'
import Tips from "../../../config/Tips";

    const total = shallowRef(10)
    const pageNumber = shallowRef(1)
    const centerDialogVisible = shallowRef(false)
    const tianjia = shallowRef(false)
    const bianji = shallowRef(false)
    const textarea0 = shallowRef('')
    const textarea1 = shallowRef('')
    const textarea4 = shallowRef('')
    const textarea5 = shallowRef('')
    const textarea7 = shallowRef('')
    const id = shallowRef('')
    const visible = shallowRef(false)
    const search = shallowRef('')

    //调用api获取全部菜单
    const tableData = reactive([]);
    getAllRole().then(res=>{
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



    //删除角色
    const handleDelete = (index, row) => {
      // 将visible 状态 true
      visible.value = true
      //取出菜单id
      id.value = row.rId;
    }
    const confirmthedeletion = () => {
      //调用删除接口
      delRole({rId:id.value}).then(res=>{
        if(res.data === 2){
          Tips.error('删除失败请重试')
        }else if(res.data === 1){
          Tips.success('删除成功')
        }
      })
      centerDialogVisible.value = false
      //刷新页面
      window.location.reload()
    }


    //添加角色
    const checkedCities = shallowRef([''])
    const cities = shallowRef([''])
    getAllMenu().then(res=>{
      cities.value = res.data
    })
    //获取选中的值
    const handleCheckAllChange = (val) => {
      let arr = []
      //遍历选中的值
      for(let i = 1; i < checkedCities.value.length; i++){
        arr.push(checkedCities.value[i])
      }
      //将选中的值赋值给textarea1
      textarea1.value = arr.join(',')
    }
    const add = () => {
      //调用添加接口
      addRole({rName:textarea0.value,rPower:textarea1.value}).then(res=>{
        if(res.data === '2'){
          Tips.error('添加失败请重试')
        }else if(res.data === 1){
          Tips.success('添加成功')
        }
        //清空输入框
        textarea0.value = ''
        textarea1.value = ''
        tianjia.value = false
        //刷新页面
        window.location.reload()
      })
    }



    //编辑角色
    const checkedCitie = shallowRef([''])
    const citie = shallowRef([''])
    const handleEdit = (index, row) => {
      getAllMenu().then(res=>{
        citie.value = res.data
      })
      //取出菜单id
      id.value = row.rId;
      //获取一条记录
      getOneRole({rId:id.value}).then(res=>{
        textarea4.value = res.data.rId
        textarea5.value = res.data.rName
        textarea7.value = res.data.rPower
        checkedCitie.value = textarea7.value.split(',')
      })
    }
    const bian = () => {
      textarea7.value = checkedCitie.value.join(',')
      //调用编辑接口
      updateRole({rId:textarea4.value,rName:textarea5.value,rPower:textarea7.value}).then(res=>{
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