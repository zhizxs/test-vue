<template>
    <div>
<h2>这是B页面{{date}}</h2>
  <button @click='go(1)'>上一页back</button>
  <button @click='go(2)'>上一页router</button>
  <button @click='showDate'>展示时间</button>

    </div>
</template>
<script>
export default {
    data(){
        return{
            date:'正在计算...'  
        }
    },
    mounted(){
        
    },
    created(){
        console.log('B执行创建方法...')
    },
    methods:{
        go(index){
            if(index == 1){
                this.$router.back()
            }else if (index == 2){
                this.$router.push({name:'pageA'})
            }
        },
        showDate(){
            this.date = new Date()
            console.log('b页面执行m')
        }
    }
}
</script>

