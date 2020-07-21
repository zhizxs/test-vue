<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
import { findComponentsDownward } from '@/utils/assist.js';
import Emitter from '@/mixins/emitter.js';


export default {

    name: 'iRadioGroup',
    mixins: [Emitter],
    props: {
        value: {
            type: String,
           	default:''
        }
    },
    data() {
        return {
            currentValue: this.value,
            childrens: []
        }
    },

    methods: {
        updateModel(update) {
            // 改变子组件的状态值
            this.childrens = findComponentsDownward(this, 'iRadio');
            if (this.childrens) {
                let { value } = this

                this.childrens.forEach(child => {
                    child.model = value

                    if (update) {
                        child.currentValue = value.indexOf(child.label) >= 0;
                        child.group = true
                    }
                })
            }
        },
        change(data) {
            this.currentValue = data
            this.$emit('input', data);
            this.$emit('on-change', data)
            this.dispatch('iFormItem', 'on-form-change', data)
        }
    },
    watch: {
        value() {
            this.updateModel(true)
        }
    },
    mounted() {
        this.updateModel(true)
    }
}

</script>
<style lang="css" scoped>
</style>
