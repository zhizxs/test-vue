<template>
	<div>
		<p>座位</p>

		<div>
			<ul v-for="num in xMax">
				<li v-for="i in yMax">{{num+'-'+i}}</li>
			</ul>
		</div>

	</div>
</template>

<script>
export default {

  name: 'seats',

  data () {
    return {
    	seatData:[],
    	xMax:'',
    	yMax:'',
    	pointArr:{1:[],2:[]}
    }
  },
  created(){
  	this.seatData = require("./seat.json").items
  	this.initSeat()
  },
  methods:{
  	initSeat(){
  		let _data = this.seatData.slice(0)

  		let obj = {}

  		while(_data.length){

  			let item = _data[0]

  			if(item.xcoord>this.xMax){
  				this.xMax = item.xcoord
  			}
  			if(item.ycoord>this.yMax){
  				this.yMax = item.ycoord
  			}

  			obj[item.xcoord] ? obj[item.xcoord].push(item):(obj[item.xcoord]=[item])

  			_data.splice(0,1)

  		}

  		this.pointArr = obj
  		
  	}
  }
}
</script>

<style lang="css" scoped>
li{
	list-style: none;
	display: inline-block;
	border: 1px solid #ddd;
	margin: 5px;
}

.hide{
	visibility: hidden;
}

.sel{
	background: green;
}

.dis{
	background: red;
}




</style>