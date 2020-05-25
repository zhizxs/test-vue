<template>
    <div>
        <el-select v-model="value" multiple placeholder="请选择">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
        </el-select>
    </div>
</template>
<script>
export default {
    name: 'others',
    data() {
        return {
            options: [
                { name: '张三丰', id: 1 },
                { name: '李四盒', id: 2 },
                { name: '王鲅先', id: 3 },
                { name: '车车打', id: 4 },
                { name: '粉红豹', id: 5 }
            ],
            value: [1, 5]
        }
    }
}

</script>
<style lang="css" scoped>
</style>
