<template>
<div class="admin-main">
    <el-scrollbar>
        <transition name="fade-transform" mode="out-in">
            <div class="admin-warpper">
                <!-- <breadcrumb />-->
                <router-view />
            </div>
        </transition>
    </el-scrollbar>
</div>
</template>

<script>
// import breadcrumb from '@/components/layout/breadcrumb.vue'
export default {
    name: 'AdminMain',
    components: {
        // breadcrumb: breadcrumb
    }
}
</script>

<style lang="scss">
.admin-main {
    width: 100%;
    height: 100%;
}

.admin-warpper {
    width: 100%;
    height: 100%;
}
</style>
