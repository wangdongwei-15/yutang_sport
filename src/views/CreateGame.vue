<template>
    <div class="my_game">

        <van-nav-bar
            title="发布活动"
            left-text="返回"
            left-arrow
            @click-left="onBack"
        />

        <div class="body">

           <van-cell-group>

			  <van-field
			    v-model="game.title"
			    label="活动标题"
			    placeholder="请输入活动标题"
			  />

               <van-cell title="活动项目" is-link :value="typeName" @click="showTypeList" />
               <van-cell title="活动场馆" is-link :value="veneuName|ellipsis" @click="selectVenue" />
               <van-cell title="活动时间" is-link :value="game.datetime" @click="showDateList" />
               <van-cell title="活动人数" is-link  >
                    <van-stepper v-model="game.number" slot="right-icon" />
               </van-cell>

           </van-cell-group>

           <van-cell-group class="game-des">
                <van-cell title="活动描述" />
                <van-field
                v-model="game.des"
                type="textarea"
                placeholder="请输入活动描述"
                rows="1"
                autosize
                />
            </van-cell-group>  

            <div class="btn-wrap">
               <van-button type="primary" @click="saveGame">保存活动</van-button>
            </div>
        
        </div>

        <!-- 类型列表 -->
        <van-action-sheet v-model="typeShow" :actions="typeList" @select="onSelect" />

        <!-- 日期列表 -->

        <van-popup v-model="dateShow" position="bottom">
            <van-datetime-picker
            v-model="currentDate"
            type="datetime"
            :min-date="minDate"
            :max-date="maxDate"
            @cancel = "cancel"
            @confirm = "confirm"
            />
        </van-popup>
        
    </div> 

</template>

<script>

import { formatTime } from '@/assets/util.js';

export default {

    name:'create_game',
    
    data(){

        return {

            game:{
                title:"",
                des:'',
                number:1,
                datetime:'选择日期',
                venue_id:0,
                type_id:0
            },
            typeShow:false,
            dateShow:false,
            typeList:[],
            typeName:'选择类型' ,
            veneuName:'选择场馆',
            minDate: new Date(),
            maxDate: new Date(2022, 12, 13),
            currentDate: new Date()
        }

    },

    // 组件路由钩子函数
    beforeRouteEnter(to,from,next){

       if(from.name=="select_venue"){

           console.log('你是从select_venue路由过来的'); 
           next(vm=>{
               if(!vm.$route.params.venue) return false;
               let venue = vm.$route.params.venue;
               vm.veneuName = venue.name;
               vm.game.venue_id = venue.id;
           });
           
       }else{
           next();
       }
       
    }, 

    created(){

        // 调用获取类型方法
        this.getTypeList();
        
    },

    methods:{

        // 保存活动
        async saveGame(){

            console.log(this.game);

            let { data:res } = await this.$http.post('game/save',this.game);

            console.log(res);
            if(res.code !== 200) return this.$toast("活动保存失败!")

            this.$toast("活动保存成功!");

            this.$router.push('my_game');

        },
        
        // 选择场馆
        selectVenue(){

            if(this.game.type_id== 0) return this.$toast("亲，请先选择类型！");

            this.$router.push({
                path:'/select_venue',
                query:{
                    type_id:this.game.type_id
                }
            });

        },
        
        // 日期确认
        confirm(d){
            let formateDate = d.getFullYear()+'-'+(d.getMonth()+1) +'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes();
            this.game.datetime = formateDate;
         
            this.dateShow = false;
        },

        // 日期取消
        cancel(){
            this.dateShow = false;
        },

        // 显示日期列表
        showDateList(){
            this.dateShow = true;
        },
        
        // 选择项目
        onSelect(item,index){
           
           this.typeName = item.name;
           this.game.type_id = item.id;
           this.$toast(item.name);
           this.typeShow = false;

        },
        
        // 返回
        onBack(){
            this.$router.back();
        },

        // 获取项目类型
        async getTypeList(){
            let { data:res } = await this.$http.get('venue/types');
            this.typeList = res;
        },

        // 显示项目类型列表
        showTypeList(){
           this.typeShow = true;
        }
       
        
    },

    filters: {
        ellipsis (value) {
        if (!value) return ''
        if (value.length > 20) {
            return value.slice(0,20) + '...'
        }
        return value
        }
   },

}

</script>

<style lang="less" scoped>
.my_game{
    height: 100vh;
    background: #e8e8e8;
    display: flex;
    flex-direction: column;
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

.my_join,.my_create{
    padding:30px;
}

.body{
    flex-grow: 1;
    background: #fff;
}

.game-des{
    margin-top: 20px;
}

.btn-wrap{
    padding:30px;
}

</style>