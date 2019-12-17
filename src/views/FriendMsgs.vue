<template>
    <div class="friend-msgs" ref='friend_msgs'>
        <van-nav-bar
          title="朋友圈"
          left-arrow
          @click-left="back"
          />
        <div class="body">
            <dl v-for="friendMsg in friendMsgs" :key="friendMsg.id">
                <dt><img :src="friendMsg.user.icon_url"></dt>
                <dd>
                    <span>{{friendMsg.user.name}}</span>
                    <p>{{friendMsg.message}}</p>
                    <div class="img-list">
                        <img :src='imgSrc' v-for="(imgSrc,index) in friendMsg.imgs" :key="imgSrc" @click="preview(friendMsg.imgs,index)">
                    </div>

                </dd>
            </dl>
            <div class="loadding">
                <van-loading v-show="isLoading" type="spinner" color="#1989fa" class="loadding-icon" />
            </div>
        </div>
    </div>
</template>

<script>

import { ImagePreview }  from "vant";

export default {
    data(){
       return {
            friendMsgs:[],
            page:1,
            isLoading:false,
            isFinish:false
       }
    },

    created(){

       this.getFriendMsgs();
       this.loadScroll();
       
    },

     beforeDestroy(){
        // 注销滚动事件
        window.onscroll = null;
    
    },
  

    methods:{

        // 预览图片
        preview(imgArr,index){
           ImagePreview({
               images:imgArr,
               startPosition: index
           });
        },

        back(){
            this.$router.back();
        },

        async getFriendMsgs(){

            this.isLoading = true;
            let { data:res } = await this.$http.get('user/friend_msgs?page='+this.page);
            this.isLoading = false;
            this.friendMsgs = this.friendMsgs.concat( res.data );
          
            if(this.page == res.last_page){
                this.isFinish = true;
            }

            this.page++;
            
        },

        // 加载更多
        getMore(){

            if(this.isFinish) return  this.$toast("亲,没有更多数据了!");
            if( this.isLoading) return false;

            this.getFriendMsgs();

        },

        // 滚动加载
        loadScroll(){

            window.onscroll = ()=>{

                // 屏幕的高度
                let clientHeight = window.innerHeight;

                // 内容区高度
               //let offsetHeight = document.documentElement.offsetHeight;
                let offsetHeight = this.$refs.friend_msgs.offsetHeight;

                // 滚动距离
                let scrollTop = document.documentElement.scrollTop;

                //console.log(clientHeight,offsetHeight,scrollTop);

                let bottomOfWindow  = scrollTop  >= offsetHeight - clientHeight;

                if(bottomOfWindow){
                    this.getMore();
                }
                
            }
        
       }

    }
}
</script>

<style lang="less" scoped>

.van-nav-bar{
    position: fixed;
    left:0;
    top:0;
    width:100%;
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

.loadding{
  text-align: center;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.body{
    padding-top:100px;
    padding-bottom: 180px;
}

.friend-msgs{
    dl{
        border-bottom:1px #eaecea solid;
        padding:25px 30px;
        display: flex;

        dt{
            width:80px;
           
            img{
                width:100%;
                border-radius: 6px;
            }
            margin-right:20px;
        }
        dd {
            span{
             
            font-size: 30px;
            color:#4f6591;
            
            }
            p{
                font-size: 28px;
            }
        }
    }

    .img-list{
        margin-top: 20px;
    }

    .img-list img{
        width:150px;
        height: 150px;
        margin-right: 10px;
    }
}

</style>