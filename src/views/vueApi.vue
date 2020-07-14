<template>
    <div>
        <fieldset>
            <legend>数据绑定API - v-model</legend>
            <!-- 介绍两种数据绑定的方法：实现 v-model 功能 -->
            <!-- <increat-btn v-model="value"></increat-btn> -->
            <increat-btn :value.sync="value"></increat-btn>
            <p>
                value：{{value}}
            </p>
        </fieldset>
        <fieldset>
            <legend>组件传值 (provide/inject)</legend>
            <button @click="getInfo">模拟请求数据</button>
            <p>当前值:{{app.userInfo.name}}</p>
        </fieldset>
        <fieldset>
            <legend>组件传值 (broadcast)</legend>
            <button @click="handleClick">触发事件</button>
            <trans-msg></trans-msg>   
        </fieldset>

        <fieldset>
            <legend>表单验证</legend>
              
        </fieldset>
    </div>
</template>
<script>
import Emitter from '@/mixins/emitter.js';
import increatBtn from "@/components/api/increatBtn.vue"
import transMsg from "@/components/api/transMsg.vue"

export default {
    name: 'api',
    inject: ['app'],
    mixins: [Emitter],
    data() {
        return {
            value: 0,

        }
    },
    components: {
        increatBtn,
        transMsg
    },
    methods: {
        getInfo() {
            console.log('this.app', this.app)
            this.app.getUserInfo()
        },
        handleClick() {
            this.broadcast('transMsg', 'on-message', 'Hello Vue.js')
        }
    }
}

</script>
<style lang="css" scoped>
</style>
