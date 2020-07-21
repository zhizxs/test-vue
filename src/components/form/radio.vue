<template>
    <label>
        <span>
            <input v-if='group' :name="name" type="radio" v-model='model' :disabled="disabled" :value="label" @change='change'>
            <input v-else type="radio" :checked="currentValue" :disabled="disabled" @change='change'>
        </span>
        <slot></slot>
    </label>
</template>
<script>
import { findComponentUpward } from '@/utils/assist.js';

import Emitter from '@/mixins/emitter.js';

export default {

    name: 'iRadio',
    mixins: [Emitter],
    props: {
        label: {
            type: [String, Number, Boolean]
        },
        disabled: {
            type: Boolean,
            default: false
        },
        name: {
            type: [String, Number],
            default: ''
        },
        value: {
            type: [String, Number, Boolean],
            default: false
        },
        trueValue: {
            type: [String, Number, Boolean],
            default: true
        },
        falseValue: {
            type: [String, Number, Boolean],
            default: false
        }
    },
    data() {
        return {
            group: false,
            model: '',
            currentValue: this.value,
            parent: null
        }
    },
    mounted() {
        this.parent = findComponentUpward(this, 'iRadioGroup');

        if (this.parent) {
            this.group = true;
        }

        if (this.group) {
            this.parent.updateModel(true);
        } else {
            this.updateModel();
        }
    },
    watch: {
        value(val) {
            if (val === this.trueValue || val === this.falseValue) {
                this.updateModel();
            } else {
                throw 'Value should be trueValue or falseValue.';
            }
        }
    },
    methods: {
        updateModel() {
            this.currentValue = this.value === this.trueValue
        },
        change(event) {
            if (this.disabled) return false;

            let checked = event.target.checked

            this.currentValue = checked

            let value = checked ? this.trueValue : this.falseValue

            this.$emit('input', value)

            if (this.group) {
                this.parent.change(this.model)
            } else {
                this.$emit('on-change', value)
                this.dispatch('iRadioGroup', 'on-form-change', value)
            }
        }
    }
}

</script>
<style lang="css" scoped>
</style>
