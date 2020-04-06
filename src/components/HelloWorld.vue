<template>
    <div class="hello">
        <br />
        <button @click="getMap">地图</button>
        <button @click="goUrl('svga')">svga</button>
        <br />
        <label for>
            请输入用户名：
            <input type="text" v-model="userName" />
            {{regMsg}}
        </label>
        <label for>
            请输入你需要发送的消息：
            <input type="text" v-model="msg" />
        </label>
        <br />
        <button @click="goUrl('input')">输入框</button>
        <button @click="handleSavingContent">保存数据</button>
        <button @click="getImg">截取图片</button>
        <button @click="joinIn">加入房间</button>
        <button @click="sendMsg">发送消息</button>
        <button @click="sendMsgAuto">自动发送消息</button>
        <button @click="endMsgAuto">关闭自动发消息</button>
        <button @click="addContent">数组添加</button>
        <button @click="next">下一个页面</button>
        <hr />
        <div class="abs">这是绝对定位</div>
        <div class="pre">这是相对定位</div>
        <div class="normal">这是正常的文档流</div>
        <button @click="operate(1)">绝对定位</button>
        <button @click="operate(2)">相对定位</button>
        <button @click="operate(3)">正常的文档流</button>
        <button @click="move">电影座位</button>
        <vue-editor v-model="htmlForEditor" :editorToolbar="customToolbar" :style="{maxHeight:400+'px'}"></vue-editor>
        <el-select v-model="value" multiple placeholder="请选择">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
        </el-select>
        <div class="canvas"></div>
    </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
import html2canvas from "html2canvas";
import io from "socket.io-client";
export default {
    data() {
        return {
            htmlForEditor: "",
            socket: "",
            userName: "",
            lastMsgName: "",
            regMsg: "",
            msg: "",
            customToolbar: [
                [{ header: [false, 1, 2, 3, 4, 5, 6] }],
                ["bold", "italic", "underline", "strike"],
                [
                    { align: "" },
                    { align: "center" },
                    { align: "right" },
                    { align: "justify" }
                ],
                [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
                ["clean"],
                [{ indent: "-1" }, { indent: "+1" }]
            ],
            content: [],
            timer: "",
            selectArr: [1, 2, 4],
            options: [
                { name: '张三丰', id: 1 },
                { name: '李四盒', id: 2 },
                { name: '王鲅先', id: 3 },
                { name: '车车打', id: 4 },
                { name: '粉红豹', id: 5 }
            ],
            value: [1, 5]
        };
    },
    components: {
        VueEditor
    },
    watch: {
        content(value) {
            console.log("内容数组变化：", value);
            this.setEditorContent(value[value.length - 1]);
        }
    },
    // beforeRouteLeave(to, from, next) {
    //   console.log('to',to)
    //   console.log('from',from)
    //   // 设置下一个路由meta
    //   to.meta.keepAlive = true; // 让A缓存，不请求数据
    //   next(); // 跳转到A页面
    // },
    methods: {

        goUrl(val) {
            this.$router.push({ name: val });
        },
        getMap() {
            this.$router.push({ name: "map" });
        },

        setEditorContent(val) {
            let vm = this;
            vm.htmlForEditor = vm.htmlForEditor + val;
        },
        sendMsgAuto() {
            let vm = this;
            vm.timer = setInterval(function() {
                let title = "原告" + new Date().getSeconds();
                vm.msg = "这是测试消息，暴力测试性能.";
                vm.addDom(title, vm.msg);
                // vm.sendMsg()
            }, 200);
        },
        move() {
            this.$router.push({ name: "seats" })
        },
        endMsgAuto() {
            clearInterval(this.timer);
            this.timer = null;
        },
        next() {
            this.$router.push({ name: "pageA" });
        },
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
        addContent() {
            let vm = this;
            // let elem = document.getElementsByClassName('editor_self')[0]
            let elem = document.getElementsByClassName("ql-editor")[0];
            let len = elem.childNodes.length;
            // elem.removeChild()
            elem.childNodes[len - 1].innerHTML = vm.content[len - 1];
            // elem.childNodes[len-1].setAttribute('wordBreak','break-all')
        },
        handleSavingContent: function() {
            console.log(this.htmlForEditor);
        },
        getImg() {
            let htm = document.getElementsByClassName("ql-editor")[0];
            console.log(htm);
            html2canvas(htm).then(function(canvas) {
                let cas = document.getElementsByClassName("canvas")[0];
                console.log("生成的图片", canvas.toDataURL("image/png"));
                cas.appendChild(canvas);
            });
        },
        // 加入房间
        joinIn() {
            this.socket.emit("joinIn", { user: this.userName });
        },
        sendMsg() {
            this.socket.emit("sendMsg", { user: this.userName, msg: this.msg });
        },

        // 新增一个dom
        addDom(title, msg) {
            let elem = document.getElementsByClassName("test_box")[0];
            let str = `<div class='cont'><span style='display:inline-block;float:left;'>${title}：</span><div style='float:left;width:90%;'>${msg}</div></div>`;
            elem.innerHTML += str;
        },

        // 追加 dom 内容
        appendDom(msg) {
            let _msg =
                "这是追加的内容，内容真的是有很多，我需要测试他到底有多少，以及很多的时候会不会换行显示的问题。";
            let elem = document.getElementsByClassName("test_box")[0];
            let len = elem.childNodes.length;
            console.log(elem.childNodes[0].children);
            elem.childNodes[len - 1].children[1].innerHTML += _msg;
        }
    },
    mounted() {
        // let vm = this
        // let socket = io('ws://localhost:3000')
        // this.socket = socket
        // socket.emit('connection', { user: 'meximex' })
        // socket.on('receiveMsg', function(data) {
        //   console.log('接收到信息：', data)
        //   //追加还是新增？？
        //   if (data.user == vm.lastMsgName) { // 追加
        //     let lastIndex = vm.content.length - 1
        //     vm.content[lastIndex] = vm.content[lastIndex] + data.msg
        //     vm.addContent()
        //   } else {
        //     vm.lastMsgName = data.user
        //     vm.content.push(data.user + " : " + data.msg)
        //   }
        // })
        // socket.on('joinInMsg', function(data) {
        //   vm.regMsg = '注册成功'
        //   console.log('注册成功:', data)
        // })
    }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

.ql-container.ql-snow {
    height: 700px !important;
    overflow-y: auto !important;
}

.ql-editor {
    height: auto !important;
}

.test_box {
    text-align: left;
    min-height: 20px;
    padding: 5px;
    width: 40%;
    outline: 0;
    border: 1px solid #a0b3d6;
    font-size: 16px;
    line-height: 24px;
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: auto;
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1),
        0 0 8px rgba(82, 168, 236, 0.6);
}

.abs {
    position: absolute;
    z-index: -88;
}

.pre {
    position: relative;
    z-index: -88;
}

.cont::after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}

</style>
