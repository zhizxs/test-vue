<template>
    <div class="home">
        <fieldset>
            <legend>socket+edit</legend>
            <button @click="jump('vueEdit')">测试富文本</button>
            <button @click="jump('socket')">测试socket通信</button>
        </fieldset>
        <fieldset>
            <legend>方法功能测试</legend>
            <button @click="jump('canvas')">测试Html2Canvas</button>
            <button @click="jump('seat')">测试电影座位</button>
            <button @click="jump('map')">测试地图</button>
            <button @click="jump('svga')">测试svga</button>
            <button @click="jump('input')">测试input键盘调起</button>
        </fieldset>
        <fieldset>
            <legend>组件使用测试</legend>
            <button @click="jump('ele')">ele组件</button>
            <button @click="jump('others')">其他小件</button>
        </fieldset>
        <fieldset>
            <legend>vue-api</legend>
            <button @click="jump('vueApi')">vueApi</button>
        </fieldset>
    </div>
</template>
<script>
export default {
    name: 'home',
    data() {
        return {}
    },
    methods: {
        jump(name) {
            this.$router.push({ name: name })
        }
    }
}

</script>
<style lang="css" scoped>
button {
    margin: 5px;
}

</style>
