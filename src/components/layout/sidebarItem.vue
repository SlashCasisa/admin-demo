<template>
    <div>
        <template v-if="!item.children">
            <router-link :to="resolvePath(item.path)">
            <el-menu-item :index="resolvePath(item.path)" >
                <template slot="title">
                    <i class="iconfont navbar-icon" :class="`${item.meta.icon}`" />
                    <span v-if="item.meta && item.meta.title" slot="title">{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
            </router-link>
        </template>
        <template v-else>
        <el-submenu  :index="resolvePath(item.path)" popper-append-to-body>
            <template slot="title">
                <i class="iconfont navbar-icon" :class="`${item.meta.icon}`" />
                <span v-if="item.meta && item.meta.title" slot="title">{{ item.meta.title }}</span>
            </template>
            <template v-if="item.children">
                <sidebar-item v-for="child in item.children" :key="child.path" :item="child" />
            </template>
        </el-submenu>
        </template>
    </div>
</template>

<script>
    import path from 'path'

    export default {
        name: 'sidebarItem',
        props: {
            item: {
                required: true,
                type: Object,
                default () {
                    return {}
                }
            },
        },
        created() {
            console.log(this.item, 'tiii')
        },
        methods: {
            resolvePath(routePath) {
                console.log(routePath, 'routdddd')
                const isExternal = (routePath) => /^(https?:|mailto:|tel:)/.test(routePath)
                if (isExternal(routePath)) {
                    return routePath
                }
                return path.resolve(routePath)
            }
        }
    }
</script>

<style lang="scss">
</style>