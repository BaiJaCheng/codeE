<template>
  <div class="beijing">
    <div class="denglu">
      <div class="login">
       <div class="am">
         <div class="head" >欢迎登陆后台管理系统</div>
         <!-- 登录表单 -->
         <div class="menu" >
           <el-form  ref="form" label-width="80px" >
             <el-form-item style="padding-bottom:  0.7rem;width: 23rem; padding-right: 20rem"  prop="username">
               <el-input v-model="username"  clearable :prefix-icon="User" placeholder="请输入账号"></el-input>
             </el-form-item>
             <el-form-item style="padding-bottom: 0.7rem;width: 23rem;"  prop="password">
               <el-input v-model="password" maxlength="15" :prefix-icon="Lock" clearable show-password placeholder="请输入密码"></el-input>
             </el-form-item>
             <el-form-item>
               <el-button style="width:7rem;" type="primary" size="large"  @click="onSubmit"  round>登陆</el-button>
               <el-button style="width:7rem;margin-left: 2rem" type="success" size="large"  @click="zhuce=true" round>注册</el-button>
             </el-form-item>
           </el-form>
         </div>
       </div>
      </div>


  </div>
  </div>

  <el-dialog v-model="zhuce" title="注册" width="30%" center>
    <el-input
        style="margin-bottom: 1rem"
        v-model="textarea1"
        maxlength=""
        placeholder="用户名"
        show-word-limit
        type="text"
        clearable
    />
    <el-input
        style="margin-bottom: 1rem"
        v-model="textarea2"
        maxlength=""
        placeholder="密码"
        show-word-limit
        type="text"

    />

    <el-input
        v-model="textarea3"
        placeholder="电话号码"
        show-word-limit
        type="text"
        clearable
    />
    <template #footer>
                <span class="dialog-footer">
                  <el-button @click="zhuce = false">关闭</el-button>
                  <el-button type="primary" @click="commit">
                    确定
                  </el-button>
                </span>
    </template>
  </el-dialog>

</template>

<script setup>
import HelloWorld from '@/components/HelloWorld.vue'
import {reactive,ref,onMounted} from "vue";
import { useRouter,useRoute } from "vue-router";
import { useStore } from "vuex";
//引入Tips组件
import Tips from "../../../config/Tips";
import { login,register } from "@/api/login";
import {getOneUser} from "@/api/user";
import {getOneRole} from "@/api/roles";
import {getOneMenu} from "@/api/nav";
    const username = ref('');
    const password = ref('');
    const route = useRoute();
    const router = useRouter();
    const {Search,User,Lock} = require('@element-plus/icons-vue');
    const store = useStore();
    //注册
    const zhuce = ref(false);
    const textarea1 = ref('');
    const textarea2 = ref('');
    const textarea3 = ref('');
    const commit = () => {
      register({uName:textarea1.value,uPwd:textarea2.value,uTel:textarea3.value}).then(res=>{
        if(res.data === 1){
          Tips.success('注册成功');
          zhuce.value = false;
        }else if (res.data === 2){
          Tips.error('注册失败')
      }
      zhuce.value = false;
    })
    };


    //验证登录是否成功
    const onSubmit = (values) => {
        login({uName:username.value,uPwd:password.value}).then(res=>{
          console.log(res)





          if(res.data !==2 && res.data !== 'errors'){
            Tips.success('登录成功');
            //将用户信息的uName存入localStorage
            localStorage.setItem('uId',res.data.uId);
            //路由跳转到首页面
            router.push('../../home');
          }else if (res.data === 2){
            Tips.error('登录失败，请验证密码是否正确！')
          } else if (res.data === 'errors'){
            Tips.error('用户不存在！')
          }
        })
    };



</script>

<style lang="less" scoped>
.am{
  margin-left: -0.8rem;
}
.beijing{
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-image: url("../../assets/images/1.jpg");
  background-size: 100%;
  //不平铺
  background-repeat: no-repeat;
}

.denglu{
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%,-50%);

    .login{
      position: relative;
      margin-top: 7rem;
      background-color: rgba(0,0,0,0.1);
      //阴影 上左没有
      box-shadow: 0 0 20px #ddd;
      width: 25rem;
      height: 27rem;
      border-radius: 8px;


      .head{
        text-align: center;
        font-size: 1.4rem;
        font-weight: bold;
        color: white;
        padding-top: 5rem;
        padding-bottom:  0.7rem;
      }
    }

  .el-form{
      .el-input{
         width: 90%;
         height: 2.5rem;
         margin-right: 2rem;

      }


  }
    .menu{
      margin-top: 2rem;
    }
}
.avatar_box {
  // 盒子高度130像素
  height: 130px;
  // 宽度130像素
  width: 130px;
  // 边框线1像素 实线
  border: 1px solid #eee;
  // 圆角
  border-radius: 50%;
  // 内padding
  padding: 10px;
  // 添加阴影 向外扩散10像素 颜色ddd
  box-shadow: 0 0 10px #ddd;
  // 绝对定位
  margin-left: 11rem;
  margin-top: 3rem;
  // 距离左则

  // 背景
  background-color: rgba(0,0,0,0);
}






</style>
