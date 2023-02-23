<template>
  <div class="orders">
    <div class="dingdan">
<!--    添加菜单按钮     -->
      <div style="margin-left: 1rem;margin-top: 1rem">
        <el-button type="primary"  :icon="Plus"  text @click="tianjia = true" >添加菜单</el-button>
      </div>

      <el-divider />

<!--     表格   -->
      <div class="caidan">
        <el-table :data="tableData" size="large" >
          <el-table-column label="菜单序号" width="260" align="center">
            <template #default="scope"  >
              <div style="display: flex;  align-items: center" >
                <span style="flex: 1" >{{ scope.row.nId }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="菜单名称"  width="300"  align="center">
            <template #default="scope">
              <div style="display: flex; ">
                <span style="flex: 1">{{ scope.row.nName }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="菜单等级"  width="300" align="center">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span style="flex: 1">{{ scope.row.nLevel }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="菜单路径"  width="300"  align="center" style="margin-bottom: 2rem;">
            <template #default="scope">
              <div style="display: flex; align-items: center;">
                <span style="flex: 1">{{ scope.row.nUrl }}</span>
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
  <el-dialog v-model="tianjia" title="添加菜单" width="30%" center>
    <el-input
        style="margin-bottom: 1rem"
        v-model="textarea1"
        maxlength="10"
        placeholder="菜单名称"
        show-word-limit
        type="text"
        clearable
    />
    <el-input
        style="margin-bottom: 1rem"
        v-model="textarea2"
        maxlength="10"
        placeholder="1"
        show-word-limit
        type="text"
        disabled
    />

    <el-input
        v-model="textarea3"
        placeholder="菜单路径"
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
  <el-dialog v-model="bianji" title="编辑菜单" width="30%" center>
    <el-input
        style="margin-bottom: 1rem"
        v-model="textarea4"
        maxlength="10"
        placeholder="菜单名称"
        show-word-limit
        type="text"
        clearable
    />
    <el-input
        style="margin-bottom: 1rem"
        v-model="textarea5"
        maxlength="10"
        placeholder="1"
        show-word-limit
        type="text"
        disabled
    />

    <el-input
        v-model="textarea6"
        placeholder="菜单路径"
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
</template>

<script setup>
//导入组件
import {reactive, computed, shallowRef} from "vue";
//引入Tips组件
import Tips from "../../../config/Tips";
import {getAllMenu, getOneMenu, delMenu, updateMenu, addMenu} from "@/api/nav";


    const centerDialogVisible = shallowRef(false)
    const tianjia = shallowRef(false)
    const bianji = shallowRef(false)
    const textarea1 = shallowRef('')
    const textarea2 = shallowRef('')
    const textarea3 = shallowRef('')
    const textarea4 = shallowRef('')
    const textarea5 = shallowRef('')
    const textarea6 = shallowRef('')
    const id = shallowRef('')
    const visible = shallowRef(false)
    const search = shallowRef('')
    //调用api获取全部菜单
    const tableData = reactive([]);

    getAllMenu().then((res) => {
      res.data.map((item) => {
        tableData.push(item);
      });
    });

    const filterTableData = computed(() =>
        tableData.filter(
            (data) =>
                !search.value ||
                data.name.toLowerCase().includes(search.value.toLowerCase())
        )
    )


    //删除菜单
    const handleDelete = (index, row) => {
       // 将visible 状态 true
      visible.value = true
     //取出菜单id
      id.value = row.nId;
    }
    const confirmthedeletion = () => {
      //调用删除接口
      delMenu({nId:id.value}).then(res=>{
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


    //添加菜单
    const add = () => {
      //调用添加接口
      addMenu({nName:textarea1.value,nLevel:1,nUrl:textarea3.value}).then(res=>{
        if(res.data === 'error'){
          Tips.error('添加失败请重试')
        }else if(res.data === 1){
          Tips.success('添加成功')
        }
        //清空输入框
        textarea1.value = ''
        textarea2.value = ''
        textarea3.value = ''
        tianjia.value = false
        //刷新页面
        window.location.reload()
      })
    }

    //编辑菜单
    const handleEdit = (index, row) => {
      //取出菜单id
      id.value = row.nId;
      //获取一条记录
      getOneMenu({nId:id.value}).then(res=>{
        textarea4.value = res.data.nName
        textarea5.value = res.data.nLevel
        textarea6.value = res.data.nUrl
      })
    }
    const bian = () => {
      //调用编辑接口
      updateMenu({nId:id.value,nName:textarea4.value,nLevel:1,nUrl:textarea6.value}).then(res=>{
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
  .orders {
    position: absolute;
    top: 4.7rem;
    left: 15.4rem;
    /*border: 1px solid #3e70df;*/

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