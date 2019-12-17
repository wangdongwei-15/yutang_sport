<template>
  <div class="game">

      <van-nav-bar
          title="活动列表"
          left-text="返回"
          left-arrow
          @click-left="back"
          />

      <div class="body">
          <dl v-for="game in gameList" :key="game.id" class="game" @click="detail(game.id)">
              <dt>{{game.title}}</dt>
              <dd>类型:{{game.type_name}}</dd>
              <dd>组织者:<img :src="game.user_icon?game.user_icon:defaultIcon" class="user-icon"> {{game.user_name}}</dd>
              <dd>创建时间:{{game.created_at}}</dd>
          </dl>
      </div>   
      
  </div>
</template>

<script>
export default {
  name: 'home',
  
  data(){
    return {
        gameList:[],
        defaultIcon:require('../assets/imgs/default.jpg')
    }
  },

  created(){
    this.getGameList();
  },

  methods:{

    // 活动详情
    detail(id){

       this.$router.push({
          path:'/game_detail',
          query:{
             id
          }
       });

    },

    // 获取活动列表
    async getGameList(){

      let { data:res } = await this.$http.get('game/list?page=2');
      this.gameList = res;
      
    },
       
      // 返回
      back(){

        this.$router.back();

      }
  


  }



}
</script>

<style scoped lang="less">

.body{
   padding:30px;
   padding-bottom: 120px;
}

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

.game{
  font-size: 30px;
  dl{
     padding:20px 0;
     border-bottom: 1px #ddd solid;
  }
}

.user-icon{
   width:60px;
   height: 60px;
   border-radius: 50%;
}


</style>
