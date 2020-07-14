<template>
</template>

<script>
export default {

  name: 'transMsg',

  data () {
    return {

    }
  },
  mounted(){
  	this.$on('on-message',msg=>{
  		alert(msg)
  	})
  }
}
</script>

<style lang="css" scoped>
</style>