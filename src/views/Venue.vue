<template>
    <div class="venue-container">
         <div class="header">
             <van-search placeholder="请输入搜索关键词"  @focus="goSearch" />
         </div>
         <div class="body">

             <template  v-for="item in venueList" >
                 <VenueItem :venue="item" :key="item.id"></VenueItem>
             </template>

            <div  class="more" @click='getMore'>
              加载更多
              <van-loading v-show="isLoading" type="spinner" color="#1989fa" class="loadding-icon" />
            </div>
         </div>
    </div>
    
</template>

<script>

import VenueItem from "../components/VenueItem";

export default {
  
  data(){
      return {
          venueList:[],
          page:1,
          isLoading:false,
          isFinish:false
      }
  },
  created(){

      this.getVenueList();
  },

  components:{
     VenueItem 
  },
 
  methods:{

    // 转到搜索页面
    goSearch(){
      this.$router.push("/search");
    },

    // 获取场馆列表
     async getVenueList(){

        this.isLoading = true;
        let {data:res } = await this.$http.get('venue/list?page='+this.page);
        this.isLoading = false;
        this.venueList = this.venueList.concat(res.data);
        
        // 设置状态变量
        if(res.last_page == this.page){
          this.isFinish = true;
        }
        
    },

    // 获取更多数据
    getMore(){

      if(this.isFinish) this.$toast('亲,没有更多数据了!');
      
       // 判断当前是否正在加载数据
      if(this.isLoading || this.isFinish ) return false;
      
      this.page++;
      this.getVenueList();

    }

  }
}
</script>

<style scoped lang="less">

.loadding-icon{
   display: inline;
   margin-left: 15px;
}

.body{
  padding: 30px;
  padding-bottom: 150px;
}

.more{
  font-size: 30px;
  text-align: center;
  line-height: 80px;
}


</style>

