<template>
    <div>
<h2>这是A页面{{date}}</h2>
  <button @click='go(1)'>上一页back</button>
  <button @click='go(2)'>上一页router</button>
  <button @click='go(3)'>下一页</button>
  <button @click='showDate'>展示时间</button>
  <button @click='changeCount'>改变count</button>
    <button @click="test_edit">测试引入js</button>

  <p>这里就是count:{{count}}</p>
  <br>
  <br>
  <br>
  <div class="tab">
      <router-link :to='{name:"tab1"}'>路由1</router-link>
      <router-link :to='{name:"tab2"}'>路由2</router-link>
      <router-link :to='{name:"tab3"}'>路由3</router-link>
  </div>
  <div>
    <h3>router-link的默认值结论</h3>
    <p>其实设置默认值就是路由跳转的问题，将跳转的路由设置成需要跳过去的默认路由就可以了.</p>
  </div>
  <router-view></router-view>
    </div>
</template>
<script>
export default {
  data() {
    return {
      date: "正在计算中...",
      count:0
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        console.log("to:", to);
        console.log("from:", from);
      }
    }
  },
  created() {
    console.log("A执行创建方法...");
  },
  mounted() {
    
  },
  methods: {
    go(index) {
      if (index == 1) {
        this.$router.back();
      } else if (index == 2) {
        this.$router.push({ name: "HelloWorld" });
      } else if (index == 3) {
        this.$router.push({ name: "pageB" });
      }
    },
    changeCount(){
      let vm = this
      setInterval(function(){
        vm.count++;
      },2000)
    },
    showDate(){
        this.date = new Date();
        console.log("a页面执行");
    }
  }
};
</script>
<style>
.router-link-active{
    background: red;
}
</style>


