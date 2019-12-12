<template>
	<div class="venue-wrap">
         <van-nav-bar
            title="场馆详情"
            left-text="返回"
            left-arrow
            @click-left="back"
            />
	    <div class="venue-header">
           
	    	<div class="info">
	    		<div class="img">
	        		<img src="../assets/imgs/img_01.jpg" />
		        </div>
		        <div class="text">
		            <h3>{{venue.name}}</h3>
		            <p>{{venue.address}}</p>
		            <p>营业时间:09:00~22:00</p>
		        </div>
	    	</div>
	        
	        <div class="phone">
	        	<span>{{venue.phone}}</span>
	        	<van-icon name="phone"/>
	        </div>
	    </div>
	    <div class="venue-body">
	    	<div class="type-name">{{venue.type_name}}</div>
	    </div>
	    
	    <div class="dates">
	    	<div class="dl-wrap">
	    		<dl v-for="(item,index) in dates" :key="index" @click="order(index)">
		    		<dd>{{item.week}}</dd>
                    <dt>{{item.date | dateFormat}}</dt>
		    		<dd>充足</dd>
	    	    </dl>
	    	</div>
	    </div>

        <div class="sheshi"></div>
	    
	    <van-cell-group>
		   <van-cell title="交通方式" is-link/>
		   <van-cell title="场馆介绍" is-link/>
		</van-cell-group>
		
	</div>
</template>

<script>

export default {
  name: 'home',
  
  data(){
    return {
        venue:{},
		dates:[]
    }
  },

  created(){

     let id = this.$route.query.id;
     this.getDetail(id);

  },

  methods:{

    // 跳转到预定页
    order(index){

        this.$router.push({
            path:'/order',
            query:{
                id:this.venue.id,
                index:index
            }
        });

    },  

     // 返回列表
     back(){
         this.$router.back();
     }, 
     
     // 获取场馆详情
     async getDetail(id){
        let { data:res } = await this.$http.get("venue/detail/"+id);
        this.venue = res;
        console.log(res);
        this.dates = res.dates;
     }
    

  },

  filters:{
      dateFormat(date){
         // 2019-12-11
         // 12~11
         let arr = date.split('-');  // [2019,12,11]
         return  arr[1]+"~"+arr[2];

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

.venue-wrap{
    height: 100vh;
    background: #f8f8f8;
}

.sheshi{
    height: 260px;
    margin-bottom: 25px;
    background: #fff;
}

.venue-header{
	padding:0 30px;
    font-size: 22px;
    background: #fff;
}

.info{
	display: flex;
	padding:30px 0;
}

.img{
	width:200px;
}

.img>img{
	width:100%;
}

.text{
	width:460px;
	margin-left:30px;
}

.text h3{
	line-height: 50px;
	font-size: 30px;
}

.text p{
    line-height: 50px;
    font-size: 22px;
}

.phone{
	height: 110px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top:1px #ececec solid;
}

.type-name{
	height: 85px;
	line-height: 85px;
	color:#2f8dd7;
	border-top:1px #eee solid;
	border-bottom: 1px #eee solid;
	padding:0 30px;
    font-size: 30px;
    background: #fff;
}

.dates{
    width:750px;
    overflow: auto;
}
.dates dl{
	width:150px;
	height: 170px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
    line-height: 45px;
    margin-right: 20px;
    background: #fff;
    border:1px #c8c8c8 solid;
}

.dl-wrap{
   	width:1264px;
   	display: flex;
   	padding:30px;
   	background-color: #f8f8f8;
    font-size: 25px;
    
}

</style>
