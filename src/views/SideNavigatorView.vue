<template>
    <div class="bg-themeColor-medium">
        <NavCategories>
            <SubCategory v-for="Category in SideNavigatorCategories" :key="Category.id"
                :class="{ isActived: Category.title === currentSideNav }" @click="sideNavChange(Category.title)">
                {{ Category.title }}
            </SubCategory>
        </NavCategories>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import NavCategories from '../components/Categories/NavCategories.vue';
import SubCategory from '../components/Categories/SubCategory.vue';
import useInfosStore from "../stores";
import { storeToRefs } from 'pinia';

// import center store
const store = useInfosStore();

const { currentSideNav, SideNavigatorCategories } = storeToRefs(store);

const sideNavChange = (newNav) => {
    store.sideNavChange(newNav);
}
</script>

<style scoped>
.isActived {
    background-color: white;
}
</style>