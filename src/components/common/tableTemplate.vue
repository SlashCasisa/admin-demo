<template>
    <span>
        <slot>
            <template v-if="item.prop==='status'">
                <!-- 1:表示代办,2:完成,3:删除,-1:全部 -->
                <p v-if="scope.row[item.prop] === 1">代办</p>
                <p v-else-if="scope.row[item.prop] === 2">完成</p>
                <p v-else-if="scope.row[item.prop] === 3">已删除</p>
            </template>
            <template v-else-if="item.prop==='deadline'">
                {{scope.row[item.prop].slice(0,10)}}
            </template>
            <template v-else>
                {{scope.row[item.prop]}}
            </template>
        </slot>
    </span>
</template>

<script>
    export default {
        name: 'tableTemplate',
        props: {
            scope: {
                required: true,
                type: Object
            },
            item: {
                required: true,
                type: Object
            }
        }

    }
</script>

<style>

</style>