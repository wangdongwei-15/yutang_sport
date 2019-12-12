<template>

     <div class="about-wrap">
    	<div class="about-header">
    		
    		<div v-if="isLogin" class="user-info">
    			<img src="../assets/imgs/icons/1553221126.jpg" />
    			<span>韩梅梅</span>
    		</div>
    		
    		<div v-else class="default-info">
	    		<img  src="../assets/imgs/icons/default.jpg" />
	    		<input class="upload" @change='add_img'  type="file" value="上传头像">
    		</div>
    		
    	</div>
    	
    	<div class="about-body">
    		<van-cell-group>
			  <van-cell title="我的订单" is-link />
			  <van-cell title="我的活动" is-link to="my_game"/>
			  <van-cell title="我的场馆" is-link/>
			  <van-cell title="我的优惠券" is-link/>
			  <van-cell title="意见反馈" is-link/>
			</van-cell-group>
    		
    	</div>

      <van-button type="primary" @click="logout">退出登录</van-button>
    	
    </div>
    

</template>

<script>
export default {
  name: 'home',
  
  data(){
    return {
        isLogin:false
    }
  },

  created(){
      this.$http.get('user').then(res=>{
        console.log(res);
      });
  },

  methods:{

    logout(){
        sessionStorage.removeItem("token");
        this.$router.push('/login');
    },
    add_img(){

    }   


  }



}
</script>

<style scoped>


.about-header{
	height: 328px;
	background-color: #3298ed;
	display: flex;
	justify-content: center;
	width:750px;
	align-items: center;
}

.about-header img{
	width:128px;
	border-radius: 50%;
	margin-bottom: 30px;
}

.user-info{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.user-info span{
	color: #fff;
}

.default-info{
	height: 250px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.default-info img{
	width:120px;
	height: 120px;
	border-radius: 50%;
}

</style>
