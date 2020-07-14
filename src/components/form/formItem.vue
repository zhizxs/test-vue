<template>
    <div>
        <label v-if="label">{{babel}}</label>
        <div>
            <slot></slot>
        </div>
    </div>
</template>
<script>
import Emitter from '@/mixins/emitter.js';
import AsyncValidator from 'async-validator';
export default {

    name: 'iFormItem',
    mixins: [Emitter],
    inject: ['form'],
    props: {
        lable: {
            type: String,
            default: ''
        },
        prop: {
            type: String,
        }
    },
    mounted() {
        if (this.prop) {
            this.dispatch('iFrom', "on-from-item-add", this)
            this.setRules()
        }
    },
    beforeDestroy() {
        this.dispatch('iForm', "on-from-item-add", this)
    },
    methods: {
        setRules() {
            this.$on('on-form-blur', this.onFieldBlur);
            this.$on('on-form-change', this.onFieldChange);
        }
    }

}

</script>
<style lang="css" scoped>
</style>
