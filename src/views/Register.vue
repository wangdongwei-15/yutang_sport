<template>

  <div class="register">
     <van-nav-bar
        title="用户注册"
        left-text="返回"
        left-arrow
        />
    
    <div class="body">
        <van-cell-group>
        
        <van-field
            v-model="user.name"
            required
            clearable
            label="用户名"
            placeholder="请输入用户名"
        />
         
        <van-field
            v-model="user.email"
            required
            clearable
            label="邮箱"
            placeholder="请输入用邮箱"
        />
        
         <van-field
            v-model="user.tel"
            type="tel"
            label="手机"
            placeholder="请输入密码"
            :error-message="msg.tel"
            required
            @blur="checkTel"
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
           <van-button type="primary" @click="register">用户注册</van-button>
        </div>
        
    </div>   

       
    
  </div>
</template>

<script>
export default {
  name: 'register',
  data(){

    return {
       user:{
           name:'',
           email:'',
           tel:'',
           password:''
       },
       msg:{
           tel:''
       }
    }

  },

  created(){
  
  },

  methods:{

    // 用户注册
    async register(){
      
      let { data:res } = await this.$http.post("user/reg",this.user);

      if(res.meta.status !== 200) return this.$toast("用户注册失败!");

      this.$toast("用户注册成功!");

      this.$router.push({
          name:'login',
          params:{
              email:this.user.email
          }
      });


    },  
    
    // 验证手机号码
    checkTel(){

        var TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
         if(!TEL_REGEXP.test(this.user.tel)){
            this.msg.tel = "请输入正确的手机格式"
         }else{
             this.msg.tel = ""
         }

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
