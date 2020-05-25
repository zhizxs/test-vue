<template>
	<div class="con">
		<div class="dialog"></div>
		<input type="text" 
			@input='contentChange'
		/>
	</div>
</template>

<script>
export default {

  name: 'myinput',

  data () {
    return {

    }
  },
  methods:{
  	contentChange(){
  		console.log('window.innerHeight',window.innerHeight)
  	}
  }
}
</script>

<style lang="css" scoped>
.con{
	height: 100%;
}

.dialog{
	background: rgba(0,0,0,.6);
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
}
input{
	border: 1px solid #7d7d7d;
	border-radius: 5px;
	padding:5px; 
	position: absolute;
	bottom:0;
}
</style>