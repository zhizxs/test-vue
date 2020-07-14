<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
export default {

    name: 'iForm',
    props: {
        model: {
            type: Object,
        },
        rules: {
            type: Object
        }
    },
    provide() {
        return {
            form: this
        };
    },
    data() {
        return {
            fields: [] // 用来缓存需要校验的子实例
        };
    },
    created() {
        this.$on('on-form-item-add', (field) => {
            if (field) this.fields.push(field);
        });
        this.$on('on-form-item-remove', (field) => {
            if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
        });
    }
}

</script>
<style lang="css" scoped>
</style>
