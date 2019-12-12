<template>

   <dl  class="item" @click="detail(venue.id)">
        <dt><img src="../assets/imgs/img_01.jpg"></dt>
        <dd>
            <h3>{{venue.name}}</h3>
            <p>{{venue.type_name}}</p>
            <p>{{venue.address}}</p>
        </dd>
    </dl>
   
</template>

<script>
export default {

    props:['venue'],
    methods:{

       detail(id){
          this.$router.push({path:'/detail',query:{
              id
          }});
       }

    }
}
</script>

<style lang="less" scoped>

.item{
    display: flex;
    padding:30px 0;
    border-bottom: 1px #ebecee solid;
    dt{
      width:200px;
      img{
         width:100%;
      }
    }
    dd{
      width:460px;
      margin-left: 30px;
       h3{
        font-size: 35px;
        line-height: 60px
      }
      p{
        font-size: 20px;
        line-height: 45px;
      }
    }
}

</style>

