<template>
    <div class="my-order"> 
        <van-nav-bar
            title="我的订单"
            left-text="返回"
            left-arrow
            @click-left="goBack"
            />   
        <div class="body">
            <dl v-for="order in orderList" :key="order.id" class="order">
                 <dt>场馆:{{order.venue.name}}</dt>
                 <dd>日期:{{order.order_date}} 时间: {{order.time}}</dd>
            </dl>    
        </div>     
    </div>
</template>

<script>

export default {

    data(){
       
       return {
            orderList:[]
       }

    },

    name:"my_order",
    methods:{

        // 返回上一页
        goBack(){
             this.$router.back();
        },

        // 获取登录用户的订单列表
        async getOrderList(){

            let { data:res } = await this.$http.get('order/list');
  
            this.orderList = res.data;
           
            
        }

    },

    created(){
       this.getOrderList();
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

.body{
     padding:20px;
}

.order{
     padding:20px 0;
     border-bottom: 1px #eee solid;
     font-size: 32px;
}

.order dt{
    font-size: 36px;
    font-weight: bold;
    line-height: 50px;
}

</style>