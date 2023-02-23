<template>
  <div class="employee">
    <div class="dingdan">
      <!--    添加员工按钮     -->
      <div style="margin-left: 1rem;margin-top: 1rem">
        <el-button type="primary"  :icon="Plus"  text @click="tianjia = true" >添加员工</el-button>
      </div>

      <el-divider />

      <!--     表格   -->
      <div class="caidan">
        <el-table :data="tableData" size="large" >
          <el-table-column label="员工序号" width="360" align="center">
            <template #default="scope"  >
              <div style="display: flex;  align-items: center" >
                <span style="flex: 1" >{{ scope.row.uId }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="员工账户名"  width="400"  align="center">
            <template #default="scope">
              <div style="display: flex; ">
                <span style="flex: 1">{{ scope.row.uName }}</span>
              </div>
            </template>
          </el-table-column>


          <el-table-column label="员工电话"  width="400"  align="center" style="margin-bottom: 2rem;">
            <template #default="scope">
              <div style="display: flex; align-items: center;">
                <span style="flex: 1">{{ scope.row.uTel }}</span>
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
    <el-dialog v-model="tianjia" title="添加员工" width="30%" center>
      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea0"
          maxlength="20"
          minlength="1"
          placeholder="员工用户名"
          show-word-limit
          type="text"
      />
      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea2"
          maxlength="20"
          minlength="6"
          placeholder="员工密码"
          show-word-limit
          type="text"
      />
      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea3"
          placeholder="员工电话"
          show-word-limit
          type="text"
          clearable
      />
      <div style="margin-bottom: 1rem">
        <el-cascader style="margin-right: 3.3rem" v-model="value" :options="options" @change="handleChange" />
      </div>

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
          v-model="textarea4"
          maxlength="20"
          minlength="1"
          placeholder="员工ID"
          show-word-limit
          type="text"
          clearable
      />
      <el-input
          style="margin-bottom: 1rem"
          v-model="textarea5"
          maxlength="20"
          minlength="1"
          placeholder="员工用户名"
          show-word-limit
          type="text"
      />

      <el-input
          style="margin-bottom: 1rem"
          maxlength="20"
          minlength="1"
          v-model="textarea7"
          placeholder="员工电话"
          show-word-limit
          type="text"
          clearable
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
import {getAllUser, delUser, addUser, getOneUser, updateUser} from '@/api/user'
import {getAllMenu} from '@/api/nav'
import {getAllRole} from "@/api/roles";
import { getAllDept} from "@/api/dept";
import Tips from "../../../config/Tips";
import {Plus} from "@element-plus/icons-vue";


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
    const id = shallowRef('')
    const visible = shallowRef(false)
    const search = shallowRef('')
    const value = shallowRef('')
    const valu = shallowRef('')
    //调用api获取全部菜单
    const tableData = reactive([]);
    getAllUser({page:pageNumber.value}).then(res=>{
      total.value = res.data.length
      tableData.push(...res.data)
    })


  //首页加载完成后调用
    const handleSizeChange = (newSize) => {
       tableData.splice(0,tableData.length)
       pageNumber.value = newSize
        getAllUser({page:pageNumber.value}).then(res=>{
          tableData.push(...res.data)
          total.value = res.data.length
        })
      const filterTableData = computed(() =>
          tableData.filter(
              (data) =>
                  !search.value ||
                  data.name.toLowerCase().includes(search.value.toLowerCase())
          )
      )

    }


    //调取点击那一页的数据
    const pageChange = (newPage)=>{
      pageNumber.value = newPage
      //将以前的数据清空
      tableData.splice(0,tableData.length)
      getAllUser({page:pageNumber.value}).then(res=>{
        total.value = res.data.length
        tableData.push(...res.data)
      })
    }


    //删除员工
    const handleDelete = (index, row) => {
      // 将visible 状态 true
      visible.value = true
      //取出菜单id
      id.value = row.uId;
    }
    const confirmthedeletion = () => {
      //调用删除接口
      delUser({uId:id.value}).then(res=>{
        if(res.data === 2){
          Tips.error('删除失败请重试')
        }else if(res.data === 1){
          Tips.success('删除成功')
        }
        window.location.reload()
      })

      centerDialogVisible.value = false
      //调用接口重新获取数据,页数不变
      tableData.splice(0,tableData.length)
      getAllUser({page:pageNumber.value}).then(res=>{
        total.value = res.data.length
        tableData.push(...res.data)
      })
    }


    //添加员工
    const checkedCities = shallowRef([''])
    const cities = shallowRef([''])
    getAllMenu().then(res=>{
      cities.value = res.data
    })
  const options = shallowRef([])
  //获取选中的值
   getAllRole().then( res=>{
     console.log()
     for(let i = 0; i < res.data.length; i++){
       options.value.push({value:res.data[i].rId,label:res.data[i].rName})
     }
   })
const handleChange = (value) => {
  console.log(value)
 //将选中的值赋值给textarea1
  textarea1.value = value.join()
}
  //获取选中的值
  const handleCheckAllChange = (val) => {
    let arr = []
    //遍历选中的值
    for(let i = 1; i < checkedCities.value.length; i++){
      arr.push(checkedCities.value[i])
    }
    //将选中的值赋值给textarea1
    textarea9.value = arr.join(',')
  }
  const add = () => {
      //调用添加接口
      addUser({uName:textarea0.value,uPwd:textarea2.value,uTel:textarea3.value,rId:textarea1.value,dId:textarea8.value,uPower:textarea9.value}).then(res=>{
        console.log(textarea8.value)
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

    //编辑员工
  const checkedCitie = shallowRef([])
  const citie = shallowRef([])
    const handleEdit = (index, row) => {
      getAllMenu().then(res=>{
        citie.value = res.data
      })
      //取出菜单id
      id.value = row.uId;
      //获取一条记录
      getOneUser({uId:id.value}).then(res=>{
        textarea4.value = res.data.uId
        textarea5.value = res.data.uName
        textarea6.value = res.data.uPwd
        textarea7.value = res.data.uTel
        textarea9.value = res.data.uPower
        checkedCitie.value = textarea9.value.split(',')
      })
    }
    const bian = () => {
      textarea9.value = checkedCitie.value.join(',')
      //调用编辑接口
      updateUser({uId:textarea4.value,
                      uName:textarea5.value,
                      uPwd:textarea6.value,
                      uTel:textarea7.value,
                      uPower:textarea9.value}).then(res=>{
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
};
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