<template>
    <div class="my_game">

        <van-nav-bar
            title="选择场馆"
            left-text="返回"
            left-arrow
            @click-left="onBack"
        />

        <div class="body">

           <van-address-list
            v-model="chosenAddressId"
            :list="list"
            add-button-text="确认场馆"
            @add="confirm"
            @edit="onEdit"
            @select='select'

            />

        </div>   

    </div> 

</template>

<script>



export default {
    
    name:'select_venue',

    data(){
        return {
           venueList:[],
           type_id:0,
           chosenAddressId:0,
           list:[],
           selectVenue:{}
        }
      
    },

    created(){
        
        this.type_id = this.$route.query.type_id;
        this.getVenueList();
        
    },

    methods:{

        onAdd(){},
        onEdit(){},

        // 场馆列表
        async getVenueList(){
            let { data:res } = await this.$http.get('venue/list',{
                params:{
                    type_id:this.type_id
                }
            });
            this.list = res.data;
            this.chosenAddressId=this.list[0].id;

        },
        
        // 回退
        onBack(){
            this.$router.back();
        },
        
        // 选择
        select(item,index){

           //console.log(item,index);
           this.selectVenue = item;
        

        },

        // 确认
        confirm(){
            this.$router.push({
                name:'create_game',
                params:{
                    venue:this.selectVenue
                }
            })
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


</style>