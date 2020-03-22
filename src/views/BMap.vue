<template>
     <div>
           <div id="map"></div>

       <div class="search">
			<div id="r-result">请输入：<input type="text" id="suggestId" size="20" value="百度" style="width:150px;" />
			<button id="search-btn">搜索</button></div>
			<div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
			<input type="text" id="lng" v-model="point.lng" />
			<input type="text" id="lat" v-model="point.lat" />
			<button type="button" @click="confirm">位置确认</button>
		</div>

     </div>
     
</template>

<script>
export default {
    data(){
        return {
            map:null,
            point:{
                lng:'',
                lat:''
            },
            marker:null,
            searchValue:''
        }
    },

    mounted(){

        this.getSearchList();

        // 1 初始化地图
        this.map = new BMap.Map("map");
        this.point = new BMap.Point(116.404, 39.915);
        console.log(this.point);
        this.map.centerAndZoom(this.point, 15);
        // this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放


        // 2 添加控件
        this.map.addControl(new BMap.NavigationControl()); // 平移缩放控件
        this.map.addControl(new BMap.GeolocationControl()); // 定位控件

        // 3 添加标注
        this.marker = new BMap.Marker(this.point);        // 创建标注    
        this.map.addOverlay(this.marker);
        
        // 让标注可拖动
        this.marker.enableDragging();  
        this.marker.addEventListener("dragend", function(e){    
            //console.log("当前位置：" + e.point.lng + ", " + e.point.lat);   
            this.point = e.point; 
        }) 
        
        // 4 给地图添加点击事件
        this.map.addEventListener('click',(e)=>{

            // 删除原标注
            this.map.removeOverlay(this.marker);

            // 添加新标注
            console.log(e.point);
            this.point = e.point;
            this.marker = new BMap.Marker(this.point);        // 创建标注    
            this.map.addOverlay(this.marker);
            
            // 让新标注可拖拽
            this.marker.enableDragging();  
            this.marker.addEventListener("dragend", (e)=>{    
                 console.log("当前位置：" + e.point.lng + ", " + e.point.lat);
                 this.point = e.point;    
            }) 
            
        })
        
    },
    methods:{
        
        confirm(){

        },
        
        getSearchList(){

            // 获取关键词  智能推荐列表
            let ac = new BMap.Autocomplete({"input" : "suggestId","location" : this.map});
            ac.addEventListener('onconfirm',(e)=>{
                let _value  = e.item.value;
                this.searchValue = _value.province + _value.city + _value.district + _value.street 
                + _value.business;
                // console.log(this.searchValue);
                this.setPlace(this.searchValue);
            })

        },
        
        setPlace(address){

             let that = this;

             // 创建智能搜索对象 
             let local = new BMap.LocalSearch(that.map, {
                
                onSearchComplete(){
                    that.point  = local.getResults().getPoi(0).point;
                    console.log(that.point);
                    
                    that.marker = new BMap.Marker(that.point);
                    that.map.addOverlay(that.marker);
                    that.map.panTo(that.point);

                }
                
			 });
               
             // 调用搜索的方法  
			 local.search(address);
             
        }
        
    }
  
}
</script>

<style scoped lang="less">

#map{
    height: 500px;
}

.search{
    border:2px #eee solid;
    margin-top: 20px;
    padding:20px;
}

#r-result{
    margin-bottom: 20px;
}

input{
    margin-right: 10px;
}

</style>