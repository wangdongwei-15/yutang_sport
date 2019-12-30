<template>
    <div class="create-friend-msg">

        <van-nav-bar  left-text="取消" left-arrow @click-left="goBack">
            <van-button type="primary" slot="right" size="mini" @click="saveFriendMsgs">发表</van-button> 
        </van-nav-bar>

        <div class="body">
             <van-cell-group>
                <van-field
                    v-model="message"
                    rows="1"
                    autosize
                    type="textarea"
                    placeholder="请输入留言"
                />
            </van-cell-group>
           
            <van-uploader v-model="fileList"  :after-read="afterRead" multiple />
            
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            message:"",
            fileList:[],
            formData:new FormData()
        }
    },
    methods:{

        goBack(){
            this.$router.back();
        },
        
        afterRead(val){
            
            // 判断变量是对象还是数组; 
            if(val.constructor == Object){
                this.formData.append('myfile[]',val.file)   
            }else{
                val.map(item=>{
                    this.formData.append('myfile[]',item.file)
                })
            }
           
        },

        async saveFriendMsgs(){

            //2 准备数据
            this.formData.append('message',this.message);

            // 3 发起请求
            let { data:res } = await this.$http.post('user/send_friend_msg',this.formData);

            if(res.status !== 200) return this.$toast.fail("发布失败!");

            this.$toast.success('发布成功!');

            this.$router.push('/friend_msgs');

            
        }
    }
}
</script>

<style lang="less" scoped>
.body{
    padding:15px 30px;
}

.van-uploader{
    margin-top: 15px;
}

</style>