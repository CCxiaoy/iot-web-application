<template>
    <div class="bg-themeColor-medium">
        <NavCategories>
            <SubCategory v-for="Category in allCategories" :key="Category.id"
                :class="{ isActived: Category.title === currentNav }" @click="navChange(Category.title)">
                {{ Category.title }}
            </SubCategory>
        </NavCategories>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import NavCategories from '../components/Categories/NavCategories.vue';
import SubCategory from '../components/Categories/SubCategory.vue';

const allCategories = reactive([
    {
        id: "All",
        title: "All",
        url: "/",
    },
    {
        id: "Lamp",
        title: "Lamp",
        url: "/lamp",
    },
    {
        id: "Fan",
        title: "Fan",
        url: "/fan",
    },
    {
        id: "Sensor",
        title: "Sensor",
        url: "/sensor",
    }
])

const currentNav = ref("All")

const navChange = (newNav) => {
    currentNav.value = newNav;
}
</script>

<style scoped>
.isActived {
    background-color: white;
}
</style>