<template>
    <div>
        <fieldset>
            <legend>加解密</legend>
            <p>测试：针对localStorage，打开调试模式查看效果。</p>
        </fieldset>
        <fieldset>
            <legend>数字增长效果</legend>
            <p>测试：数字增长动画。</p>
            <p>{{numGrow}}</p>
        </fieldset>
    </div>
</template>
<script>
export default {
    name: 'others',
    data() {
        return {
            numGrow: '',
            startTime:0,
            num:9112332458,
            option: {
                isfomat: true,
                prefix:"$",
                duration: 3000,
                decimal:2
            }
        }
    },
    mounted() {
        /*******************数据加解密***********************/
        this.save("tt", { a: 1, b: 2, c: "6月份绩效（张三）.xlsx",d:'9/2',e:[1,2,0.05,'5%',"a&a"] })
        let tt = this.get('tt')
        console.log(tt)
        this.save('cc', '张三的大爷')
        let cc = this.get('cc')
        console.log(cc)
        /*******************数据加解密***********************/
        /*******************数字增长效果***********************/
        this.startTime = new Date().getTime()
        requestAnimationFrame(() => {
            this.change();
        });

        /*******************数字增长效果***********************/


    },
    methods: {
        /*******************数据加解密***********************/
        save(key, val) {
            if (val === null || val === undefined || val === 'null' || val === "undefined") {
                localStorage.setItem(key, val);
                return;
            }

            if (window.btoa) {
                val = window.btoa(window.encodeURIComponent(JSON.stringify(val)))
            } else {
                val = JSON.stringify(val)
            }
            localStorage.setItem(
                key,
                val
            );
        },

        get(key) {
            let val = localStorage.getItem(key)

            if (val === null || val === undefined || val === 'null' || val === "undefined") return val;
            if (window.atob) {
                val = window.decodeURIComponent(window.atob(val))
            }

            let obj = ''
            try {
                obj = JSON.parse(val)
            } catch (err) {
                obj = val
            }
            return obj;
        },
        /*******************数据加解密***********************/
        /*******************数字增长效果***********************/
        fomatNum(num) {
            let str = num.toFixed(this.option.decimal); //精确到小数位数多少位
            let num1, x1, x2, reg;
            let arr = str.split(".");
            x1 = arr[0];
            x2 = arr.length > 1 ? '.' + arr[1] : "";
            reg = /(\d+)(\d{3})/;
            // 格式化三位数加点
            if (this.option.isfomat) {
                while (reg.test(x1)) {
                    x1 = x1.replace(reg, '$1' + "," + "$2");
                }
            }
            if (this.option.isfomat) {
                return this.option.prefix + x1 + x2;
            } else {
                return this.option.prefix + str;
            }
        },

        change() {
            // 按时间比列显示最终数额的比列
            var p = Math.min(1.0, (new Date().getTime() - this.startTime) / this.option.duration); //当前时间减去开始时间，然后除以总时间，Math.min,两个数取最小值。
            this.numGrow = this.fomatNum(this.num * p);
            if (p < 1.0) { //
                requestAnimationFrame(() => {
                    this.change();
                });
            } else {
                cancelAnimationFrame(this.change);
            }
        },
        /*******************数字增长效果***********************/
    }
}

</script>
<style lang="css" scoped>
</style>
