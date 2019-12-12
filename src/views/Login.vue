<template>
  <div class="login">
     <van-nav-bar
        title="用户登录"
        left-text="返回"
        left-arrow
        @click-left="onBack"
        />

    <div class="body">
        <van-cell-group>
     
         <van-field
            v-model="user.email"
            required
            clearable
            label="邮箱"
            placeholder="请输入用邮箱"
        />

      
         <van-field
            v-model="user.password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
        />

        </van-cell-group> 
        <div class="btn_wrap">
           <van-button type="primary" @click="login">用户登录</van-button>
        </div>
        
    </div>   

       
    
  </div>
</template>

<script>
export default {
  name: 'login',

  data(){

    return {

       user:{
           email:'',
           password:''
       }

    }

  },

  created(){
      this.user.email = this.$route.params.email;
  },

  methods:{
    
    // 用户登录
    async login(){

       let { data:res } = await this.$http.post('user/login',this.user);
      
       if(res.status !==200 ) return this.$toast("邮箱或密码有误!");
       
       sessionStorage.setItem("token",res.data.api_token);

       this.$router.push('/'); 

    },
       
    onBack(){

      this.$router.back();
      
    }
   


  }



}
</script>

<style scoped lang="less">

.van-nav-bar{
    background: #3298ed;
    .van-nav-bar__title{
        color:#fff;
    }
    .van-nav-bar__text{
        color:#fff;
    }
     .van-icon{
         color:#fff;
     }
}

.body{
    padding:30px;
    padding-top:45px;
}

.btn_wrap{
    padding:30px 20px;
}

</style>
