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
            <h3>具有数据校验功能的表单组件——Form</h3>
            <i-form ref="form" :model="formValidate" :rules="ruleValidate">
                <i-form-item label="用户名" prop="name">
                    <i-input v-model="formValidate.name"></i-input>
                </i-form-item>
                <i-form-item label="邮箱" prop="mail">
                    <i-input v-model="formValidate.mail"></i-input>
                </i-form-item>
                <i-form-item label="爱好" prop="mult">
                    <i-checkbox-group v-model='formValidate.mult'>
                        <i-checkbox label='option1'>上网</i-checkbox>
                        <i-checkbox label='option2'>熬夜</i-checkbox>
                        <i-checkbox label='option3'>吹牛逼</i-checkbox>
                    </i-checkbox-group>
                </i-form-item>
                <i-form-item prop="sing">
                    <i-checkbox v-model="formValidate.sing">我已阅读</i-checkbox>
                </i-form-item>
                <i-form-item prop="sradio">
                    <i-radio v-model="formValidate.sradio">我已阅读</i-radio>
                </i-form-item>
                <i-form-item label="我的偶像" prop="idol">
                    <i-radio-group v-model="formValidate.idol">
                        <i-radio label="ouxiang1">张三丰</i-radio>
                        <i-radio label="ouxiang2">张无忌</i-radio>
                        <i-radio label="ouxiang3">章子怡</i-radio>
                    </i-radio-group>
                </i-form-item>
            </i-form>
            <button @click="handleSubmit">提交</button>
            <button @click="handleReset">重置</button>
        </fieldset>
    </div>
</template>
<script>
import Emitter from '@/mixins/emitter.js';
import increatBtn from "@/components/api/increatBtn.vue"
import transMsg from "@/components/api/transMsg.vue"

import iForm from '@/components/form/form.vue';
import iFormItem from '@/components/form/formItem.vue';
import iInput from '@/components/form/input.vue';
import iCheckbox from '@/components/form/checkbox.vue';
import iCheckboxGroup from '@/components/form/checkboxGroup.vue';
import iRadioGroup from '@/components/form/radioGroup.vue';
import iRadio from '@/components/form/radio.vue';



export default {
    name: 'api',
    inject: ['app'],
    mixins: [Emitter],
    data() {
        return {
            value: 0,
            formValidate: {
                name: '',
                mail: '',
                sing: false,
                mult: [],
            },
            ruleValidate: {
                name: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                mail: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                ],
                mult: [
                    { required: true, type: 'array', message: '必须选一个', trigger: 'change' }
                ],
                sing: [
                    { required: true, type: "enum", enum: [true], message: '单选必须选', trigger: 'change' }
                ],
                sradio: [
                    { required: true, type: "enum", enum: [true], message: '单选必须选', trigger: 'change' }
                ],
                idol: [{ required: true,  message: '必须选一个', trigger: 'change' }]
            }

        }
    },
    components: {
        increatBtn,
        transMsg,
        iForm,
        iFormItem,
        iInput,
        iCheckbox,
        iCheckboxGroup,
        iRadioGroup,
        iRadio,
    },
    methods: {
        getInfo() {
            console.log('this.app', this.app)
            this.app.getUserInfo()
        },
        handleClick() {
            this.broadcast('transMsg', 'on-message', 'Hello Vue.js')
        },
        handleSubmit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    window.alert('提交成功');
                } else {
                    window.alert('表单校验失败');
                }
            })
        },
        handleReset() {
            this.$refs.form.resetFields();
        }
    }
}

</script>
<style lang="css" scoped>
</style>
