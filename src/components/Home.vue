<template>
  <div class="home-container">
     <img src="../assets/imgs/banner.jpg" class="banner">
     <h1 class="title">火星时代web前端全栈工程师</h1>
     <div class="box"></div>
  </div>
</template>

<script>
export default {
  name: 'home',
  
  data(){
    return {
      userList:[]
    }
  },

  created(){
     this.getUserList();
  },

  methods:{

     async getUserList(){

        let {data:res} = await this.$http.get('admin/users');
        console.log(res);

     }


  }



}
</script>

<style scoped>
.banner{
   width:750px;
}

.title{
   font-size: 30px;
}

.box{
  width:375px;
  height: 200px;
  background: purple;
}

</style>
