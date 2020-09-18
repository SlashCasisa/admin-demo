<template>
<div class="router-view">
    <router-view :key="key" />
</div>
</template>

<script>
export default {
    name: 'routeView',
    computed: {
        key() {
            return this.$route.fullPath
        }
    }
}
</script>
