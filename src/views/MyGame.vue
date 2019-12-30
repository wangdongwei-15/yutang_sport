<template>
    <div class="my_game">
     <van-nav-bar
        title="我的活动"
        left-text="返回"
        right-text="发布"
        left-arrow
        @click-left="onBack"
        @click-right="create_game"
      />

    <van-tabs v-model="active">
        <van-tab title="我的参与">
            <div class="my_join">
                <dl v-for="joinGame in joinGameList" :key="joinGame.id" class="game-item">
                    <dt>
                        <p>{{joinGame.title}}</p>
                    </dt>
                    <dd>{{joinGame.created_at}}</dd>
                    <dd>
                        <van-button type="warning" size="mini">详情</van-button>
                    </dd>
                </dl>

            </div>
        </van-tab>
        <van-tab title="我的发布"> 
            <div class="my_create">
                <dl v-for="createGame in createGameList" :key="createGame.id" class="game-item">
                    <dt>
                        <p>{{createGame.title}}</p>
                    </dt>
                    <dd>{{createGame.created_at}}</dd>
                    <dd>
                        <van-button type="primary" size="mini">编辑</van-button>
                        <van-button type="danger" size="mini">删除</van-button>
                         <van-button type="warning" size="mini">详情</van-button>
                    </dd>
                </dl>
            </div>
        </van-tab>
    </van-tabs>   
    </div> 

</template>

<script>

export default {

    data(){

        return {
            active:0,
            createGameList:[],
            joinGameList:[]
        }

    },

    created(){
        
        // 获取发布活动
         this.getCreateGames();

        // 获取加入的活动 
        this.getJoinGames();

    },

    methods:{

        // 获取发布的活动
        async getCreateGames(){
            let { data:res } = await this.$http.get('user/my_create_games');
            this.createGameList = res.data.data;
        },
       
        async getJoinGames(){

            let { data:res } = await this.$http.get('user/my_join_games');
            this.joinGameList = res.data.data;
            
        },

        // 发布
        create_game(){

            this.$router.push("create_game");
            
        },
        
        // 返回
        onBack(){

            this.$router.back();

        }
       
        
    }

}

</script>

<style lang="less" scoped>
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

.my_join,.my_create{
    padding:30px;
}

.game-item{
    font-size: 25px;
    padding:20px 0;
    border-bottom: 1px #ddd solid;
    dt,dd{
        font-size: 28px;
        font-weight: bold;
        line-height: 60px;
    }
}


</style>