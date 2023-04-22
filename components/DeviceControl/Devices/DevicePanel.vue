<template>
    <div id="devicePanel" class="bg-themeColor-dark mx-12 rounded-3xl">
        <div class="py-10 px-12 flex flex-row-reverse">
            <i class="w-16 h-8 ml-4 rounded-2xl bg-themeColor-lightest flex justify-center content-center"><IconAddNewDevice class="w-8 h-8"></IconAddNewDevice></i>
        </div>
        <div>
            <SingleDevice></SingleDevice>
        </div>
    </div>
</template>

<script setup>
import IconAddNewDevice from '../../icons/IconAddNewDevice.vue';
import SingleDevice from './SingleDevice.vue';
</script>

<style scoped>
#devicePanel {
    height: 87%;
}
</style>