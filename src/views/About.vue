<template>

     <div class="about-wrap">
    	<div class="about-header">
    		
    		<div class="default-info">
	    		<img  :src="user.icon" />
	    		<input class="upload" @change='add_img'  type="file" value="上传头像" > 
				<span>{{user.name}}</span>
    		</div>
    		
    	</div>
    	
    	<div class="about-body">
    		<van-cell-group>
			  <van-cell title="我的订单" is-link />
			  <van-cell title="我的活动" is-link to="my_game"/>
			  <van-cell title="我的场馆" is-link/>
			  <van-cell title="意见反馈" is-link/>
			    <van-cell title="退出登录" is-link @click="logout"/>
			</van-cell-group>
    		
    	</div>
    	
    </div>
    

</template>

<script>
export default {
  name: 'home',
  
  data(){
    return {
		isLogin:true,
		user:{
			icon:require('@/assets/imgs/icons/default.jpg'),
			name:''
		}
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
    async add_img(event){
		
		// 准备上传文件
		let img = event.target.files[0];
		let form = new FormData();
		form.append("icon",img,img.name);

		// 上传请求
		let { data:res } = await this.$http.post('user/save_icon',form);

		this.user = res.data;


    }   


  }



}
</script>

<style scoped>

.default-info{
	position: relative;
	width:128px;
	height: 128px;
}

.default-info input{
	width:128px;
	height: 128px;
	position: absolute;
	left:0;
	top:0;
	overflow: hidden;
	opacity: 0;
	z-index: 1000;
}

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
	height: 128px;
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
