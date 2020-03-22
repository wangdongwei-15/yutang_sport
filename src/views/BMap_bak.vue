<template>
    <div class="map-wrap">
    	<div id="mark" ref="mark"></div>
    	<div id="map"></div>
		<div class="map-body">
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
        name: "BMap",
        data(){
        	
        	return {
        	    map:null,        //实例化map
			    searchValue:"",  //搜索model
			    currentAddress:"",   //当前定位的地址
			    point:{
			    	lng:"",
			    	lat:""
			    },            //当前地址的经纬度
        	}
        },
        methods:{
        	confirm(){
        		this.$store.commit("SET_POINT",	this.point);
        	},
        	initMaps(){
			    let vm = this;
                this.map = new BMap.Map("map");  // 实例化地图对象

                this.map.addControl(new BMap.NavigationControl());   //平移缩放控件;
                this.map.addControl(new BMap.ScaleControl());  // 添加比例控件;

			    let mPoint = new BMap.Point(116.404, 39.915);  //天安门
			    this.map.centerAndZoom(mPoint,10);
			    this.map.addEventListener("click", vm.showInfo)
			},
			locate(){
			    let map = this.map;
			    let geolocation = new BMap.Geolocation(); // 百度地图 定位对象
			    const vm = this;
			    geolocation.getCurrentPosition(function(r){
			        if(this.getStatus() === BMAP_STATUS_SUCCESS){
			             let mk = new BMap.Marker(r.point);
			             map.addOverlay(mk);
			             map.panTo(r.point);
			             vm.analyze(r.point);// 逆地址解析
			        }else {
			            console.log('failed ',this.getStatus());
			        }
			    })
			},
			 analyze(point){//point:{lat:"",lng:""}
			    
			    const geoc = new BMap.Geocoder();
			       
			       geoc.getLocation(point, rs=>{
			       	//console.log(rs);
			      /* this.point = rs.point;
			       this.currentAddress = rs.address;
			       this.poiKeyword = rs.street||rs.address;*/
			       //console.log(rs);
			       
			   });
			 },
			  getSuggestion(){
			  	 
			  	  // 获取关键词  智能推荐列表
			      let ac = new BMap.Autocomplete({"input" : "suggestId","location" : this.map});
			      
			      // 对地图进行定位
			      ac.addEventListener("onconfirm", e=> {
			        let _value = e.item.value;
			        this.searchValue = _value.province + _value.city + _value.district + _value.street 
			        + _value.business;
			        this.setPlace(this.searchValue);

			      });
			  },
			  setPlace(val){
			  	
			    let map = this.map;
			    map.clearOverlays();
			    const vm = this;
			  
			    let local = new BMap.LocalSearch(map, {
			       onSearchComplete(){
			          let pp = local.getResults().getPoi(0).point;
			          vm.point = pp;
			          map.centerAndZoom(pp, 50);
			          map.addOverlay(new BMap.Marker(pp));
			          vm.analyze(pp); //逆地址解析获取精确地址*/
			      }
			    });

			    local.search(val);
			    
			},
			showInfo(e){
				this.point = e.point;
				this.$refs.mark.style.left = e.offsetX+"px";
				this.$refs.mark.style.top = e.offsetY+"px";
				console.log(e);
			}
        },
        mounted(){
        	
        	this.$nextTick(()=>{
        		this.initMaps(); // 挂载地图
        		this.locate();   // 获取用户当前位置
        		this.getSuggestion()  // 获取搜索智能推荐列表
        	})
        	
        }
    }
</script>

<style scoped>
 #map {
   height: 5rem;
   width: 100%;
 }

#r-result {
	width: 100%;
	padding-bottom: .3rem;
	font-size: .28rem;
}

.map-body{
	padding:.3rem;
}

#lng{
	margin-bottom: .2rem;
}

#search-btn{
	margin-left: .2rem;
	font-size: .28rem;
}

#mark{
	width:.4rem;
	height: .4rem;
	border-radius: 50%;
	position: absolute;
	z-index: 1000;
	background-color: blue;
}
</style>