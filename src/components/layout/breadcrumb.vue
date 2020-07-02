<template>
    <el-breadcrumb class="breadcrumb-container" separator="/">
        <!-- <el-breadcrumb-item v-for="item in fitlerRouterList" :key="item.name" :to="{ name: item.name }">{{item.meta.title}}</el-breadcrumb-item> -->
        <el-breadcrumb-item v-for="item in fitlerRouterList" :key="item.name">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
    export default {
        name: '',
        data() {
            return {

            }
        },
        computed: {
            routerList() {
                let arr =  this.$route.matched
                console.log(arr.splice(0,1),'arr', this.$route.matched)
                return this.$route.matched
            },
            fitlerRouterList() {
                return this.routerList.filter(v => v.meta.title)
            },
        },
        created() {
            console.log(this.$route)
        },
        methods: {

        }
    }
</script>

<style lang="css" scoped>
    .breadcrumb-container {
        padding: 20px 16px 12px;
        font-size: 16px;
    }
</style>