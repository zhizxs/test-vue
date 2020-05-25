<template>
    <div>
        <button @click='operate(1)'>开始</button>
        <button @click='operate(2)'>暂停</button>
        <button @click='operate(3)'>停止</button>
        <div id="canvas"></div>
    </div>
</template>
<script>
const SVGA = require('svgaplayerweb')
export default {

    name: 'seats',

    data() {
        return {
            player: '',
            svga: require('../assets/img/test.svga'),
            // svga:'http://test.zhiz.top/test.svga'
        }
    },

    mounted() {
    	this.$nextTick(()=>{
    		this.setFill()
    		this.init()
    	})
    },
    methods: {
        setFill() {
            var $_canvas = document.getElementById('canvas'),
                w = window.innerWidth,
                h = window.innerHeight,
                screen_proportion = h / w,
                svga_proportion = 16 / 9;
            if (screen_proportion > svga_proportion) { //长屏幕
                $_canvas.style.width = h / svga_proportion + 'px';
                $_canvas.style.left = (w - h / svga_proportion) / 2 + 'px';
            } else {
                $_canvas.style.height = w * svga_proportion + 'px';
                $_canvas.style.top = (h - w * svga_proportion) / 2 + 'px';
            }

        },

        init() {
            var player = new SVGA.Player('#canvas');

            var parser = new SVGA.Parser('#canvas');
            this.player = player

            console.log('player', player)
            // 加载
            parser.load(this.svga, function(videoItem) {


                // loop 循环次数
                player.loops = 2

                // 动画结束都是否清除内容，注意，这里如果不设置 默认true
                player.clearsAfterStop = false

                // pauseAnimation 暂停动画
                // stopAnimation  停止动画
                // 
                // setVideoItem 需要获取load返回参数才能生效
                player.setVideoItem(videoItem);
                // startAnimation 开始动画
                player.startAnimation();

                // 我们可以通过这个函数知道当前动画是播放的第几帧，然后根据具体业务需求展示效果。
                // player.onFrame(i=>{
                //  	console.log('播放到',i)
                //  })
                //  
                //  循环播放结束
                player.onFinished(i => {
                    console.log('播放结束')
                })

            }, err => {
                console.log('err', err)
            })
        },
        operate(i) {
            // 开始
            if (i == 1) {
                this.player.startAnimation()
            } else if (i == 2) { // 暂停
                this.player.pauseAnimation()
            } else if (i == 3) { // 停止
                this.player.stopAnimation()
            }
        }
    }
}

</script>
<style lang="css" scoped>
</style>
