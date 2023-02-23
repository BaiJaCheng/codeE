<template>
  <div >
    <!-- 顶部-->
    <div class="top">
       <div class="sidebar-top">欢迎进入巴巴阿里后台管理系统</div>
      <el-popconfirm
          width="220"
          confirm-button-text="确定"
          cancel-button-text="取消"
          :icon="InfoFilled"
          icon-color="#626AEF"
          title="确定要退出吗"
          @confirm="confirmEvent"
          @cancel="cancelEvent"
      >
        <template #reference>
          <el-button>退出登录</el-button>
        </template>
      </el-popconfirm>
    </div>

    <!-- 侧边栏-->
    <div class="left">
      <el-row >
        <el-col >
          <el-menu
              active-text-color="#ffd04b"
              background-color="#545c64"
              class="el-menu-vertical-demo"
              :default-active="subscript"
              text-color="#fff"
              @select="fang"
              router
          >
            <div v-for="(item,index) in menu" :key="index" :index="item.nId">
                <!--  一级菜单           -->
                <el-menu-item :index="item.nUrl">
                    <el-icon>
                      <component H></component>
                    </el-icon>
                    <span >{{item.nName}}</span>
                </el-menu-item>
            </div>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import {reactive,shallowRef} from "vue";
import {getPower } from '@/api/nav'
import { useRouter } from 'vue-router'

    //获取菜单
    let str = localStorage.getItem('power')
    const menu = reactive([])
    getPower({str}).then(res=>{
        res.data.map(item=>{
          menu.push(item)
        })
      })


    const router = useRouter()
    //定义subscript 表示用户点击的下标 刷新页面不会更改
    const subscript = shallowRef('2')
    const fang = (index) => {
      subscript.value = index
      //保存到本地
      localStorage.setItem('subscript',subscript.value)
    }
    //将值赋给subscript
    subscript.value = localStorage.getItem('subscript')

    //退出登录
    const confirmEvent = () => {
      //清除本地存储
      localStorage.clear()
      //跳到首页面
      router.push('./login');
    }
    const cancelEvent = () => {
      console.log('已取消')
    }

</script>

<style lang="less">
 .top{
   display: flex;
   justify-content: space-between;
   align-items: center;
   height: 4rem;
   background-color: #ccc;
   box-shadow: 0 0 20px rgba(0,0,0,0.6);
   color: #25A4bb;
   padding: 0 20px;
   .sidebar-top{
     font-size: 1.8rem;
     font-weight: bold;
     color: #545c64;
   }
 }

 .left{
   width: 15rem;
   height: 100vh;
   background-color: #545c64;
 }

 .el-col-12{
   height: 100vh;
   width: 100%;
 }
</style>
