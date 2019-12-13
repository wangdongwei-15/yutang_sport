<template>
  <div class="order">
      <van-nav-bar
        title="场馆预定"
        left-text="返回"
        left-arrow
        @click-left="back"
        />

      <van-tabs v-model="active" @change="change">
          <van-tab v-for="item in dateList" :key="item.date" >
            <dl slot="title">
                <dt>{{item.date|dateFormat}}</dt>
                <dd>{{item.week}}</dd>  
            </dl>
          </van-tab>
      </van-tabs>

       <div class="body">
           <ul class="times">
               <li v-for="time in times" :key="time">{{time+":00"}}</li>
          </ul>
          <div class="price_wrap">
              <div v-for="(sn_time_prices,date,index) in date_sn_time_prices" :key="date" class="time_prices" v-show="index==active">
                 
                  <dl v-for=" (time_prices,sn) in sn_time_prices" :key="sn">
                       <dt>{{sn}}</dt>
                       <template v-for="(prices,time) in time_prices ">
                            <dd  :key="time" @click="select($event,time,sn,prices.price)" v-if="!prices.is_ordered">
                                ￥{{prices.price}}
                            </dd>
                            <dd  :key="time" class="ordered" v-else></dd>
                       </template>
                       
                  </dl>
                  
              </div>
          </div>    
       </div> 

       <van-submit-bar
        :price="price"
        button-text="提交订单"
        @submit="saveOrder"
        /> 

  </div>
</template>

<script>
export default {
  name: 'home',
  
  data(){
    return {
        price:0,
        active:2,
        dateList:[],
        times:[],
        date_sn_time_prices:{},
        form:{
            venue_id:0,
            order_date:'',
            items:[]
        }
    }
  },

  created(){
     
    let id = this.$route.query.id;
    this.form.venue_id = id;

    this.active = this.$route.query.index;
    this.getTimePrices(id);
    
  },

  methods:{

    // 选择子项
    select(e,time,sn,price){

       let dd = e.target;

       // 取消
       if(dd.className == "selected"){

           dd.className = "";

           this.form.items.map((item,index)=>{
               if(item.time == time && item.sn == sn){
                   this.form.items.splice(index,1);
               }
           })

           console.log(this.form.items);
            this.price -= price*100;
           
       }else{
          
          // 验证
          if(this.form.items.length == 4){
            return this.$toast("亲,单次只能预定4个时段!");
          }

           // 选中
           dd.className = "selected";
           this.form.items.push({time,sn});
           this.price += price*100;

       }

    },  
    
    // 保存订单
    async saveOrder(){

       //console.log(this.form);

       let { data:res } = await this.$http.post('order/save',this.form);
       if(res.status !==200 ) return this.$toast('订单保存失败!');
       this.$toast("订单保存成功");
    
    },  

    // 切换日期
    change(){
         //console.log(this.active);

         // 设置预定日期
         //console.log(this.dateList[this.active].date);
         this.form.order_date = this.dateList[this.active].date
     }, 

    //返回上页
    back(){
       this.$router.back();
    },  

     // 获取当前场馆 时段价格列表
     async getTimePrices(id){

         let { data:res } = await this.$http.get('venue/time_prices/'+id);
         console.log(res);
         this.dateList = res.datelist;
         this.times = res.times;
         this.date_sn_time_prices = res.dates;

         // 设置初始预定日期
         this.form.order_date = this.dateList[this.active].date;
        
     }

    
  },

  filters:{
      dateFormat(value){
          let arr = value.split('-');
          return  arr[1]+"月"+arr[2]+"日"
      }
  }



}
</script>

<style  lang="less">

.order{  

    .van-nav-bar{
    background: #3298ed!important;
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

    .van-tabs--line .van-tabs__wrap{
        height: 60px!important;
        dl{
        line-height: 25px;
        }
    }

    .body{
        display: flex;
        padding-top:30px;
        padding-left:15px;
        padding-bottom: 120px;
        .times{
            width:110px;
            padding-top:50px;
            li{
                height: 100px;
                font-size: 26px;
                color:#ccc;
                text-align: center;
                border: 1px #fff solid;
            }
        }

        .time_prices{
            border:1px green solid;
            display: flex;
            border-left:1px #e5e6ea solid;
            border-top:1px #e5e6ea solid;
            dl{
                width:100px;

                .selected{
                    background: #339AEE;
                    color:#fff;
                }

                .ordered{
                    background: #F8F9F8;
                }
               
                dt,dd{
                    width:100px;
                    height: 100px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 26px;
                    color:#626262;
                    border-right:1px #e5e6ea solid;
                    border-bottom: 1px #e5e6ea solid;
                }
                dt{ background: #ebd0bd; height: 50px; }
            }
        }
    }

    .van-submit-bar__text{
        text-align: left;
        padding-left:20px;
    }

    .van-button--danger{
        background-color: #339AEE;
        border-color: #339AEE;
    }

}



</style>
