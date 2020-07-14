<template>
    <div>
        <button @click="increase(-1)">减 1</button>
        <span style="color: red;padding: 6px">{{ currentValue }}</span>
        <button @click="increase(1)">加 1</button>
    </div>
</template>
<script>
export default {
    name: 'InputNumber',
    props: {
        value: {
            type: Number
        }
    },
    data() {
        return {
            currentValue: this.value
        }
    },
    watch: {
      value (val) {
        this.currentValue = val;
      }
    },
    methods: {
        increase(val) {
        	// 使用 value + input 
            // this.currentValue += val;
            // this.$emit('input', this.currentValue);
            // 使用 .sync 进行绑定
            this.$emit('update:value', this.value + val);
        }
    }
}

</script>
