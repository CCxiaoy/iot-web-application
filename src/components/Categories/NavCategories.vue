<template>
    <div class="ml-9 mt-12 text-leftnavtitle font-bold italic">
        {{ title[0].name }}
    </div>
    <nav>
        <ul>
            <slot></slot>
        </ul>
    </nav>
</template>

<script setup>
import { reactive } from "vue"

const title = reactive([{
    name: "Categories"
}])
</script>

<style scoped></style>