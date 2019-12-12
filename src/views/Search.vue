<template>
  <div class="search">
     <form action="/" class="search-form">
        <van-search
            ref="searchWrap"
            v-model="words"
            placeholder="请输入搜索关键词"
            show-action
            @search="onSearch"
            @cancel="onCancel"
        />
    </form>
    <div class="body">
        <template  v-for="item in venueList" >
            <VenueItem :venue="item" :key="item.id"></VenueItem>
        </template>
        <div class="loadding">
            <van-loading v-show="isLoading" type="spinner" color="#1989fa" class="loadding-icon" />
        </div>
       
    </div>
  </div>
</template>

<script>

import VenueItem from "../components/VenueItem";

export default {
  name: 'home',
  
  data(){
    return {
        words:'',
        venueList:[],
        isLoading:false,
        isFinish:false,
        page:1
    }
  },

  components:{
    VenueItem
  },
  mounted(){
     this.$refs.searchWrap.getElementsByTagName("input")[0].focus();
     this.scroll();
  },

  methods:{

    async onSearch(){

      console.log(this.page);
     
      this.isLoading = true;
      let { data:res} = await this.$http.post('venue/search?page='+this.page,{
          words:this.words
      });
      
      this.isLoading = false;
      this.venueList = this.venueList.concat(res.data);
      if(res.data.length == 0){
         this.isFinish = true;
      }
      this.page++; 
   
    },

    onCancel(){
        this.$router.push('/venue');
    },

    scroll(){

      window.onscroll = ()=>{
      
        //let clientHeight = document.documentElement.clientHeight;

        // 屏幕的高度
        let clientHeight = window.innerHeight;

        // 内容区高度
        let offsetHeight = document.documentElement.offsetHeight;

        // 滚动距离
        let scrollTop = document.documentElement.scrollTop;

        let bottomOfWindow  = scrollTop  >= offsetHeight - clientHeight;

        if(this.isFinish) return  this.$toast("亲,没有更多数据了!");

        // 符合条件加载下页
        if( bottomOfWindow && !this.isLoading){
           this.onSearch();
        }
        
      }
   
    }
  

  },

  beforeDestroy(){
    
    // 注销滚动事件
    window.onscroll = null;
    
  }
  

}
</script>

<style scoped>

.search-form{
  position: fixed;
  left:0;
  top:0;
  width:100%;
}

.body{
  padding:30px;
  padding-bottom: 120px;
}

.loadding{
  text-align: center;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.loadding-icon{
  display: inline;
}

</style>
