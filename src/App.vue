<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>
<script>
import mixins_user from './mixins/user.js';
export default {
    name: "App",
    mixins: [mixins_user],
    provide() {
        return {
            app: this
        }
    },

};

</script>
<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
}

button {
    padding: 10px;
    border-radius: 5px;
    background: rgba(41, 151, 254, .6);
    outline: none;
    border: 0;
}

fieldset {
    border-radius: 4px;
    border-color: rgba(41, 151, 254, .6);
    margin-bottom: 8px;
}

</style>
