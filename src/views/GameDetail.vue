<template>
    <div class="game-detail">
        <van-nav-bar
          title="活动详情"
          left-text="返回"
          left-arrow
          @click-left="back"
          />
        
        <div class="body">
         
    			<h3>标题：{{game.title}}</h3>
    			<p>时间：{{game.datetime}}</p>
    			<p>场馆：{{game.venue_name}}</p>
    			<p>组织者：{{game.user_name}}</p>
    			<p>报名用户：{{game.users_count}}/{{game.number}}</p>
    			<p>{{game.des}}</p>

                <div class="btn-wrap">
                    <van-button type="primary" class="joined-btn" v-if="game.is_join">已参加活动</van-button>
                    <van-button type="primary" class="joined-btn" v-else-if="game.is_full">活动成员已满!</van-button>
                    <van-button type="info"  class="join-btn"  @click="joinGame(game.id)"  v-else>加入活动</van-button>
                </div>

        </div>

    </div>
</template>

<script>
export default {

    data(){
        return{
            game:{}
        }
    },

    created() {
        let id = this.$route.query.id;
        this.getGameDetail(id);
    },
    methods: {

        // 加入活动
        async joinGame(id){
           
           // 加入活动请求
           let { data:res } = await this.$http.get('game/join/'+id);
           if(res.status !== 200) this.$toast('报名失败!')

           this.$toast('报名成功!');
           this.$router.push('my_game');

        },
        
        // 返回上页
        back(){
           this.$router.back();
        },
        
        // 获取活动详情
        async getGameDetail(id){
          
            let { data:res } = await this.$http.get('game/detail/'+id);

            if(res.status !== 200) this.$toast("数据请求失败!");
            this.game = res.data;

        }

    },
    
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
}

.body h3{
    font-size: 35px;
    line-height: 80px;
}
.body p{
	height: 60px;
    line-height: 60px;
    font-size: 32px;
}

.btn-wrap{
    padding:30px;
    position: absolute;
    left:0;
    bottom:0;
    width:100%;
}

.join-btn{
    width:690px;
    border-radius: 50px;
    background: #5a73f2;
    border:none;
}

.joined-btn{
    width:690px;
    border-radius: 50px;
    background: #ccc;
    border:none;
}

</style>

