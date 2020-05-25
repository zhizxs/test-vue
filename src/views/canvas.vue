<template>
    <div>
        <fieldset>
            <legend>html2canvas</legend>
            <button @click="operate(1)">绝对定位</button>
            <button @click="operate(2)">相对定位</button>
            <button @click="operate(3)">正常的文档流</button>
        </fieldset>
        <div class="abs">这是绝对定位</div>
        <div class="pre">这是相对定位</div>
        <div class="normal">这是正常的文档流</div>
        <div class="canvas"></div>
    </div>
</template>
<script>
	import html2canvas from "html2canvas";
export default {


    data() {
        return {

        }
    },
    methods: {
        operate(param) {
            let _class = "";
            if (param == 1) {
                _class = "abs";
            } else if (param == 2) {
                _class = "pre";
            } else if (param == 3) {
                _class = "normal";
            }
            let elem = document.getElementsByClassName(_class)[0];
            html2canvas(elem).then(function(canvas) {
                let cas = document.getElementsByClassName("canvas")[0];
                console.log("生成的图片", canvas.toDataURL("image/png"));
                cas.appendChild(canvas);
            });
        },
    }
}

</script>
<style lang="css" scoped>
.abs {
    position: absolute;
    z-index: -88;
}

.pre {
    position: relative;
    z-index: -88;
}

</style>
