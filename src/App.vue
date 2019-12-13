<template>
  <div id="app">
    
      <keep-alive>
         <router-view/>
      </keep-alive>
      
    
    
    <van-tabbar v-model="active" route v-show="showTabBar">
        <van-tabbar-item icon="home-o" to='/venue'>场馆</van-tabbar-item>
        <van-tabbar-item icon="apps-o" to='/game'>活动</van-tabbar-item>
        <van-tabbar-item icon="comment-o" to='/find'>发现</van-tabbar-item>
        <van-tabbar-item icon="friends-o" to='/about'>关于</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
   data(){
    return {
        active:0
    }
  },

  created(){

  },

  watch:{

    // $route(to,from){
    //    //console.log(to);
    //    let whiteList = ['venue','game','find','about'];
    //    if(whiteList.indexOf(to.name) == -1){
    //       this.showTabBar = false;
    //    }else{
    //       this.showTabBar = true;
    //    }
    // }

  },

  computed:{

     showTabBar(){

        let whiteList = ['venue','game','find','about'];
        if(whiteList.indexOf(this.$route.name) == -1){
            return false;
        }else{
            return true;
        }
     }

  }


    
}
</script>

<style lang="less">


</style>
