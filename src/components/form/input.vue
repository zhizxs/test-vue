<template>
	<input
         type="text"
         :value="currentValue"
         @input="handleInput"
         @blur="handleBlur"
         />
</template>

<script>
	import Emitter from '@/mixins/emitter.js';
export default {

  name: 'iInput',
  mixins:[Emitter],
  props:{
  	value:{
  		type:String,
  		default:''
  	}
  },
  data () {
    return {
    	currentValue:this.value
    }
  },
  watch:{
  	value(val){
  		this.currentValue = val
  	}
  },
  methods:{
  	handleBlur(){
  		this.dispatch('iFormItem','on-form-blur',this.currentValue)
  	},
  	handleInput(event){
  		const val = event.target.value
  		this.currentValue = val
  		this.$emit('input',val)
  		this.dispatch('iFormItem','on-form-blur',val)
  	}
  }
}
</script>

<style lang="css" scoped>
</style>