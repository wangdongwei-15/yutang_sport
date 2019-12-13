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
            <div class="my_join">内容1</div>
        </van-tab>
        <van-tab title="我的发布"> 
            <div class="my_create">内容2</div>
        </van-tab>
    </van-tabs>   
    </div> 

</template>

<script>

export default {

    data(){

        return {
            active:0
        }

    },

    methods:{

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
</style>