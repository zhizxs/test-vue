<template>
    <div>
        <fieldset>
            <legend>socket+edit</legend>
            <label for>
                请输入用户名：
                <input type="text" v-model="userName" />
                {{regMsg}}
            </label>
            <label for>
                请输入你需要发送的消息：
                <input type="text" v-model="msg" />
            </label>
            <button @click="joinIn">加入房间</button>
            <button @click="sendMsg">发送消息</button>
            <button @click="sendMsgAuto">自动发送消息</button>
            <button @click="endMsgAuto">关闭自动发消息</button>
             <button @click="addContent">数组添加</button>
            <p>注：测试语音输入对接到富文本编辑器</p>
        </fieldset>
        <vue-editor v-model="htmlForEditor" :editorToolbar="customToolbar" :style="{maxHeight:400+'px'}"></vue-editor>
    </div>
</template>
<script>
import io from "socket.io-client";
import { VueEditor } from "vue2-editor";
export default {
    name: 'socket',
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
        }
    },
    components: { VueEditor },
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
    },
    methods: {
        // 加入房间
        joinIn() {
            this.socket.emit("joinIn", { user: this.userName });
        },
        sendMsg() {
            this.socket.emit("sendMsg", { user: this.userName, msg: this.msg });
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
        endMsgAuto() {
            clearInterval(this.timer);
            this.timer = null;
        },
             // 新增一个dom
        addDom(title, msg) {
            let elem = document.getElementsByClassName("test_box")[0];
            let str = `<div class='cont'><span style='display:inline-block;float:left;'>${title}：</span><div style='float:left;width:90%;'>${msg}</div></div>`;
            elem.innerHTML += str;
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

        // 追加 dom 内容
        appendDom(msg) {
            let _msg =
                "这是追加的内容，内容真的是有很多，我需要测试他到底有多少，以及很多的时候会不会换行显示的问题。";
            let elem = document.getElementsByClassName("test_box")[0];
            let len = elem.childNodes.length;
            console.log(elem.childNodes[0].children);
            elem.childNodes[len - 1].children[1].innerHTML += _msg;
        }
    }
}

</script>
<style lang="css" scoped>
</style>
